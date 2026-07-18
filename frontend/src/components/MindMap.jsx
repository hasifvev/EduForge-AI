import { useMemo, useState } from 'react';

const TYPE_META = {
  root: { label: 'Lesson core', color: '#4338ca' },
  topic: { label: 'Learning strand', color: '#0f766e' },
  subtopic: { label: 'Key concept', color: '#0284c7' },
  skill: { label: 'Practice skill', color: '#c2410c' },
};

function learningCopy(node, mapDescription) {
  const type = TYPE_META[node.type]?.label.toLowerCase() || 'learning step';
  return {
    description: node.description || `${node.label} is an important ${type} in this lesson pathway.`,
    goal: node.learning_goal || `Explain ${node.label} clearly, then connect it to the next idea.`,
    example: node.example || mapDescription || `Find an everyday example that makes ${node.label} easier to remember.`,
    check: node.check_question || `How would you explain ${node.label} in your own words?`,
  };
}

function practiceFor(concept, mapDescription) {
  if (concept.children?.length) return concept.children;
  return [{
    id: `${concept.id}-practice`,
    label: `Explain ${concept.label}`,
    type: 'skill',
    description: `Use one accurate example to explain ${concept.label}.`,
    learning_goal: `Practise recalling and applying ${concept.label}.`,
    example: mapDescription || '',
    check_question: `What is one example of ${concept.label}?`,
    children: [],
  }];
}

export default function MindMap({ data }) {
  const branches = data?.root?.children || [];
  const [activeBranchId, setActiveBranchId] = useState(branches[0]?.id || null);
  const [activeConceptId, setActiveConceptId] = useState(branches[0]?.children?.[0]?.id || null);
  const [selectedNode, setSelectedNode] = useState(branches[0]?.children?.[0] || data?.root || null);
  const [masteredIds, setMasteredIds] = useState(new Set());

  const activeBranch = useMemo(() => branches.find((branch) => branch.id === activeBranchId) || branches[0] || null, [activeBranchId, branches]);
  const concepts = activeBranch?.children || [];
  const activeConcept = useMemo(() => concepts.find((concept) => concept.id === activeConceptId) || concepts[0] || null, [activeConceptId, concepts]);
  const skills = activeConcept ? practiceFor(activeConcept, data?.description) : [];
  const selected = selectedNode || activeConcept || activeBranch || data?.root;

  if (!data?.root) return null;

  const selectBranch = (branch) => {
    const firstConcept = branch.children?.[0] || branch;
    setActiveBranchId(branch.id);
    setActiveConceptId(firstConcept.id);
    setSelectedNode(firstConcept);
  };

  const selectConcept = (concept) => {
    setActiveConceptId(concept.id);
    setSelectedNode(concept);
  };

  const toggleMastered = () => setMasteredIds((current) => {
    const next = new Set(current);
    if (next.has(selected.id)) next.delete(selected.id); else next.add(selected.id);
    return next;
  });

  const exportText = () => {
    const lines = [];
    const visit = (node, depth) => {
      const copy = learningCopy(node, data.description);
      lines.push(`${'  '.repeat(depth)}- ${node.label}`);
      lines.push(`${'  '.repeat(depth + 1)}Learn: ${copy.description}`);
      lines.push(`${'  '.repeat(depth + 1)}Check: ${copy.check}`);
      (node.children || []).forEach((child) => visit(child, depth + 1));
    };
    visit(data.root, 0);
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-map-${data.root.label.toLowerCase().replace(/\s+/g, '-')}.txt`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const detail = learningCopy(selected, data.description);
  const isMastered = masteredIds.has(selected.id);

  return (
    <section className="mind-map-wrapper">
      <div className="mm-header">
        <div>
          <h3 className="mm-title">{data.title}</h3>
          {data.description && <p className="mm-description">{data.description}</p>}
        </div>
        <div className="mm-actions">
          <button type="button" onClick={() => selectBranch(branches[0] || data.root)} className="mm-btn">Start pathway</button>
          <button type="button" onClick={exportText} className="mm-btn">Export</button>
        </div>
      </div>

      <section className="mm-atlas-overview" aria-label="Lesson learning strands">
        <button type="button" className="mm-atlas-root" onClick={() => setSelectedNode(data.root)}>
          <span>{TYPE_META.root.label}</span>
          <strong>{data.root.label}</strong>
          <small>{branches.length} learning strands</small>
        </button>
        <div className="mm-atlas-connector" aria-hidden="true" />
        <div className="mm-atlas-branches">
          {branches.map((branch, index) => (
            <button
              type="button"
              key={branch.id}
              className={`mm-atlas-branch mm-atlas-branch--${index % 5} ${activeBranch?.id === branch.id ? 'mm-atlas-branch--active' : ''}`}
              onClick={() => selectBranch(branch)}
              aria-pressed={activeBranch?.id === branch.id}
            >
              <span>{TYPE_META.topic.label}</span>
              <strong>{branch.label}</strong>
              <small>{branch.children?.length || 0} concepts</small>
            </button>
          ))}
        </div>
      </section>

      {activeBranch && (
        <section className="mm-pathway" aria-label={`${activeBranch.label} learning pathway`}>
          <div className="mm-pathway-heading">
            <span>Explore this strand</span>
            <h4>{activeBranch.label}</h4>
            <p>{learningCopy(activeBranch, data.description).description}</p>
          </div>
          <div className="mm-concept-rail">
            {concepts.map((concept, index) => (
              <div className="mm-concept-step" key={concept.id}>
                <button
                  type="button"
                  className={`mm-concept-node ${activeConcept?.id === concept.id ? 'mm-concept-node--active' : ''} ${masteredIds.has(concept.id) ? 'mm-concept-node--mastered' : ''}`}
                  onClick={() => selectConcept(concept)}
                  aria-pressed={activeConcept?.id === concept.id}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{concept.label}</strong>
                </button>
                {index < concepts.length - 1 && <div className="mm-concept-link" aria-hidden="true" />}
              </div>
            ))}
          </div>

          {activeConcept && (
            <div className="mm-practice-row">
              <div className="mm-practice-label">
                <span>Practice skills</span>
                <strong>{activeConcept.label}</strong>
              </div>
              <div className="mm-practice-skills">
                {skills.map((skill) => (
                  <button
                    type="button"
                    key={skill.id}
                    className={`mm-practice-skill ${selected.id === skill.id ? 'mm-practice-skill--active' : ''} ${masteredIds.has(skill.id) ? 'mm-practice-skill--mastered' : ''}`}
                    onClick={() => setSelectedNode(skill)}
                    aria-pressed={selected.id === skill.id}
                  >
                    {skill.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="mm-learning-panel" aria-live="polite">
        <div className="mm-learning-heading">
          <span className="mm-topic-type" style={{ color: TYPE_META[selected.type]?.color }}>{TYPE_META[selected.type]?.label || 'Learning concept'}</span>
          <h4>{selected.label}</h4>
          <p>{detail.description}</p>
        </div>
        <div className="mm-learning-grid">
          <div><span>Learn</span><p>{detail.goal}</p></div>
          <div><span>Example</span><p>{detail.example}</p></div>
          <div><span>Quick check</span><p>{detail.check}</p></div>
        </div>
        <button type="button" className={`mm-master-btn ${isMastered ? 'mm-master-btn--done' : ''}`} onClick={toggleMastered}>
          {isMastered ? 'Marked as learned' : 'Mark as learned'}
        </button>
      </section>
    </section>
  );
}
