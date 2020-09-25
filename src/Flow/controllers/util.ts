import { NodeData } from '../config';

export const defaultData = (
  type?: 'audioIn' | 'audioOut' | 'flowIn' | 'flowOut'
): Partial<NodeData> => {
  return {
    _audioData: {},
    _flowData: {},
    _isAudioSource: type === 'audioOut',
    _isAudioTarget: type === 'audioIn',
    _isFlowSource: type === 'flowOut',
    _isFlowTarget: type === 'flowIn',
    _isSetParamSource: false,
    _isSetParamTarget: false,
    _isFallback: false,
  };
};
