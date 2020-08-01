import { Core, NodeCollection } from 'cytoscape';
import { FlowNodeController } from '../NodeController';
class StartNodeController extends FlowNodeController {
  handler = async () => {
    return this.outgoers;
  };
  postInitializationHook = () => {
    this.data({
      _isFlowSource: true,
    });
  };
}
export default StartNodeController;
