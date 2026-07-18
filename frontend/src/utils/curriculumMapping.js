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

export function getTopicSuggestions(countryCode, subject, year) {
  const grade = gradeNumber(year);
  if (countryCode === 'MY') {
    const subjectTopics = MALAYSIA_TOPICS[subject];
    if (Array.isArray(subjectTopics)) return subjectTopics;
    if (subjectTopics && grade >= 1 && grade <= 6) return subjectTopics[grade] || subjectTopics[6];
    if (subject === 'Matematik') return ['Nombor dan operasi', 'Algebra', 'Geometri', 'Sukatan dan ukuran', 'Statistik dan kebarangkalian'];
    if (subject === 'Sains') return ['Penyiasatan saintifik', 'Sel sebagai unit kehidupan', 'Jirim', 'Daya dan gerakan', 'Bumi dan angkasa'];
  }
  return GENERAL_TOPICS[subject] || ['Core concepts', 'Vocabulary and understanding', 'Application', 'Problem solving', 'Review and assessment'];
}
export function getSubjectsForCountry(countryCode, fallbackSubjects) {
  return COUNTRY_SUBJECTS[countryCode] || fallbackSubjects;
}
export function getCurriculumMapping(countryCode, subject, year) {
  const isMalaysia = countryCode === 'MY';
  const isPrimary = /^(Year|Tahun) [1-6]$/.test(year || '');
  const framework = isMalaysia ? (isPrimary ? 'KSSR Semakan 2017' : 'KSSM') : (COUNTRY_FRAMEWORKS[countryCode] || '');
  const mappedSubject = isMalaysia ? (MALAYSIA_SUBJECTS[subject] || subject) : subject;

  return { framework, subject: mappedSubject, grade: year };
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
