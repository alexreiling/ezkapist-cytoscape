import { Core, NodeSingular } from 'cytoscape';
import { SCRATCH, CLASSNAMES, DATA } from './config';
import { traverseGraphFrom } from './traverser';
function addContextMenus(cy: Core) {
  //@ts-ignore
  cy.cxtmenu({
    selector: 'core',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      {
        content: 'Fit all',
        select: (cy: Core) => cy.fit(undefined, 50),
      },
    ],
  });

  //@ts-ignore
  cy.cxtmenu({
    selector: 'node:parent, node:orphan[_nodeType != "start"]',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      {
        content: 'Remove node',
        select: (node: NodeSingular) => node.remove(),
      },
    ],
  });
  //@ts-ignore
  cy.cxtmenu({
    selector: '[_nodeType = "start"]',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      {
        content: 'Start from here',
        select: (node: NodeSingular) => traverseGraphFrom(node),
      },
    ],
  });
  return cy;
}
function addEdgeHandles(cy: Core) {
  cy.scratch(
    SCRATCH.edgehandles.flow,
    //@ts-ignore
    cy.edgehandles({
      handleNodes: `[?${DATA._isFlowSource}]`,
      handlePosition: (node: NodeSingular) => 'middle top',
      edgeType: (sourceNode: NodeSingular, targetNode: NodeSingular) => {
        sourceNode.data();
        if (sourceNode.allAreNeighbors(targetNode)) return;
        if (!targetNode.data(DATA._isFlowTarget)) return;
        else return 'flat';
      },
      preview: false,
    })
  );
  return cy;
}
export function addGlobalPlugins(cy: Core) {
  cy = addContextMenus(cy);
  cy = addEdgeHandles(cy);
  return cy;
}
