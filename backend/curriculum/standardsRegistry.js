import { MALAYSIA_KSSM_SCIENCE_RECORDS } from './malaysiaKssmScience.js';
import { NGSS_SCIENCE_RECORDS } from './ngssScience.js';
import { ENGLAND_SCIENCE_RECORDS } from './englandScience.js';
import { listCountryPacks } from './countryPacks.js';

export const STANDARDS_REGISTRY_VERSION = '2026.07.20.1';
const requiredFields = ['id', 'country', 'framework', 'framework_version', 'subject', 'grade', 'standard_code', 'outcome_en', 'exercise_profile', 'source'];

function validateRecord(record) {
  for (const field of requiredFields) {
    if (!record[field]) throw new Error(`Standards record ${record.id || 'unknown'} is missing ${field}.`);
  }
  if (!record.source.url || !record.source.reviewed_on) throw new Error(`Standards record ${record.id} requires an official source URL and review date.`);
  if (!Array.isArray(record.topic_patterns) || !record.topic_patterns.length) throw new Error(`Standards record ${record.id} requires exact topic patterns.`);
  if (!Array.isArray(record.exercise_profile.progression) || !record.exercise_profile.evidence_type || !record.exercise_profile.teacher_observation) throw new Error(`Standards record ${record.id} requires a complete exercise contract.`);
  return Object.freeze(record);
}

const records = [
  ...MALAYSIA_KSSM_SCIENCE_RECORDS,
  ...NGSS_SCIENCE_RECORDS,
  ...ENGLAND_SCIENCE_RECORDS,
].map(validateRecord);

export function getReviewedStandardsRecords() {
  return records;
}

export function getRegistrySummary() {
  return {
    version: STANDARDS_REGISTRY_VERSION,
    records: records.length,
    countries: [...new Set(records.map((record) => record.country))],
    subjects: [...new Set(records.map((record) => record.subject))],
    country_packs: listCountryPacks().map((pack) => ({ id: pack.id, framework: pack.framework, coverage_status: pack.coverage_status })),
  };
}
