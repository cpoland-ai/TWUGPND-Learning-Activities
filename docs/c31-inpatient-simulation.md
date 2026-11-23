# C3.1 Inpatient Nutrition Support Simulation

For the 2027 cohort, the simulation lives in **NFS 5103, Fall 2**, after inpatient. One fictional patient, two encounters, and one Canvas submission within the existing synthesis work.

| Stage | C3.1 learning and evidence |
| --- | --- |
| NFS 5071 Orientation | Introduce nutrition support through NG tube and feeding-pump practice. |
| NFS 5363 Human Nutrition & Disease, Fall 1 | Reinforce EN and PN concepts and address related PIs through didactic cases. |
| Combined inpatient rotation | Practice and demonstrate nutrition support in context. Preceptors document observed performance in the C3.1 evaluation, and the midpoint review identifies missing opportunities. |
| NFS 5103 Competency Synthesis, Fall 2 | Complete the unfolding EN/PN case after inpatient. Faculty review the simulation alongside observed inpatient performance and record one C3.1 competency determination. |

Set the case release after the latest planned inpatient end date.

## Reuse from NFS 5363

Source repository: cpoland-ai/nfs5363inpersonclinicalchallenges. Module 16’s public/module16/index.html loads the existing EMR app.js, documentation.js, and styles.css. Its interview button launches a case-specific PlayLab project. Locate the matching hospital-room scene and assets before integrating. Reuse the room, patient, RN/provider, family, computer entry point, chart navigation, and documentation workflow. Keep the Disease deployment intact. Publish the adapted case under the GPND Learning Activities hub after faculty review.

## Two encounters

| Encounter | What changes in the chart | Student evidence |
| --- | --- | --- |
| EN | The team requests an initial EN recommendation. A later flowsheet entry shows an interruption after EN starts. | Independently generate and justify an EN regimen, identify monitoring priorities, and document whether the update changes the recommendation. |
| PN | A later provider note documents a change that makes EN unsuitable. The chart adds the clinical data needed for a PN recommendation and releases monitoring data afterward. | Independently generate and justify an initial PN regimen, identify monitoring and safety priorities, and document whether the update changes the recommendation. |

Use the same timeline and chart identifiers across both encounters. Faculty approve the specific chart values, case developments, and scoring key before release.

## Evaluation workflow

- Student reviews both fictional encounters in the Netlify EMR and completes their EN and PN responses in a student-facing PlayLab activity. The activity asks for case responses only. Student names, IDs, real patient information, and placement details stay out of the prompts and export.
- PlayLab gives preliminary feedback using the same criteria for EN and PN: indication and access, regimen and rationale, monitoring and safety, and response to change and documentation. For each criterion, it identifies the evidence in the response and any missing reasoning. Pilot the feedback with fabricated responses. Keep the faculty answer key and detailed scoring anchors outside the student-facing activity.
- Student exports a single document from PlayLab with both original responses, preliminary feedback, and the PlayLab timestamp, then uploads it directly to Canvas. Faculty can run the exported case responses through the faculty-facing PlayLab reviewer for a provisional rubric review. Preserve the PlayLab timestamp for reference and use the Canvas upload timestamp as the official submission time. Faculty verify the review against the original responses and record the final grade in Canvas.
- Add C3.1 to the inpatient preceptor Competency Evaluation. Use the existing seven-point scale and ask what the preceptor directly observed, whether it involved EN or PN, and how much prompting the learner needed. Capture lack of opportunity outside the numeric scale. Discuss gaps at midpoint.
- Faculty make one C3.1 determination using the simulated work and the preceptor’s observed practice evidence. PI-level evidence can inform the judgment without separate PI mastery scores.
