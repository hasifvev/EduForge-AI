export function buildCoverageReport({ standardsContext, resources = {}, studyMaterials = {} }) {
  if (!standardsContext?.exact_match) {
    return { status: 'unresolved', mapped: false, mapped_items: 0, total_items: 0, message: standardsContext?.message || 'No reviewed standard record is available.' };
  }

  const counts = [
    resources.quiz?.data?.questions?.length || 0,
    resources.matching?.data?.pairs?.length || 0,
    studyMaterials.mock_exam?.questions?.length || 0,
  ];
  const totalItems = counts.reduce((total, count) => total + count, 0);
  return {
    status: totalItems ? 'mapped' : 'pending-content',
    mapped: Boolean(totalItems),
    standard_id: standardsContext.standard_id,
    registry_version: standardsContext.registry_version,
    mapped_items: totalItems,
    total_items: totalItems,
    evidence_type: standardsContext.exercise_profile.evidence_type,
    teacher_observation: standardsContext.exercise_profile.teacher_observation,
    progression: standardsContext.exercise_profile.progression,
  };
}

function annotateItems(items, standardsContext) {
  if (!Array.isArray(items) || !standardsContext?.exact_match) return items;
  return items.map((item, index) => ({
    ...item,
    standard_id: standardsContext.standard_id,
    cognitive_level: standardsContext.exercise_profile.progression[Math.min(index, standardsContext.exercise_profile.progression.length - 1)],
    evidence_type: standardsContext.exercise_profile.evidence_type,
  }));
}

export function enrichLessonWithStandards(lessonPayload, standardsContext) {
  const resources = {
    ...lessonPayload.resources,
    quiz: lessonPayload.resources?.quiz ? { ...lessonPayload.resources.quiz, data: { ...lessonPayload.resources.quiz.data, questions: annotateItems(lessonPayload.resources.quiz.data?.questions, standardsContext) } } : lessonPayload.resources?.quiz,
    matching: lessonPayload.resources?.matching ? { ...lessonPayload.resources.matching, data: { ...lessonPayload.resources.matching.data, pairs: annotateItems(lessonPayload.resources.matching.data?.pairs, standardsContext) } } : lessonPayload.resources?.matching,
  };
  const study_materials = lessonPayload.study_materials ? {
    ...lessonPayload.study_materials,
    mock_exam: lessonPayload.study_materials.mock_exam ? { ...lessonPayload.study_materials.mock_exam, questions: annotateItems(lessonPayload.study_materials.mock_exam.questions, standardsContext) } : lessonPayload.study_materials.mock_exam,
  } : lessonPayload.study_materials;
  return {
    ...lessonPayload,
    resources,
    study_materials,
    standards_context: standardsContext,
    coverage_report: buildCoverageReport({ standardsContext, resources, studyMaterials: study_materials }),
  };
}
