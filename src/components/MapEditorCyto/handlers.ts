import {
  Core,
  Collection,
  EventObject,
  NodeSingular,
  Position,
} from 'cytoscape';
import { defaultMapNode } from './config';
import { getViewportCenter } from '../../cytoscapeHelpers';
import {
  TraverserState,
  handleArrivalAt,
  createTraverser,
  setDestination,
} from '../../Simulation/traverser';

enum MapEditorMode {
  DEFAULT,
  MOVE_TRAVERSER,
  SET_DESTINATION,
}

function deleteElement(eles: Collection) {
  if (window.confirm('Do you want to remove the element(s)?')) eles.remove();
}
const createNode = (cy: Core, position?: Position) => {
  const initPos = position || getViewportCenter(cy);
  const model = defaultMapNode(initPos);
  cy.add(model);
};

function addContextMenus(cy: Core) {
  //@ts-ignore
  cy.cxtmenu({
    selector: '.static',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      {
        content: 'Delete Node',
        select: deleteElement,
      },
    ],
  });

  //@ts-ignore
  cy.cxtmenu({
    selector: 'edge',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      {
        content: 'Delete Edge',
        select: deleteElement,
      },
    ],
  });
  //@ts-ignore
  cy.cxtmenu({
    selector: 'core',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      {
        content: 'Create new node',
        select: (cy: Core, e: EventObject) => createNode(cy, e.position),
      },
      {
        content: 'Create new traverser',
        select: (cy: Core, e: EventObject) =>
          createTraverser(cy, { position: e.position }),
      },
      {
        content: 'Fit all',
        select: (cy: Core) => cy.fit(undefined, 50),
      },
    ],
  });
  //@ts-ignore
  cy.cxtmenu({
    selector: '.traverser',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      {
        content: 'Move Traverser to Node',
        select: (t: NodeSingular, e: EventObject) => {
          e.cy.autounselectify(true);
          e.cy.scratch('UI_MODE', MapEditorMode.MOVE_TRAVERSER);
          e.cy.scratch('SELECTED_TRAVERSER', t);
          e.cy.scratch('staticEdgeHandles').disable();
        },
      },
      {
        content: 'Set Destination',
        select: (t: NodeSingular, e: EventObject) => {
          e.cy.autounselectify(true);
          e.cy.scratch('UI_MODE', MapEditorMode.SET_DESTINATION);
          e.cy.scratch('SELECTED_TRAVERSER', t);
          e.cy.scratch('staticEdgeHandles').disable();
        },
      },
      {
        content: 'Toggle Movement',
        select: (t: NodeSingular, e: EventObject) => {
          if (t.data('ezkapist').state === TraverserState.Idle)
            t.data('ezkapist').state = TraverserState.Moving;
          else {
            t.data('ezkapist').state = TraverserState.Idle;
          }
        },
      },
      {
        content: 'Delete Node',
        select: deleteElement,
      },
    ],
  });
  return cy;
}

export function addGlobalListeners(cy: Core) {
  cy.addListener('tapend', (e: EventObject, test: any) => {
    if (e.cy.scratch('UI_MODE') !== MapEditorMode.DEFAULT) {
      if (e.target.hasClass && e.target.hasClass('static')) {
        let t = e.cy.scratch('SELECTED_TRAVERSER') as NodeSingular;
        switch (e.cy.scratch('UI_MODE')) {
          case MapEditorMode.MOVE_TRAVERSER:
            handleArrivalAt(t, e.target);
            break;
          case MapEditorMode.SET_DESTINATION:
            setDestination(t, e.target);
            break;
          default:
            break;
        }
      }
      setTimeout(() => e.cy.autounselectify(false), 0);
      e.cy.scratch('staticEdgeHandles').enable();
      e.cy.scratch('UI_MODE', MapEditorMode.DEFAULT);
    }
    cy.$('.eh-handle').remove();
  });
  return cy;
}
export function addGlobalPlugins(cy: Core) {
  cy = addContextMenus(cy);
  //@ts-ignore
  cy.scratch(
    'staticEdgeHandles',
    //@ts-ignore
    cy.edgehandles({
      handleNodes: '.static',
      handlePosition: (node: cytoscape.NodeSingular) => 'middle top',
      edgeType: function (sourceNode: NodeSingular, targetNode: NodeSingular) {
        if (!targetNode.hasClass('static')) return;
        if (sourceNode.allAreNeighbors(targetNode)) return;
        else return 'flat';
      },
      preview: false,
    })
  );
  return cy;
}
