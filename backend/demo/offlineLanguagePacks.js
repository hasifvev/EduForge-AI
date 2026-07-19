const normalize = (value = '') => String(value).trim().toLowerCase();

const shared = (copy) => ({
  language: copy.language,
  localized: true,
  context: ({ subject, topic }) => copy.context(subject, topic),
  objectives: ({ subject, topic }) => copy.objectives(subject, topic),
  concept: ({ topic }) => copy.concept(topic),
  vocabulary: ({ subject }) => copy.vocabulary(subject),
  evidence: copy.evidence,
  application: copy.application,
  question: ({ term }) => copy.question(term),
  correctKey: ({ topic }) => copy.correctKey(topic),
  correctExample: ({ topic }) => copy.correctExample(topic),
  unrelated: copy.unrelated,
  copied: copy.copied,
  noEvidence: copy.noEvidence,
  explanation: ({ correct, term }) => copy.explanation(correct, term),
  definition: ({ term, topic }) => copy.definition(term, topic),
  worksheetQuestion: ({ term, topic }) => copy.worksheetQuestion(term, topic),
  worksheetAnswer: ({ topic }) => copy.worksheetAnswer(topic),
  worksheetHint: ({ framework }) => copy.worksheetHint(framework),
  reflection: copy.reflection,
  sourceNotice: ({ requestedLanguage, frameworkClaim }) => copy.sourceNotice(requestedLanguage, frameworkClaim),
  summary: ({ subject, year, topic, context, framework }) => copy.summary(subject, year, topic, context, framework),
  misconception: ({ topic }) => copy.misconception(topic),
  realWorld: ({ topic }) => copy.realWorld(topic),
  prerequisite: copy.prerequisite,
  instruction: copy.instruction,
  answerKey: ({ topic }) => copy.answerKey(topic),
  flashcardBack: ({ term, topic }) => copy.flashcardBack(term, topic),
  noteHeadings: copy.noteHeadings,
  reasoning: ({ topic }) => copy.reasoning(topic),
  curriculumCheck: ({ framework, source }) => copy.curriculumCheck(framework, source),
  studyPlan: ({ topic }) => copy.studyPlan(topic),
  schedule: copy.schedule,
});

const english = shared({
  language: 'English',
  context: (subject, topic) => `In ${subject}, ${topic} should be explored as connected ideas: notice vocabulary, explain evidence, then apply understanding to a familiar situation.`,
  objectives: (subject, topic) => [`Identify key ideas and vocabulary connected to ${topic}.`, `Explain one example of ${topic} using ${subject} language.`, `Apply understanding of ${topic} to a teacher-selected local context.`],
  concept: (topic) => `the central ideas in ${topic}`,
  vocabulary: (subject) => `${subject} vocabulary`, evidence: 'evidence and examples', application: 'application to a familiar context',
  question: (term) => `Which response best supports learning about ${term}?`, correctKey: (topic) => `A key idea from ${topic}`, correctExample: (topic) => `An example connected to ${topic}`,
  unrelated: 'An unrelated idea', copied: 'A copied answer without explanation', noEvidence: 'No evidence or example',
  explanation: (correct, term) => `${correct} is strongest because it links the lesson focus to a relevant example. Ask learners to explain why the example fits ${term}.`,
  definition: (term, topic) => `Explain ${term} in learner-friendly language, then connect it to one concrete example that supports ${topic}.`,
  worksheetQuestion: (term, topic) => `Write, draw, or explain one accurate example of ${term}. Then explain how it helps someone understand ${topic}.`,
  worksheetAnswer: (topic) => `Teacher review: accept an evidence-based example connected to ${topic}, plus a clear explanation of the connection.`, worksheetHint: (framework) => `Use the lesson notes and check that your example fits the selected ${framework} context.`, reflection: 'What is one idea you understand better now, and what evidence helped you?',
  sourceNotice: (language, claim) => `Offline instruction pack: English. Requested language: ${language}. ${claim} Teacher review is required for facts, standard alignment, and any untranslated topic text.`,
  summary: (subject, year, topic, context, framework) => `A teacher-editable ${subject} lesson starter for ${year} on ${topic}. ${context} It uses ${framework} as context and requires teacher review.`,
  misconception: (topic) => `Treating ${topic} as a list of facts without explaining evidence.`, realWorld: (topic) => `A familiar local situation connected to ${topic}, explained with evidence.`, prerequisite: ['Relevant prior vocabulary', 'One familiar example or experience', 'Ability to describe observations before drawing a conclusion'], instruction: 'Match each term to its teacher-reviewed explanation. Then say how the example connects to the lesson topic.',
  answerKey: (topic) => `Look for accurate vocabulary, a relevant example, and a sentence explaining the connection to ${topic}.`, flashcardBack: (term, topic) => `Explain ${term} in learner-friendly language. Add one accurate example and say why it supports ${topic}.`,
  noteHeadings: ['Why this matters', 'How to reason about the topic', 'Curriculum and teacher check'], reasoning: (topic) => `A strong response uses key vocabulary, gives an accurate example, and explains the connection between the example and ${topic}.`, curriculumCheck: (framework, source) => `Framework context: ${framework}. ${source}. Confirm the exact standard, local facts, and accessible language before classroom delivery.`, studyPlan: (topic) => `${topic} — 4-step study plan`, schedule: ['Vocabulary and prior knowledge', 'Teacher model with evidence', 'Guided explanation practice', 'Independent application and reflection'],
});

