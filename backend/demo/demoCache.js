/**
 * EduForge AI — Demo Cache
 * Three pre-built scenarios for instant demo without API calls.
 * Universal (default), Malaysia (BM), UK (History)
 */

const UNIVERSAL_DEMO = {
  status: 'complete',
  model: 'demo-cache',
  lesson: {
    objectives: [
      'Identify and describe the three states of matter: solid, liquid, and gas',
      'Explain how particles are arranged and move in each state',
      'Predict how matter changes state when heated or cooled',
      'Connect states of matter to everyday real-world examples',
    ],
    key_concepts: ['Solid', 'Liquid', 'Gas', 'Particles', 'Melting', 'Freezing', 'Evaporation', 'Condensation'],
    misconceptions: [
      'Students often think solids are "heavier" than gases — not always true (lead vs. hydrogen)',
      'Many students believe water disappears when it evaporates rather than changing state',
      'Students confuse melting (solid→liquid) with dissolving (solid in liquid)',
    ],
    difficulty: 'intermediate',
    summary: 'Students explore the three states of matter through particle-level understanding, learning how energy drives state changes. This foundational topic connects to chemistry, physics, and everyday observations.',
    real_world_connections: [
      'Ice cubes melting in a drink on a hot day',
      'Water vapour fogging up a cold window in winter',
      'Steam rising from a hot cup of coffee',
    ],
    curriculum_alignment: 'NGSS 5-PS1-1 / Common Core Science Grade 5',
    curriculum_source: 'Common Core Science (USA)',
    confidenceLevel: 'high',
    experience_design: {
      primary_activity: 'matching',
      secondary_activity: 'quiz',
      why_primary_activity: 'Matching pairs of states to particle descriptions builds conceptual understanding before assessment — students form mental models first, then test recall.',
      why_quiz: 'The quiz is the ideal secondary activity to assess whether students have correctly internalised the particle model after the matching exercise.',
      why_matching: 'Vocabulary retention is the primary learning barrier for States of Matter. Matching concrete terms to particle-level descriptions is the most effective first step.',
      rationale: 'Research shows concrete-to-abstract progression works best for particle theory. Students match terms first (concrete), then answer application questions (abstract).',
      confidence_score: 94,
      difficulty_calibration: 'On-Level: 6 recall questions, 3 application, 1 evaluation',
      engagement_strategy: 'Start with an ice cube demo — students observe melting in real-time before the lesson begins.',
    },
  },
  resources: {
    quiz: {
      engineConfig: {
        type: 'mcq',
        title: 'States of Matter Quiz',
        questions: [
          { id: 1, question: 'Which state of matter has particles that are closely packed and vibrate in fixed positions?', options: ['A. Gas', 'B. Liquid', 'C. Solid', 'D. Plasma'], correct: 'C. Solid', explanation: 'In a solid, particles are tightly packed in a fixed arrangement. They can only vibrate — they cannot move past each other.' },
          { id: 2, question: 'What happens to water particles when it evaporates?', options: ['A. They disappear completely', 'B. They slow down and become solid', 'C. They gain energy and become gas', 'D. They merge with air particles'], correct: 'C. They gain energy and become gas', explanation: 'Evaporation is a state change from liquid to gas. Particles gain enough energy to escape the liquid surface and become water vapour.' },
          { id: 3, question: 'Which process describes liquid changing into solid?', options: ['A. Evaporation', 'B. Condensation', 'C. Melting', 'D. Freezing'], correct: 'D. Freezing', explanation: 'Freezing occurs when a liquid loses energy and its particles slow down, forming a fixed structure — this is liquid to solid.' },
          { id: 4, question: 'In which state do particles have the most energy and move the fastest?', options: ['A. Solid', 'B. Liquid', 'C. Gas', 'D. All states equally'], correct: 'C. Gas', explanation: 'Gas particles move fastest because they have the most kinetic energy. They spread out to fill any container.' },
          { id: 5, question: 'A puddle of water disappears on a sunny day. What state change is this?', options: ['A. Melting', 'B. Freezing', 'C. Evaporation', 'D. Condensation'], correct: 'C. Evaporation', explanation: 'The sun heats the water, giving particles enough energy to escape as water vapour — this is evaporation, not disappearance.' },
          { id: 6, question: 'Which state of matter takes the shape of its container but has a fixed volume?', options: ['A. Solid', 'B. Gas', 'C. Liquid', 'D. Both A and C'], correct: 'C. Liquid', explanation: 'Liquids flow to take the shape of their container, but unlike gases, they maintain a fixed volume.' },
          { id: 7, question: 'Steam forming on a cold mirror is an example of which process?', options: ['A. Evaporation', 'B. Condensation', 'C. Melting', 'D. Sublimation'], correct: 'B. Condensation', explanation: 'When water vapour (gas) hits the cold surface, it loses energy and becomes liquid drops — this is condensation.' },
          { id: 8, question: 'What do you call the temperature at which a solid becomes a liquid?', options: ['A. Boiling point', 'B. Freezing point', 'C. Melting point', 'D. Dew point'], correct: 'C. Melting point', explanation: 'The melting point is the specific temperature at which a solid substance changes state into liquid. For water, this is 0°C (32°F).' },
          { id: 9, question: 'Which best describes gas particles?', options: ['A. Close together, fixed position', 'B. Close together, can slide past each other', 'C. Far apart, move freely in all directions', 'D. Fixed in a lattice structure'], correct: 'C. Far apart, move freely in all directions', explanation: 'Gas particles have high energy and move rapidly in all directions with lots of space between them — this is why gases expand to fill their container.' },
          { id: 10, question: 'When does liquid water become ice?', options: ['A. When it gains heat energy', 'B. When it loses heat energy', 'C. When particles gain speed', 'D. When volume decreases'], correct: 'B. When it loses heat energy', explanation: 'Freezing happens when liquid water loses heat energy. Particles slow down and form the fixed lattice structure of ice.' },
        ],
      },
    },
    matching: {
      engineConfig: {
        type: 'drag_drop',
        title: 'States of Matter: Match the Terms',
        instruction: 'Drag each term to its correct description',
        pairs: [
          { id: 1, term: 'Solid', definition: 'Particles packed tightly in fixed positions — vibrates only' },
          { id: 2, term: 'Liquid', definition: 'Particles close together but can slide past each other' },
          { id: 3, term: 'Gas', definition: 'Particles far apart, moving rapidly in all directions' },
          { id: 4, term: 'Melting', definition: 'Solid → Liquid (gains heat energy)' },
          { id: 5, term: 'Freezing', definition: 'Liquid → Solid (loses heat energy)' },
          { id: 6, term: 'Evaporation', definition: 'Liquid → Gas (particles escape the surface)' },
          { id: 7, term: 'Condensation', definition: 'Gas → Liquid (particles lose energy and cluster)' },
          { id: 8, term: 'Boiling Point', definition: 'Temperature at which liquid rapidly becomes gas' },
        ],
      },
    },
    worksheet: { html: '<div class="worksheet"><h2>States of Matter — Worksheet</h2><p>Fill in the blanks using the word bank: solid, liquid, gas, melting, freezing, evaporation, condensation</p><ol><li>Water turning into steam is called ______.</li><li>Ice is a ______ because its particles are in fixed positions.</li><li>______ occurs when liquid water loses heat and becomes ice.</li><li>Particles in a ______ move freely and fill any container.</li><li>Rain forming from clouds is caused by ______ of water vapour.</li><li>The ______ state has particles that can slide past each other.</li><li>Chocolate ______ when heated above its melting point.</li><li>At room temperature, oxygen is a ______ because particles move freely.</li></ol></div>' },
    answer_key: { html: '<div class="answer-key"><h2>Answer Key</h2><ol><li>evaporation</li><li>solid</li><li>Freezing</li><li>gas</li><li>condensation</li><li>liquid</li><li>melts</li><li>gas</li></ol></div>' },
  },
  teaching_insights: {
    misconceptions: [
      { mistake: 'Students think evaporated water "disappears"', correction: 'Show that water vapour is still there — breathe onto a cold glass to demonstrate condensation immediately', example: 'Ask: "Where did the puddle go?" Then breathe on a cold window to show water reappearing.' },
      { mistake: 'Students confuse melting with dissolving', correction: 'Melting is a state change (one material, temperature change). Dissolving mixes two substances.', example: 'Melt chocolate in a bowl vs. dissolve sugar in water — same material vs. two different materials.' },
      { mistake: 'Students think solids are always heavier than gases', correction: 'Density is about mass per volume, not state. Lead is denser than hydrogen gas, but a balloon floats because helium is less dense than air.', example: 'Compare a lead ball (dense solid) vs. a balloon (less dense than air).' },
    ],
    teaching_tips: [
      'Open with a live demonstration: show ice melting in a beaker on a hotplate while students observe and record particle behaviour',
      'Use the "particle dance" — students act out solid (hug together, slight wobble), liquid (walk slowly touching others), gas (run freely around the room)',
      'Ask "why" questions first: "Why does a gas fill a room?" before giving the particle explanation',
      'Connect to cooking: "When you boil pasta water, what state change are you causing?" — makes physics immediately relevant',
    ],
    daily_examples: [
      'Ice cream melting on a hot day — solid to liquid in action',
      'Bathroom mirror fogging up after a shower — condensation of water vapour',
      'Clothes drying on a washing line — evaporation without boiling',
    ],
    intervention_strategy: 'If students struggle with particle movement, have them physically act it out. Assign roles: 10 students are "solid particles" (stand close, small movements), then "add heat" — they spread out to become gas. Physical movement creates lasting memory.',
    extension_activity: 'Research challenge: Find 3 materials that can sublimate (go directly from solid to gas) — hint: dry ice, iodine crystals. Why does sublimation happen? Write a particle-level explanation.',
    estimated_class_difficulty: 'moderate',
    time_estimate_minutes: 45,
    differentiation_note: 'For mixed ability: beginner students match only 4 pairs, on-level complete all 8, gifted add particle diagrams to each match.',
  },
  lesson_evaluation: {
    scores: {
      learning_coverage: 94,
      student_engagement: 89,
      difficulty_balance: 91,
      blooms_taxonomy: 82,
    },
    overall_score: 89,
    grade: 'A',
    strengths: [
      'Excellent coverage of all key state change processes — all 4 main transitions addressed',
      'Strong misconception treatment with concrete classroom examples',
      'Good Bloom\'s progression from recall (Q1-4) to application (Q5-8) to analysis (Q9-10)',
    ],
    weaknesses: [
      'Limited Bloom\'s Level 5-6 (Evaluation/Creation) — no synthesis or design tasks',
    ],
    suggestion: 'Add one open-ended question: "Design an experiment to show that evaporation is a state change, not disappearance." This pushes students to Level 6 (Create) on Bloom\'s.',
    blooms_levels_present: ['Remember', 'Understand', 'Apply', 'Analyse'],
    blooms_levels_missing: ['Evaluate', 'Create'],
  },
  analytics: {
    generation_time_ms: 18340,
    agent_calls: 5,
    resources_created: 6,
    estimated_time_saved_minutes: 135,
    model: 'demo-cache',
    source_confidence: 'high',
  },
};

