import { Core, NodeCollection } from 'cytoscape';
import { FlowNodeController, BaseData } from '../NodeController';

export type OutputNodeData = BaseData & {
  text?: string;
};
class OutputNodeController extends FlowNodeController<OutputNodeData> {
  handler = async () => {
    const { text } = this.flowData;
    console.log(text);
    return this.outgoers;
  };
  postInitializationHook = () => {
    this.data({
      _isFlowTarget: true,
      _isFlowSource: true,
      _isSetParamTarget: true,
    });
  };
}
export default OutputNodeController;
