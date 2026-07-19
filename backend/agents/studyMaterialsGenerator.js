import { openai, GPT_MODEL, MODEL_MAX_TOKENS } from '../openai.js';
import { withRetry } from '../utils/retry.js';
import { studyMaterialsSchema } from '../validators/schemas.js';

// ─── Grade Band Detection ─────────────────────────────────────────────────────
function detectGradeBand(year) {
  const y = String(year).toLowerCase();
  // Primary: Year 1-6, Grade 1-6, Std 1-6, Tahun 1-6, Primary 1-6, age ~6-12
  if (/^(year\s*[1-6]|grade\s*[1-6]|std\s*[1-6]|tahun\s*[1-6]|primary\s*[1-6]|standard\s*[1-6]|p[1-6]|k1|k2|year 1|year 2|year 3|year 4|year 5|year 6|grade 1|grade 2|grade 3|grade 4|grade 5|grade 6)/.test(y)) {
    return { band: 'primary', label: 'Primary School', age: '6–12', examStyle: 'Primary Practice Paper' };
  }
  // Lower Secondary: Form 1-3, Grade 7-9, Year 7-9, Middle School
  if (/^(form\s*[1-3]|grade\s*[7-9]|year\s*[7-9]|middle|lower secondary|form 1|form 2|form 3|grade 7|grade 8|grade 9)/.test(y)) {
    return { band: 'lower_secondary', label: 'Lower Secondary', age: '12–15', examStyle: 'Structured Assessment' };
  }
  // Upper Secondary: Form 4-5, Grade 10-11, Year 10-11, SPM, GCSE
  if (/^(form\s*[4-5]|grade\s*(10|11)|year\s*(10|11)|upper secondary|form 4|form 5)/.test(y)) {
    return { band: 'upper_secondary', label: 'Upper Secondary', age: '15–17', examStyle: 'National Exam Format' };
  }
  // Pre-U: Form 6, Grade 12, Year 12-13, A-Level, IB, STPM
  if (/^(form\s*6|grade\s*(12|13)|year\s*(12|13)|a.?level|ib|stpm|pre.?u|form 6)/.test(y)) {
    return { band: 'pre_university', label: 'Pre-University', age: '17–19', examStyle: 'Advanced Level Format' };
  }
  // Default: treat as lower secondary
  return { band: 'lower_secondary', label: 'Secondary', age: '12–16', examStyle: 'Structured Assessment' };
}

