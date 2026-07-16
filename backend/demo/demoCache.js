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

export const DEMO_RESPONSES = {
  universal: UNIVERSAL_DEMO,
  malaysia: MALAYSIA_DEMO,
  uk: UK_DEMO,
};