const MALAYSIA_DEMO = {
  ...UNIVERSAL_DEMO,
  lesson: {
    ...UNIVERSAL_DEMO.lesson,
    curriculum_alignment: 'KSSR Sains Tahun 4 — Tema: Sains Hayat',
    curriculum_source: 'KSSR Malaysia',
    confidenceLevel: 'high',
    experience_design: {
      ...UNIVERSAL_DEMO.lesson.experience_design,
      rationale: 'Mengikut pendekatan KSSR, aktiviti "matching" membantu murid membina pemahaman konsep sebelum ujian formatif. Kaedah ini selaras dengan pembelajaran berasaskan inkuiri.',
    },
    real_world_connections: [
      'Ais kacang yang mencair pada hari panas — perubahan pepejal ke cecair',
      'Wap air pada tingkap kereta berhawa dingin — kondensasi',
      'Baju basah yang kering di bawah matahari — sejatan',
    ],
  },
  teaching_insights: {
    ...UNIVERSAL_DEMO.teaching_insights,
    daily_examples: [
      'Ais kacang yang mencair di dalam mangkuk pada hari panas',
      'Wap yang keluar dari periuk nasi — cecair menjadi gas',
      'Embun pagi pada daun pokok — kondensasi berlaku pada waktu malam',
    ],
    teaching_tips: [
      'Mulakan dengan demonstrasi: tunjukkan ais mencair dalam bikar dan bincangkan pergerakan zarah',
      'Gunakan "tarian zarah" — murid lakonkan pepejal (berpelukan), cecair (bergerak perlahan), gas (bergerak bebas)',
      'Kaitkan dengan kehidupan seharian: "Mengapa baju basah kering?" — evaporasi dalam kehidupan sebenar',
      'Tanya soalan "mengapa" dahulu sebelum memberi penjelasan — galakkan pemikiran kritis murid',
    ],
  },
};

const UK_DEMO = {
  ...UNIVERSAL_DEMO,
  lesson: {
    ...UNIVERSAL_DEMO.lesson,
    objectives: [
      'Describe the Norman Conquest of 1066 and its causes',
      'Identify key figures: Harold Godwinson, William the Conqueror, Harald Hardrada',
      'Explain the significance of the Battle of Hastings and its outcome',
      'Evaluate how the Norman Conquest changed England',
    ],
    key_concepts: ['Norman Conquest', 'Battle of Hastings', 'William the Conqueror', 'Harold Godwinson', 'Feudal System', 'Domesday Book', '1066', 'Anglo-Saxon England'],
    curriculum_alignment: 'KS3 History — National Curriculum: Britain, 1066–1509',
    curriculum_source: 'UK National Curriculum (KS3)',
    confidenceLevel: 'high',
    summary: 'Students examine the dramatic events of 1066 — one of the most significant dates in English history. The Norman Conquest fundamentally changed the English language, culture, feudal structure, and architecture.',
    real_world_connections: [
      'Norman French words still in English today: beef (boeuf), castle (château), government (gouvernement)',
      'Norman castles still standing across England — Tower of London, Windsor Castle',
      'Domesday Book — earliest census in English history, still referenced in land disputes today',
    ],
  },
};

