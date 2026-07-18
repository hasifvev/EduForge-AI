import { useMemo, useState } from 'react';

const TYPE_META = {
  root: { label: 'Core lesson', color: '#4f46e5' },
  topic: { label: 'Learning strand', color: '#0f766e' },
  subtopic: { label: 'Key concept', color: '#0284c7' },
  skill: { label: 'Practice skill', color: '#c2410c' },
};

function explanationFor(node, mapDescription) {
  if (node.description) return node.description;
  const kind = TYPE_META[node.type]?.label.toLowerCase() || 'learning item';
  return `${node.label} is a ${kind}. ${mapDescription || 'Use the connected ideas to build your understanding.'}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function positionForBranch(index, total) {
  const angle = (Math.PI * 2 * index) / Math.max(total, 1) - Math.PI / 2;
  return {
    angle,
    x: 500 + Math.cos(angle) * 215,
    y: 340 + Math.sin(angle) * 205,
  };
}

function positionForChild(branch, index, total) {
  const spread = (index - (total - 1) / 2) * 0.28;
  const angle = branch.angle + spread;
  return {
    x: clamp(branch.x + Math.cos(angle) * 145, 95, 905),
    y: clamp(branch.y + Math.sin(angle) * 130, 80, 600),
  };
}

function MapNode({ node, point, selected, onSelect, size = 'concept' }) {
  const meta = TYPE_META[node.type] || TYPE_META.subtopic;
  return (
    <button
      type="button"
      className={`mm-graph-node mm-graph-node--${size} ${selected ? 'mm-graph-node--selected' : ''}`}
      style={{ '--node-color': meta.color, left: `${point.x / 10}%`, top: `${point.y / 6.8}%` }}
      onClick={() => onSelect(node)}
      aria-pressed={selected}
    >
      <span className="mm-graph-node-type">{meta.label}</span>
      <strong>{node.label}</strong>
      {node.children?.length > 0 && <span className="mm-graph-node-count">{node.children.length} connected ideas</span>}
    </button>
  );
}

export default function MindMap({ data }) {
  const [selectedNode, setSelectedNode] = useState(data?.root || null);

  const layout = useMemo(() => {
    const branches = (data?.root?.children || []).map((node, index, all) => {
      const branch = { node, ...positionForBranch(index, all.length) };
      return {
        ...branch,
        children: (node.children || []).map((child, childIndex, siblings) => ({
          node: child,
          ...positionForChild(branch, childIndex, siblings.length),
        })),
      };
    });
    return branches;
  }, [data]);

  if (!data?.root) return null;

  const exportText = () => {
    const lines = [];
    const visit = (node, depth) => {
      lines.push(`${'  '.repeat(depth)}- ${node.label}: ${explanationFor(node, data.description)}`);
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

      <section className="mm-topic-panel" aria-live="polite">
        <span className="mm-topic-type" style={{ color: TYPE_META[selectedNode?.type]?.color }}>
          {TYPE_META[selectedNode?.type]?.label || 'Learning concept'}
        </span>
        <h4>{selectedNode?.label}</h4>
        <p>{selectedNode && explanationFor(selectedNode, data.description)}</p>
        {selectedNode?.children?.length > 0 && <span className="mm-topic-related">Explore {selectedNode.children.length} connected ideas on the map</span>}
      </section>

      <div className="mm-graph-scroll" aria-label="Interactive study map">
        <div className="mm-graph-canvas">
          <svg className="mm-graph-lines" viewBox="0 0 1000 680" aria-hidden="true">
            {layout.map((branch) => (
              <g key={`${branch.node.id}-lines`}>
                <line x1="500" y1="340" x2={branch.x} y2={branch.y} />
                {branch.children.map((child) => <line key={child.node.id} x1={branch.x} y1={branch.y} x2={child.x} y2={child.y} />)}
              </g>
            ))}
          </svg>

          {layout.flatMap((branch) => branch.children.map((child) => (
            <MapNode key={child.node.id} node={child.node} point={child} selected={selectedNode?.id === child.node.id} onSelect={setSelectedNode} size="detail" />
          )))}
          {layout.map((branch) => (
            <MapNode key={branch.node.id} node={branch.node} point={branch} selected={selectedNode?.id === branch.node.id} onSelect={setSelectedNode} size="strand" />
          ))}
          <MapNode node={data.root} point={{ x: 500, y: 340 }} selected={selectedNode?.id === data.root.id} onSelect={setSelectedNode} size="root" />
        </div>
      </div>
    </section>
  );
}
