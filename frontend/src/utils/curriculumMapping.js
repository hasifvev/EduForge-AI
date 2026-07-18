import { getLearningStage, getRegionProfile, getSubjectsForGrade, topicPathwayFor } from './curriculumCatalog.js';

const MALAYSIA_SUBJECTS = {
  Science: 'Sains', Mathematics: 'Matematik', English: 'Bahasa Inggeris',
  History: 'Sejarah', Geography: 'Geografi', Biology: 'Biologi', Chemistry: 'Kimia',
  Physics: 'Fizik', 'Computer Science': 'Sains Komputer', 'Art & Design': 'Pendidikan Seni Visual',
  Music: 'Pendidikan Muzik', 'Physical Education': 'Pendidikan Jasmani dan Pendidikan Kesihatan',
  Economics: 'Ekonomi', 'Business Studies': 'Perniagaan', Literature: 'Kesusasteraan',
  Psychology: 'Psikologi', Sociology: 'Sosiologi', 'Religious Studies': 'Pendidikan Islam / Pendidikan Moral',
  'Bahasa Melayu': 'Bahasa Melayu', French: 'Bahasa Perancis', Spanish: 'Bahasa Sepanyol',
  Mandarin: 'Bahasa Cina', Arabic: 'Bahasa Arab', Other: 'Mata pelajaran lain',
  Sains: 'Sains', Matematik: 'Matematik', 'Bahasa Inggeris': 'Bahasa Inggeris',
  Sejarah: 'Sejarah', Geografi: 'Geografi', Biologi: 'Biologi', Kimia: 'Kimia', Fizik: 'Fizik',
  'Sains Komputer': 'Sains Komputer', 'Pendidikan Seni Visual': 'Pendidikan Seni Visual',
  Muzik: 'Pendidikan Muzik', 'Pendidikan Jasmani': 'Pendidikan Jasmani dan Pendidikan Kesihatan',
  Ekonomi: 'Ekonomi', Perniagaan: 'Perniagaan', Sastera: 'Kesusasteraan',
  'Pendidikan Islam': 'Pendidikan Islam', 'Pendidikan Moral': 'Pendidikan Moral',
  'Bahasa Arab': 'Bahasa Arab', 'Lain-lain': 'Mata pelajaran lain',
};
const COUNTRY_SUBJECTS = {
  MY: ['Bahasa Melayu', 'Bahasa Inggeris', 'Matematik', 'Sains', 'Pendidikan Islam', 'Pendidikan Moral', 'Sejarah', 'Geografi', 'Reka Bentuk dan Teknologi', 'Asas Sains Komputer', 'Pendidikan Seni Visual', 'Pendidikan Muzik', 'Pendidikan Jasmani dan Pendidikan Kesihatan', 'Bahasa Arab', 'Bahasa Cina', 'Bahasa Tamil', 'Ekonomi', 'Perniagaan', 'Other'],
  US: ['English Language Arts', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'Visual Arts', 'Music', 'Physical Education', 'World Languages', 'Other'],
  GB: ['English', 'Mathematics', 'Science', 'History', 'Geography', 'Computing', 'Design & Technology', 'Art & Design', 'Music', 'Physical Education', 'Religious Education', 'Modern Foreign Languages', 'Other'],
  AU: ['English', 'Mathematics', 'Science', 'Humanities and Social Sciences', 'Technologies', 'The Arts', 'Health and Physical Education', 'Languages', 'Other'],
  SG: ['English Language', 'Mother Tongue Language', 'Mathematics', 'Science', 'Social Studies', 'Art', 'Music', 'Physical Education', 'Character and Citizenship Education', 'Other'],
  IN: ['English', 'Hindi', 'Mathematics', 'Environmental Studies', 'Science', 'Social Science', 'Computer Science', 'Art Education', 'Physical Education', 'Other'],
  INTL: ['Language and Literature', 'Language Acquisition', 'Mathematics', 'Sciences', 'Individuals and Societies', 'Design', 'Arts', 'Physical and Health Education', 'Other'],
};

const COUNTRY_FRAMEWORKS = {
  MY: 'KSSR Semakan 2017 / KSSM', US: 'State standards / NGSS', GB: 'National Curriculum for England',
  AU: 'Australian Curriculum', SG: 'Singapore MOE Syllabus', IN: 'CBSE / ICSE', INTL: 'IB / Cambridge',
};


