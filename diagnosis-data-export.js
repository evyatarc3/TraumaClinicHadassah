/**
 * Diagnosis Data Export
 * ====================
 * ICD-10 F-Codes + DSM-5 Diagnostic Criteria
 * 
 * מאגר אבחנות: קודי F לפי ICD-10 + אבחנות DSM-5 עם קריטריונים אבחנתיים מלאים
 * 
 * Usage / שימוש:
 * 
 * ES Module:
 *   import { F_CODES_DATA, DSM5_CODES_DATA } from './diagnosis-data-export.js';
 * 
 * CommonJS:
 *   const { F_CODES_DATA, DSM5_CODES_DATA } = require('./diagnosis-data-export');
 * 
 * Script Tag (browser):
 *   <script src="diagnosis-data-export.js"></script>
 *   // Then use window.F_CODES_DATA and window.DSM5_CODES_DATA
 * 
 * ===== DATA STRUCTURES =====
 * 
 * F_CODES_DATA: Array<{
 *   category: string,              // "F00-F09: הפרעות נפשיות אורגניות"
 *   dsm: string,                   // DSM-5 chapter mapping
 *   items: Array<{
 *     code: string,                // "F32.0"
 *     label: string,               // "Mild depressive episode - אפיזודה דיכאונית קלה"
 *     dsm: string                  // "Major Depressive Disorder, Single Episode, Mild"
 *   }>
 * }>
 * 
 * DSM5_CODES_DATA: Array<{
 *   chapter: string,               // "Depressive Disorders - הפרעות דיכאון"
 *   diagnoses: Array<{
 *     code: string,                // "296.2x/296.3x"
 *     name: string,                // "Major Depressive Disorder"
 *     nameHe: string,              // "הפרעת דיכאון מג'ורית"
 *     icd10: string,               // "F32/F33"
 *     criteria: Array<{
 *       id: string,                // "A"
 *       text: string               // Full criterion text
 *     }>,
 *     specifiers: string[]         // ["Mild", "Moderate", "Severe", ...]
 *   }>
 * }>
 */

// =============================================
// ICD-10 F-Codes Data - קודי F לפי ICD-10
// =============================================

