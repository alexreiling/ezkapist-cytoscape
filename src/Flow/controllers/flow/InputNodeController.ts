import { FlowNodeController, BaseData } from '../NodeController';
import { NodeCollection, NodeSingular } from 'cytoscape';
import { defaultData } from '../util';
import { DATA, SCRATCH } from '../../config';
export type InputNodeData = BaseData & {
  prompt?: string;
};
export type InputNodeInGateData = BaseData & {};
export type InputNodeOutGateData = BaseData & {
  buttonText?: string;
};
class InputNodeInGateController extends FlowNodeController<
  InputNodeInGateData
> {
  handler = async () => {
    console.log('hi');

    return this._node.parent();
  };
}
class InputNodeOutGateController extends FlowNodeController<
  InputNodeOutGateData
> {
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
      .children(`[${DATA._nodeType} = '${SUBNODES.inGate.nodeType}']`)
      .forEach((inGate) => {
        new InputNodeInGateController(inGate);
      });
    node
      .children(`[${DATA._nodeType} = '${SUBNODES.outGate.nodeType}']`)
      .forEach((outGate) => {
        new InputNodeOutGateController(outGate);
      });
  }
  handler = async () => {
    return new Promise<NodeSingular>(async (resolve) => {
      // TODO: call outside world and wait for decision
      const inputHandler = this._node.cy().scratch(SCRATCH.inputHandler);
      console.log(inputHandler);

      if (!inputHandler) return resolve(this.createEmptyCollection());
      const key = await inputHandler(this._node);
      return resolve(this._node.cy().getElementById(key));
    });
  };
  layout() {
    let position = { ...this._node.position() };
    let inCtr = 0,
      outCtr = 0;
    this._node
      .children()
      .merge(this._node)
      .layout({
        name: 'grid',
        cols: 2,
        boundingBox: { x1: position.x, y1: position.y, w: 100, h: 100 },
        avoidOverlapPadding: 5,
        condense: true,
        fit: false,
        //@ts-ignore
        transform: (node, { x, y }) => {
          return {
            x:
              node.data(DATA._nodeType) === SUBNODES.inGate.nodeType
                ? x
                : x + 24,
            y,
          };
        },
        position: (node) => {
          if (node.data(DATA._nodeType) === SUBNODES.inGate.nodeType)
            return {
              col: 0,
              row: inCtr++,
            };
          else
            return {
              col: 1,
              row: outCtr++,
            };
        },
      })
      .on('layoutstop', () => {
        setTimeout(() => this._node.position(position), 0);
      })
      .run();
  }
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
    children.map((child) => child.addClass(child.data(DATA._nodeType)));
    children.move({ parent: this._node.id() });
    this.layout();
  };
}
export default InputNodeController;
