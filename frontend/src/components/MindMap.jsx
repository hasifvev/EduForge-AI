import { useState } from 'react';

// Recursive tree node renderer
function MapNode({ node, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 2); // auto-expand first 2 levels
  const hasChildren = node.children && node.children.length > 0;

  const typeColors = {
    root: 'var(--accent-purple)',
    topic: 'var(--accent-blue)',
    subtopic: 'var(--accent-teal)',
    skill: 'var(--accent-green)',
  };

  const typeSizes = { root: 16, topic: 14, subtopic: 13, skill: 12 };

  return (
    <div className={`mm-node mm-node--${node.type} mm-node--depth-${Math.min(depth, 3)}`}>
      <div
        className={`mm-node-label ${hasChildren ? 'mm-node-label--clickable' : ''} ${expanded ? 'mm-node-label--expanded' : ''}`}
        onClick={() => hasChildren && setExpanded(e => !e)}
        style={{ fontSize: typeSizes[node.type] || 13, borderColor: typeColors[node.type] || 'var(--accent-blue)' }}
        role={hasChildren ? 'button' : undefined}
        tabIndex={hasChildren ? 0 : undefined}
        onKeyDown={e => e.key === 'Enter' && hasChildren && setExpanded(x => !x)}
        aria-expanded={hasChildren ? expanded : undefined}
      >
        <span className={`mm-node-dot mm-node-dot--${node.type}`} style={{ background: typeColors[node.type] }} />
        {node.label}
        {hasChildren && <span className="mm-expand-icon">{expanded ? ' ▾' : ' ▸'}</span>}
      </div>

      {hasChildren && expanded && (
        <div className="mm-children">
          {node.children.map(child => (
            <MapNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MindMap({ data }) {
  const [allExpanded, setAllExpanded] = useState(false);

  if (!data || !data.root) return null;

  const exportSVG = () => {
    // Simple text export since SVG generation needs DOM measurement
    const lines = [];
    const traverse = (node, depth) => {
      lines.push('  '.repeat(depth) + '• ' + node.label);
      (node.children || []).forEach(c => traverse(c, depth + 1));
    };
    traverse(data.root, 0);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-map-${data.root.label.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mind-map-wrapper">
      <div className="mm-header">
        <div>
          <h3 className="mm-title">{data.title}</h3>
          {data.description && <p className="mm-description">{data.description}</p>}
        </div>
        <div className="mm-actions">
          <button onClick={() => setAllExpanded(e => !e)} className="mm-btn">
            {allExpanded ? '➖ Collapse All' : '➕ Expand All'}
          </button>
          <button onClick={exportSVG} className="mm-btn">⬇️ Export</button>
        </div>
      </div>

      <div className="mm-legend">
        <span className="mm-legend-item mm-legend-item--root">📍 Root</span>
        <span className="mm-legend-item mm-legend-item--topic">📂 Topic</span>
        <span className="mm-legend-item mm-legend-item--subtopic">📄 Subtopic</span>
        <span className="mm-legend-item mm-legend-item--skill">⭐ Skill</span>
      </div>

      <div className="mm-tree" key={allExpanded}>
        <MapNode node={data.root} depth={0} />
      </div>
    </div>
  );
}