// ─── Study Materials — Universal (States of Matter, Grade 5) ─────────────────
UNIVERSAL_DEMO.study_materials = {
  flashcards: {
    title: 'States of Matter — Flashcard Deck',
    cards: [
      { id: 1, front: 'Solid', back: 'Fixed shape and volume. Particles packed tightly — they vibrate but stay in place.', curriculum_code: 'NGSS 5-PS1-1', emoji: '🧊' },
      { id: 2, front: 'Liquid', back: 'Fixed volume, no fixed shape. Particles flow freely past each other.', curriculum_code: 'NGSS 5-PS1-1', emoji: '💧' },
      { id: 3, front: 'Gas', back: 'No fixed shape or volume. Particles move rapidly and fill any container.', curriculum_code: 'NGSS 5-PS1-1', emoji: '☁️' },
      { id: 4, front: 'Melting', back: 'Solid → Liquid. Happens when heat energy is added. Example: ice cube melting.', curriculum_code: 'NGSS 5-PS1-2', emoji: '🌡️' },
      { id: 5, front: 'Freezing', back: 'Liquid → Solid. Happens when heat energy is removed. Example: water freezing.', curriculum_code: 'NGSS 5-PS1-2', emoji: '❄️' },
      { id: 6, front: 'Evaporation', back: 'Liquid → Gas at the surface. Example: puddle disappearing on a sunny day.', curriculum_code: 'NGSS 5-PS1-2', emoji: '💨' },
      { id: 7, front: 'Condensation', back: 'Gas → Liquid when cooled. Example: water droplets on a cold glass.', curriculum_code: 'NGSS 5-PS1-2', emoji: '🌫️' },
      { id: 8, front: 'Boiling', back: 'Liquid → Gas throughout the liquid (not just surface). Occurs at boiling point (100°C for water).', curriculum_code: 'NGSS 5-PS1-2', emoji: '🔥' },
      { id: 9, front: 'Sublimation', back: 'Solid → Gas directly, skipping the liquid stage. Example: dry ice (solid CO₂).', curriculum_code: 'NGSS 5-PS1-2', emoji: '✨' },
      { id: 10, front: 'Particle', back: 'Tiny building block of all matter — atoms or molecules. Everything is made of particles.', curriculum_code: 'NGSS 5-PS1-1', emoji: '⚛️' },
      { id: 11, front: 'Melting Point', back: 'Temperature at which a solid becomes a liquid. Water melts at 0°C / 32°F.', curriculum_code: 'NGSS 5-PS1-2', emoji: '🌡️' },
      { id: 12, front: 'Boiling Point', back: 'Temperature at which a liquid boils into gas. Water boils at 100°C / 212°F.', curriculum_code: 'NGSS 5-PS1-2', emoji: '♨️' },
    ],
  },
  study_notes: {
    title: 'States of Matter — Study Notes',
    subtitle: 'Science | Grade 5 | Common Core',
    grade_band_label: 'Primary / Elementary',
    sections: [
      { heading: '1. The Three States of Matter', content: 'All matter exists as a solid, liquid, or gas. The difference comes down to how particles (tiny building blocks) are arranged and how fast they move.', key_points: ['Solid: fixed shape, fixed volume, particles vibrate in place', 'Liquid: no fixed shape, fixed volume, particles flow freely', 'Gas: no fixed shape, no fixed volume, particles move rapidly', 'The same substance can exist in all 3 states (e.g. water = ice / water / steam)'] },
      { heading: '2. The Particle Model', content: 'The particle model explains why each state looks and behaves differently. Adding heat gives particles more energy and makes them move faster — eventually changing the state.', key_points: ['Solids: tightly packed, low energy', 'Liquids: close together, medium energy', 'Gases: spread out, high energy', 'More energy → particles move faster → state can change'] },
      { heading: '3. Changes of State', content: 'When you add or remove heat, matter can change state. These are physical changes — the substance stays the same, only its state changes.', key_points: ['Melting: solid → liquid (add heat)', 'Freezing: liquid → solid (remove heat)', 'Evaporation: liquid → gas (add heat)', 'Condensation: gas → liquid (remove heat)', 'Sublimation: solid → gas (e.g. dry ice)'] },
      { heading: '4. Real-World Connections', content: 'States of matter are everywhere around you. Once you understand them, everyday things start to make sense.', key_points: ['Ice melting in your drink = melting (solid → liquid)', 'Steam from a kettle = evaporation/boiling (liquid → gas)', 'Dew on morning grass = condensation (gas → liquid)', 'The water cycle runs entirely on state changes'] },
    ],
  },
  mock_exam: {
    title: 'States of Matter — Practice Assessment',
    exam_board: 'Common Core Science (USA)',
    format_style: 'Primary / Elementary Practice Paper',
    duration_minutes: 45,
    total_marks: 30,
    grade_band: 'Primary / Elementary (Grade 5)',
    questions: [
      { id: 1, section: 'Section A', question: 'Which state of matter has a fixed shape AND a fixed volume?\nA. Liquid  B. Solid  C. Gas  D. Steam', marks: 1, expected_answer: 'B. Solid', rubric: '1 mark — correct answer only.', question_type: 'mcq' },
      { id: 2, section: 'Section A', question: 'What happens to particles when a solid is heated until it melts?\nA. They stop moving  B. They move faster and further apart  C. They disappear  D. They get smaller', marks: 1, expected_answer: 'B. They move faster and further apart', rubric: '1 mark — correct answer only.', question_type: 'mcq' },
      { id: 3, section: 'Section A', question: 'What is the name of the process when liquid water turns into water vapour (gas)?', marks: 2, expected_answer: 'Evaporation (or boiling)', rubric: '2 marks for correct term. 1 mark for partially correct description.', question_type: 'short_answer' },
      { id: 4, section: 'Section B', question: 'A puddle of water disappears on a sunny day. Explain what happened using what you know about states of matter.', marks: 4, expected_answer: 'The sun added heat to the water. The water particles gained energy, moved faster, and escaped into the air as water vapour (gas). This is called evaporation.', rubric: '1 mark: sun added heat. 1 mark: particles gained energy. 1 mark: became gas/water vapour. 1 mark: word "evaporation".', question_type: 'short_answer' },
      { id: 5, section: 'Section B', question: 'Name and describe the three states of matter. Give one real-world example of each.', marks: 6, expected_answer: 'Solid: fixed shape and volume, e.g. ice. Liquid: no fixed shape, fixed volume, e.g. water. Gas: no fixed shape or volume, e.g. steam.', rubric: '2 marks per state (1 description + 1 example). Max 6 marks.', question_type: 'short_answer' },
      { id: 6, section: 'Section C', question: 'Draw the particle arrangement for a solid, a liquid, and a gas. Label each diagram and explain the difference in particle movement.', marks: 6, expected_answer: 'Solid: tightly packed, regular arrangement, vibrating. Liquid: close together, random arrangement, flowing. Gas: spread far apart, rapid random movement.', rubric: '2 marks per diagram (1 for arrangement, 1 for movement description). Max 6 marks.', question_type: 'structured' },
    ],
  },
  cloze_passage: {
    title: 'States of Matter — Fill in the Blanks',
    passage: 'All matter is made up of tiny ___(1)___ that are always moving. In a ___(2)___, these particles are packed tightly and can only vibrate. That is why solids have a fixed ___(3)___. When a solid is heated, the particles gain ___(4)___ and start to move more freely, turning into a ___(5)___. This process is called ___(6)___.',
    blanks: [
      { id: 1, word: 'particles', hint: 'tiny building blocks of matter' },
      { id: 2, word: 'solid', hint: 'fixed shape, fixed volume' },
      { id: 3, word: 'shape', hint: 'the form or outline of something' },
      { id: 4, word: 'energy', hint: 'what heat provides' },
      { id: 5, word: 'liquid', hint: 'flows freely, no fixed shape' },
      { id: 6, word: 'melting', hint: 'solid changing to liquid' },
    ],
  },
  study_map: {
    title: 'Learning Pathway: States of Matter',
    description: 'A visual map of every concept you need to master — from basics to application.',
    root: {
      id: 'root', label: 'States of Matter', type: 'root',
      children: [
        { id: 't1', label: '3 States', type: 'topic', children: [
          { id: 't1s1', label: 'Solid', type: 'subtopic', children: [{ id: 't1s1a', label: 'Fixed shape & volume', type: 'skill', children: [] }] },
          { id: 't1s2', label: 'Liquid', type: 'subtopic', children: [{ id: 't1s2a', label: 'Fixed volume, flows', type: 'skill', children: [] }] },
          { id: 't1s3', label: 'Gas', type: 'subtopic', children: [{ id: 't1s3a', label: 'No fixed shape/volume', type: 'skill', children: [] }] },
        ]},
        { id: 't2', label: 'Particle Model', type: 'topic', children: [
          { id: 't2s1', label: 'Arrangement', type: 'subtopic', children: [] },
          { id: 't2s2', label: 'Energy & Movement', type: 'subtopic', children: [] },
        ]},
        { id: 't3', label: 'State Changes', type: 'topic', children: [
          { id: 't3s1', label: 'Melting & Freezing', type: 'subtopic', children: [] },
          { id: 't3s2', label: 'Evaporation & Condensation', type: 'subtopic', children: [] },
          { id: 't3s3', label: 'Sublimation', type: 'subtopic', children: [] },
        ]},
        { id: 't4', label: 'Real World', type: 'topic', children: [
          { id: 't4s1', label: 'Water Cycle', type: 'subtopic', children: [] },
          { id: 't4s2', label: 'Everyday Examples', type: 'subtopic', children: [] },
        ]},
      ],
    },
  },
  study_schedule: {
    title: 'States of Matter — 2-Week Study Plan',
    persona: 'On-Level', total_weeks: 2, total_lessons: 6,
    overview: 'A structured 2-week plan for Grade 5 students covering all aspects of States of Matter.',
    schedule: [
      { time: 'Day 1', activity: 'What Is Matter? Intro Reading', resource: 'Study Notes (Section 1)', duration_minutes: 25, persona_note: 'Beginner: Section 1 only. Gifted: write own definition + examples.' },
      { time: 'Day 2', activity: 'Flashcard Vocabulary Drill', resource: 'Flashcards (cards 1–6)', duration_minutes: 20, persona_note: 'Beginner: 3 cards. On-Level: 6 cards. Gifted: quiz self without hints.' },
      { time: 'Day 3', activity: 'Particle Model Matching', resource: 'Matching Game', duration_minutes: 20, persona_note: 'SEN: reduce to 4 pairs. Gifted: write a sentence explaining each match.' },
      { time: 'Day 4', activity: 'Cloze Passage Practice', resource: 'Cloze Passage', duration_minutes: 20, persona_note: 'Beginner: use hints. On-Level: no hints. Gifted: write own passage.' },
      { time: 'Day 5', activity: 'Quiz — 10 Questions', resource: 'Quiz', duration_minutes: 25, persona_note: 'All levels attempt. Beginner: review explanations. Gifted: aim for 100%.' },
      { time: 'Day 6', activity: 'Study Map Walkthrough', resource: 'Study Map', duration_minutes: 15, persona_note: 'Trace the path and tick off mastered concepts.' },
      { time: 'Day 7', activity: 'Practice Paper (Short)', resource: 'Mock Exam (Q1–Q4)', duration_minutes: 30, persona_note: 'Beginner: Q1–Q3. On-Level: Q1–Q5. Gifted: full paper timed.' },
      { time: 'Day 8', activity: 'Self-Mark + Review', resource: 'Mock Exam Mark Scheme', duration_minutes: 20, persona_note: 'All levels self-mark. Write 1 improvement goal for next session.' },
      { time: 'Day 9', activity: 'Flashcard Shuffle — All Cards', resource: 'Flashcards (12)', duration_minutes: 15, persona_note: 'Spaced repetition: focus on incorrect cards.' },
      { time: 'Day 10', activity: 'Full Practice Paper', resource: 'Mock Exam (Full)', duration_minutes: 45, persona_note: 'All levels: exam conditions. No notes allowed.' },
    ],
    differentiation: {
      beginner: 'Focus on Sections 1–2 of Study Notes. Use all flashcard hints. Attempt only Q1–Q3 in mock exam. Prioritise understanding over speed.',
      on_level: 'Complete all resources in order. Self-mark every activity. Attempt full mock exam within time limit.',
      gifted: 'Finish resources early. Write your own examples for each concept. Attempt exam without notes. Create 3 new quiz questions.',
      sen_support: 'Use flashcards with hints always. Reduce cloze to 3 blanks. Extra time on mock paper (+50%). Work with a partner on matching game.',
    },
  },
};

