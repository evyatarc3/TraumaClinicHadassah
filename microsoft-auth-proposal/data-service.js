/**
 * Microsoft Graph Data Service
 *
 * שירות לשמירה וקריאה של נתוני מטופלים ב-SharePoint Online
 * דרך Microsoft Graph API.
 *
 * מבנה הנתונים ב-SharePoint:
 * - SharePoint Site: "TraumaClinicData"
 *   - List: "PatientSessions" - נתוני מטופלים (state מלא של האפליקציה)
 *   - List: "QuestionnaireResults" - תוצאות שאלונים (לחיפוש מהיר)
 *   - List: "AuditLog" - יומן פעולות
 */

class DataService {
    constructor(authServiceInstance) {
        this.auth = authServiceInstance;
        this.graphBaseUrl = "https://graph.microsoft.com/v1.0";
        this.siteId = null;
        this.listIds = {};
    }

    // =========================================================================
    //  אתחול
    // =========================================================================

    async initialize() {
        try {
            this.siteId = await this._getSiteId();

            this.listIds.patientSessions = await this._getOrCreateList(
                sharepointConfig.lists.patientSessions,
                this._getPatientSessionsSchema()
            );

            this.listIds.questionnaireResults = await this._getOrCreateList(
                sharepointConfig.lists.questionnaireResults,
                this._getQuestionnaireResultsSchema()
            );

            return true;
        } catch (error) {
            console.error("DataService: שגיאה באתחול:", error);
            throw error;
        }
    }

    // =========================================================================
    //  שמירת נתונים
    // =========================================================================

