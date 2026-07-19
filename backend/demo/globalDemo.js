import { getOfflineLanguagePack } from './offlineLanguagePacks.js';

const KNOWN_FRAMEWORKS = {
  Malaysia: { framework: 'KSSR Semakan 2017 / KSSM', source: 'Malaysia Ministry of Education curriculum resources' },
  'United States': { framework: 'State standards / NGSS', source: 'Next Generation Science Standards' },
  'United Kingdom': { framework: 'National Curriculum for England', source: 'UK Department for Education National Curriculum' },
  Australia: { framework: 'Australian Curriculum v9.0', source: 'Australian Curriculum' },
  Singapore: { framework: 'Singapore MOE Syllabus', source: 'Singapore Ministry of Education curriculum' },
  India: { framework: 'NCF-SE 2023 / CBSE', source: 'NCERT National Curriculum Framework' },
  International: { framework: 'IB PYP / MYP / DP', source: 'International Baccalaureate programme frameworks' },
};

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const words = (topic) => String(topic || '').split(/\s+/).filter(Boolean).slice(0, 4);

function gradeBand(year) {
  const number = Number((year || '').match(/\d+/)?.[0] || 0);
  if (/preschool|kindergarten|reception|foundation|prasekolah/i.test(year)) return 'primary';
  if (number >= 10 || /form [4-6]|tingkatan [4-6]|a.?level|stpm|ib/i.test(year)) return 'upper_secondary';
  if (number >= 7 || /form [1-3]|tingkatan [1-3]/i.test(year)) return 'lower_secondary';
  return 'primary';
}

