import { Core, NodeSingular, Singular, EdgeDefinition } from 'cytoscape';
import { SCRATCH, CLASSNAMES, DATA, EDGE_DATA, EdgeType } from './config';
import { traverseGraphFrom } from './traverser';
const COMMANDS = {
  removeElement: {
    content: 'Remove',
    select: (el: Singular) => el.remove(),
  },
};
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
    selector:
      'node:parent, node:orphan[_nodeType != "start"][_nodeType != "handle"]',
    openMenuEvents: 'cxttapstart taphold',
    commands: [COMMANDS.removeElement],
  });
  //@ts-ignore
  cy.cxtmenu({
    selector: '[_nodeType = "start"]',
    openMenuEvents: 'cxttapstart taphold',
    commands: [
      COMMANDS.removeElement,
      {
        content: 'Start from here',
        select: (node: NodeSingular) => traverseGraphFrom(node),
      },
    ],
  });
  //@ts-ignore
  cy.cxtmenu({
    selector: 'edge',
    openMenuEvents: 'cxttapstart taphold',
    commands: [COMMANDS.removeElement],
  });
  return cy;
}
// TODO: doesn't belong to ui
function shouldConnect(
  source: NodeSingular,
  target: NodeSingular,
  edgeType: EdgeType
) {
  // not same
  if (source.same(target)) return false;
  // already connected
  let conn = source
    .edgesTo(target)
    .filter(`[${EDGE_DATA._edgeType} = '${edgeType}']`)
    .not('.eh-preview');
  if (!!conn.length) return false;

  // valid target for edge type
  if (edgeType === 'flow') return target.data(DATA._isFlowTarget);
  if (edgeType === 'audio') return target.data(DATA._isAudioTarget);
  if (edgeType === 'param') return target.data(DATA._isSetParamTarget);
}
function markValidTargets(source: NodeSingular, edgeType: EdgeType) {
  let cy = source.cy();
  cy.nodes()
    .filter((target) => shouldConnect(source, target, edgeType))
    .addClass(CLASSNAMES.validTarget);
}
function unmarkValidTargets(cy: Core) {
  cy.$('.' + CLASSNAMES.validTarget).removeClass(CLASSNAMES.validTarget);
}
function addEdgeHandles(cy: Core) {
  cy.scratch(
    SCRATCH.edgehandles.flow,
    //@ts-ignore
    cy.edgehandles({
      handleNodes: `[?${DATA._isFlowSource}]`,
      handlePosition: (node: NodeSingular) => {
        return 'right middle';
      },
      edgeType: (source: NodeSingular, target: NodeSingular) => {
        if (shouldConnect(source, target, 'flow')) return 'flat';
        else return undefined;
      },
      edgeParams: () => {
        return {
          data: {
            [EDGE_DATA._edgeType]: 'flow',
          },
        };
      },
      start: (source: NodeSingular) => markValidTargets(source, 'flow'),
      stop: (node: NodeSingular) => unmarkValidTargets(cy),
    })
  );
  cy.scratch(
    SCRATCH.edgehandles.params,
    //@ts-ignore
    cy.edgehandles({
      handleNodes: `[?${DATA._isSetParamSource}]`,
      handlePosition: (node: NodeSingular) => {
        return 'middle top';
      },
      edgeType: (source: NodeSingular, target: NodeSingular) => {
        if (shouldConnect(source, target, 'param')) return 'flat';
        else return;
      },
      edgeParams: (source: NodeSingular, target: NodeSingular) => {
        return {
          data: {
            [EDGE_DATA._edgeType]: 'param',
          },
        };
      },
      start: (source: NodeSingular) => markValidTargets(source, 'param'),
      stop: (node: NodeSingular) => unmarkValidTargets(cy),
    })
  );
  return cy;
}
export function addGlobalPlugins(cy: Core) {
  cy.addListener('tapstart', (e) => e.cy.$('.eh-handle').remove());
  cy.addListener('mouseover', 'node', (e) => {
    if (e.target.isParent()) return;
    clearTimeout(cy.scratch('hide-timeout'));
  });
  cy.addListener('mouseout', 'node', (e) => {
    cy.scratch(
      'hide-timeout',
      setTimeout(() => {
        cy.$('.eh-handle').remove();
      }, 10)
    );
  });
  // hack to not be able to negate handles in context menu selector
  cy.addListener('add', '.eh-handle', (e) => {
    e.target.data('_nodeType', 'handle');
  });
  cy = addContextMenus(cy);
  cy = addEdgeHandles(cy);
  return cy;
}
