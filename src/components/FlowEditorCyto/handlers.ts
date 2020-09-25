import { createNode } from '../../Flow';
import { Core } from 'cytoscape';

export function addGlobalListeners(cy: Core) {
  cy.addListener('tapstart', (e) => {
    // e.cy.$('.eh-handle').remove();
  }).addListener('dropcreatenode', (e, params) => {
    if (!params || !params.nodeType) return;
    const { x, y } = cy.container()!.getBoundingClientRect();
    const renderedPosition = {
      x: params.position.x - x,
      y: params.position.y - y,
    };
    createNode(cy, params.nodeType, { renderedPosition });
  });
}