// ─── Study Materials — Malaysia (Keadaan Jirim, Tg1) ─────────────────────────
MALAYSIA_DEMO.study_materials = {
  flashcards: {
    title: 'Keadaan Jirim — Kad Imbas (KSSM Sains Tg1)',
    cards: [
      { id: 1, front: 'Pepejal', back: 'Jirim yang mempunyai bentuk dan isipadu tetap. Zarah tersusun rapat dan hanya bergetar.', curriculum_code: 'KSSM Sains Tg1 2.1.1', emoji: '🧊' },
      { id: 2, front: 'Cecair', back: 'Jirim dengan isipadu tetap tetapi bentuk tidak tetap. Zarah boleh bergerak bebas.', curriculum_code: 'KSSM Sains Tg1 2.1.2', emoji: '💧' },
      { id: 3, front: 'Gas', back: 'Jirim tanpa bentuk atau isipadu tetap. Zarah bergerak sangat pantas ke semua arah.', curriculum_code: 'KSSM Sains Tg1 2.1.3', emoji: '☁️' },
      { id: 4, front: 'Peleburan', back: 'Pepejal → Cecair apabila dipanaskan. Contoh: ais batu mencair.', curriculum_code: 'KSSM Sains Tg1 2.2.1', emoji: '🌡️' },
      { id: 5, front: 'Pembekuan', back: 'Cecair → Pepejal apabila didinginkan. Contoh: air bertukar menjadi ais.', curriculum_code: 'KSSM Sains Tg1 2.2.1', emoji: '❄️' },
      { id: 6, front: 'Penyejatan', back: 'Cecair → Gas di permukaan cecair. Contoh: lopak air kering di bawah matahari.', curriculum_code: 'KSSM Sains Tg1 2.2.2', emoji: '💨' },
      { id: 7, front: 'Kondensasi', back: 'Gas → Cecair apabila didinginkan. Contoh: titisan air di luar gelas sejuk.', curriculum_code: 'KSSM Sains Tg1 2.2.2', emoji: '🌫️' },
      { id: 8, front: 'Penyubliman', back: 'Pepejal → Gas terus tanpa melalui cecair. Contoh: ais kering (CO₂ pepejal).', curriculum_code: 'KSSM Sains Tg1 2.2.3', emoji: '✨' },
      { id: 9, front: 'Zarah', back: 'Unit terkecil jirim — atom atau molekul. Semua jirim tersusun daripada zarah.', curriculum_code: 'KSSM Sains Tg1 2.1.1', emoji: '⚛️' },
      { id: 10, front: 'Takat Lebur', back: 'Suhu di mana pepejal bertukar menjadi cecair. Takat lebur air = 0°C.', curriculum_code: 'KSSM Sains Tg1 2.2.1', emoji: '🌡️' },
      { id: 11, front: 'Takat Didih', back: 'Suhu di mana cecair bertukar menjadi gas. Takat didih air = 100°C.', curriculum_code: 'KSSM Sains Tg1 2.2.2', emoji: '🔥' },
      { id: 12, front: 'Tenaga Haba', back: 'Tenaga yang diperlukan untuk mengubah keadaan jirim. Penambahan tenaga haba menyebabkan peleburan atau penyejatan.', curriculum_code: 'KSSM Sains Tg1 2.2.1', emoji: '⚡' },
    ],
  },
  study_notes: {
    title: 'Keadaan Jirim — Nota Pelajaran',
    subtitle: 'Sains Tingkatan 1 | KSSM Malaysia',
    grade_band_label: 'Menengah Rendah (Tingkatan 1)',
    sections: [
      { heading: '1. Tiga Keadaan Jirim', content: 'Semua jirim wujud dalam tiga keadaan: pepejal, cecair, atau gas. Perbezaan antara keadaan ini bergantung kepada susunan dan pergerakan zarah.', key_points: ['Pepejal: bentuk tetap, isipadu tetap, zarah bergetar sahaja', 'Cecair: bentuk tidak tetap, isipadu tetap, zarah bergerak bebas', 'Gas: bentuk dan isipadu tidak tetap, zarah bergerak sangat pantas', 'Air boleh wujud dalam 3 keadaan: ais, air, stim'] },
      { heading: '2. Model Zarah', content: 'Model zarah menerangkan sifat-sifat setiap keadaan jirim. Dalam pepejal, zarah tersusun rapat dan teratur. Dalam cecair, zarah berdekatan tetapi boleh bergerak. Dalam gas, zarah berjauhan dan bergerak bebas.', key_points: ['Pepejal: susunan teratur, tenaga rendah', 'Cecair: susunan rawak, tenaga sederhana', 'Gas: berjauhan, tenaga tinggi', 'Lebih banyak tenaga = gerakan zarah lebih laju'] },
      { heading: '3. Perubahan Keadaan', content: 'Jirim berubah keadaan apabila tenaga haba ditambah atau dikurangkan. Perubahan ini adalah fizikal — bahan kekal sama.', key_points: ['Peleburan: pepejal → cecair (tambah haba)', 'Pembekuan: cecair → pepejal (kurang haba)', 'Penyejatan: cecair → gas (tambah haba)', 'Kondensasi: gas → cecair (kurang haba)', 'Penyubliman: pepejal → gas terus'] },
      { heading: '4. Konteks Malaysia', content: 'Keadaan jirim berkaitan rapat dengan kehidupan harian di Malaysia. Kitar air melibatkan semua perubahan keadaan jirim.', key_points: ['Ais batu mencair dalam minuman = peleburan', 'Stim daripada air mendidih = penyejatan', 'Titisan air di tingkap ber-AC = kondensasi', 'Kitar air: penyejatan → kondensasi → hujan'] },
    ],
  },
  mock_exam: {
    title: 'Keadaan Jirim — Kertas Percubaan PT3',
    exam_board: 'Kementerian Pendidikan Malaysia (KPM)',
    format_style: 'Format PT3 — Menengah Rendah',
    duration_minutes: 60,
    total_marks: 60,
    grade_band: 'Menengah Rendah (Tingkatan 1–3)',
    questions: [
      { id: 1, section: 'Bahagian A — Aneka Pilihan', question: 'Yang manakah menerangkan sifat pepejal dengan betul?\nA. Isipadu tetap, bentuk tidak tetap\nB. Isipadu tidak tetap, bentuk tetap\nC. Isipadu tetap, bentuk tetap\nD. Isipadu tidak tetap, bentuk tidak tetap', marks: 1, expected_answer: 'C', rubric: '1 markah.', question_type: 'mcq' },
      { id: 2, section: 'Bahagian A — Aneka Pilihan', question: 'Proses apakah yang berlaku apabila ais batu bertukar menjadi air?\nA. Pembekuan  B. Penyejatan  C. Peleburan  D. Kondensasi', marks: 1, expected_answer: 'C', rubric: '1 markah.', question_type: 'mcq' },
      { id: 3, section: 'Bahagian B — Soalan Berstruktur', question: '(a) Namakan 3 keadaan jirim.\n(b) Huraikan susunan zarah dalam cecair.\n(c) Berikan SATU contoh cecair dalam kehidupan harian.', marks: 5, expected_answer: '(a) Pepejal, cecair, gas. (b) Zarah berdekatan tetapi tidak tersusun teratur, boleh bergerak bebas. (c) Air / susu / minyak masak.', rubric: '(a) 1 markah setiap keadaan (3m). (b) 1 markah. (c) 1 markah.', question_type: 'structured' },
      { id: 4, section: 'Bahagian B — Soalan Berstruktur', question: 'Jelaskan mengapa titisan air terbentuk di luar permukaan gelas yang berisi air sejuk pada hari yang panas. Gunakan teori zarah.', marks: 4, expected_answer: 'Wap air (gas) di udara bergerak menghampiri gelas sejuk. Zarah kehilangan tenaga haba apabila bersentuhan dengan permukaan sejuk. Dengan tenaga berkurang, zarah tidak dapat kekal sebagai gas dan bertukar menjadi cecair. Proses ini ialah kondensasi.', rubric: '1m: wap air dalam udara. 1m: kehilangan tenaga. 1m: perubahan keadaan. 1m: perkataan kondensasi.', question_type: 'structured' },
      { id: 5, section: 'Bahagian C — Esei', question: 'Huraikan kitar air menggunakan konsep perubahan keadaan jirim. Gunakan rajah berlabel.', marks: 8, expected_answer: 'Kitar air: (1) Penyejatan — air laut menerima haba matahari, bertukar gas. (2) Kondensasi — wap naik, suhu turun, bertukar cecair, awan terbentuk. (3) Hujan — titisan air jatuh. Kitaran berulang.', rubric: '2m penyejatan (teori zarah). 2m kondensasi (teori zarah). 2m rajah berlabel. 2m penghuraian lengkap.', question_type: 'essay' },
    ],
  },
  cloze_passage: {
    title: 'Keadaan Jirim — Isi Tempat Kosong',
    passage: 'Semua jirim tersusun daripada ___(1)___ yang sentiasa bergerak. Dalam keadaan pepejal, zarah tersusun ___(2)___ dan hanya boleh bergetar. Apabila pepejal dipanaskan, zarah memperoleh ___(3)___ dan mula bergerak lebih bebas, akhirnya bertukar menjadi ___(4)___. Proses ini dipanggil ___(5)___. Apabila cecair dipanaskan hingga takat didihnya, ia bertukar kepada ___(6)___.',
    blanks: [
      { id: 1, word: 'zarah', hint: 'unit terkecil jirim' },
      { id: 2, word: 'rapat', hint: 'berdekatan antara satu sama lain' },
      { id: 3, word: 'tenaga', hint: 'haba memberikan ini' },
      { id: 4, word: 'cecair', hint: 'boleh mengalir, isipadu tetap' },
      { id: 5, word: 'peleburan', hint: 'pepejal bertukar kepada cecair' },
      { id: 6, word: 'gas', hint: 'keadaan jirim ketiga' },
    ],
  },
  study_map: {
    title: 'Peta Pembelajaran: Keadaan Jirim (KSSM Tg1)',
    description: 'Peta visual semua konsep Keadaan Jirim mengikut sukatan KSSM.',
    root: {
      id: 'root', label: 'Keadaan Jirim', type: 'root',
      children: [
        { id: 't1', label: '3 Keadaan', type: 'topic', children: [{ id: 't1s1', label: 'Pepejal', type: 'subtopic', children: [] }, { id: 't1s2', label: 'Cecair', type: 'subtopic', children: [] }, { id: 't1s3', label: 'Gas', type: 'subtopic', children: [] }] },
        { id: 't2', label: 'Model Zarah', type: 'topic', children: [{ id: 't2s1', label: 'Susunan', type: 'subtopic', children: [] }, { id: 't2s2', label: 'Tenaga & Gerakan', type: 'subtopic', children: [] }] },
        { id: 't3', label: 'Perubahan Keadaan', type: 'topic', children: [{ id: 't3s1', label: 'Peleburan & Pembekuan', type: 'subtopic', children: [] }, { id: 't3s2', label: 'Penyejatan & Kondensasi', type: 'subtopic', children: [] }] },
        { id: 't4', label: 'Konteks Malaysia', type: 'topic', children: [{ id: 't4s1', label: 'Kitar Air', type: 'subtopic', children: [] }] },
      ],
    },
  },
  study_schedule: {
    title: 'Keadaan Jirim — Jadual Belajar 2 Minggu',
    persona: 'On-Level', total_weeks: 2, total_lessons: 6,
    overview: 'Pelan belajar 2 minggu merangkumi semua aspek Keadaan Jirim mengikut KSSM Sains Tingkatan 1.',
    schedule: [
      { time: 'Hari 1', activity: 'Pengenalan Keadaan Jirim', resource: 'Nota (Bahagian 1)', duration_minutes: 30, persona_note: 'Lemah: baca sahaja. Cemerlang: tulis contoh sendiri.' },
      { time: 'Hari 2', activity: 'Latihan Kad Imbas', resource: 'Kad Imbas (1–6)', duration_minutes: 25, persona_note: 'Lemah: 3 kad. Cemerlang: uji tanpa melihat jawapan.' },
      { time: 'Hari 3', activity: 'Permainan Padanan', resource: 'Matching Game', duration_minutes: 20, persona_note: 'OKU: 4 pasangan sahaja. Cemerlang: jelaskan setiap pasangan.' },
      { time: 'Hari 4', activity: 'Isi Tempat Kosong', resource: 'Petikan Cloze', duration_minutes: 20, persona_note: 'Lemah: guna petunjuk. Cemerlang: tanpa petunjuk.' },
      { time: 'Hari 5', activity: 'Latihan Kuiz', resource: 'Kuiz (10 soalan)', duration_minutes: 30, persona_note: 'Semua cuba. Lemah: semak penjelasan. Cemerlang: sasarkan 100%.' },
      { time: 'Hari 6', activity: 'Semakan Peta Belajar', resource: 'Peta Belajar', duration_minutes: 15, persona_note: 'Ikuti laluan dan tanda konsep yang dikuasai.' },
      { time: 'Hari 7', activity: 'Percubaan PT3 (Bhg A+B)', resource: 'Kertas Percubaan', duration_minutes: 40, persona_note: 'Lemah: A+B sahaja. Cemerlang: kertas penuh.' },
      { time: 'Hari 8', activity: 'Semakan Skema Pemarkahan', resource: 'Skema Pemarkahan', duration_minutes: 25, persona_note: 'Periksa kerja sendiri. Tulis 1 matlamat penambahbaikan.' },
      { time: 'Hari 9', activity: 'Ulangkaji Kad Imbas', resource: 'Kad Imbas (12)', duration_minutes: 15, persona_note: 'Fokus kad yang salah.' },
      { time: 'Hari 10', activity: 'Ujian Percubaan Penuh', resource: 'Kertas Percubaan (Penuh)', duration_minutes: 60, persona_note: 'Syarat peperiksaan sebenar. Tanpa nota.' },
    ],
    differentiation: {
      beginner: 'Fokus Bahagian 1–2 nota. Gunakan petunjuk kad imbas. Cuba Bahagian A+B sahaja.',
      on_level: 'Lengkapkan semua sumber. Semak sendiri. Cuba kertas penuh dalam masa ditetapkan.',
      gifted: 'Selesai lebih awal. Tulis nota tambahan. Cuba tanpa rujukan. Cipta soalan sendiri.',
      sen_support: 'Kad imbas dengan sokongan visual. 3 tempat kosong sahaja. Masa tambahan +50%. Rakan sebaya untuk permainan padanan.',
    },
  },
};

