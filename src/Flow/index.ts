import { Core, NodeDefinition, NodeSingular } from 'cytoscape';
import { CLASSNAMES, SUPPORTED, SCRATCH, DATA } from './config';
import { AudioNodeController } from './controllers/NodeController';

const initAudioNodes = (cy: Core) => {
  const audioNodes = cy.$('.' + CLASSNAMES.audio.node);
  audioNodes.forEach((node) => {
    const controller = node.scratch(SCRATCH.controller) as AudioNodeController;
    if (!controller) {
      // TODO: perform ad-hoc controller creation?
    }
    controller.instantiateAudioNode();
  });
  audioNodes.forEach((node) => {
    const controller = node.scratch(SCRATCH.controller) as AudioNodeController;
    controller.initializeOutgoingConnections();
  });
};
const setAudioContext = (cy: Core, audioContext: AudioContext) => {};
export const setInputHandler = (
  cy: Core,
  handler: (node: NodeSingular) => Promise<string | undefined>
) => {
  cy.scratch(SCRATCH.inputHandler, handler);
};
const initNodeController = (node: NodeSingular) => {
  const nodeType = node.data(DATA._nodeType);
  // TODO: call NodeController constructor based on node type
  const def = SUPPORTED.find((d) => d.type === nodeType);
  if (!def) {
    console.warn(
      `No controller definition found for node type ${nodeType}`,
      node
    );
    return;
  } else {
    return new def.Controller(node);
  }
};
export const reinitControllers = (cy: Core) => {
  //TODO: write correct query
  const flowNodes = cy.$(`[?${DATA._nodeType}]`);
  flowNodes.forEach((node) => {
    initNodeController(node);
  });
};
export const createNode = (
  cy: Core,
  nodeType: string,
  options: Partial<NodeDefinition> = {}
) => {
  let node = cy.add({
    ...options,
    data: {
      ...options.data,
      [DATA._nodeType]: nodeType,
    },
  });
  let controller = initNodeController(node);
  if (controller) controller.initializeNode();
};