// ─── Practice Assessment Format by Country + Grade Band ───────────────────────
// These are teacher-editable practice templates. They describe familiar local
// assessment conventions without presenting generated work as an official paper.
function getExamStyle(country, gradeBand, curriculumAlignment = '', curriculumSource = '') {
  const curriculum = `${curriculumAlignment} ${curriculumSource}`.toLowerCase();
  if (country === 'United States' && curriculum.includes('ngss')) {
    const formats = {
      primary: { board: 'NGSS-aligned classroom practice', format: 'Elementary Science Performance Task', duration: 40, totalMarks: 30, guidance: 'Use a phenomenon, evidence or model, then ask learners to explain their reasoning. Include a short application item.' },
      lower_secondary: { board: 'NGSS-aligned classroom practice', format: 'Middle School Science Performance Task', duration: 60, totalMarks: 50, guidance: 'Use a multi-step phenomenon, evidence table or model; assess explanation and evidence-based reasoning.' },
      upper_secondary: { board: 'NGSS-aligned classroom practice', format: 'High School Science Performance Task', duration: 90, totalMarks: 80, guidance: 'Include analysis of evidence, a model or data set, and a defended scientific explanation.' },
      pre_university: { board: 'NGSS-aligned classroom practice', format: 'Advanced Science Investigation', duration: 120, totalMarks: 100, guidance: 'Include data interpretation, evaluation of limitations and a justified conclusion.' },
    };
    return formats[gradeBand] || formats.lower_secondary;
  }

  const styles = {
    Malaysia: {
      primary: { board: 'KPM — KSSR / PBD practice', format: 'Primary Classroom Assessment', duration: 45, totalMarks: 30, guidance: 'Use short knowledge and application items. Include an evidence note or performance-level observation; do not label this as UPSR.' },
      lower_secondary: { board: 'KPM — KSSM / PBD practice', format: 'Lower Secondary Classroom Assessment', duration: 60, totalMarks: 50, guidance: 'Use recall, explanation and application. Include a teacher feedback or mastery-evidence prompt; do not label this as PT3.' },
      upper_secondary: { board: 'KPM — KSSM practice', format: 'SPM-style Classroom Practice', duration: 90, totalMarks: 80, guidance: 'Use sections with increasing cognitive demand, command words and a concise mark scheme. State that it is practice, not an official SPM paper.' },
      pre_university: { board: 'KPM — STPM practice', format: 'STPM-style Classroom Practice', duration: 120, totalMarks: 100, guidance: 'Use analytical, structured and extended-response practice with transparent marking guidance.' },
    },
    'United Kingdom': {
      primary: { board: 'DfE / STA classroom practice', format: 'KS2-style Practice', duration: 45, totalMarks: 35, guidance: 'Use age-appropriate arithmetic, reasoning, reading or grammar item types. Keep this clearly separate from live SATs materials.' },
      lower_secondary: { board: 'UK National Curriculum practice', format: 'KS3 Assessment', duration: 60, totalMarks: 50, guidance: 'Use knowledge recall, explanation and application, with a short success-criteria mark scheme.' },
      upper_secondary: { board: 'GCSE classroom practice', format: 'GCSE-style Practice Paper', duration: 90, totalMarks: 80, guidance: 'Use command words, structured mark allocations and model responses. Do not imply endorsement by AQA, Edexcel or OCR.' },
      pre_university: { board: 'A-level classroom practice', format: 'A-level-style Practice Paper', duration: 120, totalMarks: 100, guidance: 'Include source/data analysis or extended response as relevant, with level-based rubric guidance.' },
    },
    'United States': {
      primary: { board: 'State standards classroom practice', format: 'Elementary Standards-Based Practice', duration: 40, totalMarks: 30, guidance: 'Use a mix of selected response, short constructed response and one applied real-world item.' },
      lower_secondary: { board: 'State standards classroom practice', format: 'Middle School Standards-Based Practice', duration: 60, totalMarks: 50, guidance: 'Use depth-of-knowledge progression from recall to strategic reasoning; include a short rubric.' },
      upper_secondary: { board: 'State standards classroom practice', format: 'High School Course Practice', duration: 90, totalMarks: 80, guidance: 'Use course-appropriate analysis and evidence. Only use AP or SAT conventions when the teacher explicitly selects that programme.' },
      pre_university: { board: 'College-readiness classroom practice', format: 'Advanced Course Practice', duration: 120, totalMarks: 100, guidance: 'Use data/source analysis and extended reasoning, with point-based scoring guidance.' },
    },
    Australia: {
      primary: { board: 'Australian Curriculum practice', format: 'Primary Achievement-Standard Practice', duration: 45, totalMarks: 40, guidance: 'Use understanding, fluency and reasoning tasks aligned to the achievement standard. Only use NAPLAN conventions for relevant literacy or numeracy practice.' },
      lower_secondary: { board: 'Australian Curriculum practice', format: 'Years 7–9 Assessment', duration: 60, totalMarks: 60, guidance: 'Mix knowledge, application and reasoning; include success criteria aligned to the achievement standard.' },
      upper_secondary: { board: 'Senior secondary classroom practice', format: 'Senior Secondary Practice Paper', duration: 90, totalMarks: 80, guidance: 'Use subject-relevant analysis and clear marks. Do not claim a state-specific ATAR, VCE or WACE format unless selected by the teacher.' },
      pre_university: { board: 'Senior secondary classroom practice', format: 'Year 12 Extended Practice', duration: 120, totalMarks: 100, guidance: 'Use extended analytical tasks and a rubric; adapt to the teacher-selected state authority where supplied.' },
    },
    Singapore: {
      primary: { board: 'Singapore MOE syllabus practice', format: 'Primary Syllabus Practice', duration: 50, totalMarks: 40, guidance: 'Use clear worked-method expectations, short answer and application items. Reserve PSLE-style wording for Primary 6 practice only.' },
      lower_secondary: { board: 'Singapore MOE syllabus practice', format: 'Lower Secondary School Assessment', duration: 60, totalMarks: 60, guidance: 'Build from foundational skills to application and problem solving, with marks beside each item.' },
      upper_secondary: { board: 'Singapore GCE classroom practice', format: 'GCE O-Level-style Practice', duration: 90, totalMarks: 80, guidance: 'Use sectioned questions, clear command terms and a concise mark scheme; identify it as school practice.' },
      pre_university: { board: 'Singapore GCE classroom practice', format: 'GCE A-Level-style Practice', duration: 120, totalMarks: 100, guidance: 'Use structured analysis and extended response where appropriate, with transparent mark allocation.' },
    },
    India: {
      primary: { board: 'NCERT / CBSE classroom practice', format: 'Foundational Competency Practice', duration: 45, totalMarks: 30, guidance: 'Use visual, oral or written evidence as age-appropriate, with application in familiar contexts.' },
      lower_secondary: { board: 'NCERT / CBSE competency practice', format: 'Competency-Based Assessment', duration: 60, totalMarks: 50, guidance: 'Use objective, short-answer and case/context-based items that assess conceptual understanding and application.' },
      upper_secondary: { board: 'CBSE classroom practice', format: 'CBSE-style Competency Practice', duration: 90, totalMarks: 80, guidance: 'Use sectioned papers with competency-based, short-answer and extended-response items as appropriate to the subject.' },
      pre_university: { board: 'Senior secondary classroom practice', format: 'Advanced Competency Practice', duration: 120, totalMarks: 100, guidance: 'Use analytical and application-focused questions with a detailed mark scheme.' },
    },
    'International / IB': {
      primary: { board: 'IB PYP classroom practice', format: 'Inquiry Evidence and Reflection', duration: 45, totalMarks: 30, guidance: 'Prioritise inquiry, self-assessment and reflection. Do not present the task as a formal PYP examination.' },
      lower_secondary: { board: 'IB MYP classroom practice', format: 'Criterion-Referenced Task', duration: 60, totalMarks: 50, guidance: 'Use an authentic task with a visible criterion-based rubric, reflection and application in context.' },
      upper_secondary: { board: 'IB DP classroom practice', format: 'DP-style Criterion Practice', duration: 90, totalMarks: 80, guidance: 'Use subject-appropriate analysis, evaluation and criterion-linked feedback. Do not imply an official IB paper.' },
      pre_university: { board: 'IB DP classroom practice', format: 'DP Extended Response Practice', duration: 120, totalMarks: 100, guidance: 'Use extended argument, evidence evaluation and a criterion-based rubric.' },
    },
  };

  const countryStyles = styles[country];
  if (countryStyles?.[gradeBand]) return countryStyles[gradeBand];

  const fallbacks = {
    primary: { board: 'International classroom practice', format: 'Primary Practice Resource', duration: 45, totalMarks: 30, guidance: 'Use short recall and application questions with encouraging feedback.' },
    lower_secondary: { board: 'International classroom practice', format: 'Junior Assessment Resource', duration: 60, totalMarks: 50, guidance: 'Use a balanced mix of recall, explanation and application with marks and model answers.' },
    upper_secondary: { board: 'International classroom practice', format: 'Senior Practice Resource', duration: 90, totalMarks: 80, guidance: 'Use structured questions, clear command words and a concise mark scheme.' },
    pre_university: { board: 'International classroom practice', format: 'Advanced Practice Resource', duration: 120, totalMarks: 100, guidance: 'Use analysis, evaluation and extended response with transparent scoring guidance.' },
  };
  return fallbacks[gradeBand] || fallbacks.lower_secondary;
}
// ─── Tone / Complexity Guide by Grade Band ────────────────────────────────────
function getGradeToneGuide(gradeBand) {
  const guides = {
    primary: `
GRADE BAND: PRIMARY (Age 6–12)
- Use very simple, friendly language. Short sentences. Active voice.
- Flashcards: Use emojis. Keep definitions to 1 sentence.
- Study Notes: Story-style, colourful headings, 2–3 bullet points per section max.
- Mock Exam: Short questions (2–4 marks each), no essay. Fun, encouraging tone.
- Cloze: 1 short paragraph (3–5 sentences). Easy vocabulary.
- Study Map: Max 2 levels deep. Big simple labels.
- Study Schedule: 20–30 min activities. Use game names and sticker rewards language.
`,
    lower_secondary: `
GRADE BAND: LOWER SECONDARY (Age 12–15)
- Moderate complexity. Mix of recall and application questions.
- Flashcards: Clear definition with 1 example.
- Study Notes: Point-form sections with 3–5 key points each.
- Mock Exam: Mix short answer (2–4 marks) and structured (6–8 marks). No extended essay.
- Cloze: 2 short paragraphs. Age-appropriate vocabulary.
- Study Map: 3 levels. Include prerequisite skills.
- Study Schedule: 30–40 min activities. Include peer review and group work.
`,
    upper_secondary: `
GRADE BAND: UPPER SECONDARY (Age 15–18)
- Exam-style language. Bloom's levels 3–5.
- Flashcards: Curriculum code + formal definition.
- Study Notes: Structured with definitions, formulas/rules, worked examples.
- Mock Exam: SPM/GCSE style. Structured questions (10–20 marks) with mark scheme.
- Cloze: Academic-style passage, technical vocabulary.
- Study Map: Full depth with skill mastery indicators.
- Study Schedule: 45–60 min activities. Include past paper practice.
`,
    pre_university: `
GRADE BAND: PRE-UNIVERSITY (Age 17–19)
- Advanced academic language. Bloom's levels 4–6.
- Flashcards: Formal definition + critical point.
- Study Notes: Lecture-style with analysis, evaluation, synthesis sections.
- Mock Exam: A-Level / STPM format. Extended response with rubric.
- Cloze: Dense academic passage, subject-specific terminology.
- Study Map: Complete with research extensions.
- Study Schedule: 60–90 min deep work blocks. Include spaced repetition.
`,
  };
  return guides[gradeBand] || guides.lower_secondary;
}

