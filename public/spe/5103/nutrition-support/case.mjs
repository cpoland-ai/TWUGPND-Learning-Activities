import { renderEMRView } from './shared/emr.mjs';

const patient = {
  name: 'Elena Reyes', age: '58', sex: 'Female', mrn: 'SIM-5103-031',
  location: 'Surgical inpatient', admission: 'Hospital day 1', height: '165 cm',
  diagnosis: 'Postoperative care following abdominal surgery'
};

const weightHistory = 'Date | Weight | Source\nAdmission | 66 kg | Standing scale\nOne month before admission | 69 kg | Outpatient chart';
const enOrders = 'Nutrition: NPO by mouth. Surgical service cleared use of the feeding tube.\nAccess: Postpyloric feeding tube. Location documented by the clinical team.\nConsult: RDN to recommend initial enteral nutrition.';
const enNote = 'Hospital day 3 — Surgery\nCleared to use the documented postpyloric tube. Request initial EN recommendation. Review recent intake and hydration history.';

const encounters = {
  en: {
    title: 'Hospital day 3 · EN consult',
    consult: 'Develop the initial enteral nutrition recommendation.',
    chart: {
      Snapshot: 'Current status: Postoperative patient with insufficient oral intake. Surgical team has cleared the feeding tube for use.',
      Results: 'Sodium: 139 mmol/L\nPotassium: 3.8 mmol/L\nMagnesium: 1.8 mg/dL\nPhosphorus: 3.1 mg/dL\nCreatinine: 0.8 mg/dL\nGlucose: 112 mg/dL',
      Vitals: 'Blood pressure: 118/72 mmHg\nHeart rate: 84 bpm\nTemperature: 37.0 °C',
      Flowsheets: 'Hospital day 3\nOral intake: None documented since admission.\nFeeding: No formula started.',
      Orders: enOrders,
      MAR: 'IV maintenance fluids: See nursing intake record.',
      Notes: enNote,
      'Weight History': weightHistory
    },
    conversations: {
      'Elena · patient': 'I barely ate for several days before surgery. The nausea has improved, but I still get full quickly.',
      'Daughter · family': 'She usually finishes three meals. In the week before admission she was only eating a few bites at a time.',
      'Bedside RN': 'The tube is available now. She has a test tomorrow morning, so tell us how you want interruptions handled.',
      'Surgery provider': 'We have cleared the tube for use and would like your initial EN recommendation and what you plan to monitor.'
    },
    prompts: [
      'Explain why EN fits this encounter and identify the information that influenced your decision.',
      'Generate an initial EN recommendation. Include the regimen, rationale, and expected delivery.',
      'State what you would monitor and what would make you reassess or communicate a change.'
    ]
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
    },
    conversations: {
      'Elena · patient': 'The tube feeding stopped yesterday. Is the IV nutrition temporary?',
      'Daughter · family': 'She is worried this means she will never eat normally again. What should we expect next?',
      'Bedside RN': 'No feeds since yesterday. Before you finalize, please review the current fluids and confirm what monitoring the team wants.',
      'Surgery provider': 'The GI route is unavailable for now. Propose PN and tell us when you would reassess for a transition back to EN.'
    },
    prompts: [
      'Explain what changed since the EN encounter and why you are recommending a different route.',
      'Generate an initial PN recommendation. Include the regimen, rationale, and how you accounted for other sources.',
      'Prioritize monitoring and describe when you would reassess, revise, or communicate the plan.'
    ]
  }
};

const stage = new URLSearchParams(location.search).get('encounter') === 'pn' ? 'pn' : 'en';
const encounter = encounters[stage];
const element = id => document.getElementById(id);
element('encounter-heading').textContent = encounter.title;
element('pn-preview').hidden = stage === 'pn';

for (const [speaker, response] of Object.entries(encounter.conversations)) {
  const item = document.createElement('details');
  const label = document.createElement('summary');
  const content = document.createElement('p');
  label.textContent = speaker;
  content.textContent = response;
  item.append(label, content);
  element('conversations').append(item);
}
for (const prompt of encounter.prompts) {
  const item = document.createElement('li');
  item.textContent = prompt;
  element('prompts').append(item);
}

const chart = element('emr-workspace');
const room = element('room-workspace');
const roomButton = element('room-button');
const chartButton = element('chart-button');
renderEMRView(chart, {
  caseData: {
    patient: { ...patient, encounter: encounter.title, consult: encounter.consult },
    chart: encounter.chart
  },
  assessmentLink: false
});
function showChart(open) {
  room.hidden = open;
  chart.hidden = !open;
  roomButton.setAttribute('aria-pressed', String(!open));
  chartButton.setAttribute('aria-pressed', String(open));
}
function openChart() {
  showChart(true);
  chart.querySelector('[role="tab"][aria-selected="true"]').focus();
}
roomButton.addEventListener('click', () => showChart(false));
chartButton.addEventListener('click', openChart);
element('scene-chart').addEventListener('click', openChart);
element('scene-patient').addEventListener('click', () => {
  const conversation = element('conversations').firstElementChild;
  conversation.open = true;
  conversation.querySelector('summary').focus();
});
