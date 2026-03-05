/**
 * Microsoft Graph Data Service
 *
 * שירות לשמירה וקריאה של נתוני מטופלים ב-SharePoint Online
 * דרך Microsoft Graph API
 *
 * כל הנתונים נשמרים ב-SharePoint Lists בתוך site ייעודי
 * עם הרשאות גישה רק לקבוצת המטפלים המורשית
 */

class DataService {
    constructor(authServiceInstance) {
        this.auth = authServiceInstance;
        this.graphBaseUrl = "https://graph.microsoft.com/v1.0";
        this.siteId = null;
        this.listIds = {};
    }

    // =========================================================================
    //  אתחול - חיבור ל-SharePoint Site
    // =========================================================================

    /**
     * אתחול השירות - מאתר את ה-SharePoint Site ואת ה-Lists
     */
    async initialize() {
        try {
            // מציאת ה-SharePoint Site
            this.siteId = await this._getSiteId();

            // מציאת ה-Lists (או יצירה שלהם אם לא קיימים)
            this.listIds.patientSessions = await this._getOrCreateList(
                sharepointConfig.lists.patientSessions,
                this._getPatientSessionsSchema()
            );

            this.listIds.questionnaireResults = await this._getOrCreateList(
                sharepointConfig.lists.questionnaireResults,
                this._getQuestionnaireResultsSchema()
            );

            console.log("DataService אותחל בהצלחה");
            return true;
        } catch (error) {
            console.error("שגיאה באתחול DataService:", error);
            throw error;
        }
    }

    // =========================================================================
    //  שמירת נתונים
    // =========================================================================

    /**
     * שמירת session של מטופל
     * @param {Object} sessionData - נתוני ה-session (intake + answers + results)
     * @returns {string} sessionId
     */
    async savePatientSession(sessionData) {
        const user = this.auth.getCurrentUser();
        if (!user) throw new Error("יש להתחבר תחילה");

        const item = {
            fields: {
                Title: sessionData.sessionId || this._generateSessionId(),
                PatientInitials: this._getInitials(sessionData.intake?.patientName),
                PatientAge: sessionData.intake?.patientAge || "",
                TherapistEmail: user.email,
                TherapistName: user.name,
                SessionData: JSON.stringify(sessionData),
                CreatedDate: new Date().toISOString(),
                LastModified: new Date().toISOString(),
                Status: sessionData.isComplete ? "complete" : "in_progress",
            }
        };

        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const response = await fetch(
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
            const error = await response.json();
            throw new Error(`שגיאה בשמירת session: ${error.error?.message || response.statusText}`);
        }

        const result = await response.json();
        return result.fields.Title; // sessionId
    }

    /**
     * עדכון session קיים
     * @param {string} itemId - ID של הפריט ב-SharePoint
     * @param {Object} sessionData - נתונים מעודכנים
     */
    async updatePatientSession(itemId, sessionData) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const response = await fetch(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items/${itemId}/fields`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    SessionData: JSON.stringify(sessionData),
                    LastModified: new Date().toISOString(),
                    Status: sessionData.isComplete ? "complete" : "in_progress",
                })
            }
        );

        if (!response.ok) {
            throw new Error("שגיאה בעדכון session");
        }

        return await response.json();
    }

    /**
     * שמירת תוצאות שאלון
     * @param {string} sessionId - ID של ה-session
     * @param {string} questionnaireName - שם השאלון (e.g., "PCL-5", "BDI-2")
     * @param {Object} scores - ציונים ותוצאות
     */
    async saveQuestionnaireResult(sessionId, questionnaireName, scores) {
        const user = this.auth.getCurrentUser();
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const item = {
            fields: {
                Title: `${sessionId}_${questionnaireName}`,
                SessionId: sessionId,
                QuestionnaireName: questionnaireName,
                Scores: JSON.stringify(scores),
                CompletedDate: new Date().toISOString(),
                TherapistEmail: user.email,
            }
        };

        const response = await fetch(
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

        if (!response.ok) {
            throw new Error("שגיאה בשמירת תוצאות שאלון");
        }

        return await response.json();
    }

    // =========================================================================
    //  קריאת נתונים
    // =========================================================================

    /**
     * קבלת כל ה-sessions של המטפל המחובר
     * @returns {Array} רשימת sessions
     */
    async getMyPatientSessions() {
        const user = this.auth.getCurrentUser();
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        // סינון: רק sessions שנוצרו ע"י המטפל המחובר
        const filter = `fields/TherapistEmail eq '${user.email}'`;

        const response = await fetch(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items?` +
            `$filter=${encodeURIComponent(filter)}&` +
            `$expand=fields&` +
            `$orderby=fields/LastModified desc&` +
            `$top=100`,
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
        return data.value.map(item => ({
            id: item.id,
            sessionId: item.fields.Title,
            patientInitials: item.fields.PatientInitials,
            patientAge: item.fields.PatientAge,
            therapist: item.fields.TherapistName,
            created: item.fields.CreatedDate,
            lastModified: item.fields.LastModified,
            status: item.fields.Status,
            data: JSON.parse(item.fields.SessionData || "{}"),
        }));
    }

