import { getReviewedStandardsRecords, STANDARDS_REGISTRY_VERSION } from './standardsRegistry.js';
import { getCountryPack } from './countryPacks.js';

const normalize = (value = '') => String(value).trim().toLowerCase().replace(/\s+/g, ' ');

export function resolveStandardsContext({ country, subject, year, topic }) {
  const normalizedCountry = normalize(country);
  const normalizedSubject = normalize(subject);
  const normalizedYear = normalize(year);
  const normalizedTopic = String(topic || '');
  const countryPack = getCountryPack(country);
  const records = getReviewedStandardsRecords().filter((candidate) => normalize(candidate.country) === normalizedCountry);
  const record = records.find((candidate) => (
    candidate.accepted_subjects.includes(normalizedSubject)
    && candidate.accepted_years.includes(normalizedYear)
    && candidate.topic_patterns.some((pattern) => pattern.test(normalizedTopic))
  ));

  if (!record) {
    return {
      status: 'unresolved',
      exact_match: false,
      message: countryPack
        ? `The ${countryPack.framework} pack is registered, but no reviewed record matches this exact subject, year, and topic. The lesson remains teacher-review practice.`
        : 'No reviewed country-standard pack matches this lesson yet. The lesson remains teacher-review practice.',
      registry_version: STANDARDS_REGISTRY_VERSION,
      reviewed_records_available: records.length,
      country_pack: countryPack,
    };
  }

  return {
    status: 'reviewed',
    registry_version: STANDARDS_REGISTRY_VERSION,
    exact_match: true,
    standard_id: record.id,
    standard_code: record.standard_code,
    framework: record.framework,
    framework_version: record.framework_version,
    strand: record.strand,
    outcome: record.outcome_ms,
    outcome_translation: record.outcome_en,
    exercise_profile: record.exercise_profile,
    source: record.source,
    country_pack: countryPack,
  };
}