const F_CODES_DATA = [
  {
    category: "F00-F09: הפרעות נפשיות אורגניות",
    dsm: "Neurocognitive Disorders (DSM-5) / Dementia, Delirium, Amnestic Disorders",
    items: [
      { code: "F00.0", label: "Dementia in Alzheimer's disease with early onset - שיטיון באלצהיימר, התחלה מוקדמת", dsm: "Major Neurocognitive Disorder Due to Alzheimer's Disease" },
      { code: "F00.1", label: "Dementia in Alzheimer's disease with late onset - שיטיון באלצהיימר, התחלה מאוחרת", dsm: "Major Neurocognitive Disorder Due to Alzheimer's Disease" },
      { code: "F00.2", label: "Dementia in Alzheimer's disease, atypical or mixed - שיטיון באלצהיימר, לא טיפוסי או מעורב", dsm: "Major Neurocognitive Disorder Due to Alzheimer's Disease" },
      { code: "F00.9", label: "Dementia in Alzheimer's disease, unspecified - שיטיון באלצהיימר, לא מסווג", dsm: "Major Neurocognitive Disorder Due to Alzheimer's Disease" },
      { code: "F01.0", label: "Vascular dementia of acute onset - שיטיון וסקולרי חריף", dsm: "Major Vascular Neurocognitive Disorder" },
      { code: "F01.1", label: "Multi-infarct dementia - שיטיון מולטי-אינפרקט", dsm: "Major Vascular Neurocognitive Disorder" },
      { code: "F01.2", label: "Subcortical vascular dementia - שיטיון וסקולרי תת-קורטיקלי", dsm: "Major Vascular Neurocognitive Disorder" },
      { code: "F01.3", label: "Mixed cortical and subcortical vascular dementia - שיטיון וסקולרי מעורב קורטיקלי ותת-קורטיקלי", dsm: "Major Vascular Neurocognitive Disorder" },
      { code: "F01.8", label: "Other vascular dementia - שיטיון וסקולרי אחר", dsm: "Major Vascular Neurocognitive Disorder" },
      { code: "F01.9", label: "Vascular dementia, unspecified - שיטיון וסקולרי לא מסווג", dsm: "Major Vascular Neurocognitive Disorder" },
      { code: "F02.0", label: "Dementia in Pick's disease - שיטיון במחלת פיק", dsm: "Major Neurocognitive Disorder Due to Frontotemporal Degeneration" },
      { code: "F02.1", label: "Dementia in Creutzfeldt-Jakob disease - שיטיון בקרויצפלד-יעקב", dsm: "Major Neurocognitive Disorder Due to Prion Disease" },
      { code: "F02.2", label: "Dementia in Huntington's disease - שיטיון במחלת הנטינגטון", dsm: "Major Neurocognitive Disorder Due to Huntington's Disease" },
      { code: "F02.3", label: "Dementia in Parkinson's disease - שיטיון בפרקינסון", dsm: "Major Neurocognitive Disorder Due to Parkinson's Disease" },
      { code: "F02.4", label: "Dementia in HIV disease - שיטיון במחלת HIV", dsm: "Major Neurocognitive Disorder Due to HIV Infection" },
      { code: "F02.8", label: "Dementia in other specified diseases - שיטיון במחלות אחרות מסווגות", dsm: "Major Neurocognitive Disorder Due to Another Medical Condition" },
      { code: "F03", label: "Unspecified dementia - שיטיון לא מסווג", dsm: "Unspecified Neurocognitive Disorder" },
      { code: "F04", label: "Organic amnesic syndrome - תסמונת שיכחה אורגנית", dsm: "Amnestic Disorder Due to Another Medical Condition" },
      { code: "F05.0", label: "Delirium not superimposed on dementia - דליריום ללא שיטיון", dsm: "Delirium Due to Another Medical Condition" },
      { code: "F05.1", label: "Delirium superimposed on dementia - דליריום על רקע שיטיון", dsm: "Delirium Due to Another Medical Condition" },
      { code: "F05.8", label: "Other delirium - דליריום אחר", dsm: "Other Specified Delirium" },
      { code: "F05.9", label: "Delirium, unspecified - דליריום לא מסווג", dsm: "Unspecified Delirium" },
      { code: "F06.0", label: "Organic hallucinosis - הזיות אורגניות", dsm: "Psychotic Disorder Due to Another Medical Condition" },
      { code: "F06.1", label: "Organic catatonic disorder - הפרעה קטטונית אורגנית", dsm: "Catatonic Disorder Due to Another Medical Condition" },
      { code: "F06.2", label: "Organic delusional [schizophrenia-like] disorder - הפרעת דלוזיות אורגנית", dsm: "Psychotic Disorder Due to Another Medical Condition" },
      { code: "F06.3", label: "Organic mood [affective] disorders - הפרעות מצב רוח אורגניות", dsm: "Depressive/Bipolar Disorder Due to Another Medical Condition" },
      { code: "F06.4", label: "Organic anxiety disorder - חרדה אורגנית", dsm: "Anxiety Disorder Due to Another Medical Condition" },
      { code: "F06.5", label: "Organic dissociative disorder - הפרעה דיסוציאטיבית אורגנית", dsm: "Mental Disorder Due to Another Medical Condition" },
      { code: "F06.6", label: "Organic emotionally labile [asthenic] disorder - הפרעה רגשית לאבילית אורגנית", dsm: "Mental Disorder Due to Another Medical Condition" },
      { code: "F06.7", label: "Mild cognitive disorder - הפרעה קוגניטיבית קלה (MCI)", dsm: "Mild Neurocognitive Disorder" },
      { code: "F06.8", label: "Other specified mental disorders due to brain damage - הפרעות נפשיות אחרות עקב נזק מוחי", dsm: "Other Specified Mental Disorder Due to Another Medical Condition" },
      { code: "F06.9", label: "Unspecified mental disorder due to brain damage - הפרעה נפשית לא מסווגת עקב נזק מוחי", dsm: "Unspecified Mental Disorder Due to Another Medical Condition" },
      { code: "F07.0", label: "Organic personality disorder - הפרעת אישיות אורגנית", dsm: "Personality Change Due to Another Medical Condition" },
      { code: "F07.1", label: "Postencephalitic syndrome - תסמונת פוסט-אנצפליטית", dsm: "Personality Change Due to Another Medical Condition" },
      { code: "F07.2", label: "Postconcussional syndrome - תסמונת לאחר זעזוע מוח", dsm: "Mild Neurocognitive Disorder Due to Traumatic Brain Injury" },
      { code: "F07.8", label: "Other organic personality and behavioural disorders - הפרעות אישיות אורגניות אחרות", dsm: "Personality Change Due to Another Medical Condition" },
      { code: "F07.9", label: "Unspecified organic personality disorder - הפרעת אישיות אורגנית לא מסווגת", dsm: "Personality Change Due to Another Medical Condition" },
      { code: "F09", label: "Unspecified organic or symptomatic mental disorder - הפרעה נפשית אורגנית לא מסווגת", dsm: "Unspecified Mental Disorder Due to Another Medical Condition" }
    ]
  },
  {
    category: "F10-F19: הפרעות נפשיות והתנהגותיות כתוצאה משימוש בחומרים פסיכואקטיביים",
    dsm: "Substance-Related and Addictive Disorders (DSM-5)",
    items: [
      { code: "F10.0", label: "Acute intoxication due to alcohol - שיכרון חריף מאלכוהול", dsm: "Alcohol Intoxication" },
      { code: "F10.1", label: "Harmful use of alcohol - שימוש מזיק באלכוהול", dsm: "Alcohol Use Disorder" },
      { code: "F10.2", label: "Alcohol dependence syndrome - תלות באלכוהול", dsm: "Alcohol Use Disorder, Severe" },
      { code: "F10.3", label: "Alcohol withdrawal state - תסמונת גמילה מאלכוהול", dsm: "Alcohol Withdrawal" },
      { code: "F10.5", label: "Alcohol-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מאלכוהול", dsm: "Alcohol-Induced Psychotic Disorder" },
      { code: "F10.6", label: "Alcohol-induced amnesic syndrome - תסמונת שיכחה הנגרמת מאלכוהול", dsm: "Alcohol-Induced Major Neurocognitive Disorder, Amnestic-Confabulatory Type" },
      { code: "F11.0", label: "Acute intoxication due to opioids - שיכרון חריף מאופיואידים", dsm: "Opioid Intoxication" },
      { code: "F11.1", label: "Harmful use of opioids - שימוש מזיק באופיואידים", dsm: "Opioid Use Disorder" },
      { code: "F11.2", label: "Opioid dependence - תלות באופיואידים", dsm: "Opioid Use Disorder, Severe" },
      { code: "F11.3", label: "Opioid withdrawal state - תסמונת גמילה מאופיואידים", dsm: "Opioid Withdrawal" },
      { code: "F11.5", label: "Opioid-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מאופיואידים", dsm: "Opioid-Induced Psychotic Disorder" },
      { code: "F12.0", label: "Acute intoxication due to cannabinoids - שיכרון חריף מקנאביס", dsm: "Cannabis Intoxication" },
      { code: "F12.1", label: "Harmful use of cannabinoids - שימוש מזיק בקנאביס", dsm: "Cannabis Use Disorder" },
      { code: "F12.2", label: "Cannabis dependence - תלות בקנאביס", dsm: "Cannabis Use Disorder, Severe" },
      { code: "F12.3", label: "Cannabis withdrawal state - תסמונת גמילה מקנאביס", dsm: "Cannabis Withdrawal" },
      { code: "F12.5", label: "Cannabis-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מקנאביס", dsm: "Cannabis-Induced Psychotic Disorder" },
      { code: "F13.0", label: "Acute intoxication due to sedatives/hypnotics - שיכרון חריף מסמי הרגעה/שינה", dsm: "Sedative, Hypnotic, or Anxiolytic Intoxication" },
      { code: "F13.1", label: "Harmful use of sedatives/hypnotics - שימוש מזיק בסמי הרגעה/שינה", dsm: "Sedative, Hypnotic, or Anxiolytic Use Disorder" },
      { code: "F13.2", label: "Sedatives/hypnotics dependence - תלות בסמי הרגעה/שינה", dsm: "Sedative, Hypnotic, or Anxiolytic Use Disorder, Severe" },
      { code: "F13.3", label: "Sedatives/hypnotics withdrawal state - תסמונת גמילה מסמי הרגעה/שינה", dsm: "Sedative, Hypnotic, or Anxiolytic Withdrawal" },
      { code: "F13.5", label: "Sedatives/hypnotics-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מסמי הרגעה", dsm: "Sedative-Induced Psychotic Disorder" },
      { code: "F14.0", label: "Acute intoxication due to cocaine - שיכרון חריף מקוקאין", dsm: "Cocaine Intoxication" },
      { code: "F14.1", label: "Harmful use of cocaine - שימוש מזיק בקוקאין", dsm: "Cocaine Use Disorder" },
      { code: "F14.2", label: "Cocaine dependence - תלות בקוקאין", dsm: "Cocaine Use Disorder, Severe" },
      { code: "F14.3", label: "Cocaine withdrawal state - תסמונת גמילה מקוקאין", dsm: "Cocaine Withdrawal" },
      { code: "F14.5", label: "Cocaine-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מקוקאין", dsm: "Cocaine-Induced Psychotic Disorder" },
      { code: "F15.0", label: "Acute intoxication due to stimulants - שיכרון חריף מחומרים מעוררים", dsm: "Stimulant Intoxication" },
      { code: "F15.1", label: "Harmful use of stimulants - שימוש מזיק בחומרים מעוררים (כולל קפאין)", dsm: "Stimulant Use Disorder" },
      { code: "F15.2", label: "Stimulant dependence - תלות בחומרים מעוררים", dsm: "Stimulant Use Disorder, Severe" },
      { code: "F15.3", label: "Stimulant withdrawal state - תסמונת גמילה מחומרים מעוררים", dsm: "Stimulant Withdrawal" },
      { code: "F15.5", label: "Stimulant-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מחומרים מעוררים", dsm: "Stimulant-Induced Psychotic Disorder" },
      { code: "F16.0", label: "Acute intoxication due to hallucinogens - שיכרון חריף מהלוצינוגנים", dsm: "Phencyclidine/Other Hallucinogen Intoxication" },
      { code: "F16.1", label: "Harmful use of hallucinogens - שימוש מזיק בהלוצינוגנים", dsm: "Phencyclidine/Other Hallucinogen Use Disorder" },
      { code: "F16.2", label: "Hallucinogen dependence - תלות בהלוצינוגנים", dsm: "Phencyclidine/Other Hallucinogen Use Disorder, Severe" },
      { code: "F16.3", label: "Hallucinogen withdrawal state - תסמונת גמילה מהלוצינוגנים", dsm: "Hallucinogen Persisting Perception Disorder" },
      { code: "F16.5", label: "Hallucinogen-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מהלוצינוגנים", dsm: "Hallucinogen-Induced Psychotic Disorder" },
      { code: "F17.1", label: "Harmful use of tobacco - שימוש מזיק בטבק", dsm: "Tobacco Use Disorder" },
      { code: "F17.2", label: "Tobacco dependence - תלות בטבק", dsm: "Tobacco Use Disorder, Severe" },
      { code: "F17.3", label: "Tobacco withdrawal state - תסמונת גמילה מטבק", dsm: "Tobacco Withdrawal" },
      { code: "F18.0", label: "Acute intoxication due to volatile solvents - שיכרון חריף מממיסים נדיפים", dsm: "Inhalant Intoxication" },
      { code: "F18.1", label: "Harmful use of volatile solvents - שימוש מזיק בממיסים נדיפים", dsm: "Inhalant Use Disorder" },
      { code: "F18.2", label: "Volatile solvents dependence - תלות בממיסים נדיפים", dsm: "Inhalant Use Disorder, Severe" },
      { code: "F18.5", label: "Volatile solvents-induced psychotic disorder - הפרעה פסיכוטית הנגרמת מממיסים נדיפים", dsm: "Inhalant-Induced Psychotic Disorder" },
      { code: "F19.0", label: "Acute intoxication due to multiple drugs - שיכרון חריף ממספר סמים", dsm: "Other Substance Intoxication" },
      { code: "F19.1", label: "Harmful use of multiple drugs - שימוש מזיק במספר סמים", dsm: "Other (or Unknown) Substance Use Disorder" },
      { code: "F19.2", label: "Multiple drug dependence - תלות במספר סמים", dsm: "Other (or Unknown) Substance Use Disorder, Severe" },
      { code: "F19.3", label: "Multiple drug withdrawal state - תסמונת גמילה ממספר סמים", dsm: "Other (or Unknown) Substance Withdrawal" },
      { code: "F19.5", label: "Multiple drug-induced psychotic disorder - הפרעה פסיכוטית הנגרמת ממספר סמים", dsm: "Other Substance-Induced Psychotic Disorder" }
    ]
  },
  {
    category: "F20-F29: סכיזופרניה, הפרעות סכיזוטיפוליות ודלוזיונליות",
    dsm: "Schizophrenia Spectrum and Other Psychotic Disorders (DSM-5)",
    items: [
      { code: "F20.0", label: "Paranoid schizophrenia - סכיזופרניה פרנואידית", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.1", label: "Hebephrenic schizophrenia - סכיזופרניה הבפרנית (דיסאורגניזד)", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.2", label: "Catatonic schizophrenia - סכיזופרניה קטטונית", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.3", label: "Undifferentiated schizophrenia - סכיזופרניה לא מובחנת", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.4", label: "Post-schizophrenic depression - דיכאון פוסט-סכיזופרני", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.5", label: "Residual schizophrenia - סכיזופרניה רזידואלית", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.6", label: "Simple schizophrenia - סכיזופרניה פשוטה", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.8", label: "Other schizophrenia - סכיזופרניה אחרת", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F20.9", label: "Schizophrenia, unspecified - סכיזופרניה לא מסווגת", dsm: "Schizophrenia (DSM-5 unified)" },
      { code: "F21", label: "Schizotypal disorder - הפרעה סכיזוטיפלית", dsm: "Schizotypal Personality Disorder" },
      { code: "F22.0", label: "Delusional disorder - הפרעה דלוזיונלית", dsm: "Delusional Disorder" },
      { code: "F22.8", label: "Other persistent delusional disorders - הפרעות דלוזיונליות מתמידות אחרות", dsm: "Delusional Disorder" },
      { code: "F22.9", label: "Persistent delusional disorder, unspecified - הפרעה דלוזיונלית מתמידה לא מסווגת", dsm: "Unspecified Delusional Disorder" },
      { code: "F23.0", label: "Acute polymorphic psychotic disorder without schizophrenia - הפרעה פסיכוטית חריפה פולימורפית ללא תסמיני סכיזופרניה", dsm: "Brief Psychotic Disorder" },
      { code: "F23.1", label: "Acute polymorphic psychotic disorder with schizophrenia - הפרעה פסיכוטית חריפה פולימורפית עם תסמיני סכיזופרניה", dsm: "Schizophreniform Disorder" },
      { code: "F23.2", label: "Acute schizophrenia-like psychotic disorder - הפרעה פסיכוטית חריפה דמוית סכיזופרניה", dsm: "Schizophreniform Disorder" },
      { code: "F23.3", label: "Other acute predominantly delusional psychotic disorders - הפרעות פסיכוטיות חריפות דלוזיונליות", dsm: "Brief Psychotic Disorder" },
      { code: "F23.8", label: "Other acute and transient psychotic disorders - הפרעות פסיכוטיות חריפות וחולפות אחרות", dsm: "Other Specified Schizophrenia Spectrum Disorder" },
      { code: "F23.9", label: "Acute and transient psychotic disorder, unspecified - הפרעה פסיכוטית חריפה וחולפת לא מסווגת", dsm: "Unspecified Schizophrenia Spectrum Disorder" },
      { code: "F24", label: "Induced delusional disorder - הפרעה דלוזיונלית מושרית (פולי א דו)", dsm: "Other Specified Schizophrenia Spectrum Disorder" },
      { code: "F25.0", label: "Schizoaffective disorder, manic type - סכיזואפקטיבית, סוג מאני", dsm: "Schizoaffective Disorder, Bipolar Type" },
      { code: "F25.1", label: "Schizoaffective disorder, depressive type - סכיזואפקטיבית, סוג דיכאוני", dsm: "Schizoaffective Disorder, Depressive Type" },
      { code: "F25.2", label: "Schizoaffective disorder, mixed type - סכיזואפקטיבית, סוג מעורב", dsm: "Schizoaffective Disorder" },
      { code: "F25.8", label: "Other schizoaffective disorders - הפרעות סכיזואפקטיביות אחרות", dsm: "Other Specified Schizoaffective Disorder" },
      { code: "F25.9", label: "Schizoaffective disorder, unspecified - הפרעה סכיזואפקטיבית לא מסווגת", dsm: "Unspecified Schizoaffective Disorder" },
      { code: "F28", label: "Other nonorganic psychotic disorders - הפרעות פסיכוטיות לא אורגניות אחרות", dsm: "Other Specified Schizophrenia Spectrum Disorder" },
      { code: "F29", label: "Unspecified nonorganic psychosis - פסיכוזה לא אורגנית לא מסווגת", dsm: "Unspecified Schizophrenia Spectrum Disorder" }
    ]
  },
  {
    category: "F30-F39: הפרעות במצב הרוח (אפקטיביות)",
    dsm: "Bipolar and Depressive Disorders (DSM-5)",
    items: [
      { code: "F30.0", label: "Hypomania - היפומאניה", dsm: "Bipolar I Disorder / Hypomanic Episode" },
      { code: "F30.1", label: "Mania without psychotic symptoms - מאניה ללא תסמינים פסיכוטיים", dsm: "Bipolar I Disorder, Manic Episode" },
      { code: "F30.2", label: "Mania with psychotic symptoms - מאניה עם תסמינים פסיכוטיים", dsm: "Bipolar I Disorder, Manic Episode with Psychotic Features" },
      { code: "F30.8", label: "Other manic episodes - אפיזודות מאניות אחרות", dsm: "Other Specified Bipolar Disorder" },
      { code: "F30.9", label: "Manic episode, unspecified - אפיזודה מאנית לא מסווגת", dsm: "Unspecified Bipolar Disorder" },
      { code: "F31.0", label: "Bipolar disorder, current hypomanic - הפרעה דו-קוטבית, אפיזודה היפומאנית", dsm: "Bipolar I Disorder, Current Episode Hypomanic" },
      { code: "F31.1", label: "Bipolar disorder, current manic without psychosis - דו-קוטבית, מאניה ללא פסיכוזה", dsm: "Bipolar I Disorder, Current Episode Manic" },
      { code: "F31.2", label: "Bipolar disorder, current manic with psychosis - דו-קוטבית, מאניה עם פסיכוזה", dsm: "Bipolar I Disorder, Current Episode Manic with Psychotic Features" },
      { code: "F31.3", label: "Bipolar disorder, mild/moderate depression - דו-קוטבית, דיכאון קל/בינוני", dsm: "Bipolar I Disorder, Current Episode Depressed" },
      { code: "F31.4", label: "Bipolar disorder, severe depression w/o psychosis - דו-קוטבית, דיכאון חמור ללא פסיכוזה", dsm: "Bipolar I Disorder, Current Episode Depressed, Severe" },
      { code: "F31.5", label: "Bipolar disorder, severe depression with psychosis - דו-קוטבית, דיכאון חמור עם פסיכוזה", dsm: "Bipolar I Disorder, Current Episode Depressed with Psychotic Features" },
      { code: "F31.6", label: "Bipolar disorder, current mixed - דו-קוטבית, אפיזודה מעורבת", dsm: "Bipolar I Disorder, Current Episode Mixed" },
      { code: "F31.7", label: "Bipolar disorder, in remission - דו-קוטבית, בהפוגה", dsm: "Bipolar I Disorder, In Remission" },
      { code: "F31.8", label: "Other bipolar affective disorders - הפרעות דו-קוטביות אחרות", dsm: "Bipolar II Disorder" },
      { code: "F31.9", label: "Bipolar affective disorder, unspecified - הפרעה דו-קוטבית לא מסווגת", dsm: "Unspecified Bipolar Disorder" },
      { code: "F32.0", label: "Mild depressive episode - אפיזודה דיכאונית קלה", dsm: "Major Depressive Disorder, Single Episode, Mild" },
      { code: "F32.1", label: "Moderate depressive episode - אפיזודה דיכאונית בינונית", dsm: "Major Depressive Disorder, Single Episode, Moderate" },
      { code: "F32.2", label: "Severe depressive episode w/o psychosis - אפיזודה דיכאונית חמורה ללא פסיכוזה", dsm: "Major Depressive Disorder, Single Episode, Severe" },
      { code: "F32.3", label: "Severe depressive episode with psychosis - אפיזודה דיכאונית חמורה עם פסיכוזה", dsm: "Major Depressive Disorder with Psychotic Features" },
      { code: "F32.8", label: "Other depressive episodes - אפיזודות דיכאוניות אחרות", dsm: "Other Specified Depressive Disorder" },
      { code: "F32.9", label: "Depressive episode, unspecified - אפיזודה דיכאונית לא מסווגת", dsm: "Unspecified Depressive Disorder" },
      { code: "F33.0", label: "Recurrent depressive disorder, mild - דיכאון חוזר, אפיזודה קלה", dsm: "Major Depressive Disorder, Recurrent, Mild" },
      { code: "F33.1", label: "Recurrent depressive disorder, moderate - דיכאון חוזר, אפיזודה בינונית", dsm: "Major Depressive Disorder, Recurrent, Moderate" },
      { code: "F33.2", label: "Recurrent depressive disorder, severe w/o psychosis - דיכאון חוזר חמור ללא פסיכוזה", dsm: "Major Depressive Disorder, Recurrent, Severe" },
      { code: "F33.3", label: "Recurrent depressive disorder, severe with psychosis - דיכאון חוזר חמור עם פסיכוזה", dsm: "Major Depressive Disorder, Recurrent, with Psychotic Features" },
      { code: "F33.4", label: "Recurrent depressive disorder, currently in remission - דיכאון חוזר, בהפוגה", dsm: "Major Depressive Disorder, Recurrent, In Remission" },
      { code: "F33.8", label: "Other recurrent depressive disorders - הפרעות דיכאוניות חוזרות אחרות", dsm: "Other Specified Depressive Disorder" },
      { code: "F33.9", label: "Recurrent depressive disorder, unspecified - דיכאון חוזר לא מסווג", dsm: "Unspecified Depressive Disorder" },
      { code: "F34.0", label: "Cyclothymia - ציקלותימיה", dsm: "Cyclothymic Disorder" },
      { code: "F34.1", label: "Dysthymia - דיסתימיה (הפרעה דיכאונית מתמשכת)", dsm: "Persistent Depressive Disorder (Dysthymia)" },
      { code: "F34.8", label: "Other persistent mood [affective] disorders - הפרעות מצב רוח מתמידות אחרות", dsm: "Other Specified Bipolar Disorder" },
      { code: "F34.9", label: "Persistent mood disorder, unspecified - הפרעת מצב רוח מתמידה לא מסווגת", dsm: "Unspecified Bipolar Disorder" },
      { code: "F38.0", label: "Other single mood [affective] disorders - mixed affective episode - אפיזודה אפקטיבית מעורבת", dsm: "Other Specified Depressive Disorder" },
      { code: "F38.1", label: "Other recurrent mood [affective] disorders - recurrent brief depression - דיכאון חוזר קצר", dsm: "Other Specified Depressive Disorder" },
      { code: "F38.8", label: "Other specified mood [affective] disorders - הפרעות מצב רוח אחרות מסווגות", dsm: "Other Specified Depressive Disorder" },
      { code: "F39", label: "Unspecified mood [affective] disorder - הפרעת מצב רוח לא מסווגת", dsm: "Unspecified Mood Disorder" }
    ]
  },
  {
    category: "F40-F48: הפרעות ניאורוטיות, תלויות-דחק וסומטופורמיות",
    dsm: "Anxiety / Trauma-Related / OCD / Dissociative / Somatic Symptom Disorders (DSM-5)",
    items: [
      { code: "F40.0", label: "Agoraphobia - אגורפוביה", dsm: "Agoraphobia" },
      { code: "F40.1", label: "Social phobias - חרדה חברתית (פוביה סוציאלית)", dsm: "Social Anxiety Disorder (Social Phobia)" },
      { code: "F40.2", label: "Specific (isolated) phobias - פוביה ספציפית", dsm: "Specific Phobia" },
      { code: "F40.8", label: "Other phobic anxiety disorders - הפרעות חרדה פובית אחרות", dsm: "Other Specified Anxiety Disorder" },
      { code: "F40.9", label: "Phobic anxiety disorder, unspecified - הפרעת חרדה פובית לא מסווגת", dsm: "Unspecified Anxiety Disorder" },
      { code: "F41.0", label: "Panic disorder - הפרעת פאניקה", dsm: "Panic Disorder" },
      { code: "F41.1", label: "Generalized anxiety disorder - הפרעת חרדה מוכללת (GAD)", dsm: "Generalized Anxiety Disorder" },
      { code: "F41.2", label: "Mixed anxiety and depressive disorder - חרדה ודיכאון מעורבים", dsm: "Other Specified Anxiety Disorder" },
      { code: "F41.3", label: "Other mixed anxiety disorders - הפרעות חרדה מעורבות אחרות", dsm: "Other Specified Anxiety Disorder" },
      { code: "F41.8", label: "Other specified anxiety disorders - הפרעות חרדה מסווגות אחרות", dsm: "Other Specified Anxiety Disorder" },
      { code: "F41.9", label: "Anxiety disorder, unspecified - הפרעת חרדה לא מסווגת", dsm: "Unspecified Anxiety Disorder" },
      { code: "F42.0", label: "OCD, predominantly obsessional thoughts - OCD, בעיקר מחשבות טורדניות", dsm: "Obsessive-Compulsive Disorder" },
      { code: "F42.1", label: "OCD, predominantly compulsive acts - OCD, בעיקר מעשים כפייתיים", dsm: "Obsessive-Compulsive Disorder" },
      { code: "F42.2", label: "OCD, mixed obsessional thoughts and acts - OCD מעורב", dsm: "Obsessive-Compulsive Disorder" },
      { code: "F42.8", label: "Other obsessive-compulsive disorders - הפרעות טורדניות-כפייתיות אחרות", dsm: "Other OCD and Related Disorders (Body Dysmorphic / Hoarding / Excoriation)" },
      { code: "F42.9", label: "Obsessive-compulsive disorder, unspecified - OCD לא מסווגת", dsm: "Unspecified Obsessive-Compulsive Disorder" },
      { code: "F43.0", label: "Acute stress reaction - תגובת דחק חריפה (ASR)", dsm: "Acute Stress Disorder" },
      { code: "F43.1", label: "Post-traumatic stress disorder - הפרעת דחק פוסט-טראומטית (PTSD)", dsm: "Post-Traumatic Stress Disorder (PTSD)" },
      { code: "F43.20", label: "Adjustment disorder, brief depressive reaction - הפרעת הסתגלות, תגובה דיכאונית קצרה", dsm: "Adjustment Disorder, with Depressed Mood" },
      { code: "F43.21", label: "Adjustment disorder, prolonged depressive reaction - הפרעת הסתגלות, תגובה דיכאונית ממושכת", dsm: "Adjustment Disorder, with Depressed Mood" },
      { code: "F43.22", label: "Adjustment disorder, mixed anxiety and depression - הפרעת הסתגלות, חרדה ודיכאון מעורבים", dsm: "Adjustment Disorder, with Mixed Anxiety and Depressed Mood" },
      { code: "F43.23", label: "Adjustment disorder, predominant disturbance of other emotions - הפרעת הסתגלות, הפרעה רגשית עיקרית", dsm: "Adjustment Disorder, with Anxiety" },
      { code: "F43.24", label: "Adjustment disorder, predominant disturbance of conduct - הפרעת הסתגלות, הפרעת התנהגות עיקרית", dsm: "Adjustment Disorder, with Disturbance of Conduct" },
      { code: "F43.25", label: "Adjustment disorder, mixed disturbance of emotions and conduct - הפרעת הסתגלות, מעורבת רגשית והתנהגותית", dsm: "Adjustment Disorder, with Mixed Disturbance of Emotions and Conduct" },
      { code: "F43.28", label: "Adjustment disorder, with other specified predominant symptoms - הפרעת הסתגלות, עם תסמינים אחרים", dsm: "Adjustment Disorder, Unspecified" },
      { code: "F43.8", label: "Other reactions to severe stress - תגובות אחרות לדחק חמור", dsm: "Other Specified Trauma- and Stressor-Related Disorder" },
      { code: "F43.9", label: "Reaction to severe stress, unspecified - תגובה לדחק חמור לא מסווגת", dsm: "Unspecified Trauma- and Stressor-Related Disorder" },
      { code: "F44.0", label: "Dissociative amnesia - אמנזיה דיסוציאטיבית", dsm: "Dissociative Amnesia" },
      { code: "F44.1", label: "Dissociative fugue - פוגה דיסוציאטיבית", dsm: "Dissociative Amnesia with Dissociative Fugue" },
      { code: "F44.2", label: "Dissociative stupor - קהות דיסוציאטיבית", dsm: "Other Specified Dissociative Disorder" },
      { code: "F44.3", label: "Trance and possession disorders - הפרעות טרנס ודיבוק", dsm: "Other Specified Dissociative Disorder" },
      { code: "F44.4", label: "Dissociative motor disorders - הפרעות מוטוריות דיסוציאטיביות", dsm: "Conversion Disorder (Functional Neurological Symptom Disorder)" },
      { code: "F44.5", label: "Dissociative convulsions - פרכוסים דיסוציאטיביים", dsm: "Conversion Disorder (Functional Neurological Symptom Disorder)" },
      { code: "F44.6", label: "Dissociative anesthesia and sensory loss - אלחוש ואובדן תחושה דיסוציאטיביים", dsm: "Conversion Disorder (Functional Neurological Symptom Disorder)" },
      { code: "F44.7", label: "Mixed dissociative [conversion] disorders - הפרעות דיסוציאטיביות מעורבות", dsm: "Conversion Disorder (Functional Neurological Symptom Disorder)" },
      { code: "F44.80", label: "Ganser's syndrome - תסמונת גנסר", dsm: "Other Specified Dissociative Disorder" },
      { code: "F44.81", label: "Multiple personality disorder - הפרעת זהות דיסוציאטיבית (DID)", dsm: "Dissociative Identity Disorder" },
      { code: "F44.9", label: "Dissociative [conversion] disorder, unspecified - הפרעה דיסוציאטיבית לא מסווגת", dsm: "Unspecified Dissociative Disorder" },
      { code: "F45.0", label: "Somatization disorder - הפרעת סומטיזציה", dsm: "Somatic Symptom Disorder" },
      { code: "F45.1", label: "Undifferentiated somatoform disorder - הפרעה סומטופורמית לא מובחנת", dsm: "Somatic Symptom Disorder" },
      { code: "F45.2", label: "Hypochondriacal disorder - היפוכונדריה", dsm: "Illness Anxiety Disorder" },
      { code: "F45.3", label: "Somatoform autonomic dysfunction - תפקוד אוטונומי סומטופורמי", dsm: "Somatic Symptom Disorder" },
      { code: "F45.4", label: "Persistent somatoform pain disorder - כאב סומטופורמי מתמיד", dsm: "Somatic Symptom Disorder with Predominant Pain" },
      { code: "F45.8", label: "Other somatoform disorders - הפרעות סומטופורמיות אחרות", dsm: "Other Specified Somatic Symptom Disorder" },
      { code: "F45.9", label: "Somatoform disorder, unspecified - הפרעה סומטופורמית לא מסווגת", dsm: "Unspecified Somatic Symptom Disorder" },
      { code: "F48.0", label: "Neurasthenia - נוירסתניה (תשישות כרונית)", dsm: "Other Specified Somatic Symptom Disorder" },
      { code: "F48.1", label: "Depersonalization-derealization syndrome - תסמונת דה-פרסונליזציה-דה-ריאליזציה", dsm: "Depersonalization/Derealization Disorder" },
      { code: "F48.8", label: "Other specified neurotic disorders - הפרעות ניאורוטיות אחרות מסווגות", dsm: "Other Specified Anxiety Disorder" },
      { code: "F48.9", label: "Neurotic disorder, unspecified - הפרעה ניאורוטית לא מסווגת", dsm: "Unspecified Anxiety Disorder" }
    ]
  },
  {
    category: "F50-F59: תסמונות התנהגותיות הקשורות להפרעות פיזיולוגיות ולגורמים גופניים",
    dsm: "Feeding/Eating Disorders, Sleep-Wake Disorders, Sexual Dysfunctions (DSM-5)",
    items: [
      { code: "F50.0", label: "Anorexia nervosa - אנורקסיה נרבוזה", dsm: "Anorexia Nervosa" },
      { code: "F50.1", label: "Atypical anorexia nervosa - אנורקסיה נרבוזה לא טיפוסית", dsm: "Other Specified Feeding or Eating Disorder" },
      { code: "F50.2", label: "Bulimia nervosa - בולימיה נרבוזה", dsm: "Bulimia Nervosa" },
      { code: "F50.3", label: "Atypical bulimia nervosa - בולימיה נרבוזה לא טיפוסית", dsm: "Other Specified Feeding or Eating Disorder" },
      { code: "F50.4", label: "Overeating with psychological disturbances - אכילת יתר עם הפרעה פסיכולוגית", dsm: "Binge-Eating Disorder" },
      { code: "F50.5", label: "Vomiting associated with psychological disturbances - הקאות עם הפרעה פסיכולוגית", dsm: "Other Specified Feeding or Eating Disorder" },
      { code: "F50.8", label: "Other eating disorders - הפרעות אכילה אחרות", dsm: "Other Specified Feeding or Eating Disorder" },
      { code: "F50.9", label: "Eating disorder, unspecified - הפרעת אכילה לא מסווגת", dsm: "Unspecified Feeding or Eating Disorder" },
      { code: "F51.0", label: "Nonorganic insomnia - אינסומניה לא אורגנית", dsm: "Insomnia Disorder" },
      { code: "F51.1", label: "Nonorganic hypersomnia - היפרסומניה לא אורגנית", dsm: "Hypersomnolence Disorder" },
      { code: "F51.2", label: "Nonorganic disorder of sleep-wake schedule - הפרעה לא אורגנית במחזור שינה-ערות", dsm: "Circadian Rhythm Sleep-Wake Disorder" },
      { code: "F51.3", label: "Sleepwalking [somnambulism] - סהרוריות", dsm: "Non-REM Sleep Arousal Disorder, Sleepwalking Type" },
      { code: "F51.4", label: "Sleep terrors [night terrors] - אימת לילה", dsm: "Non-REM Sleep Arousal Disorder, Sleep Terror Type" },
      { code: "F51.5", label: "Nightmares - סיוטים", dsm: "Nightmare Disorder" },
      { code: "F51.8", label: "Other nonorganic sleep disorders - הפרעות שינה לא אורגניות אחרות", dsm: "Other Specified Sleep-Wake Disorder" },
      { code: "F51.9", label: "Nonorganic sleep disorder, unspecified - הפרעת שינה לא אורגנית לא מסווגת", dsm: "Unspecified Sleep-Wake Disorder" },
      { code: "F52.0", label: "Lack or loss of sexual desire - חוסר תשוקה מינית", dsm: "Male Hypoactive Sexual Desire Disorder / Female Sexual Interest/Arousal Disorder" },
      { code: "F52.1", label: "Sexual aversion and lack of sexual enjoyment - סלידה מינית וחוסר הנאה", dsm: "Female Sexual Interest/Arousal Disorder" },
      { code: "F52.2", label: "Failure of genital response - כשל בתגובה מינית", dsm: "Erectile Disorder / Female Sexual Interest/Arousal Disorder" },
      { code: "F52.3", label: "Orgasmic dysfunction - הפרעה באורגזמה", dsm: "Female Orgasmic Disorder / Delayed Ejaculation" },
      { code: "F52.4", label: "Premature ejaculation - שפיכה מוקדמת", dsm: "Premature (Early) Ejaculation" },
      { code: "F52.5", label: "Nonorganic vaginismus - ווגיניזמוס לא אורגני", dsm: "Genito-Pelvic Pain/Penetration Disorder" },
      { code: "F52.6", label: "Nonorganic dyspareunia - דיספרוניה לא אורגנית", dsm: "Genito-Pelvic Pain/Penetration Disorder" },
      { code: "F52.7", label: "Excessive sexual drive - דחף מיני מוגבר", dsm: "Other Specified Sexual Dysfunction" },
      { code: "F52.8", label: "Other sexual dysfunction - הפרעה בתפקוד מיני אחרת", dsm: "Other Specified Sexual Dysfunction" },
      { code: "F52.9", label: "Unspecified sexual dysfunction - הפרעה בתפקוד מיני לא מסווגת", dsm: "Unspecified Sexual Dysfunction" },
      { code: "F53.0", label: "Mild puerperal mental disorder - הפרעה נפשית קלה הקשורה ללידה", dsm: "Depressive Disorder with Peripartum Onset" },
      { code: "F53.1", label: "Severe puerperal mental disorder - הפרעה נפשית חמורה הקשורה ללידה", dsm: "Depressive/Bipolar Disorder with Peripartum Onset" },
      { code: "F54", label: "Psychological factors affecting medical condition - גורמים פסיכולוגיים המשפיעים על מצב רפואי", dsm: "Psychological Factors Affecting Other Medical Conditions" },
      { code: "F55", label: "Abuse of non-dependence-producing substances - שימוש לרעה בחומרים לא ממכרים", dsm: "Other Specified Substance-Related Disorder" },
      { code: "F59", label: "Unspecified behavioural syndrome with physiological disturbance - תסמונת התנהגותית לא מסווגת עם הפרעה פיזיולוגית", dsm: "Unspecified Mental Disorder" }
    ]
  },
  {
    category: "F60-F69: הפרעות של האישיות וההתנהגות הבוגרת",
    dsm: "Personality Disorders / Impulse Control / Paraphilic / Gender Dysphoria (DSM-5)",
    items: [
      { code: "F60.0", label: "Paranoid personality disorder - הפרעת אישיות פרנואידית", dsm: "Paranoid Personality Disorder" },
      { code: "F60.1", label: "Schizoid personality disorder - הפרעת אישיות סכיזואידית", dsm: "Schizoid Personality Disorder" },
      { code: "F60.2", label: "Dissocial/Antisocial personality disorder - הפרעת אישיות אנטיסוציאלית", dsm: "Antisocial Personality Disorder" },
      { code: "F60.30", label: "Emotionally unstable PD, impulsive type - אישיות רגשית לא יציבה, אימפולסיבית", dsm: "Borderline Personality Disorder" },
      { code: "F60.31", label: "Emotionally unstable PD, borderline type - הפרעת אישיות גבולית (BPD)", dsm: "Borderline Personality Disorder" },
      { code: "F60.4", label: "Histrionic personality disorder - הפרעת אישיות היסטריונית", dsm: "Histrionic Personality Disorder" },
      { code: "F60.5", label: "Anankastic (Obsessive) personality disorder - הפרעת אישיות כפייתית (OCPD)", dsm: "Obsessive-Compulsive Personality Disorder" },
      { code: "F60.6", label: "Anxious (avoidant) personality disorder - הפרעת אישיות נמנעת", dsm: "Avoidant Personality Disorder" },
      { code: "F60.7", label: "Dependent personality disorder - הפרעת אישיות תלותית", dsm: "Dependent Personality Disorder" },
      { code: "F60.8", label: "Other specific personality disorders (including Narcissistic) - הפרעת אישיות נרקיסיסטית ואחרות", dsm: "Narcissistic Personality Disorder" },
      { code: "F60.9", label: "Personality disorder, unspecified - הפרעת אישיות לא מסווגת", dsm: "Unspecified Personality Disorder" },
      { code: "F61.0", label: "Mixed personality disorders - הפרעות אישיות מעורבות", dsm: "Other Specified Personality Disorder" },
      { code: "F61.1", label: "Troublesome personality changes - שינויי אישיות בעייתיים", dsm: "Other Specified Personality Disorder" },
      { code: "F62.0", label: "Enduring personality change after catastrophic experience - שינוי אישיות מתמיד לאחר אירוע קטסטרופלי", dsm: "Other Specified Personality Disorder / Complex PTSD" },
      { code: "F62.1", label: "Enduring personality change after psychiatric illness - שינוי אישיות מתמיד לאחר מחלה פסיכיאטרית", dsm: "Other Specified Personality Disorder" },
      { code: "F62.8", label: "Other enduring personality changes - שינויי אישיות מתמידים אחרים", dsm: "Other Specified Personality Disorder" },
      { code: "F62.9", label: "Enduring personality change, unspecified - שינוי אישיות מתמיד לא מסווג", dsm: "Unspecified Personality Disorder" },
      { code: "F63.0", label: "Pathological gambling - הימורים פתולוגיים", dsm: "Gambling Disorder" },
      { code: "F63.1", label: "Pathological fire-setting (Pyromania) - פירומאניה", dsm: "Pyromania" },
      { code: "F63.2", label: "Pathological stealing (Kleptomania) - קלפטומאניה", dsm: "Kleptomania" },
      { code: "F63.3", label: "Trichotillomania - טריכוטילומאניה (תלישת שיער)", dsm: "Trichotillomania (Hair-Pulling Disorder)" },
      { code: "F63.8", label: "Other habit and impulse disorders (including Intermittent Explosive Disorder) - הפרעות הרגלים ודחפים אחרות (כולל הפרעת כעס מתפרץ)", dsm: "Intermittent Explosive Disorder / Other Specified Impulse-Control Disorder" },
      { code: "F63.9", label: "Habit and impulse disorder, unspecified - הפרעת הרגלים ודחפים לא מסווגת", dsm: "Unspecified Disruptive, Impulse-Control, and Conduct Disorder" },
      { code: "F64.0", label: "Transsexualism - טרנסקסואליות", dsm: "Gender Dysphoria in Adolescents and Adults" },
      { code: "F64.1", label: "Dual role transvestism - טרנסווסטיות דו-תפקידית", dsm: "Gender Dysphoria" },
      { code: "F64.2", label: "Gender identity disorder of childhood - הפרעת זהות מגדרית בילדות", dsm: "Gender Dysphoria in Children" },
      { code: "F64.8", label: "Other gender identity disorders - הפרעות זהות מגדרית אחרות", dsm: "Other Specified Gender Dysphoria" },
      { code: "F64.9", label: "Gender identity disorder, unspecified - הפרעת זהות מגדרית לא מסווגת", dsm: "Unspecified Gender Dysphoria" },
      { code: "F65.0", label: "Fetishism - פטישיזם", dsm: "Fetishistic Disorder" },
      { code: "F65.1", label: "Fetishistic transvestism - טרנסווסטיות פטישיסטית", dsm: "Transvestic Disorder" },
      { code: "F65.2", label: "Exhibitionism - אקסהיביציוניזם (התערטלות)", dsm: "Exhibitionistic Disorder" },
      { code: "F65.3", label: "Voyeurism - מציצנות", dsm: "Voyeuristic Disorder" },
      { code: "F65.4", label: "Paedophilia - פדופיליה", dsm: "Pedophilic Disorder" },
      { code: "F65.5", label: "Sadomasochism - סדו-מזוכיזם", dsm: "Sexual Masochism Disorder / Sexual Sadism Disorder" },
      { code: "F65.6", label: "Multiple disorders of sexual preference - הפרעות מרובות בהעדפה מינית", dsm: "Other Specified Paraphilic Disorder" },
      { code: "F65.8", label: "Other disorders of sexual preference (including Frotteurism) - הפרעות אחרות בהעדפה מינית (כולל פרוטריזם)", dsm: "Frotteuristic Disorder / Other Specified Paraphilic Disorder" },
      { code: "F65.9", label: "Disorder of sexual preference, unspecified - הפרעה בהעדפה מינית לא מסווגת", dsm: "Unspecified Paraphilic Disorder" },
      { code: "F66.0", label: "Sexual maturation disorder - הפרעה בהתבגרות מינית", dsm: "Other Specified Sexual Dysfunction" },
      { code: "F68.0", label: "Elaboration of physical symptoms for psychological reasons - הגזמה של תסמינים גופניים מסיבות נפשיות", dsm: "Factitious Disorder Imposed on Self" },
      { code: "F68.1", label: "Intentional production of symptoms [factitious disorder] - הפרעה עשויה (מונכהאוזן)", dsm: "Factitious Disorder Imposed on Self / Imposed on Another" },
      { code: "F68.8", label: "Other specified disorders of adult personality and behaviour - הפרעות אחרות מסווגות של אישיות המבוגר", dsm: "Other Specified Personality Disorder" },
      { code: "F69", label: "Unspecified disorder of adult personality and behaviour - הפרעה לא מסווגת של אישיות והתנהגות המבוגר", dsm: "Unspecified Personality Disorder" }
    ]
  },
  {
    category: "F70-F79: מוגבלות שכלית התפתחותית (פיגור שכלי)",
    dsm: "Intellectual Disabilities (DSM-5)",
    items: [
      { code: "F70", label: "Mild intellectual disability (IQ 50-69) - מוגבלות שכלית קלה", dsm: "Intellectual Disability, Mild" },
      { code: "F71", label: "Moderate intellectual disability (IQ 35-49) - מוגבלות שכלית בינונית", dsm: "Intellectual Disability, Moderate" },
      { code: "F72", label: "Severe intellectual disability (IQ 20-34) - מוגבלות שכלית קשה", dsm: "Intellectual Disability, Severe" },
      { code: "F73", label: "Profound intellectual disability (IQ <20) - מוגבלות שכלית עמוקה", dsm: "Intellectual Disability, Profound" },
      { code: "F78", label: "Other intellectual disability - מוגבלות שכלית אחרת", dsm: "Other Specified Intellectual Disability" },
      { code: "F79", label: "Unspecified intellectual disability - מוגבלות שכלית לא מסווגת", dsm: "Unspecified Intellectual Disability" }
    ]
  },
  {
    category: "F80-F89: הפרעות בהתפתחות הנפשית",
    dsm: "Neurodevelopmental Disorders (DSM-5): Communication / Learning / Motor / ASD",
    items: [
      { code: "F80.0", label: "Specific speech articulation disorder - הפרעת היגוי ספציפית", dsm: "Speech Sound Disorder" },
      { code: "F80.1", label: "Expressive language disorder - הפרעת שפה אקספרסיבית", dsm: "Language Disorder" },
      { code: "F80.2", label: "Receptive language disorder - הפרעת שפה רצפטיבית (מעורבת)", dsm: "Language Disorder" },
      { code: "F80.3", label: "Acquired aphasia with epilepsy [Landau-Kleffner] - אפזיה נרכשת עם אפילפסיה (לנדאו-קלפנר)", dsm: "Language Disorder" },
      { code: "F80.8", label: "Other developmental disorders of speech and language - הפרעות התפתחותיות אחרות בדיבור ושפה", dsm: "Social (Pragmatic) Communication Disorder" },
      { code: "F80.9", label: "Developmental disorder of speech and language, unspecified - הפרעה התפתחותית בדיבור ושפה לא מסווגת", dsm: "Unspecified Communication Disorder" },
      { code: "F81.0", label: "Specific reading disorder (Dyslexia) - לקות קריאה (דיסלקציה)", dsm: "Specific Learning Disorder with Impairment in Reading" },
      { code: "F81.1", label: "Specific spelling disorder (Dysgraphia) - לקות כתיב (דיסגרפיה)", dsm: "Specific Learning Disorder with Impairment in Written Expression" },
      { code: "F81.2", label: "Specific disorder of arithmetical skills (Dyscalculia) - לקות חשבון (דיסקלקוליה)", dsm: "Specific Learning Disorder with Impairment in Mathematics" },
      { code: "F81.3", label: "Mixed disorder of scholastic skills - לקות למידה מעורבת", dsm: "Specific Learning Disorder (combined)" },
      { code: "F81.8", label: "Other developmental disorders of scholastic skills - הפרעות התפתחותיות אחרות של מיומנויות לימודיות", dsm: "Other Specified Learning Disorder" },
      { code: "F81.9", label: "Developmental disorder of scholastic skills, unspecified - הפרעה התפתחותית של מיומנויות לימודיות לא מסווגת", dsm: "Unspecified Learning Disorder" },
      { code: "F82", label: "Developmental coordination disorder (DCD) - הפרעה התפתחותית בקואורדינציה", dsm: "Developmental Coordination Disorder" },
      { code: "F83", label: "Mixed specific developmental disorders - הפרעות התפתחותיות ייחודיות מעורבות", dsm: "Global Developmental Delay" },
      { code: "F84.0", label: "Childhood autism - אוטיזם בילדות", dsm: "Autism Spectrum Disorder" },
      { code: "F84.1", label: "Atypical autism - אוטיזם לא טיפוסי", dsm: "Autism Spectrum Disorder" },
      { code: "F84.2", label: "Rett's syndrome - תסמונת רט", dsm: "Rett's Syndrome (not in DSM-5 ASD)" },
      { code: "F84.3", label: "Other childhood disintegrative disorder - הפרעה דיסאינטגרטיבית", dsm: "Autism Spectrum Disorder" },
      { code: "F84.4", label: "Overactive disorder with mental retardation and stereotyped movements - הפרעה היפראקטיבית עם פיגור שכלי ותנועות סטריאוטיפיות", dsm: "Autism Spectrum Disorder / Stereotypic Movement Disorder" },
      { code: "F84.5", label: "Asperger's syndrome - תסמונת אספרגר", dsm: "Autism Spectrum Disorder" },
      { code: "F84.8", label: "Other pervasive developmental disorders - הפרעות התפתחותיות נרחבות אחרות", dsm: "Autism Spectrum Disorder" },
      { code: "F84.9", label: "Pervasive developmental disorder, unspecified - PDD-NOS", dsm: "Autism Spectrum Disorder" },
      { code: "F88", label: "Other disorders of psychological development - הפרעות אחרות בהתפתחות נפשית", dsm: "Other Specified Neurodevelopmental Disorder" },
      { code: "F89", label: "Unspecified disorder of psychological development - הפרעה לא מסווגת בהתפתחות נפשית", dsm: "Unspecified Neurodevelopmental Disorder" }
    ]
  },
  {
    category: "F90-F98: הפרעות התנהגותיות ורגשיות שתחילתן בילדות או בגיל ההתבגרות",
    dsm: "ADHD / Disruptive Behavior / Tic / Elimination / Other Childhood Disorders (DSM-5)",
    items: [
      { code: "F90.0", label: "Disturbance of activity and attention (ADHD-PI) - הפרעת קשב וריכוז, סוג חוסר קשב", dsm: "ADHD, Predominantly Inattentive Presentation" },
      { code: "F90.1", label: "Hyperkinetic conduct disorder (ADHD-HI) - הפרעה היפרקינטית, סוג היפראקטיבי-אימפולסיבי", dsm: "ADHD, Predominantly Hyperactive-Impulsive Presentation" },
      { code: "F90.2", label: "ADHD, combined type - הפרעת קשב וריכוז, סוג משולב", dsm: "ADHD, Combined Presentation" },
      { code: "F90.8", label: "Other hyperkinetic disorders - הפרעות היפרקינטיות אחרות", dsm: "Other Specified ADHD" },
      { code: "F90.9", label: "Hyperkinetic disorder, unspecified - הפרעה היפרקינטית לא מסווגת", dsm: "Unspecified ADHD" },
      { code: "F91.0", label: "Conduct disorder confined to family - הפרעת התנהגות במשפחה", dsm: "Conduct Disorder" },
      { code: "F91.1", label: "Unsocialized conduct disorder - הפרעת התנהגות לא חברתית", dsm: "Conduct Disorder, Childhood-Onset Type" },
      { code: "F91.2", label: "Socialized conduct disorder - הפרעת התנהגות חברתית", dsm: "Conduct Disorder, Adolescent-Onset Type" },
      { code: "F91.3", label: "Oppositional defiant disorder - הפרעה מרדנית-מתריסה (ODD)", dsm: "Oppositional Defiant Disorder" },
      { code: "F91.8", label: "Other conduct disorders - הפרעות התנהגות אחרות", dsm: "Other Specified Conduct Disorder" },
      { code: "F91.9", label: "Conduct disorder, unspecified - הפרעת התנהגות לא מסווגת", dsm: "Unspecified Conduct Disorder" },
      { code: "F92.0", label: "Depressive conduct disorder - הפרעת התנהגות דיכאונית", dsm: "Conduct Disorder with Depressive Mood" },
      { code: "F92.8", label: "Other mixed disorders of conduct and emotions - הפרעות מעורבות אחרות של התנהגות ורגשות", dsm: "Conduct Disorder" },
      { code: "F92.9", label: "Mixed disorder of conduct and emotions, unspecified - הפרעה מעורבת התנהגות ורגשות לא מסווגת", dsm: "Unspecified Conduct Disorder" },
      { code: "F93.0", label: "Separation anxiety disorder of childhood - חרדת פרידה בילדות", dsm: "Separation Anxiety Disorder" },
      { code: "F93.1", label: "Phobic anxiety disorder of childhood - חרדה פובית בילדות", dsm: "Specific Phobia" },
      { code: "F93.2", label: "Social anxiety disorder of childhood - חרדה חברתית בילדות", dsm: "Social Anxiety Disorder" },
      { code: "F93.3", label: "Sibling rivalry disorder - הפרעת יריבות אחים", dsm: "Other Specified Anxiety Disorder" },
      { code: "F93.8", label: "Other childhood emotional disorders - הפרעות רגשיות אחרות בילדות", dsm: "Other Specified Anxiety Disorder" },
      { code: "F93.9", label: "Childhood emotional disorder, unspecified - הפרעה רגשית בילדות לא מסווגת", dsm: "Unspecified Anxiety Disorder" },
      { code: "F94.0", label: "Elective mutism - אילמות סלקטיבית", dsm: "Selective Mutism" },
      { code: "F94.1", label: "Reactive attachment disorder - הפרעת התקשרות תגובתית", dsm: "Reactive Attachment Disorder" },
      { code: "F94.2", label: "Disinhibited attachment disorder - הפרעת התקשרות דיסאינהיביטד", dsm: "Disinhibited Social Engagement Disorder" },
      { code: "F94.8", label: "Other childhood disorders of social functioning - הפרעות אחרות בתפקוד חברתי בילדות", dsm: "Other Specified Neurodevelopmental Disorder" },
      { code: "F94.9", label: "Childhood disorder of social functioning, unspecified - הפרעה בתפקוד חברתי בילדות לא מסווגת", dsm: "Unspecified Neurodevelopmental Disorder" },
      { code: "F95.0", label: "Transient tic disorder - טיקים חולפים", dsm: "Provisional Tic Disorder" },
      { code: "F95.1", label: "Chronic motor or vocal tic disorder - טיקים כרוניים", dsm: "Persistent (Chronic) Motor or Vocal Tic Disorder" },
      { code: "F95.2", label: "Tourette's syndrome - תסמונת טורט", dsm: "Tourette's Disorder" },
      { code: "F95.8", label: "Other tic disorders - הפרעות טיק אחרות", dsm: "Other Specified Tic Disorder" },
      { code: "F95.9", label: "Tic disorder, unspecified - הפרעת טיק לא מסווגת", dsm: "Unspecified Tic Disorder" },
      { code: "F98.0", label: "Nonorganic enuresis - הרטבת לילה לא אורגנית", dsm: "Enuresis" },
      { code: "F98.1", label: "Nonorganic encopresis - אנקופרזיס לא אורגני", dsm: "Encopresis" },
      { code: "F98.2", label: "Feeding disorder of infancy/childhood - הפרעת האכלה בינקות/ילדות", dsm: "Avoidant/Restrictive Food Intake Disorder (ARFID)" },
      { code: "F98.3", label: "Pica of infancy and childhood - פיקה בינקות ובילדות", dsm: "Pica" },
      { code: "F98.4", label: "Stereotyped movement disorders - הפרעות תנועה סטריאוטיפיות", dsm: "Stereotypic Movement Disorder" },
      { code: "F98.5", label: "Stuttering [stammering] - גמגום", dsm: "Childhood-Onset Fluency Disorder (Stuttering)" },
      { code: "F98.6", label: "Cluttering - דיבור מהיר ומבולגן (קלאטרינג)", dsm: "Social (Pragmatic) Communication Disorder" },
      { code: "F98.8", label: "Other specified behavioural and emotional disorders of childhood - הפרעות התנהגותיות ורגשיות אחרות בילדות", dsm: "Other Specified Neurodevelopmental Disorder" },
      { code: "F98.9", label: "Unspecified behavioural and emotional disorders of childhood - הפרעות התנהגותיות ורגשיות לא מסווגות בילדות", dsm: "Unspecified Neurodevelopmental Disorder" }
    ]
  },
  {
    category: "F99: הפרעה נפשית לא מסווגת",
    dsm: "Unspecified Mental Disorder (DSM-5)",
    items: [
      { code: "F99", label: "Mental disorder, not otherwise specified - הפרעה נפשית לא מסווגת", dsm: "Unspecified Mental Disorder" }
    ]
  }
];

