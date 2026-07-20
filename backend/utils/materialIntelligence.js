const STOP_WORDS = new Set([
  'about', 'after', 'also', 'because', 'before', 'between', 'could', 'each', 'from', 'have', 'into', 'lesson', 'material', 'more', 'most', 'only', 'other', 'over', 'should', 'that', 'their', 'there', 'these', 'this', 'those', 'through', 'using', 'when', 'where', 'which', 'with', 'would',
  'adalah', 'akan', 'anda', 'atau', 'bahan', 'boleh', 'dalam', 'daripada', 'dengan', 'hingga', 'ialah', 'juga', 'kepada', 'kerana', 'lebih', 'mereka', 'oleh', 'pada', 'para', 'sebagai', 'semua', 'tentang', 'tersebut', 'untuk', 'yang',
]);

const clean = (value = '') => String(value).replace(/\s+/g, ' ').trim();

export function sourceSentences(text = '') {
  return clean(text).match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()).filter((sentence) => sentence.length > 20) || [];
}

function wordFrequencies(text) {
  const counts = new Map();
  (String(text).toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]{2,}/gu) || []).forEach((word) => {
    if (!STOP_WORDS.has(word)) counts.set(word, (counts.get(word) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function evidenceFor(term, sentences) {
  return sentences.find((sentence) => sentence.toLowerCase().includes(term.toLowerCase())) || sentences[0] || '';
}

export function analyzeMaterial({ extractedText = '', topic = '' }) {
  const text = clean(extractedText);
  const sentences = sourceSentences(text);
  const terms = wordFrequencies(text).slice(0, 6).map(([term]) => term);
  const candidateTopics = [...new Set([topic?.trim(), ...terms].filter(Boolean))].slice(0, 4);
  const confidence = text.length >= 800 && sentences.length >= 4 ? 'source-grounded' : text.length >= 180 ? 'limited-source-grounded' : 'insufficient-source-detail';
  const topics = candidateTopics.map((name) => {
    const evidence = evidenceFor(name, sentences);
    return {
      name,
      explanation: evidence || `The uploaded material does not contain enough readable detail to explain ${name} safely.`,
      evidence,
      confidence: evidence ? confidence : 'teacher-review-required',
    };
  });
  const learningGoals = topics.slice(0, 3).map((item) => ({
    goal: `Explain ${item.name} using evidence from the supplied material.`,
    evidence: item.evidence,
  }));

  return {
    status: confidence === 'insufficient-source-detail' ? 'limited' : 'ready',
    confidence,
    summary: sentences.slice(0, 2).join(' ') || 'The supplied material contains too little readable text for a reliable summary.',
    topics,
    key_terms: terms,
    essential_points: sentences.slice(0, 5),
    learning_goals: learningGoals,
    teacher_note: confidence === 'source-grounded'
      ? 'This briefing is extracted from the supplied material. Review context, accuracy, age suitability, and curriculum alignment before classroom use.'
      : 'Extraction is limited. Review the original material and correct or add context before using this briefing with learners.',
  };
}
