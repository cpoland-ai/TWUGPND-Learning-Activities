import { renderEMRView } from './shared/emr.mjs';
import { admittingDiagnosis, bedsideFeed, inpatientNotes, inpatientTables, procedure } from './inpatient-record.mjs';

const patient = {
  name: 'Elena Reyes', age: '58', sex: 'Female', mrn: 'SIM-5103-031',
  location: 'Surgical inpatient', admission: 'Hospital day 1', height: '165 cm',
  diagnosis: admittingDiagnosis
};

const weightHistory = 'Date | Weight | Source\nAdmission | 66 kg | Standing scale\nOne month before admission | 69 kg | Outpatient chart';
const encounters = {
  en: {
    title: 'Hospital day 3 · EN consult',
    consult: 'Verify the running feed and recommend ongoing enteral nutrition.',
    chart: {
      'Weight History': weightHistory
    }
  },
  pn: {
    title: 'Hospital day 7 · PN consult',
    consult: 'Develop the initial parenteral nutrition recommendation.',
    chart: {
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
  ? 'Inspect the bedside pump and compare its formula and rate with the chart orders. Then interview Elena, her family, the provider, and the bedside nurse in PlayLab and document your EN recommendation. Export your note as a PDF to continue.'
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
    chart: { Dashboard: "", Results: "", Flowsheets: "", Orders: "", MAR: "", Notes: inpatientNotes(stage), ...encounter.chart, Screening: "" },
    tables: inpatientTables(stage)
  },
  selectedTab: "Dashboard",
  assessmentLink: false
});

const room = element('patient-room');
const pump = element('pump-reading');
if (stage === 'en') {
  pump.hidden = false;
  element('pump-formula').textContent = bedsideFeed.formula;
  element('pump-rate').textContent = bedsideFeed.rate;
} else {
  element('room-photo').src = 'room-pn.webp';
  element('room-photo').alt = 'Elena Reyes in a hospital bed beside a computer and IV pump';
}

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
