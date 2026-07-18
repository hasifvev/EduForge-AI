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

// ─── Exam Style by Country + Grade Band ──────────────────────────────────────
function getExamStyle(country, gradeBand) {
  const styles = {
    Malaysia: {
      primary: { board: 'Malaysia MOE', format: 'UPSR / Penilaian Darjah Format (Primary)', duration: 60, totalMarks: 40 },
      lower_secondary: { board: 'Malaysia MOE', format: 'PT3 Format (Lower Secondary)', duration: 60, totalMarks: 60 },
      upper_secondary: { board: 'Malaysia MOE', format: 'SPM Format (Upper Secondary)', duration: 90, totalMarks: 80 },
      pre_university: { board: 'Malaysia MOE / STPM', format: 'STPM / Matriculation Format', duration: 120, totalMarks: 100 },
    },
    'United Kingdom': {
      primary: { board: 'UK DfE / SATs', format: 'KS2 SATs Practice Format', duration: 45, totalMarks: 35 },
      lower_secondary: { board: 'UK DfE', format: 'KS3 Assessment Format', duration: 60, totalMarks: 50 },
      upper_secondary: { board: 'AQA / Edexcel / OCR', format: 'GCSE Style Paper', duration: 90, totalMarks: 80 },
      pre_university: { board: 'AQA / Edexcel', format: 'A-Level Style Paper', duration: 120, totalMarks: 100 },
    },
    'United States': {
      primary: { board: 'Common Core', format: 'Elementary Practice Assessment (DOK 1–2)', duration: 40, totalMarks: 30 },
      lower_secondary: { board: 'Common Core', format: 'Middle School Assessment (DOK 1–3)', duration: 60, totalMarks: 50 },
      upper_secondary: { board: 'College Board', format: 'SAT / AP Style Practice', duration: 90, totalMarks: 80 },
      pre_university: { board: 'College Board', format: 'AP Exam Format', duration: 120, totalMarks: 100 },
    },
    Australia: {
      primary: { board: 'ACARA', format: 'NAPLAN Practice Format (Primary)', duration: 45, totalMarks: 40 },
      lower_secondary: { board: 'ACARA', format: 'Year 7–9 Assessment Format', duration: 60, totalMarks: 60 },
      upper_secondary: { board: 'ATAR', format: 'WACE / VCE Style Paper', duration: 90, totalMarks: 80 },
      pre_university: { board: 'ATAR / VCAA', format: 'Year 12 ATAR Examination Format', duration: 120, totalMarks: 100 },
    },
  };

  const countryStyles = styles[country] || null;
  if (countryStyles && countryStyles[gradeBand]) return countryStyles[gradeBand];

  // Fallback generic
  const fallbacks = {
    primary: { board: 'International Framework', format: 'Primary Practice Paper', duration: 45, totalMarks: 30 },
    lower_secondary: { board: 'International Framework', format: 'Junior Assessment Paper', duration: 60, totalMarks: 50 },
    upper_secondary: { board: 'International Framework', format: 'Senior Examination Paper', duration: 90, totalMarks: 80 },
    pre_university: { board: 'International Framework', format: 'Advanced Level Paper', duration: 120, totalMarks: 100 },
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
            { "id": "t1s1", "label": "Specific concept", "description": "A clear explanation of this concept in ${language}", "type": "subtopic", "children": [] }
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
- Generate exactly ${counts.flashcards} flashcards
- Generate exactly ${counts.sections} study note sections
- Generate exactly ${counts.questions} mock exam questions
- Generate exactly ${counts.blanks} cloze blanks
- Study map must have at least 3 branches from root
- Every study-map node must include a concise, accurate description for the clickable topic panel
- Study schedule must have at least ${counts.days} day entries`;
};

// ─── Main Agent ───────────────────────────────────────────────────────────────
export async function runStudyMaterialsGenerator({ subject, year, topic, language, country, studentPersona, blueprint }) {
  const gradeBandInfo = detectGradeBand(year);
  const examStyle = getExamStyle(country, gradeBandInfo.band);

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
      return studyMaterialsSchema.parse(JSON.parse(raw));
    },
    { agentName: 'Study Materials Generator', maxRetries: 2 }
  );
}

// ─── Export helpers for demo cache ───────────────────────────────────────────
export { detectGradeBand, getExamStyle };
