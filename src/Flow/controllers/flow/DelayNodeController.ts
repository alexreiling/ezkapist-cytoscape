import { Core, NodeCollection } from 'cytoscape';
import { FlowNodeController } from '../NodeController';
export type DelayNodeData = {
  delay: number;
};
class DelayNodeController extends FlowNodeController<DelayNodeData> {
  handler = async () => {
    return new Promise<NodeCollection>((resolve) => {
      const { delay } = this.flowData;
      setTimeout(() => {
        return resolve(this.outgoers);
      }, delay || 0);
    });
  };
  postInitializationHook = () => {
    this.data({
      _isFlowSource: true,
      _isFlowTarget: true,
    });
    this.flowData = { delay: 1000 };
  };
}
export default DelayNodeController;
