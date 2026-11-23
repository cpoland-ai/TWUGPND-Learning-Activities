import { renderEMRView } from './shared/emr.mjs';
import { admittingDiagnosis, bedsideFeed, inpatientNotes, inpatientTables, procedure, pumpHistory } from './inpatient-record.mjs';

const patient = {
  name: 'Elena Reyes', age: '58', sex: 'Female', mrn: 'SIM-5103-031',
  location: 'Surgical inpatient', admission: '11/13/2028 · 07:15 CT', height: '165 cm',
  diagnosis: admittingDiagnosis
};

const weightHistory = 'Date | Weight | Source\nAdmission | 66 kg | Standing scale\nOne month before admission | 69 kg | Outpatient chart';
const encounters = {
  en: {
    title: 'EN consult · 11/15/2028 · 11:00 CT',
    consult: 'Verify the running feed and recommend ongoing enteral nutrition.',
    chart: {
      'Weight History': weightHistory
    }
  },
  pn: {
    title: 'PN consult · 11/19/2028 · 09:00 CT',
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
const composer = element('note-composer');
const noteContext = element('note-context');
for (const [label, value] of [
  ['Admitting diagnosis', admittingDiagnosis], ['Current diet', 'NPO by mouth'],
  ['Height', patient.height], ['Admission weight', '66 kg'], ['Prior weight', '69 kg'],
  ['Admission BMI', '24.2 kg/m²'], ['Admission MST', '2'], ['Consult', encounter.title]
]) {
  const tile = document.createElement('div');
  const term = document.createElement('dt');
  const detail = document.createElement('dd');
  term.textContent = label;
  detail.textContent = value;
  tile.append(term, detail);
  noteContext.append(tile);
}
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
  context.textContent = `Simulation · ${patient.name} · ${encounter.title} · ${new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', dateStyle: 'short', timeStyle: 'short', hourCycle: 'h23' }).format(new Date()) + ' CT'}`;
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
  onSelect(name) {
    if (name !== 'Notes') return;
    const panel = chart.querySelector('[role="tabpanel"]');
    const toolbar = document.createElement('div');
    toolbar.className = 'gpnd-nav notes-toolbar';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '+ Documentation';
    button.setAttribute('aria-controls', composer.id);
    button.setAttribute('aria-expanded', String(!composer.hidden));
    button.onclick = () => {
      composer.hidden = !composer.hidden;
      button.setAttribute('aria-expanded', String(!composer.hidden));
      if (!composer.hidden) composer.querySelector('select').focus();
    };
    toolbar.append(button);
    panel.prepend(toolbar);
    toolbar.after(composer);
  },
  assessmentLink: false
});

const room = element('patient-room');
const pump = element('pump-reading');
if (stage === 'en') {
  pump.hidden = false;
  element('pump-formula').textContent = bedsideFeed.formula;
  element('pump-rate').textContent = bedsideFeed.rate;
  const dialog = element('pump-dialog');
  pump.onclick = () => dialog.showModal();
  const history = element('pump-history');
  const historyButton = element('pump-history-button');
  historyButton.onclick = () => {
    history.hidden = !history.hidden;
    historyButton.setAttribute('aria-expanded', String(!history.hidden));
  };
  for (const [time, event] of pumpHistory) {
    const entry = document.createElement('li');
    entry.textContent = time + ' — ' + event;
    history.querySelector('ol').append(entry);
  }
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
