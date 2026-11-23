// Fictional longitudinal record for the NFS 5103 teaching simulation.
export const admittingDiagnosis = 'Adhesive partial small-bowel obstruction (ICD-10-CM K56.51)';
export const procedure = 'Exploratory laparotomy, lysis of adhesions, and segmental ileal resection with primary anastomosis';
export const bedsideFeed = {
  formula: 'Standard Fiber 1.2',
  rate: '20 mL/hr',
  route: 'Postpyloric feeding tube'
};
const vitals = [
  ['11/13/2028 · 07:15 CT', '101/64', '114', '24', '37.7 °C', '96% room air'],
  ['11/14/2028 · 06:00 CT', '108/67', '105', '22', '38.0 °C', '96% on 2 L/min NC'],
  ['11/15/2028 · 06:00 CT', '108/66', '102', '22', '37.8 °C', '96% on 2 L/min NC']
];
const labs = [
  ['Sodium (mmol/L)', '134', '137', '139'],
  ['Potassium (mmol/L)', '3.4', '3.6', '3.8'],
  ['Magnesium (mg/dL)', '1.6', '1.7', '1.8'],
  ['Phosphorus (mg/dL)', '2.8', '2.9', '3.1'],
  ['Creatinine (mg/dL)', '1.1', '0.9', '0.8'],
  ['Glucose (mg/dL)', '121', '118', '112'],
  ['WBC (×10³/µL)', '15.1', '14.0', '12.8'],
  ['Hemoglobin (g/dL)', '12.6', '10.9', '10.4']
];
const notes = [
  ['11/15/2028 · 08:30 CT — Bedside RN', `Started ${bedsideFeed.formula} at ${bedsideFeed.rate} through the postpyloric tube. See the bedside pump for current settings.`],
  ['11/15/2028 · 08:00 CT — Surgery progress note', 'Interval events: Passed flatus overnight. Postpyloric tube position confirmed on the prior radiograph.\nSubjective: Incisional pain increases with movement. Reports fatigue.\nObjective: Awake. Abdomen soft with incisional tenderness. On 2 L/min nasal cannula.\nAssessment: Recovering after ileal resection for adhesive obstruction.\nPlan: NPO by mouth. Postpyloric access cleared. Starter EN ordered and RD consulted to evaluate the regimen.'],
  ['11/15/2028 · 06:30 CT — Bedside RN', 'Mobility: Needs assistance to sit up.\nAssessment: Midline dressing intact. Feeding tube secured. No formula administered as of this assessment.\nLines and fluids: Peripheral IV infusing lactated Ringer’s. See flowsheet for intake and output.'],
  ['11/14/2028 · 14:20 CT — Radiology', 'Exam: Abdominal radiograph for feeding tube position.\nFindings: Feeding tube tip projects beyond the ligament of Treitz.\nImpression: Postpyloric feeding tube position.'],
  ['11/14/2028 · 10:00 CT — Physical therapy', 'Mobility: Sat at edge of bed with assistance.\nResponse: Limited by incisional pain and fatigue.\nDisposition: Returned to bed with the bedside nurse present.'],
  ['11/14/2028 · 07:30 CT — Surgery progress note', 'Interval events: First postoperative day following ileal resection.\nObjective: Abdominal distention improving. No oral intake documented.\nPlan: Continue IV hydration and reassess feeding access and bowel function.'],
  ['11/13/2028 · 18:10 CT — Anesthesia recovery note', 'Airway: Extubated in the operating room.\nRecovery: Supplemental oxygen in PACU. Postoperative pain and nausea monitored.\nDisposition: Transferred to surgical unit after PACU observation.'],
  ['11/13/2028 · 15:40 CT — Operative report', 'Indication: Persistent adhesive obstruction and concern for threatened bowel.\nProcedure: ' + procedure + '.\nOperative findings: Nonviable ileal segment at the obstruction.\nOperative course: Nonviable bowel resected and bowel continuity restored.'],
  ['11/13/2028 · 10:15 CT — General Surgery consult', 'Reason for consult: Partial small-bowel obstruction.\nHistory: Persistent abdominal pain, vomiting, and poor intake.\nData reviewed: CT demonstrates a transition point and concern for compromised bowel.\nAssessment and plan: Persistent adhesive obstruction with concern for threatened bowel. Proceed with operative evaluation.'],
  ['11/13/2028 · 08:30 CT — Admitting RN · MST', 'Reports unintentional loss of about 3 kg in one month (1 point) and eating poorly because of decreased appetite (1 point). MST total 2, at risk. RD referral entered.'],
  ['11/13/2028 · 07:45 CT — Emergency medicine', 'Chief complaint: Abdominal pain and vomiting.\nHistory of present illness: Worsening abdominal pain, distention, vomiting, and poor intake.\nMedical decision-making: Peripheral IV placed and fluid resuscitation started. Admitted for surgical evaluation.']
];
const orders = [
  ['11/13/2028 · 08:00 CT', 'NPO; strict intake and output', 'Active'],
  ['11/13/2028 · 18:30 CT', 'Lactated Ringer’s 75 mL/hr IV', 'Active'],
  ['11/13/2028 · 18:30 CT', 'Supplemental oxygen by nasal cannula', 'Active'],
  ['11/14/2028 · 06:00 CT', 'Daily CBC and metabolic panel; magnesium and phosphorus monitored', 'Active'],
  ['11/15/2028 · 08:00 CT', `${bedsideFeed.formula} at ${bedsideFeed.rate} continuously via ${bedsideFeed.route}; RD consult for ongoing EN recommendations`, 'Active']
];
const mar = [
  ['11/13/2028 · 18:45 CT', 'Lactated Ringer’s', 'IV', '75 mL/hr infusion started'],
  ['11/14/2028 · 06:00 CT', 'Lactated Ringer’s', 'IV', 'Infusion verified at 75 mL/hr'],
  ['11/15/2028 · 06:00 CT', 'Lactated Ringer’s', 'IV', 'Infusion verified at 75 mL/hr']
];
const io = [
  ['11/13/2028 · 18:00 CT – 11/14/2028 · 06:00 CT', '900', '0', '550', '240'],
  ['11/14/2028 · 06:00 CT – 11/15/2028 · 06:00 CT', '1,800', '0', '1,080', '180'],
  ['11/15/2028 · 08:30–11:00 CT', '188', '40', '125', '0']
];
export function inpatientTables(stage) {
  const pn = stage === 'pn';
  const observations = pn ? [...vitals, ['11/19/2028 · 06:00 CT', '112/68', '91', '20', '37.1 °C', '96% on 2 L/min NC']] : vitals;
  const vitalNames = ['Blood pressure (mmHg)', 'Heart rate (bpm)', 'Respiratory rate (/min)', 'Temperature', 'Oxygen saturation'];
  const obstruction = ['Adhesive partial small-bowel obstruction', 'K56.51'];
  return {
    Dashboard: [
      ['Vital sign history', ['Vital sign', ...observations.map(([time]) => time)], vitalNames.map((label, index) => [label, ...observations.map(row => row[index + 1])])],
      ['Active diagnoses', ['Diagnosis', 'ICD-10-CM'], pn ? [obstruction, ['Ileus, unspecified', 'K56.7']] : [obstruction]]
    ],
    Results: ['Laboratory results', ['Test', '11/13/2028 · 07:15 CT', '11/14/2028 · 06:00 CT', '11/15/2028 · 06:00 CT', ...(pn ? ['11/19/2028 · 06:00 CT'] : [])], pn ? labs.map((row, i) => [...row, ['136','3.5','1.7','2.6','0.9','142','—','—'][i]]).concat([['Triglycerides (mg/dL)','—','—','—','148']]) : labs],
    Orders: ['Provider orders', ['Entered', 'Order', 'Status'], pn ? [...orders.map(([day, order, status]) => [day, order, order.includes('Lactated') || order.includes(bedsideFeed.formula) ? 'Superseded' : status]), ['11/19/2028 · 08:00 CT', 'Hold EN; RD consult for initial PN. Central access documented.', 'Active']] : orders],
    MAR: ['Medication administration record', ['Time', 'Medication', 'Route', 'Administration'], pn ? [...mar, ['11/19/2028 · 06:00 CT','Dextrose 5% in 0.45% sodium chloride','IV','Infusing at 75 mL/hr']] : mar],
    Flowsheets: ['Nursing intake and output', ['Observation window','IV (mL)','Enteral (mL)','Urine (mL)','GI output (mL)'], pn ? [...io, ['11/18/2028 · 06:00 CT – 11/19/2028 · 06:00 CT','1,800','0','1,100','620']] : io],
    Screening: ['Admission malnutrition screening', ['Time', 'Weight loss', 'Poor intake due to decreased appetite', 'MST total'], [['11/13/2028 · 08:30 CT', '3 kg unintentional · 1 point','Yes · 1 point','2 · At risk; RD referral']]]
  };
}
export const pumpHistory = [
  ['11/15/2028 · 08:30 CT', 'Feeding started'],
  ['11/15/2028 · 09:15 CT', 'Pump paused'],
  ['11/15/2028 · 09:45 CT', 'Feeding resumed']
];

export function inpatientNotes(stage) {
  const entries = stage === 'pn' ? [['11/19/2028 · 08:00 CT — Surgical service', 'Postoperative ileus (ICD-10-CM K56.7, ileus unspecified in the simulation). GI route temporarily unavailable. EN held since 11/18/2028. Central access documented. Request PN recommendation and reassessment plan.'], ...notes] : notes;
  return entries.map(([title, body]) => {
    const [time, type] = title.split(' — ');
    const author = /Surgery|Operative|Surgical/.test(type) ? 'Maya Patel, MD · General Surgery'
      : /RN/.test(type) ? 'Jordan Ellis, RN'
      : /Radiology/.test(type) ? 'Morgan Chen, MD · Radiology'
      : /therapy/.test(type) ? 'Riley Morgan, PT'
      : /Anesthesia/.test(type) ? 'Avery Brooks, MD · Anesthesiology'
      : 'Taylor Reed, MD · Emergency Medicine';
    return title + '\n' + author + ' · ' + time + '\n' + (body.includes('\n') ? body : 'Documentation: ' + body);
  }).join('\n\n');
}
