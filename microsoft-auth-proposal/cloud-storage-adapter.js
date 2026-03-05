/**
 * Cloud Storage Adapter
 *
 * שכבת תיווך בין האפליקציה הקיימת לבין SharePoint Online.
 * מחליפה את localStorage.setItem/getItem ב-API calls לענן,
 * עם fallback מקומי למקרה של חוסר רשת.
 *
 * המפתח: האפליקציה הקיימת שומרת את כל ה-state כ-JSON יחיד
 * מתחת למפתח 'hadassah_trauma_session'. האדפטר הזה:
 * 1. שומר לענן (SharePoint) כ-primary
 * 2. שומר ל-sessionStorage כ-cache/fallback
 * 3. מסנכרן כשהרשת חוזרת
 *
 * STATE SHAPE (מה שהאפליקציה שומרת):
 * {
 *   intake: { name, age, gender, patID, diag, sessionDate, sessionType, examName },
 *   sessions: [{ date, type }],
 *   currentSession: { date, type },
 *   results: { [qName]: { qname, results: { total, max, severity, cls, subdomains }, answers, questionnaire } },
 *   completedQ: { [qName]: boolean },
 *   answers: { [idx]: value },
 *   allQAnswers: { [qName]: { [idx]: value } },
 *   selectedQ: string,
 *   activeView: string,
 *   selectedDiags: [{ code, label, dsm, source, addedAt }],
 *   timestamp: number
 * }
 */

class CloudStorageAdapter {
    constructor(authService, dataService) {
        this.auth = authService;
        this.data = dataService;
        this._currentItemId = null; // SharePoint item ID for updates
        this._saveQueue = null;     // debounce queue
        this._saveTimeout = null;
        this._isOnline = navigator.onLine;
        this._pendingSync = false;
        this._initialized = false;
        this._lastSavedHash = null;

        // ניטור מצב רשת
        window.addEventListener('online', () => this._onOnline());
        window.addEventListener('offline', () => this._onOffline());
    }

    /**
     * אתחול - מחבר ל-SharePoint ובודק אם יש נתונים קיימים
     * @returns {Object|null} נתונים קיימים מהענן (אם יש)
     */
    async initialize() {
        try {
            await this.data.initialize();
            this._initialized = true;

            // בדיקה אם יש נתונים מקומיים ממתינים לסנכרון
            const pendingData = sessionStorage.getItem('hadassah_pending_sync');
            if (pendingData && this._isOnline) {
                await this._syncPendingData(JSON.parse(pendingData));
                sessionStorage.removeItem('hadassah_pending_sync');
            }

            return true;
        } catch (error) {
            console.warn("CloudStorage: לא ניתן להתחבר לענן, עובד במצב מקומי", error);
            this._initialized = false;
            return false;
        }
    }

    // =========================================================================
    //  API ראשי - תחליף ל-localStorage
    // =========================================================================

    /**
     * שמירת נתונים - תחליף ל-localStorage.setItem('hadassah_trauma_session', ...)
     * שומר גם לענן וגם ל-sessionStorage כ-cache
     *
     * @param {Object} stateData - כל ה-state של האפליקציה
     */
    async save(stateData) {
        if (!stateData || !stateData.intake) return;

        // תמיד שומר מקומית כ-cache מיידי (sessionStorage - לא localStorage)
        const dataWithTimestamp = { ...stateData, timestamp: Date.now() };
        try {
            sessionStorage.setItem('hadassah_trauma_session', JSON.stringify(dataWithTimestamp));
        } catch (e) {
            console.error("CloudStorage: שגיאה בשמירה מקומית", e);
        }

        // Debounce - לא שומר לענן בכל שינוי קטן, אלא ממתין 2 שניות
        if (this._saveTimeout) {
            clearTimeout(this._saveTimeout);
        }
        this._saveTimeout = setTimeout(() => this._saveToCloud(dataWithTimestamp), 2000);
    }

    /**
     * טעינת נתונים - תחליף ל-localStorage.getItem('hadassah_trauma_session')
     * מנסה קודם מהענן, אם נכשל - מה-cache המקומי
     *
     * @returns {Object|null} נתוני ה-state השמורים
     */
    async load() {
        // ניסיון לטעון מהענן
        if (this._isOnline && this._initialized) {
            try {
                const cloudData = await this._loadFromCloud();
                if (cloudData) {
                    // עדכון cache מקומי
                    sessionStorage.setItem('hadassah_trauma_session', JSON.stringify(cloudData));
                    return cloudData;
                }
            } catch (error) {
                console.warn("CloudStorage: שגיאה בטעינה מענן, מנסה cache מקומי", error);
            }
        }

        // Fallback: cache מקומי
        try {
            const cached = sessionStorage.getItem('hadassah_trauma_session');
            if (cached) {
                const data = JSON.parse(cached);
                if (data.intake) return data;
            }
        } catch (e) {
            console.error("CloudStorage: שגיאה בקריאת cache", e);
        }

        return null;
    }

    /**
     * טעינת כל ה-sessions של המטפל (היסטוריה)
     * פיצ'ר חדש שלא קיים באפליקציה הנוכחית
     *
     * @returns {Array} רשימת sessions עם metadata
     */
    async loadAllMySessions() {
        if (!this._isOnline || !this._initialized) {
            return [];
        }

        try {
            const sessions = await this.data.getMyPatientSessions();
            // סינון sessions מחוקים
            return sessions.filter(s => s.status !== 'deleted');
        } catch (error) {
            console.error("CloudStorage: שגיאה בטעינת היסטוריית sessions", error);
            return [];
        }
    }