const malay = shared({
  language: 'Bahasa Melayu',
  context: (subject, topic) => `Dalam ${subject}, ${topic} perlu diterokai sebagai idea yang saling berkaitan: kenal pasti kosa kata, jelaskan bukti, kemudian gunakan kefahaman dalam situasi yang biasa.`,
  objectives: (subject, topic) => [`Kenal pasti idea utama dan kosa kata berkaitan ${topic}.`, `Jelaskan satu contoh ${topic} menggunakan bahasa ${subject}.`, `Gunakan kefahaman tentang ${topic} dalam konteks tempatan yang dipilih guru.`],
  concept: (topic) => `idea utama dalam ${topic}`, vocabulary: (subject) => `kosa kata ${subject}`, evidence: 'bukti dan contoh', application: 'aplikasi dalam konteks biasa',
  question: (term) => `Jawapan manakah paling menyokong pembelajaran tentang ${term}?`, correctKey: (topic) => `Idea utama daripada ${topic}`, correctExample: (topic) => `Contoh yang berkaitan dengan ${topic}`,
  unrelated: 'Idea yang tidak berkaitan', copied: 'Jawapan disalin tanpa penjelasan', noEvidence: 'Tiada bukti atau contoh',
  explanation: (correct, term) => `${correct} paling kukuh kerana menghubungkan fokus pelajaran dengan contoh yang relevan. Minta murid jelaskan sebab contoh itu sesuai dengan ${term}.`,
  definition: (term, topic) => `Terangkan ${term} dengan bahasa mesra murid, kemudian hubungkannya dengan satu contoh nyata yang menyokong ${topic}.`,
  worksheetQuestion: (term, topic) => `Tulis, lukis atau terangkan satu contoh tepat bagi ${term}. Kemudian jelaskan bagaimana contoh itu membantu memahami ${topic}.`,
  worksheetAnswer: (topic) => `Semakan guru: terima contoh berasaskan bukti yang berkaitan dengan ${topic} serta penjelasan yang jelas.`, worksheetHint: (framework) => `Gunakan nota pelajaran dan semak bahawa contoh anda sesuai dengan konteks ${framework}.`, reflection: 'Apakah satu idea yang anda lebih faham sekarang, dan bukti apakah yang membantu anda?',
  sourceNotice: (language, claim) => `Pek arahan luar talian: Bahasa Melayu. Bahasa diminta: ${language}. ${claim} Guru perlu menyemak fakta, penjajaran standard dan teks topik yang belum diterjemahkan.`,
  summary: (subject, year, topic, context, framework) => `Permulaan pelajaran ${subject} yang boleh disunting guru untuk ${year} tentang ${topic}. ${context} ${framework} digunakan sebagai konteks dan perlu disemak guru.`,
  misconception: (topic) => `Menganggap ${topic} sebagai senarai fakta tanpa menerangkan bukti.`, realWorld: (topic) => `Situasi tempatan yang biasa berkaitan ${topic}, diterangkan dengan bukti.`, prerequisite: ['Kosa kata asas yang berkaitan', 'Satu contoh atau pengalaman yang biasa', 'Keupayaan menerangkan pemerhatian sebelum membuat kesimpulan'], instruction: 'Padankan setiap istilah dengan penjelasan yang telah disemak guru. Kemudian nyatakan kaitannya dengan topik pelajaran.',
  answerKey: (topic) => `Cari kosa kata yang tepat, contoh yang relevan dan ayat yang menerangkan kaitannya dengan ${topic}.`, flashcardBack: (term, topic) => `Terangkan ${term} dengan bahasa mesra murid. Tambah satu contoh tepat dan nyatakan sebabnya menyokong ${topic}.`,
  noteHeadings: ['Mengapa ini penting', 'Cara menaakul topik ini', 'Semakan kurikulum dan guru'], reasoning: (topic) => `Jawapan yang kukuh menggunakan kosa kata utama, memberikan contoh tepat dan menerangkan kaitan antara contoh dengan ${topic}.`, curriculumCheck: (framework, source) => `Konteks rangka kerja: ${framework}. ${source}. Sahkan standard tepat, fakta tempatan dan bahasa yang mudah diakses sebelum digunakan di kelas.`, studyPlan: (topic) => `${topic} — Pelan ulang kaji 4 langkah`, schedule: ['Kosa kata dan pengetahuan sedia ada', 'Model guru dengan bukti', 'Latihan penjelasan berpandu', 'Aplikasi dan refleksi kendiri'],
});

