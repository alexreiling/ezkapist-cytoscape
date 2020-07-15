import React, { useEffect, useRef, useState } from 'react';
import { MapElement } from '../../types';
import { defaultStyle } from './config';
import Header from './components/Header';
import { Main, Sidebar, Wrapper } from './components/MapEditorCyto.style';
import { addGlobalListeners, addGlobalPlugins } from './handlers';
import { initFromLocalStorage } from './util';
import TraverserDetails from './components/TraverserDetails';
import NodeDetails from './components/NodeDetails';

// cytoscape
import cytoscape, {
  Core,
  Singular,
  NodeSingular,
  EdgeSingular,
} from 'cytoscape';
//@ts-ignore
import edgehandles from 'cytoscape-edgehandles';
//@ts-ignore
import cxtmenu from 'cytoscape-cxtmenu';
import { extendCytoscapeWithTraverser } from '../../Simulation/traverser';

cytoscape.use(edgehandles);
cytoscape.use(cxtmenu);

type MapEditorCytoProps = {
  //map: NodeMap;
  selected?: string;
  onSelect?: (selected: MapElement) => any;
};

const MapEditorCyto: React.FC<MapEditorCytoProps> = (props) => {
  const cyRef = useRef<Core>();
  const [initialized, setInitialized] = useState(false);
  const [selected, setSelected] = useState<
    NodeSingular | EdgeSingular | undefined
  >();

  // one-time setup
  useEffect(() => {
    let cy = cytoscape({
      container: document.getElementById('cy'),
      style: defaultStyle,
    })
      .addListener('select', (e) => {
        select(e.target);
      })
      .addListener('unselect', (e) => select(undefined));
    cy = addGlobalListeners(cy);
    cy = addGlobalPlugins(cy);
    extendCytoscapeWithTraverser(cy);

    initFromLocalStorage(cy);
    cyRef.current = cy;
    setInitialized(true);
    return () => {};
  }, []);

  const select = (ele?: NodeSingular | EdgeSingular) => {
    console.log(ele);
    setSelected(ele);
    cyRef.current?.resize();
  };
  return (
    <Wrapper>
      {initialized && <Header cy={cyRef.current!} />}
      <Main>
        <Sidebar>
          {selected?.hasClass('traverser') && (
            <TraverserDetails traverser={selected as NodeSingular} />
          )}
          {selected?.hasClass('static') && (
            <NodeDetails node={selected as NodeSingular} />
          )}
        </Sidebar>
        <div style={{ height: '100%' }} id='cy'></div>
      </Main>
    </Wrapper>
  );
};

export default MapEditorCyto;
