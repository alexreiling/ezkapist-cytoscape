import NodeController from './controllers/NodeController';
import DelayNodeController from './controllers/flow/DelayNodeController';
import StartNodeController from './controllers/flow/StartNodeController';
import InputNodeController from './controllers/flow/InputNodeController';
import OutputNodeController from './controllers/flow/OutputNodeController';

type KeysEnum<T> = { [P in keyof Required<T>]: P };

export const SCRATCH = {
  controller: '_controller',
  edgehandles: {
    flow: '_flowEdgehandles',
    audio: '_audioEdgehandles',
  },
};
export type NodeData = {
  _nodeType: string;
  _audioData: any;
  _flowData: any;
  _audioNodeType?: string;
  _isFlowTarget: boolean;
  _isFlowSource: boolean;
  _isAudioTarget: boolean;
  _isAudioSource: boolean;
  _isFallback?: boolean;
};

export const DATA: KeysEnum<NodeData> = {
  _nodeType: '_nodeType',
  _audioData: '_audioData',
  _flowData: '_flowData',
  _audioNodeType: '_audioNodeType',
  _isFlowTarget: '_isFlowTarget',
  _isFlowSource: '_isFlowSource',
  _isAudioTarget: '_isAudioTarget',
  _isAudioSource: '_isAudioSource',
  _isFallback: '_isFallback',
};
export const CLASSNAMES = {
  handled: 'handled',
  flow: {
    node: 'flow-node',
    defaultOutGate: 'default-out',
  },
  audio: {
    node: 'audio-node',
    input: 'audio-node-input',
    output: 'audio-node-output',
  },
};
interface NodeDefinition {
  type: string;
  label?: string;
  // TODO: define type
  Controller: typeof NodeController;
  //subNodes: string[];
}
interface AudioNodeDefinition extends NodeDefinition {
  AudioNode: typeof AudioNode;
}
export const SUPPORTED: NodeDefinition[] = [
  {
    type: 'delay',
    Controller: DelayNodeController,
  },
  {
    type: 'start',
    Controller: StartNodeController,
  },
  {
    type: 'debug-start',
    Controller: StartNodeController,
  },
  {
    type: 'input',
    Controller: InputNodeController,
  },
  {
    type: 'output',
    Controller: OutputNodeController,
  },
];
