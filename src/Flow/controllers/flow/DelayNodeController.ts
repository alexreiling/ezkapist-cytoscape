import { Core, NodeCollection } from 'cytoscape';
import { FlowNodeController } from '../NodeController';
type DelayNodeData = {
  delay: number;
};
class DelayNodeController extends FlowNodeController<DelayNodeData> {
  handler = async () => {
    return new Promise<NodeCollection>((resolve) => {
      const { delay } = this.flowData;
      setTimeout(() => {
        return resolve(this.outgoers);
      }, 4000 || delay);
    });
  };
  postInitializationHook = () => {
    this.data({
      _isFlowSource: true,
      _isFlowTarget: true,
    });
  };
}
export default DelayNodeController;