// ─── System Prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are EduForge AI — Study Materials Generator Agent.
You create comprehensive, grade-appropriate study resources for teachers and students worldwide.

Your outputs are used by teachers at ALL levels — from primary school teachers in Malaysia to A-Level teachers in the UK.
Grade adaptation is critical. Always read the GRADE BAND instructions carefully.

Rules:
1. Return ONLY valid JSON — no markdown, no extra text
2. Adapt ALL language complexity, format, and content depth to the grade band
3. Curriculum codes (e.g. KSSM 1.1.2, AQA Spec 4.1) should appear in flashcards if grade is secondary+
4. Mock exam format MUST match the national exam board style for that country and grade
5. Study schedule MUST have 4 differentiated tracks (Beginner / On-Level / Gifted / SEN Support)
6. Study map should show the full learning pathway from prerequisite skills to mastery
7. Use the teacher's country for real-world examples throughout`;

// ─── Build Prompt ─────────────────────────────────────────────────────────────
const buildPrompt = ({ subject, year, topic, language, country, studentPersona, blueprint, gradeBandInfo, examStyle }) => {
  const toneGuide = getGradeToneGuide(gradeBandInfo.band);
  const compactLive = process.env.DEMO_MODE === 'false';
  const counts = compactLive
    ? { flashcards: 6, sections: 2, questions: 4, blanks: 3, days: 4 }
    : { flashcards: 12, sections: 4, questions: gradeBandInfo.band === 'primary' ? 6 : 10, blanks: 6, days: 6 };

  return `Generate comprehensive study materials for this lesson.

Context:
- Subject: ${subject} | Grade/Year: ${year} | Topic: ${topic}
- Language: ${language} | Country: ${country || 'International'}
- Student Persona: ${studentPersona || 'On-Level'}
- Curriculum: ${blueprint.curriculum_source || 'General framework'} (${blueprint.curriculum_alignment || ''})
- Grade Band: ${gradeBandInfo.label} | Age: ${gradeBandInfo.age}

${toneGuide}

Exam Style to use:
- Board: ${examStyle.board}
- Format: ${examStyle.format}
- Duration: ${examStyle.duration} minutes | Total Marks: ${examStyle.totalMarks}
- Template rules: ${examStyle.guidance}
- Label the resource as teacher-editable classroom practice. Never call it an official examination paper or use protected live-paper material.

Key Concepts to cover: ${blueprint.key_concepts.join(', ')}
Learning Objectives: ${blueprint.objectives.slice(0, 4).join(' | ')}

Return this EXACT JSON structure (no extra text):
{
  "flashcards": {
    "title": "Flashcard deck title in ${language}",
    "cards": [
      {
        "id": 1,
        "front": "Term or concept in ${language}",
        "back": "Definition/explanation adapted to ${gradeBandInfo.label} level",
        "curriculum_code": "Optional: e.g. KSSM 2.1.1 or AQA 4.3",
        "emoji": "Single relevant emoji e.g. 🌊"
      }
    ]
  },
  "study_notes": {
    "title": "Notes title in ${language}",
    "subtitle": "Brief subtitle e.g. '${gradeBandInfo.label} — ${subject}'",
    "grade_band_label": "${gradeBandInfo.label}",
    "sections": [
      {
        "heading": "Section heading in ${language}",
        "content": "Explanation paragraph adapted to ${gradeBandInfo.label} complexity",
        "key_points": ["Point 1", "Point 2", "Point 3"]
      }
    ]
  },
  "mock_exam": {
    "title": "${topic} — ${examStyle.format}",
    "exam_board": "${examStyle.board}",
    "format_style": "${examStyle.format}",
    "duration_minutes": ${examStyle.duration},
    "total_marks": ${examStyle.totalMarks},
    "grade_band": "${gradeBandInfo.label}",
    "questions": [
      {
        "id": 1,
        "section": "Section name e.g. Section A / Bahagian A",
        "question": "Question text in ${language}",
        "marks": 2,
        "expected_answer": "Model answer",
        "rubric": "Marking guidance",
        "question_type": "short_answer"
      }
    ]
  },
  "cloze_passage": {
    "title": "Passage title in ${language}",
    "passage": "Full passage with blanks as ___(1)___ ___(2)___ etc.",
    "blanks": [
      { "id": 1, "word": "missing word", "hint": "optional hint" }
    ]
  },
  "study_map": {
    "title": "Learning Pathway: ${topic}",
    "description": "What this map shows in ${language}",
    "root": {
      "id": "root",
      "label": "${topic}",
      "type": "root",
      "children": [
        {
          "id": "t1",
          "label": "Sub-topic or skill",
          "type": "topic",
          "children": [
            { "id": "t1s1", "label": "Specific concept", "description": "A clear explanation of this concept in ${language}", "learning_goal": "What the learner can do after studying it", "example": "A brief age-appropriate example", "check_question": "One short self-check question", "type": "subtopic", "children": [{ "id": "t1s1k1", "label": "Practice skill", "description": "A small, observable skill that builds mastery", "learning_goal": "What to practise", "example": "A short model or context", "check_question": "A quick retrieval question", "type": "skill", "children": [] }] }
          ]
        }
      ]
    }
  },
  "study_schedule": {
    "title": "${topic} — Study Plan",
    "persona": "${studentPersona || 'On-Level'}",
    "total_weeks": 2,
    "total_lessons": 6,
    "overview": "Brief overview of the plan in ${language}",
    "schedule": [
      {
        "time": "Day 1 / Week 1",
        "activity": "Activity name in ${language}",
        "resource": "Which resource to use (e.g. Flashcards, Quiz, Study Notes)",
        "duration_minutes": 30,
        "persona_note": "What Beginner/Gifted/SEN students do differently for this activity"
      }
    ],
    "differentiation": {
      "beginner": "Specific guidance for Beginner students in ${language}",
      "on_level": "Guidance for On-Level students",
      "gifted": "Extension activities for Gifted students",
      "sen_support": "Accommodations for SEN Support students"
    }
  }
}

CRITICAL:
- Each mock_exam question_type must be exactly one of: mcq, short_answer, structured, essay, fill_blank
- Generate exactly ${counts.flashcards} flashcards
- Generate exactly ${counts.sections} study note sections
- Generate exactly ${counts.questions} mock exam questions
- Generate exactly ${counts.blanks} cloze blanks
- Study map must have 3-5 branches from root and 3-4 levels: root -> strand -> concept -> practice skill
- Every study-map node must include a concise, accurate description, learning_goal, example, and check_question for the clickable learning panel
- Study schedule must have at least ${counts.days} day entries`;
};

