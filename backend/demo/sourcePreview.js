function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function sourceSentences(text) {
  return text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()).filter((sentence) => sentence.length > 20).slice(0, 6) || [];
}

export function buildSourcePreview({ subject, year, topic, country, language, studentPersona, extractedText }) {
  const excerpts = sourceSentences(extractedText);
  const safeExcerpt = escapeHtml(extractedText.slice(0, 1600));
  const cards = excerpts.map((sentence, index) => ({
    id: index + 1,
    front: `Source excerpt ${index + 1}`,
    back: sentence,
    curriculum_code: 'Source-grounded preview',
    emoji: '📌',
  }));

  return {
    status: 'complete',
    model: 'source-preview',
    source_preview: true,
    source_notice: 'This demo preview is grounded only in the supplied material. It does not claim curriculum alignment or invent facts.',
    lesson: {
      objectives: ['Read the supplied material carefully', `Identify ideas relevant to ${topic}`, 'Use evidence from the source when discussing the topic'],
      key_concepts: excerpts.slice(0, 4),
      misconceptions: [],
      difficulty: 'teacher-review-required',
      summary: `Source-grounded preview for ${subject}, ${year}: ${topic}. Review the extracted source before classroom use.`,
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
      worksheet: { html: `<div class="worksheet"><h2>Source Review: ${escapeHtml(topic)}</h2><p>Read the source extract and highlight ideas relevant to the lesson.</p><blockquote>${safeExcerpt}</blockquote></div>` },
      answer_key: { html: '<div class="answer-key"><h2>Teacher review</h2><p>Use the supplied source to create a final, curriculum-aligned activity.</p></div>' },
    },
    study_materials: {
      flashcards: { title: `Source excerpts: ${topic}`, cards },
      study_notes: { title: `Source notes: ${topic}`, subtitle: `${subject} | ${year}`, grade_band_label: year, sections: [{ heading: 'Extracted source', content: extractedText.slice(0, 1600), key_points: excerpts }] },
      mock_exam: { title: `Source review: ${topic}`, exam_board: 'Teacher-supplied material', format_style: 'Teacher review', duration_minutes: 15, total_marks: 0, grade_band: year, questions: [] },
      cloze_passage: { title: `Source reading: ${topic}`, passage: extractedText.slice(0, 600), blanks: [] },
      study_map: { title: `Source map: ${topic}`, description: 'Source excerpts for teacher review.', root: { id: 'root', label: topic, type: 'root', children: [] } },
      study_schedule: { title: `Source review: ${topic}`, persona: studentPersona, total_weeks: 1, total_lessons: 1, overview: 'Review the supplied source before use.', schedule: [], differentiation: {} },
    },
    teaching_insights: { misconceptions: [], teaching_tips: ['Review the source extract and select age-appropriate evidence before teaching.'], daily_examples: [], intervention_strategy: 'Teacher review required.', extension_activity: 'Use the source to create a classroom discussion prompt.', estimated_class_difficulty: 'teacher review required', time_estimate_minutes: 15, differentiation_note: 'Adapt the source to the selected class profile.' },
    lesson_evaluation: { scores: { learning_coverage: 0, student_engagement: 0, difficulty_balance: 0, blooms_taxonomy: 0 }, overall_score: 0, grade: 'Teacher review', strengths: ['Material was extracted successfully.'], weaknesses: ['No automated curriculum claims are made in source-preview mode.'], suggestion: 'Review and adapt the material before classroom use.', blooms_levels_present: [], blooms_levels_missing: [] },
    analytics: { generation_time_ms: 0, agent_calls: 0, resources_created: cards.length, estimated_time_saved_minutes: 0, model: 'source-preview', source_confidence: 'teacher-review-required' },
    subject, year, topic, country, language, studentPersona,
  };
}
