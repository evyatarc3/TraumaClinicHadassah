/**
 * Microsoft Authentication Service
 *
 * שירות אימות מול Microsoft Entra ID (Azure AD)
 * משתמש ב-MSAL.js v2 לניהול התחברות, tokens, והרשאות
 *
 * תלויות: msal-browser v2.x (CDN: https://alcdn.msauth.net/browser/2.38.0/js/msal-browser.min.js)
 */

class AuthService {
    constructor() {
        this.msalInstance = null;
        this.currentUser = null;
        this.isInitialized = false;
        this._sessionTimer = null;
        this._onSessionExpired = null; // callback
        this._onAuthStateChanged = null; // callback
    }

    /**
     * אתחול MSAL
     * @param {Object} options
     * @param {Function} options.onSessionExpired - callback כשה-session פג
     * @param {Function} options.onAuthStateChanged - callback כשמצב האימות משתנה
     */
    async initialize(options = {}) {
        this._onSessionExpired = options.onSessionExpired || null;
        this._onAuthStateChanged = options.onAuthStateChanged || null;

        try {
            this.msalInstance = new msal.PublicClientApplication(msalConfig);
            await this.msalInstance.initialize();

            // טיפול ב-redirect חזרה מ-Microsoft login
            const response = await this.msalInstance.handleRedirectPromise();
            if (response) {
                this.currentUser = response.account;
                this.msalInstance.setActiveAccount(response.account);
            }

            // בדיקה אם יש session קיים
            const accounts = this.msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                this.currentUser = accounts[0];
                this.msalInstance.setActiveAccount(accounts[0]);
            }

            this.isInitialized = true;

            // הפעלת טיימר session timeout
            if (this.currentUser) {
                this._startSessionTimer();
            }

            if (this._onAuthStateChanged) {
                this._onAuthStateChanged(this.currentUser ? 'authenticated' : 'unauthenticated');
            }

            return this.currentUser;
        } catch (error) {
            console.error("AuthService: שגיאה באתחול:", error);
            if (this._onAuthStateChanged) {
                this._onAuthStateChanged('error', error);
            }
            throw error;
        }
    }

    /**
     * התחברות - מפנה את המשתמש לדף כניסה של Microsoft
     * @param {string} loginHint - אימייל לזיהוי מהיר (אופציונלי)
     */
    async login(loginHint) {
        try {
            const request = { ...loginRequest };
            if (loginHint) {
                request.loginHint = loginHint;
            }
            await this.msalInstance.loginRedirect(request);
        } catch (error) {
            console.error("AuthService: שגיאה בהתחברות:", error);
            throw error;
        }
    }

    /**
     * התנתקות - מנקה tokens ומפנה לדף כניסה
     */
    async logout() {
        this._stopSessionTimer();
        try {
            const account = this.currentUser;
            this.currentUser = null;

            if (this._onAuthStateChanged) {
                this._onAuthStateChanged('unauthenticated');
            }

            await this.msalInstance.logoutRedirect({
                account: account,
                postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
            });
        } catch (error) {
            console.error("AuthService: שגיאה בהתנתקות:", error);
            // גם אם ה-redirect נכשל, ניקינו את ה-state המקומי
            throw error;
        }
    }

    /**
     * בדיקה האם המשתמש מחובר
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * קבלת פרטי המשתמש המחובר
     */
    getCurrentUser() {
        if (!this.currentUser) return null;
        return {
            name: this.currentUser.name,
            email: this.currentUser.username,
            tenantId: this.currentUser.tenantId,
            localAccountId: this.currentUser.localAccountId,
        };
    }

    /**
     * קבלת Access Token לגישה ל-Graph API
     * Token מתרענן אוטומטית אם פג תוקפו
     * כולל retry logic עם exponential backoff
     *
     * @param {string[]} scopes - הרשאות נדרשות
     * @param {number} retries - מספר ניסיונות חוזרים
     */
    async getAccessToken(scopes, retries = 2) {
        if (!this.currentUser) {
            throw new Error("המשתמש לא מחובר");
        }

        const tokenRequest = {
            scopes: scopes || loginRequest.scopes,
            account: this.currentUser,
        };

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await this.msalInstance.acquireTokenSilent(tokenRequest);
                // חידוש טיימר - המשתמש עדיין פעיל
                this._resetSessionTimer();
                return response.accessToken;
            } catch (error) {
                if (error instanceof msal.InteractionRequiredAuthError) {
                    // Token פג לגמרי - צריך התחברות מחדש
                    if (this._onAuthStateChanged) {
                        this._onAuthStateChanged('token_expired');
                    }
                    await this.msalInstance.acquireTokenRedirect(tokenRequest);
                    return; // הדפדפן מופנה, לא נגיע לכאן
                }

                // שגיאת רשת - ניסיון חוזר
                if (attempt < retries) {
                    const delay = Math.pow(2, attempt) * 1000; // 1s, 2s
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }

                throw error;
            }
        }
    }

    /**
     * בדיקה האם המשתמש חבר בקבוצת המטפלים המורשית
     * שכבת הגנה נוספת מעבר ל-App Assignment
     *
     * @returns {Object} { authorized: boolean, groups: string[] }
     */
    async verifyGroupMembership() {
        try {
            const token = await this.getAccessToken(graphScopes.groupMembership.scopes);

            const response = await fetch("https://graph.microsoft.com/v1.0/me/memberOf", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`שגיאה בבדיקת הרשאות: ${response.status}`);
            }

            const data = await response.json();
            const groups = data.value
                .filter(item => item["@odata.type"] === "#microsoft.graph.group")
                .map(g => ({ id: g.id, name: g.displayName }));

            const isAuthorized = groups.some(
                group => group.id === securityConfig.authorizedGroupId
            );

            if (!isAuthorized) {
                console.warn("AuthService: משתמש לא חבר בקבוצה המורשית");
                if (this._onAuthStateChanged) {
                    this._onAuthStateChanged('unauthorized');
                }
            }

            return { authorized: isAuthorized, groups };
        } catch (error) {
            console.error("AuthService: שגיאה בבדיקת חברות:", error);
            throw error;
        }
    }

    /**
     * קבלת פרופיל מורחב מ-Graph API
     */
    async getUserProfile() {
        try {
            const token = await this.getAccessToken(graphScopes.userProfile.scopes);

            const response = await fetch("https://graph.microsoft.com/v1.0/me?$select=displayName,mail,jobTitle,department,officeLocation", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("שגיאה בקריאת פרופיל משתמש");
            }

            return await response.json();
        } catch (error) {
            console.error("AuthService: שגיאה בקבלת פרופיל:", error);
            throw error;
        }
    }

    // =========================================================================
    //  Session Timeout Management
    // =========================================================================

    _startSessionTimer() {
        this._stopSessionTimer();
        const timeoutMs = securityConfig.sessionTimeoutMinutes * 60 * 1000;
        this._sessionTimer = setTimeout(() => {
            if (this._onSessionExpired) {
                this._onSessionExpired();
            }
            this.logout();
        }, timeoutMs);
    }

    _resetSessionTimer() {
        if (this.currentUser) {
            this._startSessionTimer();
        }
    }

    _stopSessionTimer() {
        if (this._sessionTimer) {
            clearTimeout(this._sessionTimer);
            this._sessionTimer = null;
        }
    }
}

// Singleton instance
const authService = new AuthService();