const french = shared({
  language: 'Français',
  context: (subject, topic) => `En ${subject}, ${topic} doit être étudié comme un ensemble d'idées liées : repérer le vocabulaire, expliquer les preuves, puis appliquer la compréhension à une situation familière.`,
  objectives: (subject, topic) => [`Identifier les idées clés et le vocabulaire liés à ${topic}.`, `Expliquer un exemple de ${topic} en utilisant le langage de ${subject}.`, `Appliquer sa compréhension de ${topic} à un contexte local choisi par l'enseignant.`],
  concept: (topic) => `les idées centrales de ${topic}`, vocabulary: (subject) => `vocabulaire de ${subject}`, evidence: 'preuves et exemples', application: 'application à un contexte familier',
  question: (term) => `Quelle réponse soutient le mieux l'apprentissage de ${term} ?`, correctKey: (topic) => `Une idée clé de ${topic}`, correctExample: (topic) => `Un exemple lié à ${topic}`,
  unrelated: 'Une idée sans rapport', copied: 'Une réponse copiée sans explication', noEvidence: 'Aucune preuve ni exemple',
  explanation: (correct, term) => `${correct} est la réponse la plus solide car elle relie l'objectif de la leçon à un exemple pertinent. Demandez aux élèves pourquoi cet exemple correspond à ${term}.`,
  definition: (term, topic) => `Expliquez ${term} avec des mots adaptés aux élèves, puis reliez-le à un exemple concret qui soutient ${topic}.`,
  worksheetQuestion: (term, topic) => `Écrivez, dessinez ou expliquez un exemple exact de ${term}. Expliquez ensuite comment il aide à comprendre ${topic}.`,
  worksheetAnswer: (topic) => `Validation de l'enseignant : accepter un exemple fondé sur des preuves lié à ${topic}, avec une explication claire du lien.`, worksheetHint: (framework) => `Utilisez les notes de leçon et vérifiez que votre exemple correspond au contexte ${framework}.`, reflection: 'Quelle idée comprenez-vous mieux maintenant, et quelle preuve vous a aidé ?',
  sourceNotice: (language, claim) => `Pack pédagogique hors ligne : français. Langue demandée : ${language}. ${claim} L'enseignant doit vérifier les faits, l'alignement du programme et tout texte de sujet non traduit.`,
  summary: (subject, year, topic, context, framework) => `Point de départ modifiable par l'enseignant pour une leçon de ${subject}, ${year}, sur ${topic}. ${context} Le cadre ${framework} sert de contexte et doit être vérifié.`,
  misconception: (topic) => `Traiter ${topic} comme une liste de faits sans expliquer les preuves.`, realWorld: (topic) => `Une situation locale familière liée à ${topic}, expliquée à l'aide de preuves.`, prerequisite: ['Vocabulaire préalable pertinent', 'Un exemple ou une expérience familière', 'Capacité à décrire des observations avant de conclure'], instruction: 'Associez chaque terme à son explication vérifiée par l’enseignant. Dites ensuite comment l’exemple se relie au sujet de la leçon.',
  answerKey: (topic) => `Recherchez un vocabulaire exact, un exemple pertinent et une phrase expliquant le lien avec ${topic}.`, flashcardBack: (term, topic) => `Expliquez ${term} avec des mots adaptés aux élèves. Ajoutez un exemple exact et dites pourquoi il soutient ${topic}.`,
  noteHeadings: ['Pourquoi est-ce important ?', 'Comment raisonner sur le sujet', 'Programme et vérification de l’enseignant'], reasoning: (topic) => `Une bonne réponse utilise le vocabulaire clé, donne un exemple exact et explique le lien entre l'exemple et ${topic}.`, curriculumCheck: (framework, source) => `Contexte du cadre : ${framework}. ${source}. Confirmez la norme exacte, les faits locaux et une langue accessible avant l'utilisation en classe.`, studyPlan: (topic) => `${topic} — Plan d'étude en 4 étapes`, schedule: ['Vocabulaire et connaissances antérieures', 'Modèle de l’enseignant avec preuves', 'Pratique guidée de l’explication', 'Application autonome et réflexion'],
});

