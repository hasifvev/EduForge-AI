const REGIONS = {
  MY: {
    framework: 'KSSR Semakan 2017 / KSSM',
    sourceUrl: 'https://www.moe.gov.my/',
    sourceLabel: 'Malaysia Ministry of Education curriculum resources',
    stages: {
      early: ['Bahasa Melayu', 'Bahasa Inggeris', 'Matematik Awal', 'Sains Awal', 'Pendidikan Islam / Moral', 'Seni Kreatif', 'Perkembangan Fizikal'],
      primary: ['Bahasa Melayu', 'Bahasa Inggeris', 'Matematik', 'Sains', 'Pendidikan Islam', 'Pendidikan Moral', 'Sejarah', 'Geografi', 'Reka Bentuk dan Teknologi', 'Asas Sains Komputer', 'Pendidikan Seni Visual', 'Pendidikan Muzik', 'Pendidikan Jasmani dan Pendidikan Kesihatan', 'Bahasa Arab', 'Bahasa Cina', 'Bahasa Tamil', 'Other'],
      lower: ['Bahasa Melayu', 'Bahasa Inggeris', 'Matematik', 'Sains', 'Sejarah', 'Geografi', 'Reka Bentuk dan Teknologi', 'Asas Sains Komputer', 'Pendidikan Islam', 'Pendidikan Moral', 'Pendidikan Seni Visual', 'Pendidikan Jasmani dan Pendidikan Kesihatan', 'Other'],
      upper: ['Bahasa Melayu', 'Bahasa Inggeris', 'Matematik', 'Matematik Tambahan', 'Biologi', 'Kimia', 'Fizik', 'Sejarah', 'Geografi', 'Perniagaan', 'Ekonomi', 'Prinsip Perakaunan', 'Sains Komputer', 'Pendidikan Islam', 'Pendidikan Moral', 'Other'],
    },
  },
  US: {
    framework: 'State standards / NGSS',
    sourceUrl: 'https://www.nextgenscience.org/',
    sourceLabel: 'Next Generation Science Standards',
    stages: {
      early: ['English Language Arts', 'Mathematics', 'Science', 'Social Studies', 'Visual Arts', 'Music', 'Physical Education'],
      primary: ['English Language Arts', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'Visual Arts', 'Music', 'Physical Education', 'World Languages', 'Other'],
      lower: ['English Language Arts', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'Visual Arts', 'Music', 'Physical Education', 'World Languages', 'Other'],
      upper: ['English Language Arts', 'Algebra', 'Geometry', 'Biology', 'Chemistry', 'Physics', 'US History', 'World History', 'Computer Science', 'Economics', 'Visual Arts', 'Other'],
    },
  },
  GB: {
    framework: 'National Curriculum for England',
    sourceUrl: 'https://www.gov.uk/national-curriculum',
    sourceLabel: 'UK Department for Education National Curriculum',
    stages: {
      early: ['Communication and Language', 'Literacy', 'Mathematics', 'Understanding the World', 'Expressive Arts and Design', 'Physical Development'],
      primary: ['English', 'Mathematics', 'Science', 'History', 'Geography', 'Computing', 'Design & Technology', 'Art & Design', 'Music', 'Physical Education', 'Religious Education', 'Modern Foreign Languages'],
      lower: ['English', 'Mathematics', 'Science', 'History', 'Geography', 'Computing', 'Design & Technology', 'Art & Design', 'Music', 'Physical Education', 'Religious Education', 'Modern Foreign Languages'],
      upper: ['English Language', 'English Literature', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Computer Science', 'Business', 'Economics', 'Art & Design', 'Other'],
    },
  },
  AU: {
    framework: 'Australian Curriculum v9.0',
    sourceUrl: 'https://www.australiancurriculum.edu.au/f-10-curriculum/',
    sourceLabel: 'Australian Curriculum v9.0',
    stages: {
      early: ['English', 'Mathematics', 'Science', 'Humanities and Social Sciences', 'The Arts', 'Health and Physical Education', 'Technologies'],
      primary: ['English', 'Mathematics', 'Science', 'Humanities and Social Sciences', 'Technologies', 'The Arts', 'Health and Physical Education', 'Languages'],
      lower: ['English', 'Mathematics', 'Science', 'Humanities and Social Sciences', 'Technologies', 'The Arts', 'Health and Physical Education', 'Languages'],
      upper: ['English', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Digital Technologies', 'Economics and Business', 'The Arts', 'Other'],
    },
  },
  SG: {
    framework: 'Singapore MOE Syllabus',
    sourceUrl: 'https://www.moe.gov.sg/primary/curriculum',
    sourceLabel: 'Singapore Ministry of Education curriculum',
    stages: {
      early: ['English Language', 'Mother Tongue Language', 'Mathematics', 'Discovery of the World', 'Aesthetics and Creative Expression', 'Physical Development'],
      primary: ['English Language', 'Mother Tongue Language', 'Mathematics', 'Science', 'Social Studies', 'Art', 'Music', 'Physical Education', 'Character and Citizenship Education'],
      lower: ['English Language', 'Mother Tongue Language', 'Mathematics', 'Science', 'Humanities', 'Computing', 'Art', 'Music', 'Physical Education', 'Character and Citizenship Education'],
      upper: ['English Language', 'Mother Tongue Language', 'Elementary Mathematics', 'Additional Mathematics', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Principles of Accounts', 'Computing', 'Other'],
    },
  },
  IN: {
    framework: 'NCF-SE 2023 / CBSE',
    sourceUrl: 'https://ncert.nic.in/',
    sourceLabel: 'NCERT National Curriculum Framework',
    stages: {
      early: ['Foundational Literacy and Numeracy', 'Language and Communication', 'Mathematical Thinking', 'The World Around Us', 'Art and Aesthetics', 'Physical Development and Well-being'],
      primary: ['English', 'Hindi', 'Mathematics', 'The World Around Us', 'Environmental Studies', 'Art Education', 'Physical Education'],
      lower: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science', 'Art Education', 'Physical Education', 'Other'],
      upper: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science', 'Artificial Intelligence', 'Economics', 'Business Studies', 'Physical Education', 'Other'],
    },
  },
  INTL: {
    framework: 'IB PYP / MYP / DP',
    sourceUrl: 'https://www.ibo.org/programmes/',
    sourceLabel: 'International Baccalaureate programme frameworks',
    stages: {
      early: ['Language', 'Mathematics', 'Science', 'Social Studies', 'Arts', 'Personal, Social and Physical Education'],
      primary: ['Language', 'Mathematics', 'Science', 'Social Studies', 'Arts', 'Personal, Social and Physical Education'],
      lower: ['Language and Literature', 'Language Acquisition', 'Mathematics', 'Sciences', 'Individuals and Societies', 'Design', 'Arts', 'Physical and Health Education'],
      upper: ['Studies in Language and Literature', 'Language Acquisition', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Individuals and Societies', 'Arts', 'Design Technology', 'Other'],
    },
  },
};

const EARLY_PATTERNS = /^(prasekolah|kindergarten|reception|foundation|pre-primary|nursery|early years|nursery 1|nursery 2|k1|k2)/i;
const LOWER_PATTERNS = /(?:form|tingkatan|secondary)\s*[1-3]|(?:year|grade)\s*[7-9]/i;
const UPPER_PATTERNS = /(?:form|tingkatan)\s*[4-6]|(?:year|grade|class|jc)\s*(1[0-3]|1[1-2])/i;

export function getLearningStage(year = '') {
  if (EARLY_PATTERNS.test(year)) return 'early';
  if (UPPER_PATTERNS.test(year)) return 'upper';
  if (LOWER_PATTERNS.test(year)) return 'lower';
  return 'primary';
}

export function getRegionProfile(code) {
  return REGIONS[code] || null;
}

export function getSubjectsForGrade(code, year, fallback = []) {
  const profile = getRegionProfile(code);
  return profile?.stages[getLearningStage(year)] || fallback;
}

const TOPICS = {
  early: {
    language: ['Listening and speaking', 'Story and rhyme', 'Early reading', 'Mark making and early writing', 'Vocabulary through play'],
    mathematics: ['Sorting and matching', 'Counting and number sense', 'Patterns', 'Shape and space', 'Measure through play'],
    science: ['My body and senses', 'Plants and animals nearby', 'Weather and seasons', 'Materials around us', 'Caring for the environment'],
    humanities: ['My family and community', 'Places I know', 'People who help us', 'Past and present', 'Belonging and respect'],
    arts: ['Colour and texture', 'Music and movement', 'Dramatic play', 'Making and creating', 'Sharing creative ideas'],
    wellbeing: ['Movement skills', 'Healthy routines', 'Feelings and friendships', 'Safety', 'Independence and self-care'],
    generic: ['Curiosity and exploration', 'Vocabulary and communication', 'Making connections', 'Learning through play', 'Reflection and sharing'],
  },
  primary: {
    language: ['Speaking and listening', 'Reading for meaning', 'Vocabulary and grammar', 'Writing for purpose', 'Literature and response'],
    mathematics: ['Number and place value', 'Operations and problem solving', 'Fractions and decimals', 'Measurement and geometry', 'Data and chance'],
    science: ['Scientific inquiry', 'Living things', 'Matter and materials', 'Forces and energy', 'Earth and space'],
    humanities: ['People and communities', 'Maps, places and environments', 'History and chronology', 'Civics and citizenship', 'Resources and choices'],
    computing: ['Digital literacy', 'Algorithms', 'Programming basics', 'Data and information', 'Online safety'],
    arts: ['Elements of art', 'Drawing and mark making', 'Music and rhythm', 'Creative response', 'Artists and audiences'],
    wellbeing: ['Movement skills', 'Healthy choices', 'Safety and wellbeing', 'Teamwork and fair play', 'Body awareness'],
    generic: ['Core concepts', 'Vocabulary and understanding', 'Application', 'Problem solving', 'Review and assessment'],
  },
  lower: {
    language: ['Reading and analysis', 'Grammar and language use', 'Writing for purpose and audience', 'Oral communication', 'Texts and literature'],
    mathematics: ['Number and algebra', 'Geometry and measurement', 'Statistics and probability', 'Functions and graphs', 'Mathematical problem solving'],
    science: ['Working scientifically', 'Cells and systems', 'Matter and chemical change', 'Forces, energy and waves', 'Earth and environment'],
    humanities: ['Historical and geographical enquiry', 'Civilisations and change', 'People, places and power', 'Economics and society', 'Global issues and sustainability'],
    computing: ['Computational thinking', 'Programming and problem solving', 'Data representation', 'Networks and systems', 'Cyber safety and ethics'],
    arts: ['Visual language', 'Media and techniques', 'Research and development', 'Creative production', 'Critical and cultural contexts'],
    wellbeing: ['Fitness and training', 'Health and wellbeing', 'Movement analysis', 'Teamwork and leadership', 'Safety and lifelong activity'],
    generic: ['Foundational knowledge', 'Methods and skills', 'Analysis', 'Application', 'Reflection and assessment'],
  },
  upper: {
    language: ['Close reading and interpretation', 'Academic writing', 'Language, context and audience', 'Comparative analysis', 'Independent research'],
    mathematics: ['Algebra and functions', 'Geometry and trigonometry', 'Calculus and modelling', 'Statistics and probability', 'Problem solving and proof'],
    science: ['Scientific models and evidence', 'Matter, energy and systems', 'Quantitative methods', 'Experimental design', 'Evaluation and scientific communication'],
    humanities: ['Source interpretation', 'Causation and consequence', 'Comparative perspectives', 'Data and argument', 'Independent investigation'],
    computing: ['Algorithms and abstraction', 'Software development', 'Data structures', 'Networks and cybersecurity', 'Ethics and impact'],
    arts: ['Critical research', 'Techniques and experimentation', 'Creative development', 'Portfolio or performance', 'Evaluation and reflection'],
    wellbeing: ['Training principles', 'Health literacy', 'Leadership and teamwork', 'Risk management', 'Lifelong participation'],
    generic: ['Core theory', 'Methods and evidence', 'Analysis', 'Independent application', 'Evaluation and synthesis'],
  },
};

const CATEGORY_RULES = [
  [/language|english|bahasa|mother tongue|hindi|arabic|french|spanish|literature|communication|literacy/i, 'language'],
  [/math|matematik|mathematical|algebra|geometry|numeracy/i, 'mathematics'],
  [/science|sains|biology|chemistry|physics|environment|world around/i, 'science'],
  [/history|geography|social|humanities|individuals|civics|economics|business|community/i, 'humanities'],
  [/comput|digital|technology|design|ai|programming/i, 'computing'],
  [/art|music|aesthetic|creative|drama/i, 'arts'],
  [/physical|health|well-being|wellbeing|movement|sport|character/i, 'wellbeing'],
];

export function topicPathwayFor(subject, year) {
  const stage = getLearningStage(year);
  const category = CATEGORY_RULES.find(([rule]) => rule.test(subject || ''))?.[1] || 'generic';
  return TOPICS[stage][category] || TOPICS[stage].generic;
}

export const WORLD_LANGUAGE_OPTIONS = [
  'English', 'Arabic', 'Bengali', 'Bhojpuri', 'Bulgarian', 'Burmese', 'Cantonese', 'Catalan', 'Chinese', 'Croatian', 'Czech', 'Danish', 'Dutch', 'Filipino', 'Finnish', 'French', 'German', 'Greek', 'Gujarati', 'Hausa', 'Hebrew', 'Hindi', 'Hungarian', 'Indonesian', 'Italian', 'Japanese', 'Javanese', 'Kannada', 'Korean', 'Malay', 'Malayalam', 'Mandarin', 'Marathi', 'Nepali', 'Persian', 'Polish', 'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Serbian', 'Sinhala', 'Spanish', 'Swahili', 'Swedish', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese', 'Yoruba', 'Zulu'
];
