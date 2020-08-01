import { NodeCollection } from 'cytoscape';
import { SCRATCH } from '../config';
import { FlowNodeController } from '../controllers/NodeController';

export const traverseGraphFrom = (nodes: NodeCollection) => {
  nodes.forEach((node) => {
    const controller = node.scratch(SCRATCH.controller) as FlowNodeController;
    if (!controller) return;
    controller.handle().then((next) => {
      traverseGraphFrom(next);
    });
  });
};
