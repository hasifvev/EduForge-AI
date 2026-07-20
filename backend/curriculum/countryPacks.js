// A country pack declares the official framework boundary. It is deliberately
// separate from reviewed outcome records so the UI never mistakes a source link
// for full subject-by-subject coverage.
export const COUNTRY_PACKS = [
  { id: 'MY', names: ['Malaysia'], framework: 'KSPK / KSSR Semakan 2017 / KSSM', scope: 'Malaysia national school curriculum', coverage_status: 'records_in_progress', source: { title: 'Malaysia Ministry of Education curriculum and PBD resources', url: 'https://www.moe.gov.my/' }, notes: 'Use subject-specific DSKP records and PBD evidence expectations.' },
  { id: 'US-NGSS', names: ['United States'], framework: 'NGSS (adopting state or district)', scope: 'NGSS-aligned science only; state standards require separate packs', coverage_status: 'records_in_progress', source: { title: 'Next Generation Science Standards', url: 'https://www.nextgenscience.org/' }, notes: 'Do not represent this as a single nationwide curriculum.' },
  { id: 'ENG', names: ['United Kingdom', 'England'], framework: 'National Curriculum in England', scope: 'England only; Scotland, Wales, and Northern Ireland require separate packs', coverage_status: 'records_in_progress', source: { title: 'GOV.UK National Curriculum in England', url: 'https://www.gov.uk/national-curriculum' }, notes: 'Use key-stage programmes of study and attainment targets.' },
  { id: 'AU-F10', names: ['Australia'], framework: 'Australian Curriculum v9.0 F–10', scope: 'Australian Curriculum F–10; senior secondary state/territory systems require separate packs', coverage_status: 'framework_registered', source: { title: 'Australian Curriculum F–10', url: 'https://www.australiancurriculum.edu.au/f-10-curriculum' }, notes: 'Use the versioned, machine-readable curriculum and achievement standards.' },
  { id: 'SG-MOE', names: ['Singapore'], framework: 'Singapore MOE syllabuses', scope: 'Primary, Full SBB secondary, and pre-university syllabuses are separate tracks', coverage_status: 'framework_registered', source: { title: 'Singapore MOE curriculum and syllabuses', url: 'https://www.moe.gov.sg/primary/curriculum' }, notes: 'Record subject level and syllabus year; do not flatten into one MOE format.' },
  { id: 'IN-CBSE', names: ['India'], framework: 'NCF-SE / NCERT / CBSE', scope: 'NCERT framework and CBSE curriculum; state boards require separate packs', coverage_status: 'framework_registered', source: { title: 'CBSE Academic curriculum', url: 'https://cbseacademic.nic.in/curriculum_2027.html' }, notes: 'Record academic year, board, class, and subject explicitly.' },
  { id: 'IB', names: ['International', 'International / IB', 'IB'], framework: 'IB PYP / MYP / DP', scope: 'PYP, MYP, and DP are distinct programme packs', coverage_status: 'framework_registered', source: { title: 'International Baccalaureate programme frameworks', url: 'https://www.ibo.org/programmes/' }, notes: 'Record programme, subject group, and level; do not treat IB as a national curriculum.' },
];

const normalize = (value = '') => String(value).trim().toLowerCase();

export function getCountryPack(country) {
  return COUNTRY_PACKS.find((pack) => pack.names.some((name) => normalize(name) === normalize(country))) || null;
}

export function listCountryPacks() {
  return COUNTRY_PACKS.map(({ names, ...pack }) => ({ ...pack, names: [...names] }));
}