const MALAYSIA_TOPICS = {
  Matematik: { 1: ['Nombor hingga 100', 'Tambah dan tolak', 'Wang', 'Masa', 'Bentuk dua dan tiga dimensi'], 2: ['Nombor hingga 1,000', 'Tambah, tolak, darab dan bahagi', 'Pecahan', 'Wang', 'Panjang, jisim dan isipadu'], 3: ['Nombor hingga 10,000', 'Pecahan', 'Wang', 'Masa dan waktu', 'Perimeter dan luas'], 4: ['Nombor dan operasi', 'Pecahan', 'Perpuluhan', 'Wang', 'Masa, panjang, jisim dan isipadu'], 5: ['Nombor bulat', 'Pecahan, perpuluhan dan peratus', 'Koordinat', 'Perimeter, luas dan isipadu', 'Pengurusan data'], 6: ['Nisbah dan kadaran', 'Pecahan, perpuluhan dan peratus', 'Algebra asas', 'Ruang dan bentuk', 'Statistik dan kebarangkalian'] },
  Sains: { 1: ['Kemahiran saintifik', 'Benda hidup', 'Deria manusia', 'Bahan di sekeliling', 'Bumi dan angkasa'], 2: ['Kemahiran saintifik', 'Manusia', 'Haiwan', 'Tumbuhan', 'Tenaga dan bahan'], 3: ['Kemahiran saintifik', 'Manusia dan haiwan', 'Tumbuhan', 'Pengukuran', 'Bumi dan angkasa'], 4: ['Kemahiran saintifik', 'Proses hidup manusia', 'Haiwan', 'Tumbuhan', 'Bahan dan tenaga'], 5: ['Kemahiran saintifik', 'Proses hidup', 'Elektrik', 'Haba', 'Bumi dan angkasa'], 6: ['Kemahiran saintifik', 'Mikroorganisma', 'Interaksi antara hidupan', 'Daya', 'Teknologi dan kehidupan lestari'] },
  'Bahasa Melayu': ['Mendengar dan bertutur', 'Membaca dan memahami', 'Tatabahasa', 'Penulisan karangan', 'Seni bahasa'],
  'Bahasa Inggeris': ['Listening and speaking', 'Reading comprehension', 'Grammar and vocabulary', 'Guided writing', 'Storytelling'],
  'Pendidikan Islam': ['Al-Quran', 'Akidah', 'Ibadah', 'Sirah', 'Akhlak'],
  'Pendidikan Moral': ['Nilai murni', 'Diri, keluarga dan komuniti', 'Tanggungjawab', 'Hormat-menghormati', 'Alam sekitar'],
  Sejarah: ['Sejarah diri dan keluarga', 'Tokoh dan peristiwa', 'Warisan negara', 'Pembentukan Malaysia', 'Kewarganegaraan'],
  Geografi: ['Kemahiran geografi', 'Bentuk muka bumi', 'Cuaca dan iklim', 'Sumber semula jadi', 'Penduduk dan petempatan'],
  'Asas Sains Komputer': ['Pemikiran komputasional', 'Algoritma', 'Pengaturcaraan asas', 'Data', 'Keselamatan digital'],
};


