import { useState } from 'react';

const TYPE_META = {
  root: { color: 'var(--accent-purple)', label: 'Main topic' },
  topic: { color: 'var(--accent-blue)', label: 'Topic' },
  subtopic: { color: 'var(--accent-teal)', label: 'Subtopic' },
  skill: { color: 'var(--accent-green)', label: 'Skill' },
};

function getExplanation(node, mapDescription) {
  if (node.description) return node.description;
  const type = TYPE_META[node.type]?.label?.toLowerCase() || 'map item';
  return `${node.label} is a ${type} in this learning pathway. ${mapDescription || 'Open related branches to explore the connected ideas.'}`;
}

function MapNode({ node, depth = 0, selectedId, onSelect }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children?.length > 0;
  const meta = TYPE_META[node.type] || TYPE_META.topic;
  const typeSizes = { root: 16, topic: 14, subtopic: 13, skill: 12 };

  const selectNode = () => {
    onSelect(node);
    if (hasChildren) setExpanded((value) => !value);
  };

  return (
    <div className={`mm-node mm-node--${node.type} mm-node--depth-${Math.min(depth, 3)}`}>
      <button
        type="button"
        className={`mm-node-label ${hasChildren ? 'mm-node-label--clickable' : ''} ${expanded ? 'mm-node-label--expanded' : ''} ${selectedId === node.id ? 'mm-node-label--selected' : ''}`}
        onClick={selectNode}
        style={{ fontSize: typeSizes[node.type] || 13, borderColor: meta.color }}
        aria-expanded={hasChildren ? expanded : undefined}
      >
        <span className={`mm-node-dot mm-node-dot--${node.type}`} style={{ background: meta.color }} />
        <span>{node.label}</span>
        {hasChildren && <span className="mm-expand-icon">{expanded ? '▾' : '▸'}</span>}
      </button>

      {hasChildren && expanded && (
        <div className="mm-children">
          {node.children.map((child) => (
            <MapNode key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MindMap({ data }) {
  const [allExpanded, setAllExpanded] = useState(false);
  const [selectedNode, setSelectedNode] = useState(data?.root || null);

  if (!data?.root) return null;

  const exportText = () => {
    const lines = [];
    const traverse = (node, depth) => {
      lines.push(`${'  '.repeat(depth)}- ${node.label}: ${getExplanation(node, data.description)}`);
      (node.children || []).forEach((child) => traverse(child, depth + 1));
    };
    traverse(data.root, 0);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `study-map-${data.root.label.toLowerCase().replace(/\s+/g, '-')}.txt`;
    anchor.click();
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
          <button onClick={() => setAllExpanded((value) => !value)} className="mm-btn">{allExpanded ? 'Collapse map' : 'Reset map'}</button>
          <button onClick={exportText} className="mm-btn">Export</button>
        </div>
      </div>

      {selectedNode && (
        <section className="mm-topic-panel" aria-live="polite">
          <span className={`mm-topic-type mm-topic-type--${selectedNode.type}`}>{TYPE_META[selectedNode.type]?.label || 'Topic'}</span>
          <h4>{selectedNode.label}</h4>
          <p>{getExplanation(selectedNode, data.description)}</p>
          {selectedNode.children?.length > 0 && <span className="mm-topic-related">{selectedNode.children.length} related {selectedNode.children.length === 1 ? 'item' : 'items'}</span>}
        </section>
      )}

      <div className="mm-tree" key={allExpanded}>
        <MapNode node={data.root} selectedId={selectedNode?.id} onSelect={setSelectedNode} />
      </div>
    </div>
  );
}