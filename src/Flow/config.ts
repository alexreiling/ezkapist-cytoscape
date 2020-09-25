import NodeController from './controllers/NodeController';
import DelayNodeController from './controllers/flow/DelayNodeController';
import StartNodeController from './controllers/flow/StartNodeController';
import InputNodeController from './controllers/flow/InputNodeController';
import OutputNodeController from './controllers/flow/OutputNodeController';
import ParameterNodeController from './controllers/flow/ParameterNodeController';

type KeysEnum<T> = { [P in keyof Required<T>]: P };

export const SCRATCH = {
  controller: '_controller',
  edgehandles: {
    flow: '_flowEdgehandles',
    audio: '_audioEdgehandles',
    params: '_paramsEdgehandles',
  },
  inputHandler: '_inputHandler',
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
  _isSetParamTarget: boolean;
  _isSetParamSource: boolean;
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
  _isSetParamTarget: '_isSetParamTarget',
  _isSetParamSource: '_isSetParamSource',
};
export type EdgeType = 'flow' | 'audio' | 'param';
export type EdgeData = {
  _edgeType: EdgeType;
};
export const EDGE_DATA: KeysEnum<EdgeData> = {
  _edgeType: '_edgeType',
};

export const CLASSNAMES = {
  handled: 'handled',
  validTarget: 'valid-target',
  flow: {
    node: 'flow-node',
    defaultOutGate: 'default-out',
  },
  audio: {
    node: 'audio-node',
    input: 'audio-node-input',
    output: 'audio-node-output',
  },
  params: {
    edge: 'param-edge',
    edgeHandle: 'param-edgehandle',
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
  {
    type: 'set-param',
    Controller: ParameterNodeController,
  },
];
