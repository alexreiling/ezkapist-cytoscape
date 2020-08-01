import { NodeDefinition } from 'cytoscape';
import { FlowNodeController } from '../NodeController';
import { NodeData, DATA } from '../../config';
import { defaultData } from '../util';

const createDefaultChildrenDefinition = (): NodeDefinition[] => {
  return [
    {
      data: {
        ...defaultData(),
      },
    },
  ];
};

type ConditionNodeData = {
  text?: string;
};
class ConditionNodeController extends FlowNodeController<ConditionNodeData> {
  handler = async () => {
    const { text } = this.flowData;
    console.log(text);
    return this.outgoers;
  };
  initializeNode = () => {
    this._node.data({ ...defaultData() });
    // add children
    const childrenDef = createDefaultChildrenDefinition();
    const cy = this._node.cy();
    let children = cy.add(childrenDef);
    this._node.add(children);
  };
}
export default ConditionNodeController;