// ─── Study Materials — UK (Norman Conquest, KS3/GCSE) ────────────────────────
UK_DEMO.study_materials = {
  flashcards: {
    title: 'Norman Conquest 1066 — Flashcard Deck (AQA History)',
    cards: [
      { id: 1, front: 'Battle of Hastings', back: '14 October 1066. William of Normandy defeated Harold II. Harold was killed. End of Anglo-Saxon rule in England.', curriculum_code: 'AQA History Spec 1.1', emoji: '⚔️' },
      { id: 2, front: 'William the Conqueror', back: 'Duke of Normandy → King William I of England after Hastings. Introduced Norman feudal system, French language influence, and castle architecture.', curriculum_code: 'AQA History Spec 1.1', emoji: '👑' },
      { id: 3, front: 'Feudal System', back: 'King → Barons → Knights → Serfs. Land given in exchange for loyalty and military service. William used it to reward loyal Normans and control England.', curriculum_code: 'AQA History Spec 1.2', emoji: '🏰' },
      { id: 4, front: 'Domesday Book (1086)', back: "Survey of England's land and population commissioned by William I for taxation. First census of its kind in Europe. Still referenced in modern land disputes.", curriculum_code: 'AQA History Spec 1.3', emoji: '📜' },
      { id: 5, front: 'Harold II', back: 'Last Anglo-Saxon King. Crowned Jan 1066. Fought Vikings at Stamford Bridge then Normans at Hastings — both within 3 weeks. Killed at Hastings.', curriculum_code: 'AQA History Spec 1.1', emoji: '🛡️' },
      { id: 6, front: 'Harrying of the North (1069–70)', back: "William's brutal suppression of northern rebellion. Villages burned, crops destroyed, ~100,000 deaths from starvation. Demonstrated his ruthlessness.", curriculum_code: 'AQA History Spec 1.4', emoji: '🔥' },
      { id: 7, front: 'Bayeux Tapestry', back: '~70m embroidered cloth depicting the Norman Conquest. Created within 20 years of 1066. Key primary source — but Norman-commissioned (consider bias).', curriculum_code: 'AQA History Spec 1.1', emoji: '🎨' },
      { id: 8, front: 'Harald Hardrada', back: 'King of Norway, claimed English throne. Invaded north in 1066. Defeated by Harold II at Stamford Bridge (25 Sep 1066) — just 19 days before Hastings.', curriculum_code: 'AQA History Spec 1.1', emoji: '🪓' },
      { id: 9, front: 'Witan', back: 'Anglo-Saxon council that chose Harold II as king in January 1066. Abolished after the Conquest — replaced by Norman advisors.', curriculum_code: 'AQA History Spec 1.1', emoji: '📋' },
      { id: 10, front: 'Stamford Bridge (Sep 1066)', back: "Harold II's victory over Harald Hardrada's Viking force. Harold then had to march his tired army south to meet William — a key reason he lost at Hastings.", curriculum_code: 'AQA History Spec 1.1', emoji: '🗡️' },
      { id: 11, front: 'Normanisation', back: 'Transformation of England post-1066: new ruling class, French language in courts, Norman architecture, new church leadership. ~30% of modern English from Norman French.', curriculum_code: 'AQA History Spec 1.5', emoji: '🌍' },
      { id: 12, front: 'Anglo-Saxon England', back: 'England before 1066. Germanic settlers from 5th century. Developed legal system, church, local govt. Ended permanently with the Norman Conquest.', curriculum_code: 'AQA History Spec 1.1', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    ],
  },
  study_notes: {
    title: 'The Norman Conquest — GCSE Study Notes',
    subtitle: 'AQA History | Upper Secondary (GCSE)',
    grade_band_label: 'Upper Secondary (GCSE)',
    sections: [
      { heading: '1. The Crisis of 1066 — Three Claimants', content: "When Edward the Confessor died in January 1066 without a clear heir, three men claimed the English throne. This triple claim made armed conflict inevitable.", key_points: ['Harold Godwinson — chosen by the Witan; most powerful English earl', 'Harald Hardrada — Norwegian king; claimed by treaty', 'William of Normandy — claimed Edward promised him the throne; Harold sworn an oath', 'Harold II crowned 5 January 1066 — same day as Edward\'s burial', 'Two battles in one year: Stamford Bridge (Sep) then Hastings (Oct)'] },
      { heading: '2. Why William Won at Hastings', content: "The Norman victory was not inevitable. Harold's army was exhausted. William had military advantages in cavalry and archers. Harold's tactical decisions may have cost him the battle.", key_points: ["Harold's shield wall initially held — but broke when pursuing feigned Norman retreat", 'Norman cavalry gave tactical flexibility on the slopes of Senlac Hill', 'Norman archers fired in high arcs — caused significant casualties', "Harold killed (arrow in eye? or cut down while falling?) — army lost will", "Harold's decision to engage quickly without resting was potentially fatal"] },
      { heading: '3. Consolidating Control (1066–1086)', content: 'William faced major rebellions after 1066. He responded with castle-building, land redistribution through the feudal system, and brutal suppression.', key_points: ['500+ castles built — military control across England', 'Feudal system: land for loyalty — rewarded Norman barons', 'Domesday Book 1086: taxation survey — showed full control', 'Harrying of the North 1069–70: starvation policy — 100,000+ deaths', 'Anglo-Saxon church leaders replaced by Normans'] },
      { heading: '4. Long-Term Impact', content: 'The Norman Conquest was the last successful foreign invasion of England. Its effects on language, law, architecture, and society are still visible today.', key_points: ['~30% of modern English vocabulary from Norman French (beef, castle, government)', 'Romanesque architecture: Durham Cathedral, White Tower (Tower of London)', 'English legal system shaped by Norman law', 'England connected to European politics for centuries', 'Domesday Book still cited in modern land disputes'] },
    ],
  },
  mock_exam: {
    title: 'Norman Conquest — GCSE History Practice Paper',
    exam_board: 'AQA / Edexcel',
    format_style: 'GCSE Style Paper (Upper Secondary)',
    duration_minutes: 90,
    total_marks: 80,
    grade_band: 'Upper Secondary (GCSE — Years 10–11)',
    questions: [
      { id: 1, section: 'Section A — Source Usefulness', question: "Study Source A (Bayeux Tapestry — Harold's death scene). How useful is Source A to a historian studying the Battle of Hastings? Explain your answer using Source A and your contextual knowledge. [8 marks]", marks: 8, expected_answer: 'Useful: primary source created ~20 years after event; shows Norman perspective on Hastings; depicts key events including Harold\'s death. Limitations: Norman-commissioned = potential bias/propaganda; debate over what it actually shows (arrow in eye or horseman?). Use NOP: Nature (embroidery, not eyewitness account), Origin (Norman, 1070s), Purpose (commemorate/justify Norman victory).', rubric: 'L1 (1–2): simple comment on content. L2 (3–5): identifies provenance without full evaluation. L3 (6–8): evaluates provenance + integrates own knowledge systematically. Mark holistically.', question_type: 'essay' },
      { id: 2, section: 'Section A — Short Answer', question: "Describe two features of the feudal system introduced by William I after 1066. [4 marks]", marks: 4, expected_answer: 'Feature 1: Land given to barons in exchange for military service/loyalty — detail: barons owed knights to the king. Feature 2: Serfs at the bottom — detail: tied to the land, no freedom of movement.', rubric: '1 mark per feature + 1 mark per supporting detail. Max 4 marks.', question_type: 'short_answer' },
      { id: 3, section: 'Section B — Narrative Account', question: "Write a narrative account analysing the key events of 1066 that led to William becoming King of England. [8 marks]", marks: 8, expected_answer: "Strong answer: chronological with causation. E.g. 'Because Harold's army was exhausted from Stamford Bridge, they were at a disadvantage at Hastings — this directly contributed to William's victory.' Must cover: Edward's death → three claimants → Stamford Bridge → Norman landing → Hastings → William's coronation.", rubric: 'L1 (1–3): simple narrative, little causation. L2 (4–6): narrative with some cause-effect. L3 (7–8): well-structured narrative, sustained causation throughout.', question_type: 'essay' },
      { id: 4, section: 'Section C — Extended Essay', question: '"The main reason William won the Battle of Hastings was Harold\'s poor leadership." How far do you agree? [16 marks + 4 SPaG]', marks: 20, expected_answer: "Strong answer evaluates multiple factors: Harold's exhaustion post-Stamford Bridge, William's superior cavalry and archers, luck (wind delay gave Harold time to weaken himself), Harold's decision to attack immediately vs. wait. Must reach a clear, justified judgement: is leadership the MAIN reason? Counter: William's military preparation and advantages were arguably more significant.", rubric: 'L1 (1–4): simple agreement. L2 (5–8): multiple factors. L3 (9–12): analyses + begins evaluating. L4 (13–16): sustained evaluation, clear well-supported conclusion. +4 SPaG.', question_type: 'essay' },
    ],
  },
  cloze_passage: {
    title: 'Norman Conquest — Comprehension Cloze',
    passage: "When Edward the Confessor died in January 1066 without a clear ___(1)___, three men claimed the English throne. Harold Godwinson was chosen by the ___(2)___ and crowned immediately. However, William, Duke of ___(3)___, believed Harold had sworn an oath to support his claim. William invaded, and the two armies met at the ___(4)___ on 14 October 1066. Harold was killed and William was crowned on ___(5)___ Day 1066. To control England, William introduced the ___(6)___ system, rewarding loyal Normans with land in exchange for military service.",
    blanks: [
      { id: 1, word: 'heir', hint: 'someone to inherit the throne' },
      { id: 2, word: 'Witan', hint: 'Anglo-Saxon council of nobles' },
      { id: 3, word: 'Normandy', hint: 'region of northern France' },
      { id: 4, word: 'Battle of Hastings', hint: '14 October 1066' },
      { id: 5, word: 'Christmas', hint: '25 December' },
      { id: 6, word: 'feudal', hint: 'land in exchange for loyalty and service' },
    ],
  },
  study_map: {
    title: 'Learning Pathway: Norman Conquest (AQA GCSE History)',
    description: 'All key concepts and skills for the Norman Conquest — from basic recall to source analysis.',
    root: {
      id: 'root', label: 'Norman Conquest 1066', type: 'root',
      children: [
        { id: 't1', label: 'Three Claimants', type: 'topic', children: [{ id: 't1s1', label: 'Harold Godwinson', type: 'subtopic', children: [] }, { id: 't1s2', label: 'William of Normandy', type: 'subtopic', children: [] }, { id: 't1s3', label: 'Harald Hardrada', type: 'subtopic', children: [] }] },
        { id: 't2', label: 'Battles of 1066', type: 'topic', children: [{ id: 't2s1', label: 'Stamford Bridge', type: 'subtopic', children: [] }, { id: 't2s2', label: 'Battle of Hastings', type: 'subtopic', children: [] }] },
        { id: 't3', label: 'Why William Won', type: 'topic', children: [{ id: 't3s1', label: 'Norman Advantages', type: 'subtopic', children: [] }, { id: 't3s2', label: "Harold's Weaknesses", type: 'subtopic', children: [] }] },
        { id: 't4', label: 'Consolidation', type: 'topic', children: [{ id: 't4s1', label: 'Feudal System', type: 'subtopic', children: [] }, { id: 't4s2', label: 'Castle Building', type: 'subtopic', children: [] }, { id: 't4s3', label: 'Domesday Book', type: 'subtopic', children: [] }, { id: 't4s4', label: 'Harrying of the North', type: 'subtopic', children: [] }] },
        { id: 't5', label: 'Long-Term Impact', type: 'topic', children: [{ id: 't5s1', label: 'Language', type: 'subtopic', children: [] }, { id: 't5s2', label: 'Architecture', type: 'subtopic', children: [] }] },
      ],
    },
  },
  study_schedule: {
    title: 'Norman Conquest — GCSE Revision Plan (2 Weeks)',
    persona: 'On-Level', total_weeks: 2, total_lessons: 8,
    overview: 'A 2-week GCSE revision schedule covering all aspects of the Norman Conquest — from factual recall to extended essay technique.',
    schedule: [
      { time: 'Day 1', activity: 'Overview: Three Claimants', resource: 'Study Notes (Section 1) + Flashcards 1–4', duration_minutes: 40, persona_note: 'Foundation: Study Notes only. Higher: Begin comparing claimant strengths.' },
      { time: 'Day 2', activity: 'Flashcard Drill — Key Events', resource: 'Flashcards (all 12)', duration_minutes: 30, persona_note: 'Foundation: write definitions. Higher: link each card to causation.' },
      { time: 'Day 3', activity: 'Matching — Events & Dates', resource: 'Matching Game', duration_minutes: 25, persona_note: 'All levels attempt. Higher: write one causal link per match.' },
      { time: 'Day 4', activity: 'Source Analysis Practice', resource: 'Mock Exam Q1 (Source Question)', duration_minutes: 45, persona_note: 'Foundation: focus on content. Higher: evaluate NOP (Nature, Origin, Purpose).' },
      { time: 'Day 5', activity: 'Cloze + Quiz', resource: 'Cloze Passage + Quiz', duration_minutes: 40, persona_note: 'Foundation: cloze with hints + Q1–Q5 quiz. Higher: no hints, full quiz.' },
      { time: 'Day 6', activity: 'Study Map — Concept Links', resource: 'Study Map', duration_minutes: 25, persona_note: 'All: trace map. Higher: add your own links between nodes.' },
      { time: 'Day 7', activity: '16-Mark Essay Practice', resource: 'Mock Exam Q4 (Extended)', duration_minutes: 60, persona_note: 'Foundation: essay plan only. Higher: full timed essay.' },
      { time: 'Day 8', activity: 'Full Mock Paper (90 mins)', resource: 'Mock Exam (Full)', duration_minutes: 90, persona_note: 'All: full exam conditions. Self-mark using mark scheme.' },
    ],
    differentiation: {
      beginner: 'Focus on factual recall first. Use all flashcard hints. Attempt Sections A–B only. Write essay plans rather than full responses.',
      on_level: 'Complete all resources. Self-mark with mark scheme. Practise timed essays. Target L2–L3 in extended questions.',
      gifted: 'Go beyond spec — read Domesday Book extracts and Bayeux Tapestry scholarly analysis. Target L4 in all extended questions. Research historiographical debates.',
      sen_support: 'Colour-coded flashcards by time period. Extended time +25% on all timed activities. Use essay frame templates. Focus on 3 key dates: Jan, Sep, Oct 1066.',
    },
  },
};

export const DEMO_RESPONSES = {
  universal: UNIVERSAL_DEMO,
  malaysia: MALAYSIA_DEMO,
  uk: UK_DEMO,
};

