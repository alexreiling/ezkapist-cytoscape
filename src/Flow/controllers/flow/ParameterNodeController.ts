import { FlowNodeController } from '../NodeController';
import { NodeCollection } from 'cytoscape';
export type ParameterNodeData = {
  name?: string;
};
class ParameterNodeController extends FlowNodeController<ParameterNodeData> {
  handler = async () => {
    return new Promise<NodeCollection>((resolve) => {
      // check if connected to setParamNode
      // if so, let connected setParamNode handle data update

      return resolve(this.outgoers);
    });
  };
  postInitializationHook = () => {
    this.data({
      _isSetParamSource: true,
      _isFlowTarget: true,
      _isFlowSource: true,
    });
  };
}
export default ParameterNodeController;