    /**
     * שמירת session של מטופל (state מלא של האפליקציה)
     *
     * @param {Object} stateData - ה-state המלא:
     *   { intake, sessions, currentSession, results, completedQ, answers,
     *     allQAnswers, selectedQ, activeView, selectedDiags, timestamp }
     * @returns {string} sessionId
     */
    async savePatientSession(stateData) {
        const user = this.auth.getCurrentUser();
        if (!user) throw new Error("יש להתחבר תחילה");

        const sessionId = this._generateSessionId();

        // חישוב סיכום שאלונים שהושלמו
        const completedList = stateData.completedQ
            ? Object.keys(stateData.completedQ).filter(k => stateData.completedQ[k]).join(", ")
            : "";

        const item = {
            fields: {
                Title: sessionId,
                PatientInitials: this._getInitials(stateData.intake?.name),
                PatientAge: String(stateData.intake?.age || ""),
                PatientGender: stateData.intake?.gender || "",
                TherapistEmail: user.email,
                TherapistName: user.name,
                ExaminerName: stateData.intake?.examName || user.name,
                SessionDate: stateData.intake?.sessionDate || new Date().toISOString().split('T')[0],
                SessionType: stateData.intake?.sessionType || "",
                CompletedQuestionnaires: completedList,
                SessionData: JSON.stringify(this._sanitizeForStorage(stateData)),
                CreatedDate: new Date().toISOString(),
                LastModified: new Date().toISOString(),
                Status: this._determineStatus(stateData),
            }
        };

        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const response = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }
        );

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(`שגיאה בשמירת session: ${errorBody.error?.message || response.statusText}`);
        }

        // שמירת תוצאות שאלונים בנפרד (לחיפוש מהיר)
        if (stateData.results && Object.keys(stateData.results).length > 0) {
            await this._saveQuestionnaireResults(sessionId, stateData.results, user);
        }

        return sessionId;
    }

    /**
     * עדכון session קיים
     * @param {string} itemId - SharePoint item ID
     * @param {Object} stateData - state מעודכן
     */
    async updatePatientSession(itemId, stateData) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const completedList = stateData.completedQ
            ? Object.keys(stateData.completedQ).filter(k => stateData.completedQ[k]).join(", ")
            : "";

        const fields = {
            SessionData: JSON.stringify(this._sanitizeForStorage(stateData)),
            LastModified: new Date().toISOString(),
            Status: this._determineStatus(stateData),
            CompletedQuestionnaires: completedList,
        };

        const response = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items/${itemId}/fields`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fields)
            }
        );

        if (!response.ok) {
            throw new Error(`שגיאה בעדכון session: ${response.statusText}`);
        }

        return await response.json();
    }

    // =========================================================================
    //  קריאת נתונים
    // =========================================================================

    /**
     * קבלת כל ה-sessions של המטפל המחובר
     * ממוינים לפי תאריך עדכון אחרון (חדש קודם)
     *
     * @param {Object} options
     * @param {number} options.limit - מספר תוצאות מקסימלי (ברירת מחדל: 50)
     * @param {string} options.status - סינון לפי סטטוס ('in_progress', 'complete', 'deleted')
     * @returns {Array}
     */
    async getMyPatientSessions(options = {}) {
        const user = this.auth.getCurrentUser();
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        let filter = `fields/TherapistEmail eq '${user.email}'`;
        if (options.status) {
            filter += ` and fields/Status eq '${options.status}'`;
        } else {
            filter += ` and fields/Status ne 'deleted'`;
        }

        const limit = options.limit || 50;

        const response = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items?` +
            `$filter=${encodeURIComponent(filter)}&` +
            `$expand=fields&` +
            `$orderby=fields/LastModified desc&` +
            `$top=${limit}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Prefer": "HonorNonIndexedQueriesWarningMayFailRandomly"
                }
            }
        );

        if (!response.ok) {
            throw new Error("שגיאה בקריאת sessions");
        }

        const data = await response.json();
        return data.value.map(item => this._mapSessionItem(item));
    }

    /**
     * קבלת session ספציפי לפי Session ID
     * @param {string} sessionId
     */
    async getPatientSession(sessionId) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);
        const filter = `fields/Title eq '${sessionId}'`;

        const response = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items?` +
            `$filter=${encodeURIComponent(filter)}&$expand=fields`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Prefer": "HonorNonIndexedQueriesWarningMayFailRandomly"
                }
            }
        );

        if (!response.ok) throw new Error("שגיאה בקריאת session");

        const data = await response.json();
        if (data.value.length === 0) return null;

        return this._mapSessionItem(data.value[0]);
    }

    /**
     * חיפוש sessions לפי מטופל (ראשי תיבות)
     * @param {string} initials
     */
    async searchByPatient(initials) {
        const user = this.auth.getCurrentUser();
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const filter = `fields/TherapistEmail eq '${user.email}' and startsWith(fields/PatientInitials, '${initials}')`;

        const response = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items?` +
            `$filter=${encodeURIComponent(filter)}&$expand=fields&$top=20`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Prefer": "HonorNonIndexedQueriesWarningMayFailRandomly"
                }
            }
        );

        if (!response.ok) throw new Error("שגיאה בחיפוש");

        const data = await response.json();
        return data.value
            .filter(item => item.fields.Status !== 'deleted')
            .map(item => this._mapSessionItem(item));
    }

    /**
     * מחיקת session (soft delete)
     */
    async deletePatientSession(itemId) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const response = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items/${itemId}/fields`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Status: "deleted",
                    LastModified: new Date().toISOString(),
                })
            }
        );

        if (!response.ok) throw new Error("שגיאה במחיקת session");
    }

    // =========================================================================
    //  פונקציות עזר פנימיות
    // =========================================================================

    /**
     * Fetch עם retry logic (exponential backoff)
     */
    async _fetchWithRetry(url, options, maxRetries = 3) {
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const response = await fetch(url, options);

                // 429 Too Many Requests - retry after
                if (response.status === 429) {
                    const retryAfter = parseInt(response.headers.get('Retry-After') || '5', 10);
                    await new Promise(r => setTimeout(r, retryAfter * 1000));
                    continue;
                }

                // 5xx - server error, retry
                if (response.status >= 500 && attempt < maxRetries) {
                    await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
                    continue;
                }

                return response;
            } catch (error) {
                // Network error - retry
                if (attempt < maxRetries) {
                    await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
                    continue;
                }
                throw error;
            }
        }
    }

    /**
     * מיפוי SharePoint item לאובייקט session
     */
    _mapSessionItem(item) {
        let parsedData = {};
        try {
            parsedData = JSON.parse(item.fields.SessionData || "{}");
        } catch (e) {
            console.warn("DataService: שגיאה בפענוח SessionData", e);
        }

        return {
            id: item.id,
            sessionId: item.fields.Title,
            patientInitials: item.fields.PatientInitials,
            patientAge: item.fields.PatientAge,
            patientGender: item.fields.PatientGender,
            therapistEmail: item.fields.TherapistEmail,
            therapistName: item.fields.TherapistName,
            examinerName: item.fields.ExaminerName,
            sessionDate: item.fields.SessionDate,
            sessionType: item.fields.SessionType,
            completedQuestionnaires: item.fields.CompletedQuestionnaires,
            created: item.fields.CreatedDate,
            lastModified: item.fields.LastModified,
            status: item.fields.Status,
            data: parsedData,
        };
    }

    /**
     * ניקוי state לפני שמירה - הסרת אובייקטי questionnaire כבדים
     * (כי הם כבר קיימים בקוד האפליקציה, אין צורך לשמור שוב)
     */
    _sanitizeForStorage(stateData) {
        const cleaned = { ...stateData };

        // הסרת אובייקטי שאלון מלאים מתוך results (חוסכים ~80% מגודל הנתונים)
        if (cleaned.results) {
            const slimResults = {};
            for (const [key, value] of Object.entries(cleaned.results)) {
                slimResults[key] = {
                    qname: value.qname,
                    results: value.results,
                    answers: value.answers,
                    // questionnaire object הוסר - ייטען מקוד האפליקציה
                };
            }
            cleaned.results = slimResults;
        }

        return cleaned;
    }

    /**
     * קביעת סטטוס ה-session
     */
    _determineStatus(stateData) {
        if (stateData.isComplete) return "complete";
        const completedCount = stateData.completedQ
            ? Object.values(stateData.completedQ).filter(Boolean).length
            : 0;
        return completedCount > 0 ? "in_progress" : "new";
    }

    /**
     * שמירת תוצאות שאלונים ברשימה נפרדת (לחיפוש וסטטיסטיקות)
     */
    async _saveQuestionnaireResults(sessionId, results, user) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        for (const [qName, qResult] of Object.entries(results)) {
            if (!qResult.results) continue;

            const item = {
                fields: {
                    Title: `${sessionId}_${qName}`,
                    SessionId: sessionId,
                    QuestionnaireName: qName,
                    QuestionnaireFullName: qResult.qname || qName,
                    TotalScore: String(qResult.results.total || 0),
                    MaxScore: String(qResult.results.max || 0),
                    Severity: qResult.results.severity || "",
                    Scores: JSON.stringify(qResult.results),
                    CompletedDate: new Date().toISOString(),
                    TherapistEmail: user.email,
                }
            };

            try {
                await this._fetchWithRetry(
                    `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.questionnaireResults}/items`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(item)
                    }
                );
            } catch (e) {
                console.warn(`DataService: שגיאה בשמירת תוצאות ${qName}:`, e);
                // ממשיכים - לא עוצרים בגלל שאלון אחד
            }
        }
    }

    async _getSiteId() {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const response = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites?search=${sharepointConfig.siteName}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error("שגיאה בחיפוש SharePoint Site");

        const data = await response.json();
        const site = data.value.find(s => s.displayName === sharepointConfig.siteName);

        if (!site) {
            throw new Error(`SharePoint Site "${sharepointConfig.siteName}" לא נמצא. יש ליצור אותו ב-SharePoint Admin.`);
        }

        return site.id;
    }

    async _getOrCreateList(listName, schema) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        // חיפוש list קיים
        const getResponse = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists?$filter=displayName eq '${listName}'`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );

        if (getResponse.ok) {
            const data = await getResponse.json();
            if (data.value.length > 0) {
                return data.value[0].id;
            }
        }

        // יצירת list חדש
        const createResponse = await this._fetchWithRetry(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    displayName: listName,
                    list: { template: "genericList" },
                    columns: schema
                })
            }
        );

        if (!createResponse.ok) {
            throw new Error(`שגיאה ביצירת List: ${listName}`);
        }

        return (await createResponse.json()).id;
    }

    _getPatientSessionsSchema() {
        return [
            { name: "PatientInitials", text: {} },
            { name: "PatientAge", text: {} },
            { name: "PatientGender", text: {} },
            { name: "TherapistEmail", text: {} },
            { name: "TherapistName", text: {} },
            { name: "ExaminerName", text: {} },
            { name: "SessionDate", text: {} },
            { name: "SessionType", text: {} },
            { name: "CompletedQuestionnaires", text: {} },
            { name: "SessionData", text: { allowMultipleLines: true, maxLength: 100000 } },
            { name: "CreatedDate", dateTime: { format: "dateTime" } },
            { name: "LastModified", dateTime: { format: "dateTime" } },
            { name: "Status", choice: { choices: ["new", "in_progress", "complete", "deleted"] } },
        ];
    }

    _getQuestionnaireResultsSchema() {
        return [
            { name: "SessionId", text: {} },
            { name: "QuestionnaireName", text: {} },
            { name: "QuestionnaireFullName", text: {} },
            { name: "TotalScore", text: {} },
            { name: "MaxScore", text: {} },
            { name: "Severity", text: {} },
            { name: "Scores", text: { allowMultipleLines: true, maxLength: 50000 } },
            { name: "CompletedDate", dateTime: { format: "dateTime" } },
            { name: "TherapistEmail", text: {} },
        ];
    }

    _getInitials(name) {
        if (!name) return "??";
        return name.split(" ").map(n => n.charAt(0)).join("").substring(0, 3);
    }

    _generateSessionId() {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const random = Math.random().toString(36).substring(2, 8);
        return `SES-${date}-${random}`;
    }
}
