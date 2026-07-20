import assert from 'node:assert/strict';
import { resolveStandardsContext } from './standardsResolver.js';
import { enrichLessonWithStandards } from './exerciseValidator.js';
import { getRegistrySummary } from './standardsRegistry.js';

const matched = resolveStandardsContext({
  country: 'Malaysia', subject: 'Science', year: 'Form 1', topic: 'Physical and chemical properties of matter',
});
assert.equal(matched.exact_match, true);
assert.equal(matched.standard_code, '5.1.3');

const unresolved = resolveStandardsContext({ country: 'Malaysia', subject: 'Science', year: 'Form 1', topic: 'States of matter' });
assert.equal(unresolved.exact_match, false);

const ngss = resolveStandardsContext({ country: 'United States', subject: 'Science', year: 'Grade 5', topic: 'Develop a model showing matter is made of particles too small to be seen' });
assert.equal(ngss.standard_code, '5-PS1-1');

const england = resolveStandardsContext({ country: 'United Kingdom', subject: 'Science', year: 'Year 8', topic: 'Explain states of matter using the particle model' });
assert.equal(england.standard_code, 'KS3-SCI-PARTICLE-MATTER');
assert.deepEqual(getRegistrySummary().countries.sort(), ['Malaysia', 'United Kingdom', 'United States']);
assert.equal(getRegistrySummary().country_packs.length, 7);
assert.equal(resolveStandardsContext({ country: 'Australia', subject: 'Science', year: 'Year 8', topic: 'Forces' }).country_pack.id, 'AU-F10');

const lesson = enrichLessonWithStandards({
  resources: { quiz: { data: { questions: [{ id: 1 }] } }, matching: { data: { pairs: [{ id: 1 }] } } },
  study_materials: { mock_exam: { questions: [{ id: 1 }] } },
}, matched);
assert.equal(lesson.coverage_report.status, 'mapped');
assert.equal(lesson.coverage_report.mapped_items, 3);
assert.equal(lesson.resources.quiz.data.questions[0].standard_id, 'KSSM-SCI-F1-5.1.3');

console.log('standards engine tests passed');
