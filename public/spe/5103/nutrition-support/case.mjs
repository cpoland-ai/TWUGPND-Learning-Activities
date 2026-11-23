import { renderEMRView } from './shared/emr.mjs';
import { admittingDiagnosis, inpatientNotes, inpatientTables, procedure } from './inpatient-record.mjs';

const patient = {
  name: 'Elena Reyes', age: '58', sex: 'Female', mrn: 'SIM-5103-031',
  location: 'Surgical inpatient', admission: 'Hospital day 1', height: '165 cm',
  diagnosis: admittingDiagnosis
};

const weightHistory = 'Date | Weight | Source\nAdmission | 66 kg | Standing scale\nOne month before admission | 69 kg | Outpatient chart';
const enOrders = 'Nutrition: NPO by mouth. Surgical service cleared use of the feeding tube.\nAccess: Postpyloric feeding tube. Location documented by the clinical team.\nConsult: RDN to recommend initial enteral nutrition.';
const enNote = 'Hospital day 3 — Surgery\nCleared to use the documented postpyloric tube. Request initial EN recommendation. Review recent intake and hydration history.';

const encounters = {
  en: {
    title: 'Hospital day 3 · EN consult',
    consult: 'Develop the initial enteral nutrition recommendation.',
    chart: {
      Snapshot: 'Current status: POD 2 after open ileal resection for adhesive partial obstruction. Fatigued and tachycardic with incisional pain, 2 L/min nasal cannula and IV lactated Ringer’s. Surgery cleared postpyloric access.',
      Results: 'Sodium: 139 mmol/L\nPotassium: 3.8 mmol/L\nMagnesium: 1.8 mg/dL\nPhosphorus: 3.1 mg/dL\nCreatinine: 0.8 mg/dL\nGlucose: 112 mg/dL',
      Vitals: 'Blood pressure: 108/66 mmHg\nHeart rate: 102 bpm\nRespiratory rate: 22/min\nTemperature: 37.8 °C\nOxygen saturation: 96% on 2 L/min NC',
      Flowsheets: 'Hospital day 3\nOral intake: None documented since admission.\nFeeding: No formula started.',
      Orders: enOrders,
      MAR: 'IV maintenance fluids: See nursing intake record.',
      Notes: enNote,
      'Weight History': weightHistory
    }
  },
  pn: {
    title: 'Hospital day 7 · PN consult',
    consult: 'Develop the initial parenteral nutrition recommendation.',
    chart: {
      Snapshot: 'Current status: EN held. The surgical service documents that the gastrointestinal route is temporarily unavailable and requests a PN recommendation.',
      Results: 'Sodium: 136 mmol/L\nPotassium: 3.5 mmol/L\nMagnesium: 1.7 mg/dL\nPhosphorus: 2.6 mg/dL\nCreatinine: 0.9 mg/dL\nGlucose: 142 mg/dL\nTriglycerides: 148 mg/dL',
      Vitals: 'Blood pressure: 112/68 mmHg\nHeart rate: 91 bpm\nTemperature: 37.1 °C',
      Flowsheets: 'Hospital day 7\nOral intake: None.\nEnteral intake: Feeds held since yesterday.\nIntake and output: Review current balance with the RN.',
      Orders: 'Nutrition: NPO. EN held by surgical service.\nAccess: Central venous access documented in the chart.\nConsult: RDN to recommend initial parenteral nutrition. No PN regimen entered.',
      MAR: 'IV maintenance fluids: Current orders include a dextrose-containing fluid.',
      Notes: 'Hospital day 7 — Surgery\nPostoperative complication. GI route temporarily unavailable. Request RDN recommendation for PN and reassessment plan.\n\n' + enNote,
      'Weight History': weightHistory
    }
  }
};

const element = id => document.getElementById(id);
function readNote(stage) {
  try {
    return JSON.parse(localStorage.getItem(`nfs5103-elena-${stage}`));
  } catch {
    return null;
  }
}
const enNoteSaved = readNote('en');
const stage = enNoteSaved && new URLSearchParams(location.search).get('encounter') === 'pn' ? 'pn' : 'en';
const encounter = encounters[stage];
element('encounter-heading').textContent = encounter.title;
element('note-context').textContent = `${admittingDiagnosis} · ${procedure} · NPO · 165 cm · Admission 66 kg · Prior 69 kg · Admission MST 2 · ${encounter.title}`;
element('encounter-instructions').textContent = stage === 'en'
  ? 'Open the bedside chart, complete the PlayLab interview in Canvas, then return to chart your EN recommendation. Export your note as a PDF to continue.'
  : 'Review the updated chart and use PlayLab to follow up with the care team. Then chart your PN recommendation.';
const form = element('nutrition-note');
const fields = Array.from(form.querySelectorAll('[name]'));
const savedNote = readNote(stage);
const encounterLink = element('other-encounter');
element('save-note').textContent = `Export ${stage.toUpperCase()} note as PDF`;
if (savedNote) {
  for (const field of fields) field.value = savedNote[field.name] ?? '';
}
function showEncounterLink() {
  encounterLink.href = stage === 'en' ? '?encounter=pn' : '?encounter=en';
  encounterLink.textContent = stage === 'en' ? 'Open the next encounter' : 'Review EN encounter';
  encounterLink.hidden = false;
}
if (enNoteSaved) showEncounterLink();
form.addEventListener('submit', event => {
  event.preventDefault();
  const note = Object.fromEntries(fields.map(field => [field.name, field.value.trim()]));
  if (fields.some(field => field.required && !note[field.name])) {
    element('note-status').textContent = 'Complete the required sections before exporting.';
    return;
  }
  const report = element('note-printout');
  const heading = document.createElement('h1');
  heading.textContent = 'RD Nutrition Assessment / Progress Note';
  const context = document.createElement('p');
  context.textContent = `Simulation · ${patient.name} · ${encounter.title} · ${new Date().toLocaleString()}`;
  const summary = document.createElement('p');
  summary.textContent = `${admittingDiagnosis}. ${procedure}. Admission weight 66 kg; height 165 cm; MST 2.`;
  report.replaceChildren(heading, context, summary);
  for (const field of fields) {
    if (!note[field.name]) continue;
    const label = document.createElement('h2');
    label.textContent = field.labels[0].textContent.trim();
    const value = document.createElement('p');
    value.textContent = note[field.name];
    report.append(label, value);
  }
  window.print();
  try {
    localStorage.setItem(`nfs5103-elena-${stage}`, JSON.stringify(note));
  } catch {
    element('note-status').textContent = 'Use Save as PDF in the print dialog. This browser could not retain your progress.';
    return;
  }
  element('note-status').textContent = 'Choose Save as PDF in the print dialog. Your note remains in this browser.';
  showEncounterLink();
});

const chart = element('emr-workspace');
renderEMRView(chart, {
  caseData: {
    patient: { ...patient, encounter: encounter.title, consult: encounter.consult },
    chart: { ...encounter.chart, Notes: inpatientNotes(stage), Screening: "" },
    tables: inpatientTables(stage)
  },
  assessmentLink: false
});

const room = element('patient-room');
const chartView = element('chart-view');
const openChart = element('open-chart');
element('back-room').addEventListener('click', () => {
  chartView.hidden = true;
  room.hidden = false;
  openChart.focus();
});
openChart.addEventListener('click', () => {
  room.hidden = true;
  chartView.hidden = false;
  chart.querySelector('[role="tab"][aria-selected="true"]').focus();
});
