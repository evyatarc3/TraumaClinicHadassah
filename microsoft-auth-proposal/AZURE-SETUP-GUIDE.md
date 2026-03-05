# מדריך הגדרת Azure - צעד אחר צעד
# עבור צוות IT ואבטחת מידע

---

## שלב 1: רישום האפליקציה (App Registration)

### 1.1 כניסה ל-Azure Portal
1. היכנסו ל-https://portal.azure.com עם חשבון Global Admin או Application Admin
2. חפשו "App registrations" (או "רישומי אפליקציות")
3. לחצו "New registration"

### 1.2 פרטי הרישום
```
Name:                    Hadassah Trauma Clinic Assessment
Supported account types: Accounts in this organizational directory only
                         (Single tenant - הדסה בלבד)
Redirect URI:
  Platform:  Single-page application (SPA)
  URL:       https://YOUR_HOSTING_URL/index.html
```

### 1.3 לאחר הרישום - שמרו את הערכים הבאים:
- **Application (client) ID**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Directory (tenant) ID**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

## שלב 2: הגדרת הרשאות API

### 2.1 הוספת הרשאות
1. בתפריט האפליקציה, לחצו "API permissions"
2. לחצו "Add a permission"
3. בחרו "Microsoft Graph"
4. בחרו "Delegated permissions"
5. הוסיפו את ההרשאות הבאות:

| הרשאה | סוג | מטרה |
|--------|------|-------|
| `User.Read` | Delegated | קריאת פרופיל המשתמש המחובר |
| `Sites.ReadWrite.All` | Delegated | שמירה/קריאה של נתונים ב-SharePoint |
| `GroupMember.Read.All` | Delegated | בדיקת חברות בקבוצת המטפלים |

### 2.2 אישור Admin Consent
- לחצו "Grant admin consent for [Organization]"
- אשרו את ההרשאות

> **הערה אבטחתית**: ההרשאות הן מסוג Delegated בלבד - כלומר האפליקציה
> פועלת בהקשר של המשתמש המחובר בלבד, ולא יכולה לגשת לנתונים
> של משתמשים אחרים ללא הרשאתם.

---

## שלב 3: הגדרת Authentication

### 3.1 Platform Configuration
1. בתפריט האפליקציה, לחצו "Authentication"
2. תחת "Single-page application", ודאו שה-Redirect URI מוגדר נכון
3. הגדירו:

```
Implicit grant and hybrid flows:
  ☐ Access tokens    (לא מסומן - לא נדרש עם PKCE)
  ☐ ID tokens        (לא מסומן - לא נדרש עם PKCE)

Supported account types:
  ● Accounts in this organizational directory only

Allow public client flows:
  No
```

### 3.2 הגדרת Redirect URIs
```
Type: SPA
URIs:
  - https://YOUR_PRODUCTION_URL/index.html
  - http://localhost:3000/index.html   (לפיתוח בלבד - להסיר ב-production)
```

---

## שלב 4: יצירת Security Group

### 4.1 יצירת קבוצה
1. ב-Azure Portal, חפשו "Azure Active Directory" → "Groups"
2. לחצו "New group"

```
Group type:    Security
Group name:    TraumaClinicTherapists
Description:   מטפלי קליניקת הטראומה - גישה למערכת השאלונים
Membership:    Assigned (לא Dynamic - שליטה ידנית מלאה)
```

### 4.2 הוספת חברים
- הוסיפו את כל המטפלים המורשים לקבוצה
- שמרו את ה-Group Object ID: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### 4.3 הגבלת גישה לאפליקציה לחברי הקבוצה בלבד
1. חזרו ל-"Enterprise applications" ← בחרו את האפליקציה
2. לחצו "Properties"
3. הגדירו:
```
Assignment required?  Yes    ← חשוב! רק משתמשים שהוקצו יכולים להתחבר
Visible to users?     Yes
```
4. לחצו "Users and groups" → "Add user/group"
5. הוסיפו את הקבוצה "TraumaClinicTherapists"

---

## שלב 5: הגדרת SharePoint Site

