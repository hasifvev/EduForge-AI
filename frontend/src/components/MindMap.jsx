import { useMemo, useState } from 'react';

const TYPE_META = {
  root: { label: 'Lesson core', color: '#4338ca' },
  topic: { label: 'Learning strand', color: '#0f766e' },
  subtopic: { label: 'Key concept', color: '#0284c7' },
  skill: { label: 'Practice skill', color: '#c2410c' },
};

const ROOT = { x: 600, y: 400 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function nodeCopy(node, mapDescription) {
  const type = TYPE_META[node.type]?.label.toLowerCase() || 'learning step';
  return {
    description: node.description || `${node.label} is an important ${type} in this lesson pathway.`,
    goal: node.learning_goal || `Explain ${node.label} clearly and use it in the next connected learning task.`,
    example: node.example || mapDescription || `Connect ${node.label} to an everyday situation or a class example.`,
    check: node.check_question || `How would you explain ${node.label} in your own words?`,
  };
}

function branchPoint(index, total) {
  const angle = (Math.PI * 2 * index) / Math.max(total, 1) - Math.PI / 2;
  return { angle, x: ROOT.x + Math.cos(angle) * 250, y: ROOT.y + Math.sin(angle) * 245 };
}

function outwardPoint(parent, baseAngle, index, total, distance, limits) {
  const spread = (index - (total - 1) / 2) * 0.26;
  const angle = baseAngle + spread;
  return {
    angle,
    x: clamp(parent.x + Math.cos(angle) * distance, limits.xMin, limits.xMax),
    y: clamp(parent.y + Math.sin(angle) * distance, limits.yMin, limits.yMax),
  };
}

function MapNode({ node, point, size, selected, mastered, onSelect }) {
  const meta = TYPE_META[node.type] || TYPE_META.subtopic;
  return (
    <button
      type="button"
      className={`mm-graph-node mm-graph-node--${size} ${selected ? 'mm-graph-node--selected' : ''} ${mastered ? 'mm-graph-node--mastered' : ''}`}
      style={{ '--node-color': meta.color, left: `${point.x / 12}%`, top: `${point.y / 8}%` }}
      onClick={() => onSelect(node)}
      aria-pressed={selected}
    >
      <span className="mm-graph-node-type">{mastered ? 'Learned' : meta.label}</span>
      <strong>{node.label}</strong>
      {node.children?.length > 0 && <span className="mm-graph-node-count">{node.children.length} connected ideas</span>}
    </button>
  );
}

export default function MindMap({ data }) {
  const [selectedNode, setSelectedNode] = useState(data?.root || null);
  const [masteredIds, setMasteredIds] = useState(new Set());

  const graph = useMemo(() => {
    const branches = (data?.root?.children || []).slice(0, 5).map((node, index, list) => {
      const branch = { node, ...branchPoint(index, list.length) };
      const concepts = (node.children || []).slice(0, 4).map((concept, conceptIndex, conceptList) => {
        const point = outwardPoint(branch, branch.angle, conceptIndex, conceptList.length, 165, { xMin: 100, xMax: 1100, yMin: 90, yMax: 710 });
        const skills = (concept.children || []).slice(0, 3).map((skill, skillIndex, skillList) => ({
          node: skill,
          ...outwardPoint(point, point.angle, skillIndex, skillList.length, 120, { xMin: 70, xMax: 1130, yMin: 55, yMax: 745 }),
        }));
        return { node: concept, ...point, skills };
      });
      return { ...branch, concepts };
    });
    return branches;
  }, [data]);

  if (!data?.root) return null;

  const selected = selectedNode || data.root;
  const learning = nodeCopy(selected, data.description);
  const mastered = masteredIds.has(selected.id);
  const toggleMastered = () => setMasteredIds((current) => {
    const next = new Set(current);
    if (next.has(selected.id)) next.delete(selected.id); else next.add(selected.id);
    return next;
  });

  const exportText = () => {
    const lines = [];
    const visit = (node, depth) => {
      const copy = nodeCopy(node, data.description);
      lines.push(`${'  '.repeat(depth)}- ${node.label}`);
      lines.push(`${'  '.repeat(depth + 1)}Learn: ${copy.description}`);
      lines.push(`${'  '.repeat(depth + 1)}Check: ${copy.check}`);
      (node.children || []).forEach((child) => visit(child, depth + 1));
    };
    visit(data.root, 0);
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `study-map-${data.root.label.toLowerCase().replace(/\s+/g, '-')}.txt`;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <section className="mind-map-wrapper">
      <div className="mm-header">
        <div>
          <h3 className="mm-title">{data.title}</h3>
          {data.description && <p className="mm-description">{data.description}</p>}
        </div>
        <div className="mm-actions">
          <button type="button" onClick={() => setSelectedNode(data.root)} className="mm-btn">Center map</button>
          <button type="button" onClick={exportText} className="mm-btn">Export</button>
        </div>
      </div>

      <section className="mm-learning-panel" aria-live="polite">
        <div className="mm-learning-heading">
          <span className="mm-topic-type" style={{ color: TYPE_META[selected.type]?.color }}>{TYPE_META[selected.type]?.label || 'Learning concept'}</span>
          <h4>{selected.label}</h4>
          <p>{learning.description}</p>
        </div>
        <div className="mm-learning-grid">
          <div><span>Learn</span><p>{learning.goal}</p></div>
          <div><span>Example</span><p>{learning.example}</p></div>
          <div><span>Quick check</span><p>{learning.check}</p></div>
        </div>
        <button type="button" className={`mm-master-btn ${mastered ? 'mm-master-btn--done' : ''}`} onClick={toggleMastered}>
          {mastered ? 'Marked as learned' : 'Mark as learned'}
        </button>
      </section>

      <div className="mm-graph-scroll" aria-label="Interactive lesson knowledge map">
        <div className="mm-graph-canvas">
          <svg className="mm-graph-lines" viewBox="0 0 1200 800" aria-hidden="true">
            {graph.map((branch) => (
              <g key={`${branch.node.id}-lines`}>
                <line x1={ROOT.x} y1={ROOT.y} x2={branch.x} y2={branch.y} />
                {branch.concepts.map((concept) => (
                  <g key={`${concept.node.id}-lines`}>
                    <line x1={branch.x} y1={branch.y} x2={concept.x} y2={concept.y} />
                    {concept.skills.map((skill) => <line key={skill.node.id} x1={concept.x} y1={concept.y} x2={skill.x} y2={skill.y} />)}
                  </g>
                ))}
              </g>
            ))}
          </svg>
          {graph.flatMap((branch) => branch.concepts.flatMap((concept) => concept.skills.map((skill) => (
            <MapNode key={skill.node.id} node={skill.node} point={skill} size="skill" selected={selected.id === skill.node.id} mastered={masteredIds.has(skill.node.id)} onSelect={setSelectedNode} />
          ))))}
          {graph.flatMap((branch) => branch.concepts.map((concept) => (
            <MapNode key={concept.node.id} node={concept.node} point={concept} size="concept" selected={selected.id === concept.node.id} mastered={masteredIds.has(concept.node.id)} onSelect={setSelectedNode} />
          )))}
          {graph.map((branch) => (
            <MapNode key={branch.node.id} node={branch.node} point={branch} size="strand" selected={selected.id === branch.node.id} mastered={masteredIds.has(branch.node.id)} onSelect={setSelectedNode} />
          ))}
          <MapNode node={data.root} point={ROOT} size="root" selected={selected.id === data.root.id} mastered={masteredIds.has(data.root.id)} onSelect={setSelectedNode} />
        </div>
      </div>
    </section>
  );
}
