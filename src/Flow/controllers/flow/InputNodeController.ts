import { FlowNodeController } from '../NodeController';
import { NodeCollection, NodeSingular } from 'cytoscape';
import { defaultData } from '../util';
import { DATA } from '../../config';

type InputNodeData = {
  prompt?: string;
};

class InputNodeInGateController extends FlowNodeController {
  handler = async () => {
    return this._node.parent();
  };
}
class InputNodeOutGateController extends FlowNodeController {
  handler = async () => {
    return new Promise<NodeCollection>((resolve) => {
      return resolve(this.outgoers);
    });
  };
}
const SUBNODES = {
  inGate: {
    nodeType: 'input-in-gate',
    Controller: InputNodeInGateController,
  },
  outGate: {
    nodeType: 'input-out-gate',
    Controller: InputNodeOutGateController,
  },
};
class InputNodeController extends FlowNodeController<InputNodeData> {
  constructor(node: NodeSingular) {
    super(node);
    node
      .children(`[${DATA._nodeType}=${SUBNODES.inGate.nodeType}]`)
      .forEach((inGate) => {
        new InputNodeInGateController(inGate);
      });
    node
      .children(`[${DATA._nodeType}=${SUBNODES.outGate.nodeType}]`)
      .forEach((outGate) => {
        new InputNodeOutGateController(outGate);
      });
  }
  handler = async () => {
    return new Promise<NodeCollection>((resolve, reject) => {
      // TODO: call outside world and wait for decision
      const value = 'a route';
      return resolve(this.createEmptyCollection());
      if (!value) {
        resolve();
      }
    });
  };
  layout() {}
  postInitializationHook = () => {
    const cy = this._node.cy();
    const { x, y } = this._node.position();
    let children = cy.add([
      {
        data: {
          ...defaultData('flowIn'),
          [DATA._nodeType]: SUBNODES.inGate.nodeType,
        },
        grabbable: false,
        position: {
          x: x - 20,
          y,
        },
      },
      {
        data: {
          ...defaultData('flowOut'),
          [DATA._nodeType]: SUBNODES.outGate.nodeType,
        },
        grabbable: false,
        position: {
          x: x + 20,
          y,
        },
      },
      {
        data: {
          ...defaultData('flowOut'),
          [DATA._nodeType]: SUBNODES.outGate.nodeType,
        },
        grabbable: false,
        position: {
          x: x + 20,
          y: y + 50,
        },
      },
    ]);
    children.move({ parent: this._node.id() });
  };
}
export default InputNodeController;
