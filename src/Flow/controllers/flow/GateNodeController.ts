import { FlowNodeController } from '../NodeController';

type GateNodeData = {
  closed: boolean;
};

class GateNodeController extends FlowNodeController<GateNodeData> {
  handler = async () => {
    const { closed } = this.flowData;
    if (closed) return this.outgoers;
    else return this.createEmptyCollection();
  };
}
export default GateNodeController;
