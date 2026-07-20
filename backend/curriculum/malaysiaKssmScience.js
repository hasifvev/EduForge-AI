// Reviewed Malaysia curriculum records. Keep records narrowly scoped: a broad chapter
// name is not enough evidence to claim alignment with one specific learning standard.
export const MALAYSIA_KSSM_SCIENCE_RECORDS = [
  {
    id: 'KSSM-SCI-F1-5.1.3',
    country: 'Malaysia',
    framework: 'KSSM',
    framework_version: 'KSSM Science Form 1',
    subject: 'Science',
    grade: 'Form 1',
    strand: 'Penerokaan Unsur Dalam Alam',
    topic: 'Jirim / Matter properties',
    standard_code: '5.1.3',
    outcome_ms: 'Membezakan sifat fizik dan sifat kimia jirim.',
    outcome_en: 'Differentiate the physical properties and chemical properties of matter.',
    accepted_subjects: ['science', 'sains'],
    accepted_years: ['form 1', 'tingkatan 1'],
    topic_patterns: [
      /sifat\s+fizik.*sifat\s+kimia/i,
      /sifat\s+kimia.*sifat\s+fizik/i,
      /physical\s+and\s+chemical\s+propert/i,
      /chemical\s+and\s+physical\s+propert/i,
    ],
    exercise_profile: {
      format_profile: 'PBD teacher-editable evidence task',
      progression: ['identify', 'classify', 'compare', 'justify'],
      evidence_type: 'Student classifies observations and justifies whether each is a physical or chemical property.',
      teacher_observation: 'Record whether the learner can distinguish the categories and explain one classification using an observed property.',
    },
    source: {
      title: 'KPM Laporan Analisis Item Sains TIMSS 2023',
      url: 'https://www.moe.gov.my/storage/files/shares/penerbitan_dan_jurnal/penyelidikan/pisa_timss_sea-plm/Laporan%20Analisis%20Item%20Sains%20TIMSS%202023.pdf',
      evidence: 'The KPM report identifies Tingkatan 1, Tema Penerokaan Unsur Dalam Alam, 5.1 Jirim dalam alam, Standard Pembelajaran 5.1.3.',
      reviewed_on: '2026-07-20',
    },
  },
];
