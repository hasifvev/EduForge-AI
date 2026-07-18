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

export function getCurriculumMapping(countryCode, subject, year) {
  const isMalaysia = countryCode === 'MY';
  const isPrimary = /^(Year|Tahun) [1-6]$/.test(year || '');
  const framework = isMalaysia ? (isPrimary ? 'KSSR Semakan 2017' : 'KSSM') : '';
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