// =============================================
// DSM-5 Diagnostic Criteria Data - אבחנות DSM-5
// =============================================

// DSM-5 DIAGNOSTIC DATA - אבחנות לפי DSM-5 עם קריטריונים אבחנתיים
const DSM5_CODES_DATA = [
  {
    chapter: "Neurodevelopmental Disorders - הפרעות נוירו-התפתחותיות",
    diagnoses: [
      {
        code: "314.01", name: "ADHD, Combined Presentation", nameHe: "הפרעת קשב וריכוז, מסוג משולב", icd10: "F90.2",
        criteria: [
          {id:"A",text:"A persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development. Inattention: 6+ symptoms for 6+ months (age <17) or 5+ (age 17+): (1) fails to give close attention to details (2) difficulty sustaining attention (3) does not seem to listen when spoken to directly (4) does not follow through on instructions (5) difficulty organizing tasks (6) avoids tasks requiring sustained mental effort (7) loses things (8) easily distracted (9) forgetful in daily activities. Hyperactivity-Impulsivity: 6+ symptoms (age <17) or 5+ (age 17+): (1) fidgets (2) leaves seat (3) runs/climbs inappropriately (4) unable to play quietly (5) often on the go (6) talks excessively (7) blurts out answers (8) difficulty waiting turn (9) interrupts others."},
          {id:"B",text:"Several inattentive or hyperactive-impulsive symptoms were present prior to age 12 years."},
          {id:"C",text:"Several symptoms are present in two or more settings (home, school, work, etc.)."},
          {id:"D",text:"Clear evidence that symptoms interfere with or reduce quality of social, academic, or occupational functioning."},
          {id:"E",text:"Symptoms do not occur exclusively during the course of schizophrenia or another psychotic disorder and are not better explained by another mental disorder."}
        ],
        specifiers: ["Combined presentation","Predominantly inattentive","Predominantly hyperactive-impulsive","In partial remission","Mild","Moderate","Severe"]
      },
      {
        code: "314.00", name: "ADHD, Predominantly Inattentive Presentation", nameHe: "הפרעת קשב וריכוז, מסוג חוסר קשב", icd10: "F90.0",
        criteria: [
          {id:"A",text:"Criterion A1 (inattention) is met but Criterion A2 (hyperactivity-impulsivity) is not met for the past 6 months."},
          {id:"B-E",text:"Same as ADHD Combined Presentation (criteria B through E)."}
        ],
        specifiers: ["In partial remission","Mild","Moderate","Severe"]
      },
      {
        code: "314.01", name: "ADHD, Predominantly Hyperactive-Impulsive Presentation", nameHe: "הפרעת קשב וריכוז, מסוג היפראקטיבי-אימפולסיבי", icd10: "F90.1",
        criteria: [
          {id:"A",text:"Criterion A2 (hyperactivity-impulsivity) is met but Criterion A1 (inattention) is not met for the past 6 months."},
          {id:"B-E",text:"Same as ADHD Combined Presentation (criteria B through E)."}
        ],
        specifiers: ["In partial remission","Mild","Moderate","Severe"]
      },
      {
        code: "299.00", name: "Autism Spectrum Disorder", nameHe: "הפרעה בספקטרום האוטיסטי", icd10: "F84.0",
        criteria: [
          {id:"A",text:"Persistent deficits in social communication and social interaction across multiple contexts: (1) Deficits in social-emotional reciprocity (2) Deficits in nonverbal communicative behaviors used for social interaction (3) Deficits in developing, maintaining, and understanding relationships."},
          {id:"B",text:"Restricted, repetitive patterns of behavior, interests, or activities, at least 2 of: (1) Stereotyped or repetitive motor movements, use of objects, or speech (2) Insistence on sameness, inflexible adherence to routines (3) Highly restricted, fixated interests abnormal in intensity or focus (4) Hyper- or hyporeactivity to sensory input."},
          {id:"C",text:"Symptoms must be present in the early developmental period."},
          {id:"D",text:"Symptoms cause clinically significant impairment in social, occupational, or other important areas of current functioning."},
          {id:"E",text:"These disturbances are not better explained by intellectual disability or global developmental delay."}
        ],
        specifiers: ["Level 1: Requiring support","Level 2: Requiring substantial support","Level 3: Requiring very substantial support","With or without accompanying intellectual impairment","With or without accompanying language impairment"]
      },
      {
        code: "319", name: "Intellectual Disability (Intellectual Developmental Disorder)", nameHe: "מוגבלות שכלית (הפרעה התפתחותית אינטלקטואלית)", icd10: "F70-F73",
        criteria: [
          {id:"A",text:"Deficits in intellectual functions, such as reasoning, problem solving, planning, abstract thinking, judgment, academic learning, and learning from experience, confirmed by both clinical assessment and individualized, standardized intelligence testing."},
          {id:"B",text:"Deficits in adaptive functioning that result in failure to meet developmental and sociocultural standards for personal independence and social responsibility. Without ongoing support, the adaptive deficits limit functioning in one or more activities of daily life."},
          {id:"C",text:"Onset of intellectual and adaptive deficits during the developmental period."}
        ],
        specifiers: ["Mild (IQ 50-70)","Moderate (IQ 35-50)","Severe (IQ 20-35)","Profound (IQ <20)"]
      },
      {
        code: "315.00", name: "Specific Learning Disorder", nameHe: "הפרעת למידה ספציפית", icd10: "F81",
        criteria: [
          {id:"A",text:"Difficulties learning and using academic skills, with at least 1 of: (1) Inaccurate or slow and effortful word reading (2) Difficulty understanding meaning of what is read (3) Difficulties with spelling (4) Difficulties with written expression (5) Difficulties mastering number sense or calculation (6) Difficulties with mathematical reasoning. Persisting for at least 6 months despite interventions."},
          {id:"B",text:"Affected academic skills are substantially and quantifiably below expected for age, causing significant interference with academic/occupational performance."},
          {id:"C",text:"Learning difficulties begin during school-age years but may not become fully manifest until demands exceed capacities."},
          {id:"D",text:"Not better accounted for by intellectual disabilities, uncorrected visual or auditory acuity, other mental or neurological disorders, psychosocial adversity, or inadequate instruction."}
        ],
        specifiers: ["With impairment in reading (dyslexia)","With impairment in written expression (dysgraphia)","With impairment in mathematics (dyscalculia)","Mild","Moderate","Severe"]
      },
      {
        code: "307.23", name: "Tourette's Disorder", nameHe: "תסמונת טורט", icd10: "F95.2",
        criteria: [
          {id:"A",text:"Both multiple motor and one or more vocal tics have been present at some time during the illness, although not necessarily concurrently."},
          {id:"B",text:"The tics may wax and wane in frequency but have persisted for more than 1 year since first tic onset."},
          {id:"C",text:"Onset is before age 18 years."},
          {id:"D",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition."}
        ],
        specifiers: []
      },
      {
        code: "315.4", name: "Developmental Coordination Disorder", nameHe: "הפרעת קואורדינציה התפתחותית", icd10: "F82",
        criteria: [
          {id:"A",text:"The acquisition and execution of coordinated motor skills is substantially below that expected given the individual's chronological age and opportunity for skill learning and use."},
          {id:"B",text:"The motor skills deficit significantly and persistently interferes with activities of daily living appropriate to chronological age and impacts academic/school productivity, prevocational and vocational activities, leisure, and play."},
          {id:"C",text:"Onset of symptoms is in the early developmental period."},
          {id:"D",text:"The motor skills deficits are not better explained by intellectual disability or visual impairment and are not attributable to a neurological condition affecting movement."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Schizophrenia Spectrum and Other Psychotic Disorders - ספקטרום סכיזופרניה והפרעות פסיכוטיות",
    diagnoses: [
      {
        code: "295.90", name: "Schizophrenia", nameHe: "סכיזופרניה", icd10: "F20.9",
        criteria: [
          {id:"A",text:"Two (or more) of the following, each present for a significant portion of time during a 1-month period (or less if successfully treated). At least one must be (1), (2), or (3): (1) Delusions (2) Hallucinations (3) Disorganized speech (4) Grossly disorganized or catatonic behavior (5) Negative symptoms (diminished emotional expression or avolition)."},
          {id:"B",text:"For a significant portion of time since onset, level of functioning in one or more major areas (work, interpersonal relations, self-care) is markedly below the level achieved prior to onset."},
          {id:"C",text:"Continuous signs of the disturbance persist for at least 6 months, including at least 1 month of symptoms meeting Criterion A (active-phase symptoms) and may include periods of prodromal or residual symptoms."},
          {id:"D",text:"Schizoaffective disorder and depressive or bipolar disorder with psychotic features have been ruled out."},
          {id:"E",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition."},
          {id:"F",text:"If there is a history of autism spectrum disorder or a communication disorder of childhood onset, the additional diagnosis of schizophrenia is made only if prominent delusions or hallucinations are also present for at least 1 month."}
        ],
        specifiers: ["First episode currently in acute episode","First episode currently in partial remission","First episode currently in full remission","Multiple episodes currently in acute episode","Multiple episodes currently in partial remission","Multiple episodes currently in full remission","Continuous","Unspecified","With catatonia"]
      },
      {
        code: "295.70", name: "Schizoaffective Disorder", nameHe: "הפרעה סכיזואפקטיבית", icd10: "F25",
        criteria: [
          {id:"A",text:"An uninterrupted period of illness during which there is a major mood episode (major depressive or manic) concurrent with Criterion A of schizophrenia. Note: The major depressive episode must include Criterion A1: Depressed mood."},
          {id:"B",text:"Delusions or hallucinations for 2 or more weeks in the absence of a major mood episode (depressive or manic) during the lifetime duration of the illness."},
          {id:"C",text:"Symptoms that meet criteria for a major mood episode are present for the majority of the total duration of the active and residual portions of the illness."},
          {id:"D",text:"The disturbance is not attributable to the effects of a substance or another medical condition."}
        ],
        specifiers: ["Bipolar type","Depressive type","With catatonia"]
      },
      {
        code: "297.1", name: "Delusional Disorder", nameHe: "הפרעת דלוזיות", icd10: "F22",
        criteria: [
          {id:"A",text:"The presence of one (or more) delusions with a duration of 1 month or longer."},
          {id:"B",text:"Criterion A for schizophrenia has never been met. Note: Hallucinations, if present, are not prominent and are related to the delusional theme."},
          {id:"C",text:"Apart from the impact of the delusion(s) or its ramifications, functioning is not markedly impaired, and behavior is not obviously bizarre or odd."},
          {id:"D",text:"If manic or major depressive episodes have occurred, these have been brief relative to the duration of the delusional periods."},
          {id:"E",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition and is not better explained by another mental disorder."}
        ],
        specifiers: ["Erotomanic type","Grandiose type","Jealous type","Persecutory type","Somatic type","Mixed type","Unspecified type","With bizarre content"]
      },
      {
        code: "298.8", name: "Brief Psychotic Disorder", nameHe: "הפרעה פסיכוטית קצרה", icd10: "F23",
        criteria: [
          {id:"A",text:"Presence of one (or more) of: (1) Delusions (2) Hallucinations (3) Disorganized speech (4) Grossly disorganized or catatonic behavior. Note: At least one symptom must be (1), (2), or (3)."},
          {id:"B",text:"Duration of an episode is at least 1 day but less than 1 month, with eventual full return to premorbid level of functioning."},
          {id:"C",text:"The disturbance is not better explained by major depressive or bipolar disorder with psychotic features, schizoaffective disorder, or schizophrenia, and is not attributable to substance effects or another medical condition."}
        ],
        specifiers: ["With marked stressor(s)","Without marked stressor(s)","With peripartum onset","With catatonia"]
      },
      {
        code: "295.40", name: "Schizophreniform Disorder", nameHe: "הפרעה סכיזופרניפורמית", icd10: "F20.81",
        criteria: [
          {id:"A",text:"Two (or more) of the following, each present for a significant portion of time during a 1-month period. At least one must be (1), (2), or (3): (1) Delusions (2) Hallucinations (3) Disorganized speech (4) Grossly disorganized or catatonic behavior (5) Negative symptoms."},
          {id:"B",text:"An episode of the disorder lasts at least 1 month but less than 6 months."},
          {id:"C",text:"Schizoaffective disorder and mood disorder with psychotic features have been ruled out."},
          {id:"D",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition."}
        ],
        specifiers: ["With good prognostic features","Without good prognostic features","With catatonia"]
      }
    ]
  },
  {
    chapter: "Bipolar and Related Disorders - הפרעות דו-קוטביות",
    diagnoses: [
      {
        code: "296.x", name: "Bipolar I Disorder", nameHe: "הפרעה דו-קוטבית I", icd10: "F31",
        criteria: [
          {id:"A",text:"Criteria have been met for at least one manic episode. The manic episode may have been preceded by and may be followed by hypomanic or major depressive episodes."},
          {id:"Manic Episode A",text:"A distinct period of abnormally and persistently elevated, expansive, or irritable mood and abnormally and persistently increased goal-directed activity or energy, lasting at least 1 week and present most of the day, nearly every day (or any duration if hospitalization is necessary)."},
          {id:"Manic Episode B",text:"During the period of mood disturbance and increased energy/activity, 3 (or more) of the following (4 if mood is only irritable): (1) Inflated self-esteem or grandiosity (2) Decreased need for sleep (3) More talkative than usual or pressure to keep talking (4) Flight of ideas or racing thoughts (5) Distractibility (6) Increase in goal-directed activity or psychomotor agitation (7) Excessive involvement in activities with high potential for painful consequences."},
          {id:"Manic Episode C",text:"The mood disturbance is sufficiently severe to cause marked impairment in social or occupational functioning or to necessitate hospitalization, or there are psychotic features."},
          {id:"Manic Episode D",text:"The episode is not attributable to the physiological effects of a substance or another medical condition."}
        ],
        specifiers: ["Current or most recent episode manic","Current or most recent episode hypomanic","Current or most recent episode depressed","Mild","Moderate","Severe","With psychotic features","In partial remission","In full remission","With anxious distress","With mixed features","With rapid cycling","With melancholic features","With atypical features","With mood-congruent psychotic features","With mood-incongruent psychotic features","With catatonia","With peripartum onset","With seasonal pattern"]
      },
      {
        code: "296.89", name: "Bipolar II Disorder", nameHe: "הפרעה דו-קוטבית II", icd10: "F31.81",
        criteria: [
          {id:"A",text:"Criteria have been met for at least one hypomanic episode and at least one major depressive episode."},
          {id:"B",text:"There has never been a manic episode."},
          {id:"C",text:"The occurrence of the hypomanic episode(s) and the major depressive episode(s) is not better explained by schizoaffective disorder, schizophrenia, schizophreniform disorder, delusional disorder, or other specified or unspecified schizophrenia spectrum and other psychotic disorder."},
          {id:"D",text:"The symptoms of depression or the unpredictability caused by frequent alternation between periods of depression and hypomania causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."}
        ],
        specifiers: ["Current or most recent episode hypomanic","Current or most recent episode depressed","Mild","Moderate","Severe","With psychotic features","In partial remission","In full remission","With anxious distress","With mixed features","With rapid cycling","With peripartum onset","With seasonal pattern"]
      },
      {
        code: "301.13", name: "Cyclothymic Disorder", nameHe: "הפרעה ציקלותימית", icd10: "F34.0",
        criteria: [
          {id:"A",text:"For at least 2 years (1 year in children/adolescents), there have been numerous periods with hypomanic symptoms that do not meet criteria for a hypomanic episode and numerous periods with depressive symptoms that do not meet criteria for a major depressive episode."},
          {id:"B",text:"During the 2-year period (1 year in children/adolescents), the hypomanic and depressive periods have been present for at least half the time and the individual has not been without the symptoms for more than 2 months at a time."},
          {id:"C",text:"Criteria for a major depressive, manic, or hypomanic episode have never been met."},
          {id:"D",text:"The symptoms in Criterion A are not better explained by schizoaffective disorder, schizophrenia, schizophreniform disorder, delusional disorder, or other specified or unspecified schizophrenia spectrum and other psychotic disorder."},
          {id:"E",text:"The symptoms are not attributable to the physiological effects of a substance or another medical condition."},
          {id:"F",text:"The symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."}
        ],
        specifiers: ["With anxious distress"]
      }
    ]
  },
  {
    chapter: "Depressive Disorders - הפרעות דיכאון",
    diagnoses: [
      {
        code: "296.2x/296.3x", name: "Major Depressive Disorder", nameHe: "הפרעת דיכאון מג'ורית", icd10: "F32/F33",
        criteria: [
          {id:"A",text:"Five (or more) of the following symptoms have been present during the same 2-week period and represent a change from previous functioning; at least one of the symptoms is either (1) depressed mood or (2) loss of interest or pleasure: (1) Depressed mood most of the day, nearly every day (2) Markedly diminished interest or pleasure in all, or almost all, activities (3) Significant weight loss when not dieting or weight gain, or decrease/increase in appetite (4) Insomnia or hypersomnia nearly every day (5) Psychomotor agitation or retardation nearly every day (observable by others) (6) Fatigue or loss of energy nearly every day (7) Feelings of worthlessness or excessive/inappropriate guilt (8) Diminished ability to think or concentrate, or indecisiveness (9) Recurrent thoughts of death, recurrent suicidal ideation, or a suicide attempt or plan."},
          {id:"B",text:"The symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"C",text:"The episode is not attributable to the physiological effects of a substance or another medical condition."},
          {id:"D",text:"The occurrence of the major depressive episode is not better explained by schizoaffective disorder, schizophrenia, schizophreniform disorder, delusional disorder, or other specified and unspecified schizophrenia spectrum and other psychotic disorders."},
          {id:"E",text:"There has never been a manic episode or a hypomanic episode (does not apply if all manic-like or hypomanic-like episodes are substance/medication-induced or attributable to another medical condition)."}
        ],
        specifiers: ["Single episode","Recurrent episode","Mild","Moderate","Severe","With psychotic features","In partial remission","In full remission","With anxious distress","With mixed features","With melancholic features","With atypical features","With mood-congruent psychotic features","With mood-incongruent psychotic features","With catatonia","With peripartum onset","With seasonal pattern"]
      },
      {
        code: "300.4", name: "Persistent Depressive Disorder (Dysthymia)", nameHe: "הפרעה דיכאונית מתמשכת (דיסתימיה)", icd10: "F34.1",
        criteria: [
          {id:"A",text:"Depressed mood for most of the day, for more days than not, as indicated either by subjective account or observation by others, for at least 2 years (1 year for children/adolescents)."},
          {id:"B",text:"Presence, while depressed, of two (or more) of: (1) Poor appetite or overeating (2) Insomnia or hypersomnia (3) Low energy or fatigue (4) Low self-esteem (5) Poor concentration or difficulty making decisions (6) Feelings of hopelessness."},
          {id:"C",text:"During the 2-year period (1 year for children/adolescents), the individual has never been without the symptoms in Criteria A and B for more than 2 months at a time."},
          {id:"D",text:"Criteria for a major depressive disorder may be continuously present for 2 years."},
          {id:"E",text:"There has never been a manic episode or a hypomanic episode, and criteria have never been met for cyclothymic disorder."},
          {id:"F",text:"The disturbance is not better explained by a persistent schizoaffective disorder, schizophrenia, delusional disorder, or other specified or unspecified schizophrenia spectrum and other psychotic disorder."},
          {id:"G",text:"The symptoms are not attributable to the physiological effects of a substance or another medical condition."},
          {id:"H",text:"The symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."}
        ],
        specifiers: ["With anxious distress","With mixed features","With melancholic features","With atypical features","With mood-congruent psychotic features","With mood-incongruent psychotic features","With peripartum onset","Early onset (before age 21)","Late onset (age 21 or older)","With pure dysthymic syndrome","With persistent major depressive episode","With intermittent major depressive episodes","Mild","Moderate","Severe"]
      },
      {
        code: "296.99", name: "Disruptive Mood Dysregulation Disorder", nameHe: "הפרעת ויסות מצב-רוח הרסנית", icd10: "F34.81",
        criteria: [
          {id:"A",text:"Severe recurrent temper outbursts manifested verbally and/or behaviorally that are grossly out of proportion in intensity or duration to the situation or provocation."},
          {id:"B",text:"The temper outbursts are inconsistent with developmental level."},
          {id:"C",text:"The temper outbursts occur, on average, three or more times per week."},
          {id:"D",text:"The mood between temper outbursts is persistently irritable or angry most of the day, nearly every day, and is observable by others (parents, teachers, peers)."},
          {id:"E",text:"Criteria A-D have been present for 12 or more months. Throughout that time, the individual has not had a period lasting 3 or more consecutive months without all of the symptoms in Criteria A-D."},
          {id:"F",text:"Criteria A and D are present in at least two of three settings (home, school, with peers) and are severe in at least one of these."},
          {id:"G",text:"The diagnosis should not be made for the first time before age 6 years or after age 18 years."},
          {id:"H",text:"By history or observation, the age at onset of Criteria A-E is before 10 years."},
          {id:"I",text:"There has never been a distinct period lasting more than 1 day during which the full symptom criteria, except duration, for a manic or hypomanic episode have been met."},
          {id:"J",text:"The behaviors do not occur exclusively during an episode of major depressive disorder and are not better explained by another mental disorder."},
          {id:"K",text:"The symptoms are not attributable to the physiological effects of a substance or another medical or neurological condition."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Anxiety Disorders - הפרעות חרדה",
    diagnoses: [
      {
        code: "300.02", name: "Generalized Anxiety Disorder", nameHe: "הפרעת חרדה מוכללת", icd10: "F41.1",
        criteria: [
          {id:"A",text:"Excessive anxiety and worry (apprehensive expectation), occurring more days than not for at least 6 months, about a number of events or activities (such as work or school performance)."},
          {id:"B",text:"The individual finds it difficult to control the worry."},
          {id:"C",text:"The anxiety and worry are associated with three (or more) of the following six symptoms (with at least some symptoms present more days than not for the past 6 months; only one item is required in children): (1) Restlessness or feeling keyed up or on edge (2) Being easily fatigued (3) Difficulty concentrating or mind going blank (4) Irritability (5) Muscle tension (6) Sleep disturbance."},
          {id:"D",text:"The anxiety, worry, or physical symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"E",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition."},
          {id:"F",text:"The disturbance is not better explained by another mental disorder."}
        ],
        specifiers: []
      },
      {
        code: "300.01", name: "Panic Disorder", nameHe: "הפרעת פאניקה", icd10: "F41.0",
        criteria: [
          {id:"A",text:"Recurrent unexpected panic attacks. A panic attack is an abrupt surge of intense fear or intense discomfort that reaches a peak within minutes, and during which time four (or more) of the following symptoms occur: (1) Palpitations, pounding heart, or accelerated heart rate (2) Sweating (3) Trembling or shaking (4) Sensations of shortness of breath or smothering (5) Feelings of choking (6) Chest pain or discomfort (7) Nausea or abdominal distress (8) Feeling dizzy, unsteady, light-headed, or faint (9) Chills or heat sensations (10) Paresthesias (numbness or tingling) (11) Derealization or depersonalization (12) Fear of losing control or going crazy (13) Fear of dying."},
          {id:"B",text:"At least one of the attacks has been followed by 1 month (or more) of one or both of: (1) Persistent concern or worry about additional panic attacks or their consequences (2) A significant maladaptive change in behavior related to the attacks (e.g., avoidance of exercise or unfamiliar situations)."},
          {id:"C",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition."},
          {id:"D",text:"The disturbance is not better explained by another mental disorder."}
        ],
        specifiers: []
      },
      {
        code: "300.23", name: "Social Anxiety Disorder (Social Phobia)", nameHe: "הפרעת חרדה חברתית (פוביה חברתית)", icd10: "F40.10",
        criteria: [
          {id:"A",text:"Marked fear or anxiety about one or more social situations in which the individual is exposed to possible scrutiny by others. Examples include social interactions, being observed, and performing in front of others."},
          {id:"B",text:"The individual fears that he or she will act in a way or show anxiety symptoms that will be negatively evaluated (will be humiliating or embarrassing; will lead to rejection or offend others)."},
          {id:"C",text:"The social situations almost always provoke fear or anxiety."},
          {id:"D",text:"The social situations are avoided or endured with intense fear or anxiety."},
          {id:"E",text:"The fear or anxiety is out of proportion to the actual threat posed by the social situation and to the sociocultural context."},
          {id:"F",text:"The fear, anxiety, or avoidance is persistent, typically lasting for 6 months or more."},
          {id:"G",text:"The fear, anxiety, or avoidance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"H",text:"The fear, anxiety, or avoidance is not attributable to the physiological effects of a substance or another medical condition."},
          {id:"I",text:"The fear, anxiety, or avoidance is not better explained by the symptoms of another mental disorder."},
          {id:"J",text:"If another medical condition is present, the fear, anxiety, or avoidance is clearly unrelated or is excessive."}
        ],
        specifiers: ["Performance only"]
      },
      {
        code: "300.29", name: "Specific Phobia", nameHe: "פוביה ספציפית", icd10: "F40.2",
        criteria: [
          {id:"A",text:"Marked fear or anxiety about a specific object or situation (e.g., flying, heights, animals, receiving an injection, seeing blood)."},
          {id:"B",text:"The phobic object or situation almost always provokes immediate fear or anxiety."},
          {id:"C",text:"The phobic object or situation is actively avoided or endured with intense fear or anxiety."},
          {id:"D",text:"The fear or anxiety is out of proportion to the actual danger posed by the specific object or situation and to the sociocultural context."},
          {id:"E",text:"The fear, anxiety, or avoidance is persistent, typically lasting for 6 months or more."},
          {id:"F",text:"The fear, anxiety, or avoidance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"G",text:"The disturbance is not better explained by the symptoms of another mental disorder."}
        ],
        specifiers: ["Animal","Natural environment","Blood-injection-injury","Situational","Other"]
      },
      {
        code: "300.22", name: "Agoraphobia", nameHe: "אגורפוביה", icd10: "F40.00",
        criteria: [
          {id:"A",text:"Marked fear or anxiety about two (or more) of the following five situations: (1) Using public transportation (2) Being in open spaces (3) Being in enclosed places (4) Standing in line or being in a crowd (5) Being outside of the home alone."},
          {id:"B",text:"The individual fears or avoids these situations because of thoughts that escape might be difficult or help might not be available in the event of developing panic-like symptoms or other incapacitating or embarrassing symptoms."},
          {id:"C",text:"The agoraphobic situations almost always provoke fear or anxiety."},
          {id:"D",text:"The agoraphobic situations are actively avoided, require the presence of a companion, or are endured with intense fear or anxiety."},
          {id:"E",text:"The fear or anxiety is out of proportion to the actual danger posed by the agoraphobic situations and to the sociocultural context."},
          {id:"F",text:"The fear, anxiety, or avoidance is persistent, typically lasting for 6 months or more."},
          {id:"G",text:"The fear, anxiety, or avoidance causes clinically significant distress or impairment."},
          {id:"H",text:"If another medical condition is present, the fear, anxiety, or avoidance is clearly excessive."},
          {id:"I",text:"The fear, anxiety, or avoidance is not better explained by the symptoms of another mental disorder."}
        ],
        specifiers: []
      },
      {
        code: "309.21", name: "Separation Anxiety Disorder", nameHe: "הפרעת חרדת נטישה/פרידה", icd10: "F93.0",
        criteria: [
          {id:"A",text:"Developmentally inappropriate and excessive fear or anxiety concerning separation from those to whom the individual is attached, as evidenced by at least three of: (1) Recurrent excessive distress when anticipating or experiencing separation from home or from major attachment figures (2) Persistent and excessive worry about losing major attachment figures or about possible harm to them (3) Persistent and excessive worry about experiencing an untoward event that causes separation (4) Persistent reluctance or refusal to go out, away from home, to school, to work, or elsewhere because of fear of separation (5) Persistent and excessive fear of or reluctance about being alone at home or in other settings without major attachment figures (6) Persistent reluctance or refusal to sleep away from home or to go to sleep without being near a major attachment figure (7) Repeated nightmares involving the theme of separation (8) Repeated complaints of physical symptoms when separation occurs or is anticipated."},
          {id:"B",text:"The fear, anxiety, or avoidance is persistent, lasting at least 4 weeks in children and adolescents and typically 6 months or more in adults."},
          {id:"C",text:"The disturbance causes clinically significant distress or impairment in social, academic, occupational, or other important areas of functioning."},
          {id:"D",text:"The disturbance is not better explained by another mental disorder."}
        ],
        specifiers: []
      },
      {
        code: "312.23", name: "Selective Mutism", nameHe: "אילמות סלקטיבית", icd10: "F94.0",
        criteria: [
          {id:"A",text:"Consistent failure to speak in specific social situations in which there is an expectation for speaking (e.g., at school), despite speaking in other situations."},
          {id:"B",text:"The disturbance interferes with educational or occupational achievement or with social communication."},
          {id:"C",text:"The duration of the disturbance is at least 1 month (not limited to the first month of school)."},
          {id:"D",text:"The failure to speak is not attributable to a lack of knowledge of, or comfort with, the spoken language required in the social situation."},
          {id:"E",text:"The disturbance is not better explained by a communication disorder and does not occur exclusively during the course of autism spectrum disorder, schizophrenia, or another psychotic disorder."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Obsessive-Compulsive and Related Disorders - הפרעות אובססיביות-קומפולסיביות",
    diagnoses: [
      {
        code: "300.3", name: "Obsessive-Compulsive Disorder (OCD)", nameHe: "הפרעה טורדנית-כפייתית (OCD)", icd10: "F42.2",
        criteria: [
          {id:"A",text:"Presence of obsessions, compulsions, or both. Obsessions: (1) Recurrent and persistent thoughts, urges, or images that are experienced as intrusive and unwanted and cause marked anxiety or distress (2) The individual attempts to ignore or suppress such thoughts, urges, or images, or to neutralize them with some other thought or action. Compulsions: (1) Repetitive behaviors (hand washing, ordering, checking) or mental acts (praying, counting, repeating words silently) that the individual feels driven to perform in response to an obsession or according to rigid rules (2) The behaviors or mental acts are aimed at preventing or reducing anxiety or distress or preventing some dreaded event or situation; however, they are not connected in a realistic way or are clearly excessive."},
          {id:"B",text:"The obsessions or compulsions are time-consuming (e.g., take more than 1 hour per day) or cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"C",text:"The obsessive-compulsive symptoms are not attributable to the physiological effects of a substance or another medical condition."},
          {id:"D",text:"The disturbance is not better explained by the symptoms of another mental disorder."}
        ],
        specifiers: ["With good or fair insight","With poor insight","With absent insight/delusional beliefs","Tic-related"]
      },
      {
        code: "300.7", name: "Body Dysmorphic Disorder", nameHe: "הפרעה דיסמורפית של הגוף", icd10: "F45.22",
        criteria: [
          {id:"A",text:"Preoccupation with one or more perceived defects or flaws in physical appearance that are not observable or appear slight to others."},
          {id:"B",text:"At some point during the course of the disorder, the individual has performed repetitive behaviors (mirror checking, excessive grooming, skin picking, reassurance seeking) or mental acts (comparing his or her appearance with that of others) in response to the appearance concerns."},
          {id:"C",text:"The preoccupation causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"D",text:"The appearance preoccupation is not better explained by concerns with body fat or weight in an individual whose symptoms meet diagnostic criteria for an eating disorder."}
        ],
        specifiers: ["With muscle dysmorphia","With good or fair insight","With poor insight","With absent insight/delusional beliefs"]
      },
      {
        code: "300.3", name: "Hoarding Disorder", nameHe: "הפרעת אגרנות", icd10: "F42.3",
        criteria: [
          {id:"A",text:"Persistent difficulty discarding or parting with possessions, regardless of their actual value."},
          {id:"B",text:"This difficulty is due to a perceived need to save the items and to distress associated with discarding them."},
          {id:"C",text:"The difficulty discarding possessions results in the accumulation of possessions that congest and clutter active living areas and substantially compromises their intended use."},
          {id:"D",text:"The hoarding causes clinically significant distress or impairment in social, occupational, or other important areas of functioning (including maintaining a safe environment for self and others)."},
          {id:"E",text:"The hoarding is not attributable to another medical condition."},
          {id:"F",text:"The hoarding is not better explained by the symptoms of another mental disorder."}
        ],
        specifiers: ["With excessive acquisition","With good or fair insight","With poor insight","With absent insight/delusional beliefs"]
      },
      {
        code: "312.39", name: "Trichotillomania (Hair-Pulling Disorder)", nameHe: "טריכוטילומניה (הפרעת תלישת שיער)", icd10: "F63.3",
        criteria: [
          {id:"A",text:"Recurrent pulling out of one's hair, resulting in hair loss."},
          {id:"B",text:"Repeated attempts to decrease or stop hair pulling."},
          {id:"C",text:"The hair pulling causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"D",text:"The hair pulling or hair loss is not attributable to another medical condition."},
          {id:"E",text:"The hair pulling is not better explained by the symptoms of another mental disorder."}
        ],
        specifiers: []
      },
      {
        code: "698.4", name: "Excoriation (Skin-Picking) Disorder", nameHe: "הפרעת קילוף עור", icd10: "L98.1",
        criteria: [
          {id:"A",text:"Recurrent skin picking resulting in skin lesions."},
          {id:"B",text:"Repeated attempts to decrease or stop skin picking."},
          {id:"C",text:"The skin picking causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"D",text:"The skin picking is not attributable to the physiological effects of a substance or another medical condition."},
          {id:"E",text:"The skin picking is not better explained by symptoms of another mental disorder."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Trauma- and Stressor-Related Disorders - הפרעות הקשורות לטראומה ולחץ",
    diagnoses: [
      {
        code: "309.81", name: "Posttraumatic Stress Disorder (PTSD)", nameHe: "הפרעת דחק פוסט-טראומטית (PTSD)", icd10: "F43.10",
        criteria: [
          {id:"A",text:"Exposure to actual or threatened death, serious injury, or sexual violence in one (or more) of the following ways: (1) Directly experiencing the traumatic event(s) (2) Witnessing, in person, the event(s) as it occurred to others (3) Learning that the traumatic event(s) occurred to a close family member or close friend (4) Experiencing repeated or extreme exposure to aversive details of the traumatic event(s)."},
          {id:"B",text:"Intrusion symptoms associated with the traumatic event(s), beginning after the traumatic event(s) occurred, one (or more) of: (1) Recurrent, involuntary, and intrusive distressing memories (2) Recurrent distressing dreams related to the event(s) (3) Dissociative reactions (flashbacks) (4) Intense or prolonged psychological distress at exposure to cues (5) Marked physiological reactions to cues that symbolize or resemble an aspect of the traumatic event(s)."},
          {id:"C",text:"Persistent avoidance of stimuli associated with the traumatic event(s), beginning after the traumatic event(s) occurred, one or both of: (1) Avoidance of or efforts to avoid distressing memories, thoughts, or feelings (2) Avoidance of or efforts to avoid external reminders (people, places, conversations, activities, objects, situations)."},
          {id:"D",text:"Negative alterations in cognitions and mood associated with the traumatic event(s), two (or more) of: (1) Inability to remember an important aspect of the traumatic event(s) (2) Persistent and exaggerated negative beliefs about oneself, others, or the world (3) Persistent distorted cognitions about the cause or consequences of the event(s) (4) Persistent negative emotional state (5) Markedly diminished interest or participation in significant activities (6) Feelings of detachment or estrangement from others (7) Persistent inability to experience positive emotions."},
          {id:"E",text:"Marked alterations in arousal and reactivity associated with the traumatic event(s), two (or more) of: (1) Irritable behavior and angry outbursts (2) Reckless or self-destructive behavior (3) Hypervigilance (4) Exaggerated startle response (5) Problems with concentration (6) Sleep disturbance."},
          {id:"F",text:"Duration of the disturbance (Criteria B, C, D, and E) is more than 1 month."},
          {id:"G",text:"The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"H",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition."}
        ],
        specifiers: ["With dissociative symptoms (depersonalization/derealization)","With delayed expression (full criteria not met until at least 6 months after the event)"]
      },
      {
        code: "308.3", name: "Acute Stress Disorder", nameHe: "הפרעת דחק חריפה", icd10: "F43.0",
        criteria: [
          {id:"A",text:"Exposure to actual or threatened death, serious injury, or sexual violence (same as PTSD Criterion A)."},
          {id:"B",text:"Presence of nine (or more) of the following symptoms from any of the five categories of intrusion, negative mood, dissociation, avoidance, and arousal, beginning or worsening after the traumatic event(s): Intrusion: (1) Recurrent involuntary intrusive distressing memories (2) Recurrent distressing dreams (3) Dissociative reactions (flashbacks) (4) Intense/prolonged psychological distress or physiological reactivity to reminders. Negative mood: (5) Persistent inability to experience positive emotions. Dissociative: (6) Altered sense of reality (7) Inability to remember important aspect of event(s). Avoidance: (8) Efforts to avoid distressing memories/thoughts (9) Efforts to avoid external reminders. Arousal: (10) Sleep disturbance (11) Irritable behavior (12) Hypervigilance (13) Difficulty concentrating (14) Exaggerated startle response."},
          {id:"C",text:"Duration of the disturbance is 3 days to 1 month after trauma exposure."},
          {id:"D",text:"The disturbance causes clinically significant distress or impairment."},
          {id:"E",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition and is not better explained by brief psychotic disorder."}
        ],
        specifiers: []
      },
      {
        code: "309.x", name: "Adjustment Disorders", nameHe: "הפרעות הסתגלות", icd10: "F43.2x",
        criteria: [
          {id:"A",text:"The development of emotional or behavioral symptoms in response to an identifiable stressor(s) occurring within 3 months of the onset of the stressor(s)."},
          {id:"B",text:"These symptoms or behaviors are clinically significant, as evidenced by one or both of: (1) Marked distress that is out of proportion to the severity or intensity of the stressor (2) Significant impairment in social, occupational, or other important areas of functioning."},
          {id:"C",text:"The stress-related disturbance does not meet the criteria for another mental disorder and is not merely an exacerbation of a preexisting mental disorder."},
          {id:"D",text:"The symptoms do not represent normal bereavement."},
          {id:"E",text:"Once the stressor or its consequences have terminated, the symptoms do not persist for more than an additional 6 months."}
        ],
        specifiers: ["With depressed mood","With anxiety","With mixed anxiety and depressed mood","With disturbance of conduct","With mixed disturbance of emotions and conduct","Unspecified"]
      },
      {
        code: "313.89", name: "Reactive Attachment Disorder", nameHe: "הפרעת קשר תגובתית", icd10: "F94.1",
        criteria: [
          {id:"A",text:"A consistent pattern of inhibited, emotionally withdrawn behavior toward adult caregivers, manifested by both: (1) The child rarely or minimally seeks comfort when distressed (2) The child rarely or minimally responds to comfort when distressed."},
          {id:"B",text:"A persistent social and emotional disturbance characterized by at least two of: (1) Minimal social and emotional responsiveness to others (2) Limited positive affect (3) Episodes of unexplained irritability, sadness, or fearfulness that are evident even during nonthreatening interactions with adult caregivers."},
          {id:"C",text:"The child has experienced a pattern of extremes of insufficient care, as evidenced by at least one of: (1) Social neglect or deprivation (2) Repeated changes of primary caregivers (3) Rearing in unusual settings that severely limit opportunities to form selective attachments."},
          {id:"D",text:"The care in Criterion C is presumed to be responsible for the disturbed behavior in Criterion A."},
          {id:"E",text:"The criteria are not met for autism spectrum disorder."},
          {id:"F",text:"The disturbance is evident before age 5 years."},
          {id:"G",text:"The child has a developmental age of at least 9 months."}
        ],
        specifiers: ["Persistent","Severe"]
      },
      {
        code: "313.89", name: "Disinhibited Social Engagement Disorder", nameHe: "הפרעת מעורבות חברתית בלתי מעוכבת", icd10: "F94.2",
        criteria: [
          {id:"A",text:"A pattern of behavior in which a child actively approaches and interacts with unfamiliar adults and exhibits at least two of: (1) Reduced or absent reticence in approaching and interacting with unfamiliar adults (2) Overly familiar verbal or physical behavior (3) Diminished or absent checking back with adult caregiver after venturing away (4) Willingness to go off with an unfamiliar adult with minimal or no hesitation."},
          {id:"B",text:"The behaviors in Criterion A are not limited to impulsivity but include socially disinhibited behavior."},
          {id:"C",text:"The child has experienced a pattern of extremes of insufficient care (same as RAD Criterion C)."},
          {id:"D",text:"The care in Criterion C is presumed to be responsible for the disturbed behavior in Criterion A."},
          {id:"E",text:"The child has a developmental age of at least 9 months."}
        ],
        specifiers: ["Persistent","Severe"]
      }
    ]
  },
  {
    chapter: "Dissociative Disorders - הפרעות דיסוציאטיביות",
    diagnoses: [
      {
        code: "300.14", name: "Dissociative Identity Disorder", nameHe: "הפרעת זהות דיסוציאטיבית", icd10: "F44.81",
        criteria: [
          {id:"A",text:"Disruption of identity characterized by two or more distinct personality states, which may be described in some cultures as an experience of possession. The disruption in identity involves marked discontinuity in sense of self and sense of agency, accompanied by related alterations in affect, behavior, consciousness, memory, perception, cognition, and/or sensory-motor functioning."},
          {id:"B",text:"Recurrent gaps in the recall of everyday events, important personal information, and/or traumatic events that are inconsistent with ordinary forgetting."},
          {id:"C",text:"The symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"D",text:"The disturbance is not a normal part of a broadly accepted cultural or religious practice."},
          {id:"E",text:"The symptoms are not attributable to the physiological effects of a substance or another medical condition."}
        ],
        specifiers: []
      },
      {
        code: "300.12", name: "Dissociative Amnesia", nameHe: "אמנזיה דיסוציאטיבית", icd10: "F44.0",
        criteria: [
          {id:"A",text:"An inability to recall important autobiographical information, usually of a traumatic or stressful nature, that is inconsistent with ordinary forgetting."},
          {id:"B",text:"The symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"C",text:"The disturbance is not attributable to the physiological effects of a substance or another medical or neurological condition."},
          {id:"D",text:"The disturbance is not better explained by dissociative identity disorder, posttraumatic stress disorder, acute stress disorder, somatic symptom disorder, or major or mild neurocognitive disorder."}
        ],
        specifiers: ["With dissociative fugue"]
      },
      {
        code: "300.6", name: "Depersonalization/Derealization Disorder", nameHe: "הפרעת דה-פרסונליזציה/דה-ריאליזציה", icd10: "F48.1",
        criteria: [
          {id:"A",text:"The presence of persistent or recurrent experiences of depersonalization, derealization, or both: Depersonalization: Experiences of unreality, detachment, or being an outside observer with respect to one's thoughts, feelings, sensations, body, or actions. Derealization: Experiences of unreality or detachment with respect to surroundings."},
          {id:"B",text:"During the depersonalization or derealization experiences, reality testing remains intact."},
          {id:"C",text:"The symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."},
          {id:"D",text:"The disturbance is not attributable to the physiological effects of a substance or another medical condition."},
          {id:"E",text:"The disturbance is not better explained by another mental disorder."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Somatic Symptom and Related Disorders - הפרעות סימפטום סומטי",
    diagnoses: [
      {
        code: "300.82", name: "Somatic Symptom Disorder", nameHe: "הפרעת סימפטום סומטי", icd10: "F45.1",
        criteria: [
          {id:"A",text:"One or more somatic symptoms that are distressing or result in significant disruption of daily life."},
          {id:"B",text:"Excessive thoughts, feelings, or behaviors related to the somatic symptoms or associated health concerns as manifested by at least one of: (1) Disproportionate and persistent thoughts about the seriousness of one's symptoms (2) Persistently high level of anxiety about health or symptoms (3) Excessive time and energy devoted to these symptoms or health concerns."},
          {id:"C",text:"Although any one somatic symptom may not be continuously present, the state of being symptomatic is persistent (typically more than 6 months)."}
        ],
        specifiers: ["With predominant pain","Persistent","Mild","Moderate","Severe"]
      },
      {
        code: "300.7", name: "Illness Anxiety Disorder", nameHe: "הפרעת חרדת מחלה (היפוכונדריה)", icd10: "F45.21",
        criteria: [
          {id:"A",text:"Preoccupation with having or acquiring a serious illness."},
          {id:"B",text:"Somatic symptoms are not present or, if present, are only mild in intensity. If another medical condition is present or there is a high risk for developing a medical condition, the preoccupation is clearly excessive or disproportionate."},
          {id:"C",text:"There is a high level of anxiety about health, and the individual is easily alarmed about personal health status."},
          {id:"D",text:"The individual performs excessive health-related behaviors (e.g., repeatedly checks body for signs of illness) or exhibits maladaptive avoidance (e.g., avoids doctor appointments and hospitals)."},
          {id:"E",text:"Illness preoccupation has been present for at least 6 months, but the specific illness that is feared may change over that period of time."},
          {id:"F",text:"The illness-related preoccupation is not better explained by another mental disorder."}
        ],
        specifiers: ["Care-seeking type","Care-avoidant type"]
      },
      {
        code: "300.11", name: "Conversion Disorder (Functional Neurological Symptom Disorder)", nameHe: "הפרעת המרה (הפרעת סימפטום נוירולוגי תפקודי)", icd10: "F44.4",
        criteria: [
          {id:"A",text:"One or more symptoms of altered voluntary motor or sensory function."},
          {id:"B",text:"Clinical findings provide evidence of incompatibility between the symptom and recognized neurological or medical conditions."},
          {id:"C",text:"The symptom or deficit is not better explained by another medical or mental disorder."},
          {id:"D",text:"The symptom or deficit causes clinically significant distress or impairment in social, occupational, or other important areas of functioning or warrants medical evaluation."}
        ],
        specifiers: ["With weakness or paralysis","With abnormal movement","With swallowing symptoms","With speech symptom","With attacks or seizures","With anesthesia or sensory loss","With special sensory symptom","With mixed symptoms","Acute episode","Persistent","With psychological stressor","Without psychological stressor"]
      }
    ]
  },
  {
    chapter: "Feeding and Eating Disorders - הפרעות אכילה",
    diagnoses: [
      {
        code: "307.1", name: "Anorexia Nervosa", nameHe: "אנורקסיה נרבוזה", icd10: "F50.0",
        criteria: [
          {id:"A",text:"Restriction of energy intake relative to requirements, leading to a significantly low body weight in the context of age, sex, developmental trajectory, and physical health. Significantly low weight is defined as a weight that is less than minimally normal or, for children and adolescents, less than minimally expected."},
          {id:"B",text:"Intense fear of gaining weight or of becoming fat, or persistent behavior that interferes with weight gain, even though at a significantly low weight."},
          {id:"C",text:"Disturbance in the way in which one's body weight or shape is experienced, undue influence of body weight or shape on self-evaluation, or persistent lack of recognition of the seriousness of the current low body weight."}
        ],
        specifiers: ["Restricting type","Binge-eating/purging type","In partial remission","In full remission","Mild (BMI >= 17)","Moderate (BMI 16-16.99)","Severe (BMI 15-15.99)","Extreme (BMI < 15)"]
      },
      {
        code: "307.51", name: "Bulimia Nervosa", nameHe: "בולימיה נרבוזה", icd10: "F50.2",
        criteria: [
          {id:"A",text:"Recurrent episodes of binge eating. An episode of binge eating is characterized by both: (1) Eating, in a discrete period of time, an amount of food that is definitely larger than what most individuals would eat in a similar period of time under similar circumstances (2) A sense of lack of control over eating during the episode."},
          {id:"B",text:"Recurrent inappropriate compensatory behaviors in order to prevent weight gain, such as self-induced vomiting; misuse of laxatives, diuretics, or other medications; fasting; or excessive exercise."},
          {id:"C",text:"The binge eating and inappropriate compensatory behaviors both occur, on average, at least once a week for 3 months."},
          {id:"D",text:"Self-evaluation is unduly influenced by body shape and weight."},
          {id:"E",text:"The disturbance does not occur exclusively during episodes of anorexia nervosa."}
        ],
        specifiers: ["In partial remission","In full remission","Mild (1-3 episodes/week)","Moderate (4-7 episodes/week)","Severe (8-13 episodes/week)","Extreme (14+ episodes/week)"]
      },
      {
        code: "307.51", name: "Binge-Eating Disorder", nameHe: "הפרעת אכילה כפייתית", icd10: "F50.81",
        criteria: [
          {id:"A",text:"Recurrent episodes of binge eating. An episode of binge eating is characterized by both: (1) Eating, in a discrete period of time, an amount of food that is definitely larger than what most people would eat in a similar period of time under similar circumstances (2) A sense of lack of control over eating during the episode."},
          {id:"B",text:"The binge-eating episodes are associated with three (or more) of: (1) Eating much more rapidly than normal (2) Eating until feeling uncomfortably full (3) Eating large amounts of food when not feeling physically hungry (4) Eating alone because of feeling embarrassed by how much one is eating (5) Feeling disgusted with oneself, depressed, or very guilty afterward."},
          {id:"C",text:"Marked distress regarding binge eating is present."},
          {id:"D",text:"The binge eating occurs, on average, at least once a week for 3 months."},
          {id:"E",text:"The binge eating is not associated with the recurrent use of inappropriate compensatory behavior as in bulimia nervosa and does not occur exclusively during the course of bulimia nervosa or anorexia nervosa."}
        ],
        specifiers: ["In partial remission","In full remission","Mild (1-3 episodes/week)","Moderate (4-7 episodes/week)","Severe (8-13 episodes/week)","Extreme (14+ episodes/week)"]
      },
      {
        code: "307.59", name: "Avoidant/Restrictive Food Intake Disorder (ARFID)", nameHe: "הפרעת צריכת מזון נמנעת/מגבילה (ARFID)", icd10: "F50.82",
        criteria: [
          {id:"A",text:"An eating or feeding disturbance (e.g., apparent lack of interest in eating or food; avoidance based on the sensory characteristics of food; concern about aversive consequences of eating) as manifested by persistent failure to meet appropriate nutritional and/or energy needs associated with one (or more) of: (1) Significant weight loss (or failure to achieve expected weight gain or faltering growth in children) (2) Significant nutritional deficiency (3) Dependence on enteral feeding or oral nutritional supplements (4) Marked interference with psychosocial functioning."},
          {id:"B",text:"The disturbance is not better explained by lack of available food or by an associated culturally sanctioned practice."},
          {id:"C",text:"The eating disturbance does not occur exclusively during the course of anorexia nervosa or bulimia nervosa, and there is no evidence of a disturbance in the way in which one's body weight or shape is experienced."},
          {id:"D",text:"The eating disturbance is not attributable to a concurrent medical condition or not better explained by another mental disorder."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Sleep-Wake Disorders - הפרעות שינה-ערות",
    diagnoses: [
      {
        code: "780.52", name: "Insomnia Disorder", nameHe: "הפרעת נדודי שינה", icd10: "F51.01",
        criteria: [
          {id:"A",text:"A predominant complaint of dissatisfaction with sleep quantity or quality, associated with one (or more) of: (1) Difficulty initiating sleep (2) Difficulty maintaining sleep, characterized by frequent awakenings or problems returning to sleep after awakenings (3) Early-morning awakening with inability to return to sleep."},
          {id:"B",text:"The sleep disturbance causes clinically significant distress or impairment in social, occupational, educational, academic, behavioral, or other important areas of functioning."},
          {id:"C",text:"The sleep difficulty occurs at least 3 nights per week."},
          {id:"D",text:"The sleep difficulty is present for at least 3 months."},
          {id:"E",text:"The sleep difficulty occurs despite adequate opportunity for sleep."},
          {id:"F",text:"The insomnia is not better explained by and does not occur exclusively during the course of another sleep-wake disorder."},
          {id:"G",text:"The insomnia is not attributable to the physiological effects of a substance."},
          {id:"H",text:"Coexisting mental disorders and medical conditions do not adequately explain the predominant complaint of insomnia."}
        ],
        specifiers: ["Episodic (at least 1 month but less than 3 months)","Persistent (3 months or more)","Recurrent (two or more episodes within the space of 1 year)"]
      },
      {
        code: "780.54", name: "Hypersomnolence Disorder", nameHe: "הפרעת היפרסומנולנציה", icd10: "F51.11",
        criteria: [
          {id:"A",text:"Self-reported excessive sleepiness (hypersomnolence) despite a main sleep period lasting at least 7 hours, with at least one of: (1) Recurrent periods of sleep or lapses into sleep within the same day (2) A prolonged main sleep episode of more than 9 hours per day that is nonrestorative (3) Difficulty being fully awake after abrupt awakening."},
          {id:"B",text:"The hypersomnolence occurs at least three times per week, for at least 3 months."},
          {id:"C",text:"The hypersomnolence is accompanied by significant distress or impairment in cognitive, social, occupational, or other important areas of functioning."},
          {id:"D",text:"The hypersomnolence is not better explained by and does not occur exclusively during the course of another sleep disorder."},
          {id:"E",text:"The hypersomnolence is not attributable to the physiological effects of a substance."},
          {id:"F",text:"Coexisting mental and medical disorders do not adequately explain the predominant complaint of hypersomnolence."}
        ],
        specifiers: ["Acute (less than 1 month)","Subacute (1-3 months)","Persistent (more than 3 months)","Mild","Moderate","Severe"]
      }
    ]
  },
  {
    chapter: "Substance-Related and Addictive Disorders - הפרעות הקשורות לחומרים והתמכרויות",
    diagnoses: [
      {
        code: "303.90", name: "Alcohol Use Disorder", nameHe: "הפרעת שימוש באלכוהול", icd10: "F10.x",
        criteria: [
          {id:"A",text:"A problematic pattern of alcohol use leading to clinically significant impairment or distress, as manifested by at least two of the following, occurring within a 12-month period: (1) Alcohol often taken in larger amounts or over a longer period than was intended (2) Persistent desire or unsuccessful efforts to cut down or control alcohol use (3) A great deal of time spent in activities necessary to obtain alcohol, use alcohol, or recover from its effects (4) Craving, or a strong desire or urge to use alcohol (5) Recurrent alcohol use resulting in a failure to fulfill major role obligations at work, school, or home (6) Continued alcohol use despite having persistent or recurrent social or interpersonal problems caused or exacerbated by the effects of alcohol (7) Important social, occupational, or recreational activities are given up or reduced because of alcohol use (8) Recurrent alcohol use in situations in which it is physically hazardous (9) Alcohol use is continued despite knowledge of having a persistent or recurrent physical or psychological problem that is likely to have been caused or exacerbated by alcohol (10) Tolerance (11) Withdrawal."}
        ],
        specifiers: ["Mild (2-3 symptoms)","Moderate (4-5 symptoms)","Severe (6+ symptoms)","In early remission","In sustained remission","In a controlled environment"]
      },
      {
        code: "304.00", name: "Opioid Use Disorder", nameHe: "הפרעת שימוש באופיואידים", icd10: "F11.x",
        criteria: [
          {id:"A",text:"A problematic pattern of opioid use leading to clinically significant impairment or distress, as manifested by at least two of the following, occurring within a 12-month period: (1) Opioids often taken in larger amounts or over a longer period than was intended (2) Persistent desire or unsuccessful efforts to cut down (3) Great deal of time spent obtaining, using, or recovering (4) Craving (5) Failure to fulfill major role obligations (6) Continued use despite social/interpersonal problems (7) Important activities given up or reduced (8) Recurrent use in physically hazardous situations (9) Continued use despite physical/psychological problems (10) Tolerance (11) Withdrawal."}
        ],
        specifiers: ["Mild (2-3 symptoms)","Moderate (4-5 symptoms)","Severe (6+ symptoms)","In early remission","In sustained remission","On maintenance therapy","In a controlled environment"]
      },
      {
        code: "304.30", name: "Cannabis Use Disorder", nameHe: "הפרעת שימוש בקנביס", icd10: "F12.x",
        criteria: [
          {id:"A",text:"A problematic pattern of cannabis use leading to clinically significant impairment or distress, with at least two of the 11 criteria (same general pattern as other substance use disorders) within a 12-month period."}
        ],
        specifiers: ["Mild (2-3 symptoms)","Moderate (4-5 symptoms)","Severe (6+ symptoms)","In early remission","In sustained remission","In a controlled environment"]
      },
      {
        code: "304.40", name: "Stimulant Use Disorder", nameHe: "הפרעת שימוש בממריצים", icd10: "F15.x",
        criteria: [
          {id:"A",text:"A pattern of amphetamine-type substance, cocaine, or other stimulant use leading to clinically significant impairment or distress, with at least two of the 11 criteria within a 12-month period."}
        ],
        specifiers: ["Mild (2-3 symptoms)","Moderate (4-5 symptoms)","Severe (6+ symptoms)","In early remission","In sustained remission","In a controlled environment"]
      },
      {
        code: "312.31", name: "Gambling Disorder", nameHe: "הפרעת הימורים", icd10: "F63.0",
        criteria: [
          {id:"A",text:"Persistent and recurrent problematic gambling behavior leading to clinically significant impairment or distress, as indicated by four (or more) of the following in a 12-month period: (1) Needs to gamble with increasing amounts of money (2) Is restless or irritable when attempting to cut down or stop gambling (3) Has made repeated unsuccessful efforts to control, cut back, or stop gambling (4) Is often preoccupied with gambling (5) Often gambles when feeling distressed (6) After losing money gambling, often returns another day to get even (chasing) (7) Lies to conceal extent of involvement with gambling (8) Has jeopardized or lost a significant relationship, job, or educational/career opportunity because of gambling (9) Relies on others to provide money to relieve desperate financial situations caused by gambling."},
          {id:"B",text:"The gambling behavior is not better explained by a manic episode."}
        ],
        specifiers: ["Episodic","Persistent","In early remission","In sustained remission","Mild (4-5 criteria)","Moderate (6-7 criteria)","Severe (8-9 criteria)"]
      }
    ]
  },
  {
    chapter: "Personality Disorders - הפרעות אישיות",
    diagnoses: [
      {
        code: "301.0", name: "Paranoid Personality Disorder (Cluster A)", nameHe: "הפרעת אישיות פרנואידית (אשכול A)", icd10: "F60.0",
        criteria: [
          {id:"A",text:"A pervasive distrust and suspiciousness of others such that their motives are interpreted as malevolent, beginning by early adulthood and present in a variety of contexts, as indicated by four (or more) of: (1) Suspects, without sufficient basis, that others are exploiting, harming, or deceiving him or her (2) Is preoccupied with unjustified doubts about the loyalty or trustworthiness of friends or associates (3) Is reluctant to confide in others because of unwarranted fear that the information will be used maliciously against him or her (4) Reads hidden demeaning or threatening meanings into benign remarks or events (5) Persistently bears grudges (6) Perceives attacks on his or her character or reputation that are not apparent to others and is quick to react angrily or to counterattack (7) Has recurrent suspicions, without justification, regarding fidelity of spouse or sexual partner."},
          {id:"B",text:"Does not occur exclusively during the course of schizophrenia, a bipolar disorder or depressive disorder with psychotic features, or another psychotic disorder and is not attributable to the physiological effects of another medical condition."}
        ],
        specifiers: []
      },
      {
        code: "301.20", name: "Schizoid Personality Disorder (Cluster A)", nameHe: "הפרעת אישיות סכיזואידית (אשכול A)", icd10: "F60.1",
        criteria: [
          {id:"A",text:"A pervasive pattern of detachment from social relationships and a restricted range of expression of emotions in interpersonal settings, beginning by early adulthood and present in a variety of contexts, as indicated by four (or more) of: (1) Neither desires nor enjoys close relationships, including being part of a family (2) Almost always chooses solitary activities (3) Has little, if any, interest in having sexual experiences with another person (4) Takes pleasure in few, if any, activities (5) Lacks close friends or confidants other than first-degree relatives (6) Appears indifferent to the praise or criticism of others (7) Shows emotional coldness, detachment, or flattened affectivity."},
          {id:"B",text:"Does not occur exclusively during the course of schizophrenia, a bipolar disorder or depressive disorder with psychotic features, another psychotic disorder, or autism spectrum disorder and is not attributable to the physiological effects of another medical condition."}
        ],
        specifiers: []
      },
      {
        code: "301.22", name: "Schizotypal Personality Disorder (Cluster A)", nameHe: "הפרעת אישיות סכיזוטיפלית (אשכול A)", icd10: "F21",
        criteria: [
          {id:"A",text:"A pervasive pattern of social and interpersonal deficits marked by acute discomfort with, and reduced capacity for, close relationships as well as by cognitive or perceptual distortions and eccentricities of behavior, beginning by early adulthood and present in a variety of contexts, as indicated by five (or more) of: (1) Ideas of reference (excluding delusions of reference) (2) Odd beliefs or magical thinking (3) Unusual perceptual experiences, including bodily illusions (4) Odd thinking and speech (5) Suspiciousness or paranoid ideation (6) Inappropriate or constricted affect (7) Behavior or appearance that is odd, eccentric, or peculiar (8) Lack of close friends or confidants other than first-degree relatives (9) Excessive social anxiety that does not diminish with familiarity and tends to be associated with paranoid fears."},
          {id:"B",text:"Does not occur exclusively during the course of schizophrenia, a bipolar disorder or depressive disorder with psychotic features, another psychotic disorder, or autism spectrum disorder."}
        ],
        specifiers: []
      },
      {
        code: "301.7", name: "Antisocial Personality Disorder (Cluster B)", nameHe: "הפרעת אישיות אנטי-חברתית (אשכול B)", icd10: "F60.2",
        criteria: [
          {id:"A",text:"A pervasive pattern of disregard for and violation of the rights of others, occurring since age 15 years, as indicated by three (or more) of: (1) Failure to conform to social norms with respect to lawful behaviors, as indicated by repeatedly performing acts that are grounds for arrest (2) Deceitfulness, as indicated by repeated lying, use of aliases, or conning others for personal profit or pleasure (3) Impulsivity or failure to plan ahead (4) Irritability and aggressiveness, as indicated by repeated physical fights or assaults (5) Reckless disregard for safety of self or others (6) Consistent irresponsibility, as indicated by repeated failure to sustain consistent work behavior or honor financial obligations (7) Lack of remorse, as indicated by being indifferent to or rationalizing having hurt, mistreated, or stolen from another."},
          {id:"B",text:"The individual is at least age 18 years."},
          {id:"C",text:"There is evidence of conduct disorder with onset before age 15 years."},
          {id:"D",text:"The occurrence of antisocial behavior is not exclusively during the course of schizophrenia or bipolar disorder."}
        ],
        specifiers: []
      },
      {
        code: "301.83", name: "Borderline Personality Disorder (Cluster B)", nameHe: "הפרעת אישיות גבולית (אשכול B)", icd10: "F60.3",
        criteria: [
          {id:"A",text:"A pervasive pattern of instability of interpersonal relationships, self-image, and affects, and marked impulsivity, beginning by early adulthood and present in a variety of contexts, as indicated by five (or more) of: (1) Frantic efforts to avoid real or imagined abandonment (2) A pattern of unstable and intense interpersonal relationships characterized by alternating between extremes of idealization and devaluation (3) Identity disturbance: markedly and persistently unstable self-image or sense of self (4) Impulsivity in at least two areas that are potentially self-damaging (e.g., spending, substance abuse, reckless driving, binge eating) (5) Recurrent suicidal behavior, gestures, or threats, or self-mutilating behavior (6) Affective instability due to a marked reactivity of mood (7) Chronic feelings of emptiness (8) Inappropriate, intense anger or difficulty controlling anger (9) Transient, stress-related paranoid ideation or severe dissociative symptoms."}
        ],
        specifiers: []
      },
      {
        code: "301.50", name: "Histrionic Personality Disorder (Cluster B)", nameHe: "הפרעת אישיות היסטריונית (אשכול B)", icd10: "F60.4",
        criteria: [
          {id:"A",text:"A pervasive pattern of excessive emotionality and attention seeking, beginning by early adulthood and present in a variety of contexts, as indicated by five (or more) of: (1) Is uncomfortable in situations in which he or she is not the center of attention (2) Interaction with others is often characterized by inappropriate sexually seductive or provocative behavior (3) Displays rapidly shifting and shallow expression of emotions (4) Consistently uses physical appearance to draw attention to self (5) Has a style of speech that is excessively impressionistic and lacking in detail (6) Shows self-dramatization, theatricality, and exaggerated expression of emotion (7) Is suggestible (easily influenced by others or circumstances) (8) Considers relationships to be more intimate than they actually are."}
        ],
        specifiers: []
      },
      {
        code: "301.81", name: "Narcissistic Personality Disorder (Cluster B)", nameHe: "הפרעת אישיות נרקיסיסטית (אשכול B)", icd10: "F60.81",
        criteria: [
          {id:"A",text:"A pervasive pattern of grandiosity (in fantasy or behavior), need for admiration, and lack of empathy, beginning by early adulthood and present in a variety of contexts, as indicated by five (or more) of: (1) Has a grandiose sense of self-importance (2) Is preoccupied with fantasies of unlimited success, power, brilliance, beauty, or ideal love (3) Believes that he or she is special and unique and can only be understood by, or should associate with, other special or high-status people or institutions (4) Requires excessive admiration (5) Has a sense of entitlement (6) Is interpersonally exploitative (7) Lacks empathy: is unwilling to recognize or identify with the feelings and needs of others (8) Is often envious of others or believes that others are envious of him or her (9) Shows arrogant, haughty behaviors or attitudes."}
        ],
        specifiers: []
      },
      {
        code: "301.82", name: "Avoidant Personality Disorder (Cluster C)", nameHe: "הפרעת אישיות נמנעת (אשכול C)", icd10: "F60.6",
        criteria: [
          {id:"A",text:"A pervasive pattern of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation, beginning by early adulthood and present in a variety of contexts, as indicated by four (or more) of: (1) Avoids occupational activities that involve significant interpersonal contact because of fears of criticism, disapproval, or rejection (2) Is unwilling to get involved with people unless certain of being liked (3) Shows restraint within intimate relationships because of the fear of being shamed or ridiculed (4) Is preoccupied with being criticized or rejected in social situations (5) Is inhibited in new interpersonal situations because of feelings of inadequacy (6) Views self as socially inept, personally unappealing, or inferior to others (7) Is unusually reluctant to take personal risks or to engage in any new activities because they may prove embarrassing."}
        ],
        specifiers: []
      },
      {
        code: "301.6", name: "Dependent Personality Disorder (Cluster C)", nameHe: "הפרעת אישיות תלותית (אשכול C)", icd10: "F60.7",
        criteria: [
          {id:"A",text:"A pervasive and excessive need to be taken care of that leads to submissive and clinging behavior and fears of separation, beginning by early adulthood and present in a variety of contexts, as indicated by five (or more) of: (1) Has difficulty making everyday decisions without an excessive amount of advice and reassurance from others (2) Needs others to assume responsibility for most major areas of his or her life (3) Has difficulty expressing disagreement with others because of fear of loss of support or approval (4) Has difficulty initiating projects or doing things on his or her own (5) Goes to excessive lengths to obtain nurturance and support from others (6) Feels uncomfortable or helpless when alone because of exaggerated fears of being unable to care for himself or herself (7) Urgently seeks another relationship as a source of care and support when a close relationship ends (8) Is unrealistically preoccupied with fears of being left to take care of himself or herself."}
        ],
        specifiers: []
      },
      {
        code: "301.4", name: "Obsessive-Compulsive Personality Disorder (Cluster C)", nameHe: "הפרעת אישיות טורדנית-כפייתית (אשכול C)", icd10: "F60.5",
        criteria: [
          {id:"A",text:"A pervasive pattern of preoccupation with orderliness, perfectionism, and mental and interpersonal control, at the expense of flexibility, openness, and efficiency, beginning by early adulthood and present in a variety of contexts, as indicated by four (or more) of: (1) Is preoccupied with details, rules, lists, order, organization, or schedules to the extent that the major point of the activity is lost (2) Shows perfectionism that interferes with task completion (3) Is excessively devoted to work and productivity to the exclusion of leisure activities and friendships (4) Is overconscientious, scrupulous, and inflexible about matters of morality, ethics, or values (5) Is unable to discard worn-out or worthless objects even when they have no sentimental value (6) Is reluctant to delegate tasks or to work with others unless they submit to exactly his or her way of doing things (7) Adopts a miserly spending style toward both self and others (8) Shows rigidity and stubbornness."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Neurocognitive Disorders - הפרעות נוירוקוגניטיביות",
    diagnoses: [
      {
        code: "294.1x", name: "Major Neurocognitive Disorder", nameHe: "הפרעה נוירוקוגניטיבית מג'ורית", icd10: "F02/F03",
        criteria: [
          {id:"A",text:"Evidence of significant cognitive decline from a previous level of performance in one or more cognitive domains (complex attention, executive function, learning and memory, language, perceptual-motor, or social cognition) based on: (1) Concern of the individual, a knowledgeable informant, or the clinician that there has been a significant decline in cognitive function; and (2) A substantial impairment in cognitive performance, preferably documented by standardized neuropsychological testing or, in its absence, another quantified clinical assessment."},
          {id:"B",text:"The cognitive deficits interfere with independence in everyday activities (i.e., at a minimum, requiring assistance with complex instrumental activities of daily living such as paying bills or managing medications)."},
          {id:"C",text:"The cognitive deficits do not occur exclusively in the context of a delirium."},
          {id:"D",text:"The cognitive deficits are not better explained by another mental disorder (e.g., major depressive disorder, schizophrenia)."}
        ],
        specifiers: ["Due to Alzheimer's disease","Due to frontotemporal lobar degeneration","Due to Lewy body disease","Due to vascular disease","Due to traumatic brain injury","Due to substance/medication use","Due to HIV infection","Due to prion disease","Due to Parkinson's disease","Due to Huntington's disease","Due to another medical condition","Due to multiple etiologies","Without behavioral disturbance","With behavioral disturbance"]
      },
      {
        code: "331.83", name: "Mild Neurocognitive Disorder", nameHe: "הפרעה נוירוקוגניטיבית קלה", icd10: "F06.7",
        criteria: [
          {id:"A",text:"Evidence of modest cognitive decline from a previous level of performance in one or more cognitive domains based on: (1) Concern of the individual, a knowledgeable informant, or the clinician that there has been a mild decline in cognitive function; and (2) A modest impairment in cognitive performance, preferably documented by standardized neuropsychological testing or, in its absence, another quantified clinical assessment."},
          {id:"B",text:"The cognitive deficits do not interfere with capacity for independence in everyday activities (complex instrumental activities of daily living are preserved, but greater effort, compensatory strategies, or accommodation may be required)."},
          {id:"C",text:"The cognitive deficits do not occur exclusively in the context of a delirium."},
          {id:"D",text:"The cognitive deficits are not better explained by another mental disorder."}
        ],
        specifiers: ["Same etiological subtypes as Major NCD"]
      },
      {
        code: "293.0", name: "Delirium", nameHe: "דליריום", icd10: "F05",
        criteria: [
          {id:"A",text:"A disturbance in attention (i.e., reduced ability to direct, focus, sustain, and shift attention) and awareness (reduced orientation to the environment)."},
          {id:"B",text:"The disturbance develops over a short period of time (usually hours to a few days), represents a change from baseline attention and awareness, and tends to fluctuate in severity during the course of a day."},
          {id:"C",text:"An additional disturbance in cognition (e.g., memory deficit, disorientation, language, visuospatial ability, or perception)."},
          {id:"D",text:"The disturbances in Criteria A and C are not better explained by another preexisting, established, or evolving neurocognitive disorder and do not occur in the context of a severely reduced level of arousal, such as coma."},
          {id:"E",text:"There is evidence from the history, physical examination, or laboratory findings that the disturbance is a direct physiological consequence of another medical condition, substance intoxication or withdrawal, or exposure to a toxin, or is due to multiple etiologies."}
        ],
        specifiers: ["Substance intoxication delirium","Substance withdrawal delirium","Medication-induced delirium","Delirium due to another medical condition","Delirium due to multiple etiologies","Acute (lasting a few hours or days)","Persistent (lasting weeks or months)","Hyperactive","Hypoactive","Mixed level of activity"]
      }
    ]
  },
  {
    chapter: "Disruptive, Impulse-Control, and Conduct Disorders - הפרעות התנהגות ושליטה בדחפים",
    diagnoses: [
      {
        code: "313.81", name: "Oppositional Defiant Disorder (ODD)", nameHe: "הפרעה מתריסה-מתנגדת (ODD)", icd10: "F91.3",
        criteria: [
          {id:"A",text:"A pattern of angry/irritable mood, argumentative/defiant behavior, or vindictiveness lasting at least 6 months as evidenced by at least four symptoms from any of the following categories, exhibited during interaction with at least one individual who is not a sibling: Angry/Irritable Mood: (1) Often loses temper (2) Is often touchy or easily annoyed (3) Is often angry and resentful. Argumentative/Defiant Behavior: (4) Often argues with authority figures or, for children/adolescents, with adults (5) Often actively defies or refuses to comply with requests from authority figures or with rules (6) Often deliberately annoys others (7) Often blames others for his or her mistakes or misbehavior. Vindictiveness: (8) Has been spiteful or vindictive at least twice within the past 6 months."},
          {id:"B",text:"The disturbance in behavior is associated with distress in the individual or others in his or her immediate social context, or it impacts negatively on social, educational, occupational, or other important areas of functioning."},
          {id:"C",text:"The behaviors do not occur exclusively during the course of a psychotic, substance use, depressive, or bipolar disorder. Also, the criteria are not met for disruptive mood dysregulation disorder."}
        ],
        specifiers: ["Mild (symptoms confined to only one setting)","Moderate (symptoms present in at least two settings)","Severe (symptoms present in three or more settings)"]
      },
      {
        code: "312.8x", name: "Conduct Disorder", nameHe: "הפרעת התנהגות", icd10: "F91.x",
        criteria: [
          {id:"A",text:"A repetitive and persistent pattern of behavior in which the basic rights of others or major age-appropriate societal norms or rules are violated, as manifested by the presence of at least three of the following 15 criteria in the past 12 months, with at least one criterion present in the past 6 months: Aggression to People and Animals: (1) Often bullies, threatens, or intimidates others (2) Often initiates physical fights (3) Has used a weapon that can cause serious physical harm to others (4) Has been physically cruel to people (5) Has been physically cruel to animals (6) Has stolen while confronting a victim (7) Has forced someone into sexual activity. Destruction of Property: (8) Has deliberately engaged in fire setting with the intention of causing serious damage (9) Has deliberately destroyed others' property. Deceitfulness or Theft: (10) Has broken into someone else's house, building, or car (11) Often lies to obtain goods or favors or to avoid obligations (12) Has stolen items of nontrivial value without confronting a victim. Serious Violations of Rules: (13) Often stays out at night despite parental prohibitions, beginning before age 13 years (14) Has run away from home overnight at least twice (15) Is often truant from school, beginning before age 13 years."},
          {id:"B",text:"The disturbance in behavior causes clinically significant impairment in social, academic, or occupational functioning."},
          {id:"C",text:"If the individual is age 18 years or older, criteria are not met for antisocial personality disorder."}
        ],
        specifiers: ["Childhood-onset type (prior to age 10 years)","Adolescent-onset type (no symptoms prior to age 10 years)","Unspecified onset","With limited prosocial emotions","Mild","Moderate","Severe"]
      },
      {
        code: "312.34", name: "Intermittent Explosive Disorder", nameHe: "הפרעה נפיצה לסירוגין", icd10: "F63.81",
        criteria: [
          {id:"A",text:"Recurrent behavioral outbursts representing a failure to control aggressive impulses as manifested by either: (1) Verbal aggression (temper tantrums, tirades, verbal arguments or fights) or physical aggression toward property, animals, or other individuals, occurring twice weekly, on average, for a period of 3 months. The physical aggression does not result in damage or destruction of property and does not result in physical injury to animals or other individuals. OR (2) Three behavioral outbursts involving damage or destruction of property and/or physical assault involving physical injury against animals or other individuals occurring within a 12-month period."},
          {id:"B",text:"The magnitude of aggressiveness expressed during the recurrent outbursts is grossly out of proportion to the provocation or to any precipitating psychosocial stressors."},
          {id:"C",text:"The recurrent aggressive outbursts are not premeditated and are not committed to achieve some tangible objective."},
          {id:"D",text:"The recurrent aggressive outbursts cause either marked distress in the individual or impairment in occupational or interpersonal functioning, or are associated with financial or legal consequences."},
          {id:"E",text:"Chronological age is at least 6 years (or equivalent developmental level)."},
          {id:"F",text:"The recurrent aggressive outbursts are not better explained by another mental disorder and are not attributable to another medical condition or to the physiological effects of a substance."}
        ],
        specifiers: []
      }
    ]
  },
  {
    chapter: "Elimination Disorders - הפרעות הפרשה",
    diagnoses: [
      {
        code: "307.6", name: "Enuresis", nameHe: "הרטבה (אנורזיס)", icd10: "F98.0",
        criteria: [
          {id:"A",text:"Repeated voiding of urine into bed or clothes, whether involuntary or intentional."},
          {id:"B",text:"The behavior is clinically significant as manifested by either a frequency of at least twice a week for at least 3 consecutive months or the presence of clinically significant distress or impairment in social, academic (occupational), or other important areas of functioning."},
          {id:"C",text:"Chronological age is at least 5 years (or equivalent developmental level)."},
          {id:"D",text:"The behavior is not attributable exclusively to the physiological effects of a substance or another medical condition."}
        ],
        specifiers: ["Nocturnal only","Diurnal only","Nocturnal and diurnal"]
      },
      {
        code: "307.7", name: "Encopresis", nameHe: "אנקופרזיס", icd10: "F98.1",
        criteria: [
          {id:"A",text:"Repeated passage of feces into inappropriate places (e.g., clothing, floor), whether involuntary or intentional."},
          {id:"B",text:"At least one such event occurs each month for at least 3 months."},
          {id:"C",text:"Chronological age is at least 4 years (or equivalent developmental level)."},
          {id:"D",text:"The behavior is not attributable exclusively to the physiological effects of a substance or another medical condition except through a mechanism involving constipation."}
        ],
        specifiers: ["With constipation and overflow incontinence","Without constipation and overflow incontinence"]
      }
    ]
  },
  {
    chapter: "Gender Dysphoria - דיספוריה מגדרית",
    diagnoses: [
      {
        code: "302.85", name: "Gender Dysphoria in Adolescents and Adults", nameHe: "דיספוריה מגדרית במתבגרים ומבוגרים", icd10: "F64.0",
        criteria: [
          {id:"A",text:"A marked incongruence between one's experienced/expressed gender and assigned gender, of at least 6 months' duration, as manifested by at least two of: (1) A marked incongruence between one's experienced/expressed gender and primary and/or secondary sex characteristics (2) A strong desire to be rid of one's primary and/or secondary sex characteristics because of a marked incongruence with one's experienced/expressed gender (3) A strong desire for the primary and/or secondary sex characteristics of the other gender (4) A strong desire to be of the other gender (or some alternative gender different from one's assigned gender) (5) A strong desire to be treated as the other gender (or some alternative gender different from one's assigned gender) (6) A strong conviction that one has the typical feelings and reactions of the other gender (or some alternative gender different from one's assigned gender)."},
          {id:"B",text:"The condition is associated with clinically significant distress or impairment in social, occupational, or other important areas of functioning."}
        ],
        specifiers: ["With a disorder of sex development","Post-transition"]
      },
      {
        code: "302.6", name: "Gender Dysphoria in Children", nameHe: "דיספוריה מגדרית בילדים", icd10: "F64.2",
        criteria: [
          {id:"A",text:"A marked incongruence between one's experienced/expressed gender and assigned gender, of at least 6 months' duration, as manifested by at least six of: (1) A strong desire to be of the other gender or an insistence that one is the other gender (2) A strong preference for wearing clothes typical of the opposite gender (3) A strong preference for cross-gender roles in make-believe play or fantasy play (4) A strong preference for the toys, games, or activities stereotypically used or engaged in by the other gender (5) A strong preference for playmates of the other gender (6) A strong rejection of toys, games, and activities typical of one's assigned gender (7) A strong dislike of one's sexual anatomy (8) A strong desire for the primary and/or secondary sex characteristics that match one's experienced gender."},
          {id:"B",text:"The condition is associated with clinically significant distress or impairment in social, school, or other important areas of functioning."}
        ],
        specifiers: ["With a disorder of sex development"]
      }
    ]
  }
];

// =============================================
// Exports
// =============================================

// ES Module export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { F_CODES_DATA, DSM5_CODES_DATA };
}

// Browser global
if (typeof window !== 'undefined') {
  window.F_CODES_DATA = F_CODES_DATA;
  window.DSM5_CODES_DATA = DSM5_CODES_DATA;
}
