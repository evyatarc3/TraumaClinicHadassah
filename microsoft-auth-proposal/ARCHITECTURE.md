# הצעת ארכיטקטורה: אימות Microsoft ואחסון ענן
# מערכת שאלוני טראומה - קליניקת הדסה

## תאריך: מרץ 2026
## סטטוס: טיוטה לאישור אבטחת מידע

---

## 1. סקירת המצב הנוכחי

| פרמטר | מצב נוכחי | מצב מוצע |
|--------|-----------|-----------|
| אימות | סיסמאות hardcoded בקוד | Microsoft Entra ID (Azure AD) |
| אחסון נתונים | localStorage בדפדפן | SharePoint Lists via Graph API |
| תוקף נתונים | 24 שעות | ללא הגבלה (ענן) |
| הצפנה | אין | TLS 1.2+ in-transit, AES-256 at-rest |
| גיבוי | אין | Microsoft 365 built-in redundancy |
| ביקורת (Audit) | אין | Azure AD Audit Logs + Graph API logs |
| MFA | אין | נתמך דרך Entra ID |
| הרשאות | כל מי שיודע את הסיסמה | רק משתמשים מורשים ב-Azure AD Group |

---

## 2. ארכיטקטורה מוצעת

```
┌─────────────────────────────────────────────────────────┐
│                    דפדפן המטפל                           │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         React Application (index.html)            │  │
│  │                                                   │  │
│  │  ┌─────────────┐     ┌─────────────────────────┐ │  │
│  │  │  MSAL.js 2  │────▶│  Microsoft Entra ID     │ │  │
│  │  │  (Browser)  │◀────│  (Authentication)       │ │  │
│  │  └─────────────┘     └─────────────────────────┘ │  │
│  │         │                                         │  │
│  │         │ Access Token                            │  │
│  │         ▼                                         │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │         Microsoft Graph API                  │ │  │
│  │  │                                              │ │  │
│  │  │  ┌──────────────┐  ┌─────────────────────┐  │ │  │
│  │  │  │  SharePoint  │  │  Azure AD Groups    │  │ │  │
│  │  │  │  Lists       │  │  (Authorization)    │  │ │  │
│  │  │  │  (נתוני      │  │                     │  │ │  │
│  │  │  │  מטופלים)    │  │  קבוצה:             │  │ │  │
│  │  │  │              │  │  "TraumaClinic       │  │ │  │
│  │  │  │              │  │   Therapists"        │  │ │  │
│  │  │  └──────────────┘  └─────────────────────┘  │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### זרימת אימות (Authentication Flow)

```
מטפל פותח אפליקציה
        │
        ▼
  ┌──────────────┐
  │ MSAL.js בודק │───── יש Token תקף? ──── כן ───▶ כניסה לאפליקציה
  │ אם מחובר    │                                        │
  └──────────────┘                                        │
        │ לא                                              │
        ▼                                                 │
  ┌──────────────────┐                                    │
  │ הפניה לדף כניסה  │                                    │
  │ של Microsoft     │                                    │
  │ (login.microsoft │                                    │
  │  online.com)     │                                    │
  └──────────────────┘                                    │
        │                                                 │
        ▼                                                 │
  ┌──────────────────┐                                    │
  │ משתמש מזין       │                                    │
  │ username+password │                                    │
  │ + MFA (אם מוגדר) │                                    │
  └──────────────────┘                                    │
        │                                                 │
        ▼                                                 │
  ┌──────────────────┐                                    │
  │ Entra ID בודק:   │                                    │
  │ 1. משתמש תקף?    │── לא ──▶ שגיאה: "אין הרשאה"       │
  │ 2. בקבוצה        │                                    │
  │    TraumaClinic? │                                    │
  └──────────────────┘                                    │
        │ כן                                              │
        ▼                                                 │
  ┌──────────────────┐                                    │
  │ Token מוחזר      │                                    │
  │ לאפליקציה       │───────────────────────────────────▶│
  └──────────────────┘                                    │
                                                          ▼
                                                  ┌──────────────┐
                                                  │ Graph API    │
                                                  │ calls עם     │
                                                  │ Access Token │
                                                  └──────────────┘
