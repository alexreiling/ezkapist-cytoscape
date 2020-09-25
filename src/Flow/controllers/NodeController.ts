import { NodeSingular, NodeCollection } from 'cytoscape';
import { DATA, CLASSNAMES, SCRATCH, NodeData } from '../config';
import { defaultData } from './util';
export type BaseData = {
  name?: string;
};
class NodeController {
  protected _node: NodeSingular;
  constructor(node: NodeSingular) {
    this._node = node;
    node.scratch(SCRATCH.controller, this);
  }
  protected postInitializationHook?: () => void;
  protected createEmptyCollection() {
    return this._node.cy().collection();
  }
  public data(value?: Partial<NodeData>) {
    if (value) this._node.data(value);
    else return this._node.data();
  }
  public initializeNode() {
    this._node.data({ ...defaultData() });
    this._node.addClass(this._node.data(DATA._nodeType));
    if (this.postInitializationHook) this.postInitializationHook();
  }
}

export abstract class FlowNodeController<T = any> extends NodeController {
  protected abstract handler: () => Promise<NodeCollection>;
  protected get outgoers() {
    return this._node.outgoers('node') as NodeCollection;
  }
  public async handle() {
    console.log('handling node', this._node);
    this._node.flashClass(CLASSNAMES.handled, 1000);
    if (this.handler) return this.handler();
    else if (this._node.isOrphan()) return this.outgoers;
    else return this.createEmptyCollection();
  }
  public get flowData(): T {
    return this._node.data(DATA._flowData);
  }
  public set flowData(value: T) {
    this._node.data(DATA._flowData, value);
  }
}
export abstract class FlowParentNodeController extends FlowNodeController {
  protected get default() {
    return this._node?.children('.' + CLASSNAMES.flow.defaultOutGate);
  }
  protected get cases() {
    return this._node
      .children(`[?${DATA._isFlowSource}]`)
      .difference(`[?${DATA._isFallback}]`);
  }
  public abstract add = (subNodeType: string) => {
    // TODO: implement
  };
}

export abstract class AudioNodeController extends NodeController {
  private _audioNode?: AudioNode;
  constructor(node: NodeSingular) {
    if (!node.isParent()) {
      // TODO: implement some basic checks; if isParent is not working for reinstantiation
    }
    super(node);
  }
  public get audioNode() {
    if (!this._audioNode)
      console.warn('access to audio node which is undefined');
    return this._audioNode;
  }
  private getOutput(index: number) {}
  // TODO: move to NodeController?
  public get audioData() {
    return this._node.data(DATA._audioData);
  }
  public set audioData(value: any) {
    this._node.data(DATA._audioData, value);
  }
  public instantiateAudioNode() {
    const audioNodeType = this._node.data(DATA._audioNodeType);
    // TODO: instantiate audio node
  }
  // sets up all outgoing connections
  public initializeOutgoingConnections() {}
  // TODO: which one is proper destination type
  // inputIndex is not allowed when connected to audio param
  public connect(destination: any, outputIndex: number, inputIndex: number) {
    const destinationAudioNode = new AudioNode();
    this.audioNode?.connect(destinationAudioNode, outputIndex, inputIndex);
  }
  public disconnect() {}
  public setParams() {}
}
export abstract class AudioParamController extends NodeController {}
export default NodeController;
