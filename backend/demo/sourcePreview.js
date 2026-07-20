function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

import { analyzeMaterial } from '../utils/materialIntelligence.js';

export function buildSourcePreview({ subject, year, topic, country, language, studentPersona, extractedText }) {
  const material_intelligence = analyzeMaterial({ extractedText, topic });
  const excerpts = material_intelligence.essential_points;
  const safeExcerpt = escapeHtml(extractedText.slice(0, 1600));
  const cards = material_intelligence.topics.map((item, index) => ({
    id: index + 1,
    front: item.name,
    back: item.explanation,
    curriculum_code: 'Source-grounded preview',
    emoji: '📌',
  }));

  return {
    status: 'complete',
    model: 'source-preview',
    source_preview: true,
    source_notice: 'This demo preview is grounded only in the supplied material. It does not claim curriculum alignment or invent facts.',
    lesson: {
      objectives: ['Read the supplied material carefully', `Identify ideas relevant to ${topic}`, `Explain ${topic} using evidence from the supplied material`],
      key_concepts: material_intelligence.topics.map((item) => item.name),
      misconceptions: [],
      difficulty: 'teacher-review-required',
      summary: material_intelligence.summary,
      prerequisite_knowledge: [],
      real_world_connections: [],
      curriculum_alignment: 'Not claimed in source-preview mode',
      curriculum_source: 'Teacher-supplied material',
      confidenceLevel: 'general',
      persona_notes: `Prepared for ${studentPersona}; teacher review required.`,
      experience_design: { primary_activity: 'source_review', secondary_activity: 'teacher_review', confidence_score: 0, rationale: 'The preview preserves source text rather than generating unsupported content.' },
    },
    resources: {
      quiz: { data: { questions: [] }, engineConfig: { title: 'Source review', questions: [], type: 'mcq' } },
      matching: { data: { pairs: [] }, engineConfig: { title: 'Source review', instruction: 'Review the extracted source below.', pairs: [], type: 'drag_drop' } },
      worksheet: { html: `<div class="worksheet"><h2>Source Review: ${escapeHtml(topic)}</h2><p>Read the supplied material, then explain each topic using the evidence shown.</p><ol>${material_intelligence.learning_goals.map((item) => `<li>${escapeHtml(item.goal)}<br/><em>Evidence:</em> ${escapeHtml(item.evidence || 'Find a supporting sentence in the source.')}</li>`).join('')}</ol><blockquote>${safeExcerpt}</blockquote></div>` },
      answer_key: { html: '<div class="answer-key"><h2>Teacher review</h2><p>Use the supplied source to create a final, curriculum-aligned activity.</p></div>' },
    },
    study_materials: {
      flashcards: { title: `Material topics: ${topic}`, cards },
      study_notes: { title: `Material intelligence: ${topic}`, subtitle: `${subject} | ${year}`, grade_band_label: year, sections: [{ heading: 'Material summary', content: material_intelligence.summary, key_points: material_intelligence.essential_points }, { heading: 'Topics to understand', content: 'These topics were identified from the supplied material.', key_points: material_intelligence.topics.map((item) => item.name) }, { heading: 'What learners should be able to explain', content: 'Use source evidence, not memory alone.', key_points: material_intelligence.learning_goals.map((item) => item.goal) }] },
      mock_exam: { title: `Source review: ${topic}`, exam_board: 'Teacher-supplied material', format_style: 'Teacher review', duration_minutes: 15, total_marks: 0, grade_band: year, questions: [] },
      cloze_passage: { title: `Source reading: ${topic}`, passage: extractedText.slice(0, 600), blanks: [] },
      study_map: { title: `Source map: ${topic}`, description: 'Source excerpts for teacher review.', root: { id: 'root', label: topic, description: 'This map contains teacher-supplied source material only. Review each source excerpt before using it in class.', type: 'root', children: [] } },
      study_schedule: { title: `Source review: ${topic}`, persona: studentPersona, total_weeks: 1, total_lessons: 1, overview: 'Review the supplied source before use.', schedule: [], differentiation: {} },
    },
    material_intelligence,
    teaching_insights: { misconceptions: [], teaching_tips: ['Start with the material summary, then ask learners to locate the supporting source sentence.', 'Use the “what learners should explain” prompts as oral or written checks.'], daily_examples: [], intervention_strategy: 'Teacher review required.', extension_activity: 'Ask learners to compare two source-supported explanations and identify stronger evidence.', estimated_class_difficulty: 'teacher review required', time_estimate_minutes: 15, differentiation_note: 'Adapt the source to the selected class profile.' },
    lesson_evaluation: { scores: { learning_coverage: 0, student_engagement: 0, difficulty_balance: 0, blooms_taxonomy: 0 }, overall_score: 0, grade: 'Teacher review', strengths: ['Material was extracted successfully.'], weaknesses: ['No automated curriculum claims are made in source-preview mode.'], suggestion: 'Review and adapt the material before classroom use.', blooms_levels_present: [], blooms_levels_missing: [] },
    analytics: { generation_time_ms: 0, agent_calls: 0, resources_created: cards.length, estimated_time_saved_minutes: 0, model: 'source-preview', source_confidence: 'teacher-review-required' },
    subject, year, topic, country, language, studentPersona,
  };
}