    /**
     * קבלת session ספציפי לפי ID
     * @param {string} sessionId
     */
    async getPatientSession(sessionId) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const filter = `fields/Title eq '${sessionId}'`;

        const response = await fetch(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.patientSessions}/items?` +
            `$filter=${encodeURIComponent(filter)}&$expand=fields`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Prefer": "HonorNonIndexedQueriesWarningMayFailRandomly"
                }
            }
        );

        if (!response.ok) {
            throw new Error("שגיאה בקריאת session");
        }

        const data = await response.json();
        if (data.value.length === 0) return null;

        const item = data.value[0];
        return {
            id: item.id,
            sessionId: item.fields.Title,
            data: JSON.parse(item.fields.SessionData || "{}"),
        };
    }

    /**
     * קבלת תוצאות שאלונים עבור session
     * @param {string} sessionId
     */
    async getQuestionnaireResults(sessionId) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const filter = `fields/SessionId eq '${sessionId}'`;

        const response = await fetch(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists/${this.listIds.questionnaireResults}/items?` +
            `$filter=${encodeURIComponent(filter)}&$expand=fields`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Prefer": "HonorNonIndexedQueriesWarningMayFailRandomly"
                }
            }
        );

        if (!response.ok) {
            throw new Error("שגיאה בקריאת תוצאות שאלונים");
        }

        const data = await response.json();
        return data.value.map(item => ({
            questionnaireName: item.fields.QuestionnaireName,
            scores: JSON.parse(item.fields.Scores || "{}"),
            completedDate: item.fields.CompletedDate,
        }));
    }

    /**
     * מחיקת session (soft delete - סימון כמחוק)
     * @param {string} itemId
     */
    async deletePatientSession(itemId) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        // soft delete - מעדכן סטטוס במקום מחיקה אמיתית
        const response = await fetch(
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

        if (!response.ok) {
            throw new Error("שגיאה במחיקת session");
        }
    }

    // =========================================================================
    //  פונקציות פנימיות
    // =========================================================================

    /**
     * מציאת SharePoint Site ID לפי שם
     */
    async _getSiteId() {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        const response = await fetch(
            `${this.graphBaseUrl}/sites?search=${sharepointConfig.siteName}`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        );

        if (!response.ok) throw new Error("שגיאה בחיפוש SharePoint Site");

        const data = await response.json();
        const site = data.value.find(s => s.displayName === sharepointConfig.siteName);

        if (!site) {
            throw new Error(`SharePoint Site "${sharepointConfig.siteName}" לא נמצא. יש ליצור אותו קודם.`);
        }

        return site.id;
    }

    /**
     * מציאת List או יצירתו אם לא קיים
     */
    async _getOrCreateList(listName, schema) {
        const token = await this.auth.getAccessToken(graphScopes.sharepoint.scopes);

        // ניסיון למצוא list קיים
        const getResponse = await fetch(
            `${this.graphBaseUrl}/sites/${this.siteId}/lists?$filter=displayName eq '${listName}'`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        );

        if (getResponse.ok) {
            const data = await getResponse.json();
            if (data.value.length > 0) {
                return data.value[0].id;
            }
        }

        // יצירת list חדש
        const createResponse = await fetch(
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

        const created = await createResponse.json();
        return created.id;
    }

    /**
     * סכמת עמודות ל-PatientSessions list
     */
    _getPatientSessionsSchema() {
        return [
            { name: "PatientInitials", text: {} },
            { name: "PatientAge", text: {} },
            { name: "TherapistEmail", text: {} },
            { name: "TherapistName", text: {} },
            { name: "SessionData", text: { allowMultipleLines: true, maxLength: 100000 } },
            { name: "CreatedDate", dateTime: { format: "dateTime" } },
            { name: "LastModified", dateTime: { format: "dateTime" } },
            { name: "Status", choice: { choices: ["in_progress", "complete", "deleted"] } },
        ];
    }

    /**
     * סכמת עמודות ל-QuestionnaireResults list
     */
    _getQuestionnaireResultsSchema() {
        return [
            { name: "SessionId", text: {} },
            { name: "QuestionnaireName", text: {} },
            { name: "Scores", text: { allowMultipleLines: true, maxLength: 50000 } },
            { name: "CompletedDate", dateTime: { format: "dateTime" } },
            { name: "TherapistEmail", text: {} },
        ];
    }

    /**
     * יצירת ראשי תיבות משם (לפרטיות - לא שומרים שם מלא)
     */
    _getInitials(name) {
        if (!name) return "??";
        return name.split(" ").map(n => n.charAt(0)).join("").substring(0, 3);
    }

    /**
     * יצירת Session ID ייחודי
     */
    _generateSessionId() {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const random = Math.random().toString(36).substring(2, 8);
        return `SES-${date}-${random}`;
    }
}
