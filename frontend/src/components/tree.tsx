import { useState, useEffect } from 'react';
import axios from 'axios';

interface Node {
  id: string;
  name: string;
  hasChildren: boolean;
  children?: Node[];
}

export function Tree() {
  const [rootNodes, setRootNodes] = useState<Node[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    axios.get('/api/nodes/root').then(res => setRootNodes(res.data));
  }, []);

  const toggle = async (node: Node) => {
    if (expanded.has(node.id)) {
      expanded.delete(node.id);
      setExpanded(new Set(expanded));
    } else {
      if (!node.children && node.hasChildren) {
        const res = await axios.get(`/api/nodes/${node.id}/children`);
        node.children = res.data;
      }
      setExpanded(new Set(expanded.add(node.id)));
    }
  };

  const renderNode = (node: Node) => (
    <li key={node.id}>
      <span onClick={() => toggle(node)} style={{ cursor: 'pointer' }}>
        {node.name} {node.hasChildren ? (expanded.has(node.id) ? '[-]' : '[+]') : ''}
      </span>
      {node.children && expanded.has(node.id) && (
        <ul>
          {node.children.map(child => renderNode(child))}
        </ul>
      )}
    </li>
  );

  return <ul>{rootNodes.map(node => renderNode(node))}</ul>;
}