// These are curriculum-aware starting points, not a replacement for an official syllabus.
// Teachers can always refine the selected suggestion in the lesson-topic field.
const TOPIC_BANKS = {
  language: { primary: ['Listening and speaking', 'Reading and comprehension', 'Vocabulary and grammar', 'Guided writing', 'Stories and texts'], secondary: ['Reading and analysis', 'Grammar and language use', 'Writing for purpose and audience', 'Oral communication', 'Texts and literature'] },
  mathematics: { primary: ['Number and place value', 'Operations and problem solving', 'Fractions and decimals', 'Measurement', 'Geometry and data'], secondary: ['Number and algebra', 'Geometry and measurement', 'Statistics and probability', 'Functions and graphs', 'Mathematical problem solving'] },
  science: { primary: ['Scientific inquiry', 'Living things', 'Matter and materials', 'Forces and energy', 'Earth and space'], secondary: ['Working scientifically', 'Cells and systems', 'Matter and chemical change', 'Forces, energy and waves', 'Earth and environment'] },
  humanities: { primary: ['People and communities', 'Maps, places and environments', 'History and chronology', 'Civics and citizenship', 'Resources and economic choices'], secondary: ['Historical and geographical enquiry', 'Civilisations and change', 'People, places and power', 'Economics and society', 'Global issues and sustainability'] },
  computing: { primary: ['Digital literacy', 'Algorithms', 'Programming basics', 'Data and information', 'Online safety'], secondary: ['Computational thinking', 'Programming and problem solving', 'Data representation', 'Networks and systems', 'Cyber safety and ethics'] },
  design: { primary: ['Design process', 'Materials and tools', 'Making and testing', 'Structures and mechanisms', 'Sustainable design'], secondary: ['User-centred design', 'Materials and manufacturing', 'Systems and control', 'Prototyping and evaluation', 'Sustainable innovation'] },
  arts: { primary: ['Elements of art', 'Drawing and mark making', 'Colour and composition', 'Creative response', 'Artists and visual culture'], secondary: ['Visual language', 'Media and techniques', 'Research and development', 'Creative production', 'Critical and cultural contexts'] },
  music: { primary: ['Beat and rhythm', 'Pitch and melody', 'Singing and performance', 'Listening and responding', 'Creating music'], secondary: ['Musical elements', 'Performance skills', 'Composition', 'Listening and analysis', 'Music in context'] },
  wellbeing: { primary: ['Movement skills', 'Healthy choices', 'Safety and wellbeing', 'Teamwork and fair play', 'Body awareness'], secondary: ['Fitness and training', 'Health and wellbeing', 'Movement analysis', 'Teamwork and leadership', 'Safety and lifelong activity'] },
  religionEthics: { primary: ['Beliefs and practices', 'Stories and traditions', 'Values and character', 'Respect for others', 'Community and service'], secondary: ['Beliefs, practices and texts', 'Ethics and moral reasoning', 'Religion in society', 'Identity and diversity', 'Reflection and action'] },
  citizenship: { primary: ['Identity and belonging', 'Rights and responsibilities', 'Respect and empathy', 'Community participation', 'Care for the environment'], secondary: ['Citizenship and governance', 'Rights, responsibilities and law', 'Identity and diversity', 'Community action', 'Global citizenship'] },
  business: { primary: ['Needs and wants', 'Money and choices', 'Enterprise ideas', 'Resources and sustainability', 'Working together'], secondary: ['Business activity', 'Marketing and customers', 'Finance and decision making', 'Operations and people', 'Enterprise and sustainability'] },
};

const SUBJECT_CATEGORIES = {
  'Bahasa Melayu': 'language', 'Bahasa Inggeris': 'language', 'Bahasa Arab': 'language', 'Bahasa Cina': 'language', 'Bahasa Tamil': 'language',
  English: 'language', 'English Language': 'language', Hindi: 'language', 'Mother Tongue Language': 'language', 'World Languages': 'language', 'Modern Foreign Languages': 'language', Languages: 'language', 'Language Acquisition': 'language', 'Language and Literature': 'language',
  Matematik: 'mathematics', Mathematics: 'mathematics', Sains: 'science', Science: 'science', Sciences: 'science',
  Sejarah: 'humanities', Geografi: 'humanities', History: 'humanities', Geography: 'humanities', 'Social Studies': 'humanities', 'Social Science': 'humanities', 'Humanities and Social Sciences': 'humanities', 'Individuals and Societies': 'humanities', 'Environmental Studies': 'humanities',
  'Asas Sains Komputer': 'computing', Computing: 'computing', 'Computer Science': 'computing', Technologies: 'computing',
  'Reka Bentuk dan Teknologi': 'design', 'Design & Technology': 'design', Design: 'design',
  'Pendidikan Seni Visual': 'arts', 'Visual Arts': 'arts', 'Art & Design': 'arts', 'The Arts': 'arts', Art: 'arts', 'Art Education': 'arts', Arts: 'arts',
  'Pendidikan Muzik': 'music', Music: 'music',
  'Pendidikan Jasmani dan Pendidikan Kesihatan': 'wellbeing', 'Physical Education': 'wellbeing', 'Health and Physical Education': 'wellbeing', 'Physical and Health Education': 'wellbeing',
  'Pendidikan Islam': 'religionEthics', 'Pendidikan Moral': 'religionEthics', 'Religious Education': 'religionEthics', 'Character and Citizenship Education': 'citizenship',
  Ekonomi: 'business', Perniagaan: 'business',
};
const GENERAL_TOPICS = {
  Mathematics: ['Number and place value', 'Operations and problem solving', 'Fractions and decimals', 'Measurement', 'Geometry and data'],
  Science: ['Scientific inquiry', 'Living things', 'Matter and materials', 'Forces and energy', 'Earth and space'],
  English: ['Reading comprehension', 'Vocabulary and grammar', 'Writing', 'Speaking and listening', 'Literature'],
  'English Language Arts': ['Reading literature', 'Informational text', 'Writing', 'Language and vocabulary', 'Speaking and listening'],
  History: ['Historical enquiry', 'Chronology', 'People and events', 'Sources and evidence', 'Historical interpretation'],
  Geography: ['Maps and fieldwork', 'Physical geography', 'Human geography', 'Environment', 'Place and region'],
  Computing: ['Digital literacy', 'Algorithms', 'Programming', 'Data', 'Online safety'],
  'Computer Science': ['Computational thinking', 'Algorithms', 'Programming', 'Data representation', 'Cyber safety'],
  'Social Studies': ['Civics', 'Communities', 'Geography', 'History', 'Economics'],
  'Environmental Studies': ['Family and community', 'Plants and animals', 'Water and weather', 'Health and hygiene', 'Our environment'],
  'Language and Literature': ['Reading', 'Writing', 'Language analysis', 'Oral communication', 'Literature'],
};

