import React, { useState, useEffect, useRef, DragEvent } from 'react';
import styled, { css } from 'styled-components';
import cytoscape, {
  Core,
  CytoscapeOptions,
  EdgeSingular,
  NodeSingular,
} from 'cytoscape';
import { addGlobalListeners } from './handlers';
import { flowStyle } from './style';
import Button from '../common/Button';
import { initFromLocalStorage } from '../../cytoscapeHelpers';
import Details from './components/Details';
import FlowOutput from '../FlowOutput';
import FlowNodeDragSelector from './components/FlowNodeDragSelector';
import { addGlobalPlugins } from '../../Flow/ui';
const Wrapper = styled.div`
  height: 100%;
  position: relative;
`;

const Absolute = styled.div<{
  hAnchor?: 'left' | 'right';
  vAnchor?: 'top' | 'bottom';
}>`
  z-index: 10;
  position: absolute;
  background: white;
  opacity: 0.5;
  border: 1px solid black;
  padding: 12px;

  ${(p) =>
    p.hAnchor === 'left'
      ? css`
          left: 48px;
        `
      : css`
          right: 48px;
        `}
  ${(p) =>
    p.vAnchor === 'top'
      ? css`
          top: 48px;
        `
      : css`
          bottom: 48px;
        `}
`;

type FlowEditorCytoProps = {};

const FlowEditorCyto: React.FC<FlowEditorCytoProps> = (props) => {
  const cyRef = useRef<Core>();
  const audioCtxRef = useRef<AudioContext>();
  const [initialized, setInitialized] = useState(false);
  const [selected, setSelected] = useState<
    NodeSingular | EdgeSingular | undefined
  >();
  // one-time setup
  useEffect(() => {
    let cy = cytoscape({
      container: document.getElementById('cy'),
      style: flowStyle,
    } as CytoscapeOptions);
    addGlobalPlugins(cy);
    addGlobalListeners(cy);
    cy.addListener('select', (e) => {
      select(e.target);
    }).addListener('unselect', (e) => select(undefined));

    initFromLocalStorage(cy, 'flow');
    //validateFlow(cy);
    cyRef.current = cy;

    // init audio context
    audioCtxRef.current = new AudioContext();
    setInitialized(true);
    return () => {};
  }, []);
  const select = (ele?: NodeSingular | EdgeSingular) => {
    console.log(ele);
    setSelected(ele);
    cyRef.current?.resize();
  };
  const handleSave = () => {
    let cy = cyRef.current!;
    let graph = {
      nodes: cy.nodes().jsons(),
      edges: cy.edges().jsons(),
    };
    localStorage.setItem('flow', JSON.stringify(graph));
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    const nodeType = e.dataTransfer.getData('nodeType');
    if (!nodeType) return;
    cyRef.current!.emit('dropcreatenode', [
      { nodeType, position: { x: e.clientX, y: e.clientY } },
    ]);
  };
  return (
    <Wrapper>
      <Absolute hAnchor='left' vAnchor='top'>
        <Button onClick={handleSave}>Save</Button>
        <Button>Run Flow</Button>
        <FlowNodeDragSelector />
      </Absolute>
      <Absolute hAnchor='right' vAnchor='top'>
        {selected?.isNode() && selected?.isParent() && (
          <Details node={selected}></Details>
        )}
      </Absolute>
      <Absolute hAnchor='left' vAnchor='bottom'>
        <FlowOutput />
      </Absolute>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ height: '100%' }}
        id='cy'
      ></div>
    </Wrapper>
  );
};

export default FlowEditorCyto;