    /**
     * טעינת session ספציפי לפי ID (למשל, לצפייה בביקור קודם)
     *
     * @param {string} sessionId
     * @returns {Object|null}
     */
    async loadSession(sessionId) {
        if (!this._isOnline || !this._initialized) return null;

        try {
            const session = await this.data.getPatientSession(sessionId);
            return session ? session.data : null;
        } catch (error) {
            console.error("CloudStorage: שגיאה בטעינת session", error);
            return null;
        }
    }

    /**
     * מחיקת הנתונים הנוכחיים - תחליף ל-localStorage.removeItem
     */
    async clear() {
        sessionStorage.removeItem('hadassah_trauma_session');
        sessionStorage.removeItem('hadassah_pending_sync');

        if (this._currentItemId && this._isOnline && this._initialized) {
            try {
                await this.data.deletePatientSession(this._currentItemId);
            } catch (error) {
                console.warn("CloudStorage: שגיאה במחיקה מענן", error);
            }
        }

        this._currentItemId = null;
        this._lastSavedHash = null;
    }

    /**
     * יצירת session חדש (מטופל חדש) - שומר את הקודם וסוגר
     */
    async startNewSession() {
        // סגירת ה-session הנוכחי
        if (this._currentItemId && this._isOnline && this._initialized) {
            try {
                const currentData = sessionStorage.getItem('hadassah_trauma_session');
                if (currentData) {
                    const parsed = JSON.parse(currentData);
                    parsed.isComplete = true;
                    await this.data.updatePatientSession(this._currentItemId, parsed);
                }
            } catch (e) {
                console.warn("CloudStorage: שגיאה בסגירת session קודם", e);
            }
        }

        this._currentItemId = null;
        this._lastSavedHash = null;
        sessionStorage.removeItem('hadassah_trauma_session');
    }

    // =========================================================================
    //  מצב וסטטוס
    // =========================================================================

    isOnline() {
        return this._isOnline;
    }

    isCloudConnected() {
        return this._initialized && this._isOnline;
    }

    hasPendingSync() {
        return this._pendingSync || sessionStorage.getItem('hadassah_pending_sync') !== null;
    }

    getCurrentItemId() {
        return this._currentItemId;
    }

    /**
     * מחזיר אובייקט סטטוס לתצוגה ב-UI
     */
    getStatus() {
        if (!this._isOnline) {
            return { icon: "offline", text: "ללא רשת - נתונים נשמרים מקומית", color: "#f59e0b" };
        }
        if (!this._initialized) {
            return { icon: "warning", text: "לא מחובר לענן - שמירה מקומית בלבד", color: "#ef4444" };
        }
        if (this._pendingSync) {
            return { icon: "syncing", text: "מסנכרן...", color: "#3b82f6" };
        }
        return { icon: "cloud", text: "מחובר לענן", color: "#10b981" };
    }

    // =========================================================================
    //  פונקציות פנימיות
    // =========================================================================

    async _saveToCloud(data) {
        if (!this._isOnline || !this._initialized) {
            // שומר לסנכרון מאוחר
            sessionStorage.setItem('hadassah_pending_sync', JSON.stringify(data));
            this._pendingSync = true;
            return;
        }

        // בדיקה אם הנתונים השתנו באמת (hash check)
        const hash = this._quickHash(JSON.stringify(data));
        if (hash === this._lastSavedHash) return;

        try {
            if (this._currentItemId) {
                // עדכון record קיים
                await this.data.updatePatientSession(this._currentItemId, data);
            } else {
                // יצירת record חדש
                const sessionId = await this.data.savePatientSession(data);
                // מציאת ה-item ID שנוצר
                const session = await this.data.getPatientSession(sessionId);
                if (session) {
                    this._currentItemId = session.id;
                }
            }
            this._lastSavedHash = hash;
            this._pendingSync = false;
        } catch (error) {
            console.error("CloudStorage: שגיאה בשמירה לענן", error);
            // שומר לסנכרון מאוחר
            sessionStorage.setItem('hadassah_pending_sync', JSON.stringify(data));
            this._pendingSync = true;
        }
    }

    async _loadFromCloud() {
        const sessions = await this.data.getMyPatientSessions();

        // מחפש session פעיל (לא מושלם ולא מחוק) - האחרון שנערך
        const activeSessions = sessions.filter(s => s.status === 'in_progress');

        if (activeSessions.length > 0) {
            const latest = activeSessions[0]; // כבר ממוין לפי LastModified desc
            this._currentItemId = latest.id;
            return latest.data;
        }

        return null;
    }

    async _syncPendingData(data) {
        try {
            this._pendingSync = true;
            await this._saveToCloud(data);
            this._pendingSync = false;
        } catch (error) {
            console.error("CloudStorage: שגיאה בסנכרון", error);
        }
    }

    _onOnline() {
        this._isOnline = true;
        // ניסיון סנכרון של נתונים ממתינים
        const pending = sessionStorage.getItem('hadassah_pending_sync');
        if (pending) {
            this._syncPendingData(JSON.parse(pending)).then(() => {
                sessionStorage.removeItem('hadassah_pending_sync');
            });
        }
    }

    _onOffline() {
        this._isOnline = false;
    }

    _quickHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString(36);
    }
}