const spanish = shared({
  language: 'Español',
  context: (subject, topic) => `En ${subject}, ${topic} debe explorarse como ideas conectadas: reconocer vocabulario, explicar evidencias y aplicar la comprensión a una situación conocida.`,
  objectives: (subject, topic) => [`Identificar ideas clave y vocabulario relacionado con ${topic}.`, `Explicar un ejemplo de ${topic} usando el lenguaje de ${subject}.`, `Aplicar la comprensión de ${topic} a un contexto local elegido por el docente.`],
  concept: (topic) => `las ideas centrales de ${topic}`, vocabulary: (subject) => `vocabulario de ${subject}`, evidence: 'evidencias y ejemplos', application: 'aplicación a un contexto familiar',
  question: (term) => `¿Qué respuesta apoya mejor el aprendizaje sobre ${term}?`, correctKey: (topic) => `Una idea clave de ${topic}`, correctExample: (topic) => `Un ejemplo relacionado con ${topic}`,
  unrelated: 'Una idea no relacionada', copied: 'Una respuesta copiada sin explicación', noEvidence: 'Sin evidencia ni ejemplo',
  explanation: (correct, term) => `${correct} es la respuesta más sólida porque conecta el propósito de la lección con un ejemplo pertinente. Pida al alumnado que explique por qué el ejemplo corresponde a ${term}.`,
  definition: (term, topic) => `Explique ${term} con lenguaje adecuado para el alumnado y conéctelo con un ejemplo concreto que apoye ${topic}.`,
  worksheetQuestion: (term, topic) => `Escriba, dibuje o explique un ejemplo preciso de ${term}. Después explique cómo ayuda a comprender ${topic}.`,
  worksheetAnswer: (topic) => `Revisión docente: acepte un ejemplo basado en evidencias relacionado con ${topic} y una explicación clara del vínculo.`, worksheetHint: (framework) => `Use las notas de la lección y compruebe que el ejemplo se ajusta al contexto ${framework}.`, reflection: '¿Qué idea comprende mejor ahora y qué evidencia le ayudó?',
  sourceNotice: (language, claim) => `Paquete pedagógico sin conexión: español. Idioma solicitado: ${language}. ${claim} El docente debe revisar los hechos, la alineación curricular y cualquier texto del tema que no esté traducido.`,
  summary: (subject, year, topic, context, framework) => `Inicio de lección de ${subject} editable por el docente para ${year} sobre ${topic}. ${context} Usa ${framework} como contexto y requiere revisión docente.`,
  misconception: (topic) => `Tratar ${topic} como una lista de datos sin explicar las evidencias.`, realWorld: (topic) => `Una situación local conocida relacionada con ${topic}, explicada con evidencias.`, prerequisite: ['Vocabulario previo pertinente', 'Un ejemplo o experiencia familiar', 'Capacidad para describir observaciones antes de concluir'], instruction: 'Relacione cada término con su explicación revisada por el docente. Después diga cómo se conecta el ejemplo con el tema de la lección.',
  answerKey: (topic) => `Busque vocabulario preciso, un ejemplo pertinente y una oración que explique la conexión con ${topic}.`, flashcardBack: (term, topic) => `Explique ${term} con lenguaje adecuado para el alumnado. Añada un ejemplo preciso y diga por qué apoya ${topic}.`,
  noteHeadings: ['Por qué importa', 'Cómo razonar sobre el tema', 'Currículo y revisión docente'], reasoning: (topic) => `Una respuesta sólida usa vocabulario clave, presenta un ejemplo preciso y explica la conexión entre el ejemplo y ${topic}.`, curriculumCheck: (framework, source) => `Contexto curricular: ${framework}. ${source}. Confirme el estándar exacto, los hechos locales y un lenguaje accesible antes de usarlo en clase.`, studyPlan: (topic) => `${topic} — Plan de estudio de 4 pasos`, schedule: ['Vocabulario y conocimientos previos', 'Modelo docente con evidencias', 'Práctica guiada de explicación', 'Aplicación independiente y reflexión'],
});

const packs = {
  english, malay, french, spanish,
};

const aliases = {
  english: 'english', 'bahasa melayu': 'malay', malay: 'malay', bahasa: 'malay',
  french: 'french', 'français': 'french', francais: 'french',
  spanish: 'spanish', español: 'spanish', espanol: 'spanish',
};

export function getOfflineLanguagePack(language) {
  const key = aliases[normalize(language)];
  return { pack: packs[key] || english, isExactLanguageMatch: Boolean(key), supportedLanguages: ['English', 'Bahasa Melayu', 'French', 'Spanish'] };
}
