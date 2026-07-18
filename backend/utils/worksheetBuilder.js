function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function getAssessmentProfile({ country = '', year = '', curriculumStandard = '', curriculumSource = '', subject = '' }) {
  const context = [country, year, curriculumStandard, curriculumSource, subject].join(' ').toLowerCase();
  const earlyYears = /(kindergarten|reception|foundation|preschool|pre-primary|nursery|prasekolah)/.test(context);
  const primary = earlyYears || /(year [1-6]|grade [1-6]|primary|tahun [1-6]|standard [1-6])/.test(context);

  if (/malaysia|kssr|kssm/.test(context)) {
    return { framework: earlyYears ? 'KSPK' : primary ? 'KSSR / PBD' : 'KSSM / PBD', focus: earlyYears ? 'guided observation and play-based evidence' : 'knowledge, skills, and application practice' };
  }
  if (/united states|ngss|common core|ccss/.test(context)) {
    return { framework: /science|ngss/.test(context) ? 'NGSS performance expectations' : 'State / Common Core-aligned practice', focus: earlyYears ? 'developmentally appropriate demonstration' : 'evidence, reasoning, and application' };
  }
  if (/united kingdom|england|wales|scotland|northern ireland|gcse|ks[1-5]|national curriculum/.test(context)) {
    return { framework: earlyYears ? 'EYFS' : 'UK National Curriculum / qualification practice', focus: earlyYears ? 'observation-led learning' : 'knowledge recall, explanation, and application' };
  }
  if (/australia|acara|naplan/.test(context)) {
    return { framework: earlyYears ? 'Australian Curriculum Foundation' : 'Australian Curriculum-aligned practice', focus: earlyYears ? 'play-based evidence' : 'understanding, fluency, and reasoning' };
  }
  if (/singapore|moe/.test(context)) {
    return { framework: 'Singapore MOE syllabus-aligned practice', focus: earlyYears ? 'guided exploration' : 'conceptual understanding and problem solving' };
  }
  if (/india|cbse|ncert/.test(context)) {
    return { framework: earlyYears ? 'Foundational Stage / NEP practice' : 'NCERT / CBSE-aligned practice', focus: earlyYears ? 'foundational skills' : 'competency-based application' };
  }
  if (/international baccalaureate|ib|cambridge|igcse/.test(context)) {
    return { framework: /ib/.test(context) ? 'IB inquiry-aligned practice' : 'Cambridge curriculum-aligned practice', focus: 'conceptual understanding, inquiry, and reflection' };
  }
  return { framework: curriculumStandard || curriculumSource || 'Teacher-selected curriculum framework', focus: 'grade-appropriate recall, explanation, and application' };
}
/**
 * Build printable worksheet and answer key HTML.
 * Bilingual support: English + Bahasa Melayu.
 */