### 5.1 יצירת Site
1. היכנסו ל-SharePoint Admin Center
2. צרו Team Site חדש:
```
Site name:    TraumaClinicData
Privacy:      Private
Owner:        מנהל IT הקליניקה
Members:      קבוצת TraumaClinicTherapists
```

### 5.2 הגדרת הרשאות Site
- רק חברי הקבוצה TraumaClinicTherapists יכולים לגשת
- הסירו הרשאות ברירת מחדל של "Everyone" / "All Users"
- ודאו שאין שיתוף חיצוני (External Sharing = Off)

---

## שלב 6: Conditional Access (אופציונלי - מומלץ)

### 6.1 יצירת מדיניות גישה מותנית
1. Azure Portal → "Conditional Access" → "New policy"

```
Name:           TraumaClinic - Secure Access

Users:          Include: TraumaClinicTherapists group
Cloud apps:     Include: Hadassah Trauma Clinic Assessment

Conditions:
  Locations:    (אופציונלי) הגבלה לרשת בית החולים
  Devices:      (אופציונלי) רק מכשירים מנוהלים

Grant:
  ● Grant access
  ☑ Require multi-factor authentication
  ☑ Require device to be marked as compliant  (אופציונלי)

Session:
  Sign-in frequency: 8 hours
```

---

## שלב 7: עדכון הקונפיגורציה באפליקציה

לאחר השלמת כל השלבים, עדכנו את הקובץ `auth-config.js`:

```javascript
const msalConfig = {
    auth: {
        clientId: "THE_CLIENT_ID_FROM_STEP_1",
        authority: "https://login.microsoftonline.com/THE_TENANT_ID_FROM_STEP_1",
        redirectUri: "https://YOUR_PRODUCTION_URL/index.html",
    },
    // ... rest stays the same
};

const securityConfig = {
    authorizedGroupId: "THE_GROUP_ID_FROM_STEP_4",
    // ... rest stays the same
};
```

---

## שלב 8: בדיקות

### רשימת בדיקות לפני עלייה לאוויר:

- [ ] משתמש מורשה (חבר בקבוצה) - מצליח להתחבר
- [ ] משתמש לא מורשה (לא חבר בקבוצה) - נחסם
- [ ] משתמש מארגון אחר - נחסם
- [ ] חשבון Microsoft אישי (gmail/outlook.com) - נחסם
- [ ] Token פג תוקף - מתרענן אוטומטית או מפנה להתחברות מחדש
- [ ] נתונים נשמרים ב-SharePoint בהצלחה
- [ ] מטפל רואה רק את ה-sessions שלו
- [ ] התנתקות מוחקת token מהדפדפן
- [ ] MFA עובד (אם הוגדר)
- [ ] Audit logs מתעדים התחברויות

---

## מידע ליצירת קשר ותמיכה

- **Microsoft Azure Support**: https://portal.azure.com/#blade/Microsoft_Azure_Support
- **MSAL.js Documentation**: https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications
- **Graph API Explorer**: https://developer.microsoft.com/en-us/graph/graph-explorer

---

## הערות אבטחה חשובות

1. **אין סודות בקוד**: האפליקציה היא SPA - לא מכילה client secrets. האימות מבוסס על PKCE flow שהוא מאובטח ל-public clients.

2. **Tenant Lock**: רק משתמשים מה-Tenant הארגוני של הדסה יכולים להתחבר. חשבונות אישיים או מארגונים אחרים נחסמים ברמת Azure AD.

3. **Token Storage**: Tokens נשמרים ב-`sessionStorage` (לא `localStorage`). נמחקים אוטומטית בסגירת הדפדפן.

4. **No Backend Required**: האפליקציה מתקשרת ישירות עם Microsoft Graph. אין שרת backend שצריך לאבטח.

5. **Data Encryption**: כל הנתונים ב-SharePoint Online מוצפנים at-rest (AES-256) ו-in-transit (TLS 1.2+) ע"י Microsoft.

6. **Audit Trail**: כל התחברות וכל גישה לנתונים מתועדת אוטומטית ב-Azure AD Audit Logs וב-SharePoint Audit Logs.
