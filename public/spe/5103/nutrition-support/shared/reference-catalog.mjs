export const REFERENCE_TAB='Diet & Formulary Reference';
// Historical identifiers remain accepted so existing reference-use records are preserved.
export const referenceResources=[{id:'UpToDate'},{id:'Nutrition Care Manual'},{id:'ASPEN'}];
// Shared simulation catalog. Generic compositions are defined for this platform,
// not specifications for a commercial product. Case-version entries may override
// a matching formulation through the authenticated faculty editor.
// Wording and composition retrieved from Acute Care IPE getClinicalReference, 2026-10-22.
export const dietCatalog=[
 {
  "name": "Regular",
  "text": "No therapeutic nutrient restriction.",
  "details": "Texture or allergy modifications may still apply when separately ordered.",
  "topic": "Diet Orders"
 },
 {
  "name": "Heart Healthy",
  "text": "Institution-defined cardiac-style menu pattern.",
  "details": "Simulation use: emphasize lean proteins, fruits/vegetables and whole grains; pair with a separate sodium restriction when specifically ordered.",
  "topic": "Diet Orders"
 },
 {
  "name": "2 g Sodium",
  "text": "Sodium-restricted diet.",
  "details": "Simulation target: approximately 2,000 mg sodium/day.",
  "topic": "Diet Orders"
 },
 {
  "name": "Carbohydrate Controlled — 60 g/meal",
  "text": "Meal pattern targeting approximately 60 g carbohydrate at each meal.",
  "details": "This is a simulation-hospital convention, not a universal hospital standard.",
  "topic": "Diet Orders"
 },
 {
  "name": "NPO",
  "text": "Nothing by mouth.",
  "details": "Clarify whether medications, ice chips, enteral nutrition, or other exceptions are separately ordered.",
  "topic": "Diet Orders"
 },
 {
  "name": "Clear Liquid",
  "text": "Clear liquids that are liquid at room temperature and leave minimal residue.",
  "details": "Used only when clinically indicated; not nutritionally complete for prolonged use.",
  "topic": "Diet Orders"
 },
 {
  "name": "Full Liquid",
  "text": "Liquids and foods that become liquid at room/body temperature.",
  "details": "More nutritionally complete than clear liquids but may still require supplementation.",
  "topic": "Diet Orders"
 },
 {
  "name": "IDDSI Level 6 — Soft & Bite-Sized",
  "text": "Soft, tender, bite-sized foods requiring chewing.",
  "details": "Use with the ordered liquid level; follow facility swallowing precautions.",
  "topic": "IDDSI"
 },
 {
  "name": "IDDSI Level 2 — Mildly Thick",
  "text": "Mildly thick liquids.",
  "details": "Follow the ordered preparation and swallowing plan.",
  "topic": "IDDSI"
 }
];
export const oralCatalog=[
 {
  "kcalPerContainer": "250",
  "fiber": "",
  "notes": "Simulation-only supplement.",
  "kcalPerMl": "1",
  "description": "Standard oral nutrition shake",
  "driVolume": "",
  "freeWater": "",
  "proteinPerContainer": "9",
  "category": "Oral Supplement",
  "productName": "Daily Shake",
  "containerSize": "8 fl oz carton",
  "proteinPerL": ""
 },
 {
  "kcalPerContainer": "350",
  "fiber": "",
  "notes": "Simulation-only supplement.",
  "kcalPerMl": "1.5",
  "description": "Higher-calorie oral nutrition shake",
  "driVolume": "",
  "freeWater": "",
  "proteinPerContainer": "13",
  "category": "Oral Supplement",
  "productName": "Calorie Plus Shake",
  "containerSize": "8 fl oz carton",
  "proteinPerL": ""
 },
 {
  "kcalPerContainer": "200",
  "fiber": "",
  "notes": "Simulation-only supplement.",
  "kcalPerMl": "",
  "description": "Clear-style oral protein supplement",
  "driVolume": "",
  "freeWater": "",
  "proteinPerContainer": "9",
  "category": "Oral Supplement",
  "productName": "Clear Protein Drink",
  "containerSize": "8 fl oz carton",
  "proteinPerL": ""
 },
 {
  "kcalPerContainer": "100",
  "fiber": "",
  "notes": "Simulation-only modular; dose per order.",
  "kcalPerMl": "",
  "description": "Concentrated protein modular",
  "driVolume": "",
  "freeWater": "",
  "proteinPerContainer": "20",
  "category": "Modular",
  "containerSize": "1 packet",
  "productName": "Protein Boost",
  "proteinPerL": ""
 }
];
export const enteralCatalog=[
{"name": "Standard Balance 1.0", "description": "Standard polymeric formula", "kcalMl": 1.0, "proteinGL": 40.0, "freeWater": "84%", "driVolume": 1500, "fiber": "No fiber", "characteristics": "Simulation-only formula."},
{"name": "Standard Fiber 1.2", "description": "Standard polymeric formula with fiber", "kcalMl": 1.2, "proteinGL": 55.0, "freeWater": "80%", "driVolume": 1500, "fiber": "Fiber-containing", "characteristics": "Simulation-only formula."},
{"name": "High Protein 1.2", "description": "Higher-protein standard formula", "kcalMl": 1.2, "proteinGL": 63.0, "freeWater": "79%", "driVolume": 1500, "fiber": "Low-moderate fiber", "characteristics": "Simulation-only formula."},
{"name": "Calorie Plus 1.5", "description": "Calorie-dense polymeric formula", "kcalMl": 1.5, "proteinGL": 68.0, "freeWater": "76%", "driVolume": 1000, "fiber": "Fiber-containing", "characteristics": "Useful when volume is limited; simulation-only."},
{"name": "Compact 2.0", "description": "Very calorie-dense polymeric formula", "kcalMl": 2.0, "proteinGL": 84.0, "freeWater": "70%", "driVolume": 1000, "fiber": "Low fiber", "characteristics": "Simulation-only formula."},
{"name": "Peptide Support 1.5", "description": "Peptide-based formula", "kcalMl": 1.5, "proteinGL": 70.0, "freeWater": "76%", "driVolume": 1000, "fiber": "Low fiber", "characteristics": "Simulation-only formula."},
{"name": "Renal Support 1.8", "description": "Concentrated renal-style formula", "kcalMl": 1.8, "proteinGL": 81.0, "freeWater": "70%", "driVolume": 1000, "fiber": "Low fiber", "characteristics": "Electrolyte profile intentionally not specified in this quick reference; simulation-only."},
{"name": "Glycemic Support 1.2", "description": "Carbohydrate-modified, fiber-containing formula", "kcalMl": 1.2, "proteinGL": 60.0, "freeWater": "80%", "driVolume": 1500, "fiber": "Fiber-containing", "characteristics": "Simulation-only formula."},
 {name:'Standard polymeric enteral formula',kcalMl:1.5,proteinGL:65,freeWaterMlL:760,characteristics:'Fictional generic formulation; fiber-free.'},
 {name:'Generic high-energy, high-protein enteral formula',kcalMl:2,proteinGL:90,characteristics:'Fictional generic formulation; concentrated energy and protein.'}
];
export const parenteralCatalog=[
 {name:'Amino acid solution',concentration:'10% (10 g/100 mL)',energy:'4 kcal/g amino acids'},
 {name:'Dextrose solution',concentration:'70% (70 g/100 mL)',energy:'3.4 kcal/g dextrose'},
 {name:'Injectable lipid emulsion',concentration:'20% (20 g/100 mL)',energy:'2 kcal/mL emulsion'}
];
