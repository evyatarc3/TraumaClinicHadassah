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
    }

    /**
     * אתחול MSAL
     * יש לקרוא לפונקציה זו בטעינת האפליקציה
     */
    async initialize() {
        try {
            this.msalInstance = new msal.PublicClientApplication(msalConfig);
            await this.msalInstance.initialize();

            // טיפול ב-redirect חזרה מ-Microsoft login
            const response = await this.msalInstance.handleRedirectPromise();
            if (response) {
                this.currentUser = response.account;
            }

            // בדיקה אם יש session קיים
            const accounts = this.msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                this.currentUser = accounts[0];
            }

            this.isInitialized = true;
            return this.currentUser;
        } catch (error) {
            console.error("שגיאה באתחול אימות:", error);
            throw error;
        }
    }

    /**
     * התחברות - מפנה את המשתמש לדף כניסה של Microsoft
     */
    async login() {
        try {
            // שימוש ב-redirect (לא popup) - עובד טוב יותר במובייל ובסביבות מוגבלות
            await this.msalInstance.loginRedirect(loginRequest);
        } catch (error) {
            console.error("שגיאה בהתחברות:", error);
            throw error;
        }
    }

    /**
     * התנתקות
     */
    async logout() {
        try {
            await this.msalInstance.logoutRedirect({
                account: this.currentUser,
                postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
            });
        } catch (error) {
            console.error("שגיאה בהתנתקות:", error);
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
        };
    }

    /**
     * קבלת Access Token לגישה ל-Graph API
     * Token מתרענן אוטומטית אם פג תוקפו
     */
    async getAccessToken(scopes) {
        if (!this.currentUser) {
            throw new Error("המשתמש לא מחובר");
        }

        const tokenRequest = {
            scopes: scopes || loginRequest.scopes,
            account: this.currentUser,
        };

        try {
            // ניסיון שקט לקבל token (מה-cache)
            const response = await this.msalInstance.acquireTokenSilent(tokenRequest);
            return response.accessToken;
        } catch (error) {
            // אם נכשל (token פג) - מפנה לדף כניסה מחדש
            if (error instanceof msal.InteractionRequiredAuthError) {
                await this.msalInstance.acquireTokenRedirect(tokenRequest);
            }
            throw error;
        }
    }

    /**
     * בדיקה האם המשתמש חבר בקבוצת המטפלים המורשית
     * שכבת הגנה נוספת מעבר ל-App Assignment
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
                throw new Error("שגיאה בבדיקת הרשאות קבוצה");
            }

            const data = await response.json();
            const groups = data.value.filter(item => item["@odata.type"] === "#microsoft.graph.group");

            const isAuthorized = groups.some(
                group => group.id === securityConfig.authorizedGroupId
            );

            if (!isAuthorized) {
                console.warn("משתמש לא מורשה - לא חבר בקבוצת המטפלים");
                await this.logout();
                return false;
            }

            return true;
        } catch (error) {
            console.error("שגיאה בבדיקת חברות בקבוצה:", error);
            throw error;
        }
    }

    /**
     * קבלת פרופיל המשתמש מ-Graph API (כולל תמונה, תפקיד וכו')
     */
    async getUserProfile() {
        try {
            const token = await this.getAccessToken(graphScopes.userProfile.scopes);

            const response = await fetch("https://graph.microsoft.com/v1.0/me", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("שגיאה בקריאת פרופיל משתמש");
            }

            return await response.json();
        } catch (error) {
            console.error("שגיאה בקבלת פרופיל:", error);
            throw error;
        }
    }
}

// Singleton instance
const authService = new AuthService();