// Normalise provider-specific assessment labels to the renderer's stable types.
const VALID_QUESTION_TYPES = new Set(['mcq', 'short_answer', 'structured', 'essay', 'fill_blank']);

function normalizeQuestionType(value) {
  const normalized = String(value || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (VALID_QUESTION_TYPES.has(normalized)) return normalized;
  if (/(multiple|choice|selection|true_false)/.test(normalized)) return 'mcq';
  if (/(fill|cloze|gap|completion)/.test(normalized)) return 'fill_blank';
  if (/(essay|extended|composition)/.test(normalized)) return 'essay';
  if (/(structured|problem_solving|calculation)/.test(normalized)) return 'structured';
  return 'short_answer';
}

function normalizeStudyMaterials(materials) {
  const questions = materials?.mock_exam?.questions;
  if (!Array.isArray(questions)) return materials;
  return {
    ...materials,
    mock_exam: {
      ...materials.mock_exam,
      questions: questions.map((question) => ({
        ...question,
        question_type: normalizeQuestionType(question.question_type),
      })),
    },
  };
}
// ─── Main Agent ───────────────────────────────────────────────────────────────
export async function runStudyMaterialsGenerator({ subject, year, topic, language, country, studentPersona, blueprint }) {
  const gradeBandInfo = detectGradeBand(year);
  const examStyle = getExamStyle(country, gradeBandInfo.band, blueprint.curriculum_alignment, blueprint.curriculum_source);

  return withRetry(
    async () => {
      const res = await openai.chat.completions.create({
        model: GPT_MODEL,
        max_tokens: MODEL_MAX_TOKENS,
        temperature: 0.65,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt({ subject, year, topic, language, country, studentPersona, blueprint, gradeBandInfo, examStyle }) },
        ],
      });
      const raw = res.choices[0].message.content;
      return studyMaterialsSchema.parse(normalizeStudyMaterials(JSON.parse(raw)));
    },
    { agentName: 'Study Materials Generator', maxRetries: 2 }
  );
}

// ─── Export helpers for demo cache ───────────────────────────────────────────
export { detectGradeBand, getExamStyle };