export function buildGlobalDemo({ subject = 'General Studies', year = 'Year 6', topic = 'the selected topic', language = 'English', country, curriculumStandard, studentPersona }) {
  const profile = KNOWN_FRAMEWORKS[country] || null;
  const framework = curriculumStandard || profile?.framework || 'International teacher-review framework';
  const source = curriculumStandard ? 'Teacher-provided curriculum standard (review required)' : profile?.source || 'Teacher-selected country or region (review required)';
  const confidenceLevel = curriculumStandard ? 'inferred' : profile ? 'inferred' : 'general';
  const { pack: t, isExactLanguageMatch, supportedLanguages } = getOfflineLanguagePack(language);
  const terms = [...new Set([topic, ...words(topic), t.vocabulary({ subject }), `${topic} application`])].slice(0, 6);
  const concepts = [t.concept({ topic }), t.vocabulary({ subject }), t.evidence, t.application];
  const context = t.context({ subject, topic });
  const objectives = t.objectives({ subject, topic });
  const frameworkClaim = profile ? `${profile.framework} is named as framework context.` : 'No verified national framework is claimed.';
  const questions = Array.from({ length: 8 }, (_, index) => {
    const term = terms[index % terms.length];
    const correct = index % 2 ? t.correctExample({ topic }) : t.correctKey({ topic });
    return { id: index + 1, question: t.question({ term }), options: [correct, t.unrelated, t.copied, t.noEvidence], correct, explanation: t.explanation({ correct, term }) };
  });
  const pairs = terms.map((term, index) => ({ id: index + 1, term, definition: t.definition({ term, topic }) }));
  const worksheetItems = terms.map((term, index) => ({ id: index + 1, question: t.worksheetQuestion({ term, topic }), answer: t.worksheetAnswer({ topic }), hint: t.worksheetHint({ framework }) }));
  const safeTopic = escapeHtml(topic);
  const worksheet = `<div class="worksheet"><h2>${safeTopic}</h2><p><strong>${escapeHtml(t.noteHeadings[0])}:</strong> ${escapeHtml(context)}</p><p><strong>Framework:</strong> ${escapeHtml(framework)}. ${escapeHtml(source)}</p><ol>${worksheetItems.map((item) => `<li><p>${escapeHtml(item.question)}</p><p><em>Hint:</em> ${escapeHtml(item.hint)}</p></li>`).join('')}</ol><p><strong>Reflection:</strong> ${escapeHtml(t.reflection)}</p></div>`;
  const matching = { data: { type: 'drag_drop', title: `${topic} — ${t.noteHeadings[1]}`, pairs }, engineConfig: { title: `${topic} — ${t.noteHeadings[1]}`, instruction: t.instruction, pairs, type: 'drag_drop' } };

  return {
    status: 'complete', model: 'deterministic-global-demo', demo_mode: true,
    language_pack: { requested: language, rendered: t.language, exact_match: isExactLanguageMatch, supported: supportedLanguages },
    source_notice: t.sourceNotice({ requestedLanguage: language, frameworkClaim }),
    lesson: {
      objectives, key_concepts: concepts, misconceptions: [t.misconception({ topic }), t.realWorld({ topic })], difficulty: 'intermediate',
      summary: t.summary({ subject, year, topic, context, framework }), prerequisite_knowledge: t.prerequisite,
      real_world_connections: [t.realWorld({ topic }), `${topic} — ${t.evidence}`], curriculum_alignment: curriculumStandard || `Framework-level alignment only: ${framework}`,
      curriculum_source: source, confidenceLevel, persona_notes: `${studentPersona || 'On-Level'}: ${t.instruction}`, grade_band: gradeBand(year),
      experience_design: { primary_activity: 'quiz', secondary_activity: 'matching', why_primary_activity: t.explanation({ correct: t.correctKey({ topic }), term: topic }), why_quiz: t.reasoning({ topic }), why_matching: t.instruction, rationale: context, quiz_focus: `${topic} — ${t.vocabulary({ subject })}`, matching_focus: `${topic} — ${t.evidence}`, difficulty_calibration: `${year}: ${t.instruction}`, engagement_strategy: t.realWorld({ topic }), confidence_score: 60 },
    },
    resources: {
      quiz: { data: { type: 'mcq', title: `${topic} — Quiz`, questions }, engineConfig: { title: `${topic} — Quiz`, questions, type: 'mcq' } }, matching,
      worksheet: { html: worksheet }, answer_key: { html: `<div class="answer-key"><h2>${safeTopic}</h2><p>${escapeHtml(t.answerKey({ topic }))}</p></div>` },
    },
    teaching_insights: {
      misconceptions: [{ mistake: t.misconception({ topic }), correction: t.reasoning({ topic }), example: t.realWorld({ topic }) }],
      teaching_tips: [objectives[0], objectives[1], objectives[2], t.instruction], daily_examples: [t.realWorld({ topic }), `${topic} — ${t.evidence}`],
      intervention_strategy: t.instruction, extension_activity: t.reasoning({ topic }), estimated_class_difficulty: 'moderate', time_estimate_minutes: 45, differentiation_note: `${studentPersona || 'On-Level'}: ${t.instruction}`,
    },
    lesson_evaluation: { scores: { learning_coverage: 65, student_engagement: 68, difficulty_balance: 65, blooms_taxonomy: 60 }, overall_score: 65, grade: 'B', strengths: [t.context({ subject, topic }), t.instruction], weaknesses: [t.sourceNotice({ requestedLanguage: language, frameworkClaim })], suggestion: t.curriculumCheck({ framework, source }), blooms_levels_present: ['Remember', 'Understand', 'Apply'], blooms_levels_missing: ['Evaluate', 'Create'] },
    study_materials: {
      flashcards: { title: `${topic}`, cards: terms.map((term, index) => ({ id: index + 1, front: term, back: t.flashcardBack({ term, topic }), curriculum_code: curriculumStandard || framework, emoji: '📌' })) },
      study_notes: { title: `${topic}`, subtitle: `${year} · ${subject}`, grade_band_label: year, sections: [{ heading: t.noteHeadings[0], content: context, key_points: objectives }, { heading: t.noteHeadings[1], content: t.reasoning({ topic }), key_points: objectives }, { heading: t.noteHeadings[2], content: t.curriculumCheck({ framework, source }), key_points: [framework, source] }] },
      mock_exam: { title: `${topic}`, exam_board: source, format_style: t.noteHeadings[2], duration_minutes: 30, total_marks: 20, grade_band: year, questions: worksheetItems.slice(0, 4).map((item) => ({ ...item, section: t.noteHeadings[2], marks: 5, expected_answer: item.answer, rubric: t.answerKey({ topic }), question_type: 'short_answer' })) },
      cloze_passage: { title: `${topic}`, passage: `${context} ___(1)___ ${t.evidence}. ___(2)___ ${t.application}.`, blanks: [{ id: 1, word: topic, hint: t.concept({ topic }) }, { id: 2, word: 'example', hint: t.evidence }] },
      study_map: { title: `${topic}`, description: t.reasoning({ topic }), root: { id: 'root', label: topic, type: 'root', children: concepts.slice(0, 3).map((concept, index) => ({ id: `topic-${index + 1}`, label: concept, description: t.definition({ term: concept, topic }), learning_goal: objectives[index % objectives.length], example: t.realWorld({ topic }), check_question: t.question({ term: concept }), type: 'topic', children: [] })) } },
      study_schedule: { title: t.studyPlan({ topic }), persona: studentPersona || 'On-Level', total_weeks: 1, total_lessons: 4, overview: context, schedule: t.schedule.map((activity, index) => ({ time: `Lesson ${index + 1}`, activity, resource: index < 2 ? 'Study notes and flashcards' : 'Quiz and worksheet', duration_minutes: 30, persona_note: t.instruction })), differentiation: { beginner: t.instruction, on_level: objectives[1], gifted: t.reasoning({ topic }), sen_support: t.instruction } },
    },
    analytics: { generation_time_ms: 0, agent_calls: 0, resources_created: 10, estimated_time_saved_minutes: 60, model: 'deterministic-global-demo', source_confidence: confidenceLevel },
  };
}