```

---

## 3. אבטחת מידע - פירוט

### 3.1 אימות (Authentication)
- **פרוטוקול**: OAuth 2.0 + OpenID Connect
- **ספריית לקוח**: MSAL.js v2 (Microsoft Authentication Library)
- **סוג זרימה**: Authorization Code Flow with PKCE (מומלץ ע"י Microsoft לאפליקציות SPA)
- **Token**: JWT עם חתימה דיגיטלית, תוקף 1 שעה, רענון אוטומטי

### 3.2 הרשאות (Authorization)
- **Azure AD Security Group**: רק חברי הקבוצה "TraumaClinicTherapists" יכולים להתחבר
- **App Assignment Required**: מוגדר `true` - רק משתמשים שהוקצו לאפליקציה יכולים לגשת
- **Graph API Scopes**: הרשאות מינימליות בלבד:
  - `User.Read` - קריאת פרופיל המשתמש המחובר
  - `Sites.ReadWrite.All` - גישה ל-SharePoint site ספציפי
  - `GroupMember.Read.All` - בדיקת חברות בקבוצה

### 3.3 הצפנה
- **In Transit**: TLS 1.2+ (מובנה ב-Microsoft 365)
- **At Rest**: AES-256 (מובנה ב-SharePoint Online)
- **נתונים רגישים בדפדפן**: מאוחסנים ב-sessionStorage בלבד (נמחק בסגירת חלון)

### 3.4 מבנה הנתונים ב-SharePoint

```
SharePoint Site: "TraumaClinicData"
│
├── List: "PatientSessions"
│   ├── SessionId (unique)
│   ├── PatientInitials (ראשי תיבות בלבד - לא שם מלא)
│   ├── PatientAge
│   ├── TherapistEmail (מי יצר)
│   ├── CreatedDate
│   ├── LastModified
│   └── SessionData (JSON - מוצפן)
│
├── List: "QuestionnaireResults"
│   ├── SessionId (FK)
│   ├── QuestionnaireName
│   ├── Scores (JSON)
│   ├── CompletedDate
│   └── TherapistEmail
│
└── Permissions:
    └── Access: "TraumaClinicTherapists" group only
```

### 3.5 ביקורת ולוגים (Audit)
- **Azure AD Sign-in Logs**: כל התחברות מתועדת
- **SharePoint Audit Logs**: כל גישה/שינוי לנתונים מתועד
- **Unified Audit Log**: מרכז את כל הלוגים ב-Microsoft 365

### 3.6 מדיניות גישה מותנית (Conditional Access) - אופציונלי
- חסימת גישה מחוץ לרשת בית החולים
- דרישת MFA
- חסימת גישה ממכשירים לא מנוהלים
- הגבלת session time

---

## 4. תאימות רגולטורית

| תקן | סטטוס |
|------|--------|
| חוק הגנת הפרטיות (ישראל) | Microsoft 365 תומך באחסון נתונים באזור EU (קרוב לישראל) |
| HIPAA | Microsoft 365 הוא HIPAA compliant עם BAA |
| SOC 2 Type II | Microsoft 365 certified |
| ISO 27001 | Microsoft 365 certified |
| GDPR | Microsoft 365 compliant |

---

## 5. דרישות מוקדמות מצד בית החולים

1. **Azure AD Tenant** - ככל הנראה קיים אם הדסה משתמשים ב-Microsoft 365
2. **הרשאת Global Admin או Application Admin** - לרישום האפליקציה
3. **SharePoint Online license** - בדרך כלל כלול ב-Microsoft 365
4. **הגדרת Security Group** - עם המטפלים המורשים
5. **אישור IT** - לרישום App Registration חדש

---

## 6. סיכום שינויים באפליקציה

| רכיב | שינוי |
|-------|--------|
| Login Page | מוחלף ב-Microsoft Sign-In button |
| Data Save | `localStorage` → Graph API → SharePoint |
| Data Load | `localStorage` → Graph API → SharePoint |
| Session Management | Token-based via MSAL.js |
| Export Excel | ללא שינוי (ממשיך לעבוד כרגיל) |
| שאלונים | ללא שינוי |
| ניקוד ותוצאות | ללא שינוי |

**הערה חשובה**: השאלונים, הניקוד, וכל הלוגיקה הקלינית נשארים ללא שינוי.
רק שכבת האימות ושכבת האחסון משתנות.
