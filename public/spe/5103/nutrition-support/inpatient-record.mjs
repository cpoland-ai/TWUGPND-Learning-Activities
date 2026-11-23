// Fictional longitudinal record for the NFS 5103 teaching simulation.
export const admittingDiagnosis = 'Adhesive partial small-bowel obstruction (ICD-10-CM K56.51)';
export const procedure = 'Exploratory laparotomy, lysis of adhesions, and segmental ileal resection with primary anastomosis';
export const bedsideFeed = {
  formula: 'Standard Fiber 1.2',
  rate: '20 mL/hr',
  route: 'Postpyloric feeding tube'
};
const vitals = [
  ['Day 1 · 07:15', '101/64', '114', '24', '37.7 °C', '96% room air'],
  ['Day 2 · 06:00', '108/67', '105', '22', '38.0 °C', '96% on 2 L/min NC'],
  ['Day 3 · 06:00', '108/66', '102', '22', '37.8 °C', '96% on 2 L/min NC']
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
  ['Day 3 · 08:30 — Bedside RN', `Started ${bedsideFeed.formula} at ${bedsideFeed.rate} through the postpyloric tube. See the bedside pump for current settings.`],
  ['Day 3 · 08:00 — Surgery progress note', 'POD 2. Awake but fatigued, incisional pain with movement, requiring 2 L/min nasal cannula. Abdomen soft with incisional tenderness. Passed flatus overnight. Surgical service cleared the radiographically confirmed postpyloric tube for use. NPO by mouth. Starter EN ordered after tube clearance. RD consulted to evaluate the running feed and recommend the next regimen.'],
  ['Day 3 · 06:30 — Bedside RN', 'Needs assistance to sit up. Midline dressing intact. Peripheral IV infusing lactated Ringer’s. Feeding tube secured; no formula administered. See flowsheet for intake and output.'],
  ['Day 2 · 14:20 — Radiology', 'Abdominal radiograph: feeding tube tip projects beyond the ligament of Treitz. No tube repositioning recorded after the study.'],
  ['Day 2 · 10:00 — Physical therapy', 'Sat at edge of bed with assistance. Limited by incisional pain and fatigue. Returned to bed with RN present.'],
  ['Day 2 · 07:30 — Surgery progress note', 'POD 1. Abdominal distention improving. No oral intake. Continue IV hydration and reassess feeding access and bowel function.'],
  ['Day 1 · 18:10 — Anesthesia recovery note', 'Extubated in operating room. Transferred to surgical unit after PACU observation. Receiving supplemental oxygen; postoperative pain and nausea monitored.'],
  ['Day 1 · 15:40 — Operative report', procedure + '. Persistent adhesive obstruction and concern for threatened bowel prompted exploration. A nonviable ileal segment was resected and bowel continuity restored.'],
  ['Day 1 · 10:15 — General Surgery consult', 'CT shows a transition point and partial small-bowel obstruction. Persistent pain and imaging concern for compromised bowel prompted operative evaluation.'],
  ['Day 1 · 08:30 — Admitting RN · MST', 'Reports unintentional loss of about 3 kg in one month (1 point) and eating poorly because of decreased appetite (1 point). MST total 2, at risk. RD referral entered.'],
  ['Day 1 · 07:45 — Emergency medicine', 'Admitted with worsening abdominal pain, vomiting, distention, and poor intake. Peripheral IV placed; fluid resuscitation started.']
];
const orders = [
  ['Day 1 · 08:00', 'NPO; strict intake and output', 'Active'],
  ['Day 1 · 18:30', 'Lactated Ringer’s 75 mL/hr IV', 'Active'],
  ['Day 1 · 18:30', 'Supplemental oxygen by nasal cannula', 'Active'],
  ['Day 2 · 06:00', 'Daily CBC and metabolic panel; magnesium and phosphorus monitored', 'Active'],
  ['Day 3 · 08:00', `${bedsideFeed.formula} at ${bedsideFeed.rate} continuously via ${bedsideFeed.route}; RD consult for ongoing EN recommendations`, 'Active']
];
const mar = [
  ['Day 1 · 18:45', 'Lactated Ringer’s', 'IV', '75 mL/hr infusion started'],
  ['Day 2 · 06:00', 'Lactated Ringer’s', 'IV', 'Infusion verified at 75 mL/hr'],
  ['Day 3 · 06:00', 'Lactated Ringer’s', 'IV', 'Infusion verified at 75 mL/hr']
];
const io = [
  ['Days 1–2 · 18:00–06:00', '900', '0', '550', '240'],
  ['Days 2–3 · 06:00–06:00', '1,800', '0', '1,080', '180'],
  ['Day 3 · 08:30–09:30', '75', '20', '55', '0']
];
export function inpatientTables(stage) {
  const pn = stage === 'pn';
  const observations = pn ? [...vitals, ['Day 7 · 06:00', '112/68', '91', '20', '37.1 °C', '96% on 2 L/min NC']] : vitals;
  const vitalNames = ['Blood pressure (mmHg)', 'Heart rate (bpm)', 'Respiratory rate (/min)', 'Temperature', 'Oxygen saturation'];
  const obstruction = ['Adhesive partial small-bowel obstruction', 'K56.51'];
  return {
    Dashboard: [
      ['Vital sign history', ['Vital sign', ...observations.map(([time]) => time)], vitalNames.map((label, index) => [label, ...observations.map(row => row[index + 1])])],
      ['Active diagnoses', ['Diagnosis', 'ICD-10-CM'], pn ? [obstruction, ['Ileus, unspecified', 'K56.7']] : [obstruction]]
    ],
    Results: ['Laboratory results', ['Test', 'Day 1', 'Day 2', 'Day 3', ...(pn ? ['Day 7'] : [])], pn ? labs.map((row, i) => [...row, ['136','3.5','1.7','2.6','0.9','142','—','—'][i]]).concat([['Triglycerides (mg/dL)','—','—','—','148']]) : labs],
    Orders: ['Provider orders', ['Entered', 'Order', 'Status'], pn ? [...orders.map(([day, order, status]) => [day, order, order.includes('Lactated') || order.includes(bedsideFeed.formula) ? 'Superseded' : status]), ['Day 7 · 08:00', 'Hold EN; RD consult for initial PN. Central access documented.', 'Active']] : orders],
    MAR: ['Medication administration record', ['Time', 'Medication', 'Route', 'Administration'], pn ? [...mar, ['Day 7 · 06:00','Dextrose 5% in 0.45% sodium chloride','IV','Infusing at 75 mL/hr']] : mar],
    Flowsheets: ['Nursing intake and output', ['Observation window','IV (mL)','Enteral (mL)','Urine (mL)','GI output (mL)'], pn ? [...io, ['Days 6–7 · 06:00–06:00','1,800','0','1,100','620']] : io],
    Screening: ['Admission malnutrition screening', ['Time', 'Weight loss', 'Poor intake due to decreased appetite', 'MST total'], [['Day 1 · 08:30', '3 kg unintentional · 1 point','Yes · 1 point','2 · At risk; RD referral']]]
  };
}
export function inpatientNotes(stage) {
  const entries = stage === 'pn' ? [['Day 7 · 08:00 — Surgical service', 'Postoperative ileus (ICD-10-CM K56.7, ileus unspecified in the simulation). GI route temporarily unavailable. EN held since day 6. Central access documented. Request PN recommendation and reassessment plan.'], ...notes] : notes;
  return entries.map(([title, body]) => title + '\n' + body).join('\n\n');
}