function gradeNumber(year) { return Number((year || '').match(/\d+/)?.[0] || 0); }

function isSecondaryYear(year) {
  return /(?:Form|Tingkatan|Secondary|JC)\s|Year\s(?:[7-9]|1[0-3])|Grade\s(?:[7-9]|1[0-2])/.test(year || '');
}

function categoryTopics(subject, year) {
  const topicBank = TOPIC_BANKS[SUBJECT_CATEGORIES[subject]];
  return topicBank?.[isSecondaryYear(year) ? 'secondary' : 'primary'];
}

export function getTopicSuggestions(countryCode, subject, year) {
  const grade = gradeNumber(year);
  if (countryCode === 'MY') {
    const subjectTopics = MALAYSIA_TOPICS[subject];
    if (Array.isArray(subjectTopics)) return subjectTopics;
    if (subjectTopics && grade >= 1 && grade <= 6) return subjectTopics[grade] || subjectTopics[6];
    if (subject === 'Matematik') return ['Nombor dan operasi', 'Algebra', 'Geometri', 'Sukatan dan ukuran', 'Statistik dan kebarangkalian'];
    if (subject === 'Sains') return ['Penyiasatan saintifik', 'Sel sebagai unit kehidupan', 'Jirim', 'Daya dan gerakan', 'Bumi dan angkasa'];
  }
  return topicPathwayFor(subject, year) || categoryTopics(subject, year) || GENERAL_TOPICS[subject] || ['Core concepts', 'Vocabulary and understanding', 'Application', 'Problem solving', 'Review and assessment'];
}
export function getSubjectsForCountry(countryCode, fallbackSubjects, year = '') {
  return getSubjectsForGrade(countryCode, year, COUNTRY_SUBJECTS[countryCode] || fallbackSubjects);
}
export function getCurriculumMapping(countryCode, subject, year) {
  const isMalaysia = countryCode === 'MY';
  const isPrimary = /^(Year|Tahun) [1-6]$/.test(year || '');
  const profile = getRegionProfile(countryCode);
  const isEarly = getLearningStage(year) === 'early';
  const framework = isMalaysia ? (isEarly ? 'KSPK' : isPrimary ? 'KSSR Semakan 2017' : 'KSSM') : (profile?.framework || COUNTRY_FRAMEWORKS[countryCode] || '');
  const mappedSubject = isMalaysia ? (MALAYSIA_SUBJECTS[subject] || subject) : subject;

  return { framework, subject: mappedSubject, grade: year, sourceUrl: profile?.sourceUrl || '', sourceLabel: profile?.sourceLabel || '' };
}

export function buildMaterialSearchUrl({ countryCode, country, subject, year, topic }) {
  const mapping = getCurriculumMapping(countryCode, subject, year);
  const terms = [
    countryCode === 'MY' ? 'site:moe.gov.my OR site:moe-dl.edu.my' : country,
    mapping.framework,
    `"${mapping.subject}"`,
    `"${mapping.grade}"`,
    topic && `"${topic}"`,
    'DSKP OR curriculum PDF',
  ].filter(Boolean).join(' ');

  return `https://www.google.com/search?q=${encodeURIComponent(terms)}`;
}
