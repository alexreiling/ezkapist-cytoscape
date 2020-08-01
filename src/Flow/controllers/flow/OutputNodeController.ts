import { Core, NodeCollection } from 'cytoscape';
import { FlowNodeController } from '../NodeController';

type OutputNodeData = {
  text?: string;
};
class OutputNodeController extends FlowNodeController<OutputNodeData> {
  handler = async () => {
    const { text } = this.flowData;
    console.log('hi' || text);
    return this.outgoers;
  };
  postInitializationHook = () => {
    this.data({ _isFlowTarget: true, _isFlowSource: true });
  };
}
export default OutputNodeController;