export function buildWorksheet({ blueprint, gameContent, subject, year, topic, language, country, curriculumStandard }) {
  const isBM = language?.toLowerCase().includes('melayu') || language?.toLowerCase() === 'bm';

  const labels = {
    worksheet: isBM ? 'Lembaran Kerja' : 'Worksheet',
    subject: isBM ? 'Mata Pelajaran' : 'Subject',
    year: isBM ? 'Tahun' : 'Year',
    topic: isBM ? 'Tajuk' : 'Topic',
    name: isBM ? 'Nama' : 'Name',
    class: isBM ? 'Kelas' : 'Class',
    date: isBM ? 'Tarikh' : 'Date',
    objectives: isBM ? 'Objektif Pembelajaran' : 'Learning Objectives',
    instructions: isBM ? 'Arahan' : 'Instructions',
    score: isBM ? 'Markah' : 'Score',
    answerKey: isBM ? 'Skim Jawapan (Salinan Guru)' : 'Answer Key (Teacher Copy)',
    answers: isBM ? 'Jawapan' : 'Answers',
    teacherOnly: isBM ? 'SULIT — GURU SAHAJA' : 'CONFIDENTIAL — TEACHER ONLY',
  };

  const items = gameContent?.worksheet?.items || [];
  const assessment = getAssessmentProfile({ country, year, curriculumStandard, curriculumSource: blueprint?.curriculum_source, subject });
  const objectives = blueprint?.objectives || [];
  const title = gameContent?.worksheet?.title || `${topic} — ${labels.worksheet}`;
  const instructions = gameContent?.worksheet?.instructions || ('Complete each item, moving from recall to application.');

  const worksheetHTML = `<!DOCTYPE html>
<html lang="${isBM ? 'ms' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { border-bottom: 3px solid #4F6EF7; padding-bottom: 16px; margin-bottom: 24px; }
    .school-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; color: #64748b; margin-top: 12px; }
    .info-row { display: flex; gap: 8px; align-items: center; }
    .info-label { font-weight: 600; min-width: 80px; }
    .info-line { flex: 1; border-bottom: 1px solid #cbd5e1; }
    h1 { font-size: 20px; color: #4F6EF7; font-weight: 700; }
    .meta { font-size: 13px; color: #64748b; margin-top: 4px; }
    .objectives { background: #f0f4ff; border-left: 4px solid #4F6EF7; padding: 12px 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0; }
    .objectives h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #4F6EF7; margin-bottom: 8px; }
    .objectives ul { list-style: disc; padding-left: 20px; font-size: 14px; }
    .objectives li { margin-bottom: 4px; }
    .instructions-box { background: #fffbeb; border: 1px solid #fbbf24; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 20px; }
    .question { margin-bottom: 20px; }
    .question-num { font-weight: 700; color: #4F6EF7; }
    .answer-line { border-bottom: 1px solid #94a3b8; height: 24px; margin-top: 8px; width: 100%; }
    .score-box { border: 2px solid #4F6EF7; border-radius: 8px; padding: 8px 16px; text-align: right; font-weight: 700; float: right; margin-bottom: 24px; font-size: 14px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="score-box">${labels.score}: _____ / ${items.length}</div>
    <h1>${escapeHtml(title)}</h1>
    <div class="meta">${labels.subject}: ${escapeHtml(subject)} | ${labels.year}: ${escapeHtml(year)}</div>
    <div class="meta">Framework: ${escapeHtml(assessment.framework)} | Assessment focus: ${escapeHtml(assessment.focus)}</div>
    <div class="school-info">
      <div class="info-row"><span class="info-label">${labels.name}:</span><span class="info-line"></span></div>
      <div class="info-row"><span class="info-label">${labels.class}:</span><span class="info-line"></span></div>
      <div class="info-row"><span class="info-label">${labels.date}:</span><span class="info-line"></span></div>
    </div>
  </div>
  ${objectives.length ? `<div class="objectives"><h3>${labels.objectives}</h3><ul>${objectives.map(o => `<li>${escapeHtml(o)}</li>`).join('')}</ul></div>` : ''}
  ${instructions ? `<div class="instructions-box"><strong>${labels.instructions}:</strong> ${escapeHtml(instructions)}</div>` : ''}
  ${items.map((item, i) => `
  <div class="question">
    <p><span class="question-num">${i + 1}.</span> ${escapeHtml(item.question)}</p>
    <div class="answer-line"></div>
  </div>`).join('')}
</body>
</html>`;

  const answerKeyHTML = `<!DOCTYPE html>
<html lang="${isBM ? 'ms' : 'en'}">
<head>
  <meta charset="UTF-8">
  <title>${labels.answerKey} — ${escapeHtml(topic)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; }
    .banner { background: #fee2e2; border: 2px solid #ef4444; color: #b91c1c; padding: 8px 16px; border-radius: 8px; font-weight: 700; text-align: center; margin-bottom: 20px; font-size: 13px; }
    h1 { font-size: 20px; color: #ef4444; font-weight: 700; margin-bottom: 4px; }
    .meta { font-size: 13px; color: #64748b; margin-bottom: 24px; }
    .answer-item { margin-bottom: 12px; display: flex; gap: 12px; align-items: flex-start; }
    .num { font-weight: 700; color: #4F6EF7; min-width: 24px; }
    .answer { color: #166534; font-weight: 600; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="banner">⚠ ${labels.teacherOnly}</div>
  <h1>${labels.answerKey}</h1>
  <div class="meta">${labels.subject}: ${escapeHtml(subject)} | ${labels.year}: ${escapeHtml(year)} | ${labels.topic}: ${escapeHtml(topic)}</div>
  <div class="meta">Framework: ${escapeHtml(assessment.framework)} | Assessment focus: ${escapeHtml(assessment.focus)}</div>
  ${items.map((item, i) => `
  <div class="answer-item">
    <span class="num">${i + 1}.</span>
    <div>
      <div style="font-size:13px;color:#64748b;">${escapeHtml(item.question)}</div>
      <div class="answer">→ ${escapeHtml(item.answer)}</div>
    </div>
  </div>`).join('')}
</body>
</html>`;

  return { worksheetHTML, answerKeyHTML };
}
