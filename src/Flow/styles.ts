import { NodeSingular } from 'cytoscape';
import { DATA, CLASSNAMES, EDGE_DATA } from './config';
import { DelayNodeData } from './controllers/flow/DelayNodeController';
import { OutputNodeData } from './controllers/flow/OutputNodeController';
import { ParameterNodeData } from './controllers/flow/ParameterNodeController';
import {
  InputNodeOutGateData,
  InputNodeInGateData,
  InputNodeData,
} from './controllers/flow/InputNodeController';
const edges = [
  {
    selector: 'edge',
    style: {
      width: 2,
    },
  },
  {
    selector: `edge[${EDGE_DATA._edgeType} = 'flow']`,
    style: {
      'curve-style': 'bezier',
      'control-point-weight': 0.5,
      'source-endpoint': 'outside-to-node',
      'target-endpoint': 'outside-to-node',
      'taxi-direction': 'rightward',
      'taxi-turn': '20px',
      'taxi-turn-min-distance': '20px',
      'mid-target-arrow-shape': 'vee',
    },
  },
  {
    selector: `edge[${EDGE_DATA._edgeType} = 'param']`,
    style: {
      // 'curve-style': 'straight',
      // 'source-endpoint': 'outside-to-node',
      // 'target-endpoint': 'outside-to-node',
      // 'target-arrow-shape': 'circle',
      'curve-style': 'bezier',
      //'source-arrow-shape': 'circle',

      'line-dash-pattern': [6, 3],
      'line-style': 'dashed',
      width: 1,
    },
  },
];
const edgehandlesStyles = [
  {
    selector: '.eh-handle',
    style: {
      'background-color': 'red',
      label: undefined,
      width: 12,
      height: 12,
      shape: 'ellipse',
      'overlay-opacity': 0,
      'border-width': 6, // makes the handle easier to hit
      'border-opacity': 0,
    },
  },
  {
    selector: '.' + CLASSNAMES.validTarget,
    style: {
      'border-color': 'green',
      'border-width': 2,
    },
  },
  {
    selector: '.eh-target',
    style: {
      'background-color': 'green',
    },
  },
];
export const styles = [
  ...edges,
  ...edgehandlesStyles,
  {
    selector: ':parent',
    style: {
      'compound-sizing-wrt-labels': 'exclude',
      padding: 5,
    },
  },
  {
    selector: `node`,
    style: {
      margin: 20,
    },
  },
  {
    selector: `.input`,
    style: {
      label: (node: NodeSingular) => {
        const { name } = node.data(DATA._flowData) as InputNodeData;
        return name;
      },
      'text-valign': 'top',
      'text-halign': 'center',
      'font-size': 12,
    },
  },
  {
    selector: `.${CLASSNAMES.handled}`,
    style: {
      'background-color': 'red',
    },
  },

  {
    selector: '.input-in-gate',
    style: {
      shape: 'ellipse',
      width: 24,
      height: 24,
      label: (node: NodeSingular) => {
        const { name } = node.data(DATA._flowData) as InputNodeInGateData;
        return name;
      },
      'text-valign': 'center',
      'text-halign': 'left',
      'text-margin-x': -5,
      'font-size': 12,
    },
  },
  {
    selector: '.input-out-gate',
    style: {
      shape: 'ellipse',
      width: 24,
      height: 24,
      label: (node: NodeSingular) => {
        const { name } = node.data(DATA._flowData) as InputNodeOutGateData;
        return name;
      },
      'text-valign': 'center',
      'text-halign': 'right',
      'text-margin-x': 5,
      'font-size': 12,
    },
  },
  {
    selector: '.delay',
    style: {
      shape: 'round-tag',
      width: 50,
      label: (node: NodeSingular) => {
        const { delay = 0 } = node.data(DATA._flowData) as DelayNodeData;
        return delay >= 1000 ? delay / 1000 + ' s' : delay + ' ms';
      },
      'text-valign': 'bottom',
      'text-halign': 'right',
      'text-margin-x': -10,
      'font-size': 12,
    },
  },
  {
    selector: '.set-param',
    style: {
      shape: 'round-diamond',
      'text-valign': 'bottom',
      'text-halign': 'right',
      'text-margin-y': 4,
      'text-margin-x': -20,
      'font-size': 12,
      label: (node: NodeSingular) => {
        const { name = 0 } = node.data(DATA._flowData) as ParameterNodeData;
        return name || 'Parameter Set';
      },
    },
  },
  {
    selector: '.output',
    style: {
      shape: 'polygon',
      'shape-polygon-points': [-1, 1, -0.75, -1, 1, -1, 0.75, 1, -1, 1],
      width: 75,
      'text-valign': 'bottom',
      'text-halign': 'right',
      'text-margin-y': 4,
      'text-margin-x': -20,
      'font-size': 12,
      label: (node: NodeSingular) => {
        const { name = 0 } = node.data(DATA._flowData) as OutputNodeData;
        return name || 'Output';
      },
    },
  },
  {
    selector: '.start',
    style: {
      shape: 'ellipse',
      width: 75,
      label: 'Start',
      'text-valign': 'center',
      height: 75,
      'text-margin-y': 2,
      'background-color': 'white',
      'border-color': 'green',
      'border-width': 2,
    },
  },
];
