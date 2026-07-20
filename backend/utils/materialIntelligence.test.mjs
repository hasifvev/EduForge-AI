import assert from 'node:assert/strict';
import { analyzeMaterial } from './materialIntelligence.js';

const result = analyzeMaterial({
  topic: 'States of matter',
  extractedText: 'Matter can exist as a solid, liquid, or gas. In a solid, particles are closely packed and vibrate in fixed positions. Heating a liquid can cause particles to move faster and form a gas. Learners should use the particle model to explain changes of state.',
});

assert.equal(result.status, 'ready');
assert.equal(result.topics[0].name, 'States of matter');
assert.ok(result.summary.includes('Matter can exist'));
assert.ok(result.learning_goals[0].evidence.length > 20);
console.log('material intelligence tests passed');
