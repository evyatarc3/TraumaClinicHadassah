/**
 * Microsoft Entra ID (Azure AD) Authentication Configuration
 *
 * קובץ קונפיגורציה לאימות Microsoft עבור מערכת שאלוני טראומה - הדסה
 *
 * הערה: הערכים כאן הם placeholders - יש להחליף אותם בערכים האמיתיים
 * לאחר רישום האפליקציה ב-Azure Portal
 */

const msalConfig = {
    auth: {
        // Application (client) ID - מתקבל לאחר App Registration ב-Azure Portal
        clientId: "YOUR_CLIENT_ID_HERE", // e.g., "a1b2c3d4-e5f6-7890-abcd-ef1234567890"

        // Azure AD Tenant - מגביל התחברות רק למשתמשי הארגון
        // אפשרות 1: Tenant ID ספציפי (מומלץ - הכי מאובטח)
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID_HERE",

        // אפשרות 2: שם הדומיין של הארגון
        // authority: "https://login.microsoftonline.com/hadassah.org.il",

        // URL שאליו Microsoft מחזיר אחרי התחברות
        redirectUri: "https://YOUR_APP_URL/index.html",

        // URL שאליו Microsoft מחזיר אחרי התנתקות
        postLogoutRedirectUri: "https://YOUR_APP_URL/index.html",

        // ניווט להתחברות באותו חלון (לא popup)
        navigateToLoginRequestUrl: true,
    },
    cache: {
        // שמירת Token ב-sessionStorage - נמחק בסגירת הדפדפן (יותר מאובטח)
        cacheLocation: "sessionStorage",

        // מניעת מתקפות CSRF
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            logLevel: 3, // Warning level בלבד ב-production
            piiLoggingEnabled: false, // חשוב! לא לרשום מידע אישי ללוגים
        }
    }
};

/**
 * הרשאות (Scopes) שהאפליקציה מבקשת מ-Microsoft Graph
 * עקרון המינימום - רק מה שנדרש
 */
const loginRequest = {
    scopes: [
        "User.Read",           // קריאת פרופיל המשתמש המחובר
        "Sites.ReadWrite.All", // גישה ל-SharePoint לשמירת/קריאת נתונים
    ]
};

/**
 * הרשאות נוספות לגישה ל-SharePoint (נדרשות בעת גישה לנתונים)
 */
const graphScopes = {
    sharepoint: {
        scopes: ["Sites.ReadWrite.All"]
    },
    userProfile: {
        scopes: ["User.Read"]
    },
    groupMembership: {
        scopes: ["GroupMember.Read.All"]
    }
};

/**
 * קונפיגורציה של SharePoint Site לאחסון נתונים
 */
const sharepointConfig = {
    // שם ה-SharePoint Site שיכיל את הנתונים
    siteName: "TraumaClinicData",

    // רשימות (Lists) לאחסון נתונים
    lists: {
        patientSessions: "PatientSessions",
        questionnaireResults: "QuestionnaireResults"
    },

    // SharePoint Site ID - ימולא אוטומטית בהתחברות ראשונה
    siteId: null,
};

/**
 * קונפיגורציה של קבוצת האבטחה (Security Group)
 * רק חברי הקבוצה הזו יכולים לגשת לאפליקציה
 */
const securityConfig = {
    // Object ID של קבוצת Azure AD "TraumaClinicTherapists"
    authorizedGroupId: "YOUR_GROUP_ID_HERE",

    // שם הקבוצה (לתצוגה)
    authorizedGroupName: "TraumaClinicTherapists",

    // זמן מקסימלי ל-session (בדקות)
    sessionTimeoutMinutes: 480, // 8 שעות

    // האם לדרוש MFA
    requireMFA: true,
};
