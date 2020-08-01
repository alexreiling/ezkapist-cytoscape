import { NodeSingular } from 'cytoscape';
import { DATA } from '../../Flow/config';
const edgeStyle = [
  {
    selector: 'edge',
    style: {},
  },
];
const gateStyle = [
  // {
  //   selector: ':child',
  //   style: {
  //     label: (node: any) => node.id(),
  //     'text-valign': 'center',
  //   },
  // },
  {
    selector: ':orphan.in',
    style: {
      label: (node: any) => node.id(),
      'text-valign': 'center',
    },
  },
  {
    selector: ':child.out',
    style: {
      'text-halign': 'right',
    },
  },
  {
    selector: ':child.in',
    style: {
      'text-halign': 'left',
    },
  },
];
const parentStyle = [
  {
    selector: ':parent',
    style: {
      'compound-sizing-wrt-labels': 'exclude',
    },
  },
];
export const flowStyle = [
  ...gateStyle,
  ...edgeStyle,
  ...parentStyle,
  {
    selector: '.handled',
    style: {
      'background-color': 'red',
    },
  },
  {
    selector: '.start',
    style: {
      width: 50,
      height: 50,
      'border-color': 'green',
      'border-width': 2,
      label: 'start',
    },
  },
  {
    selector: '.eh-handle',
    style: {
      'background-color': 'red',
      label: undefined,
      width: 12,
      height: 12,
      shape: 'ellipse',
      'overlay-opacity': 0,
      'border-width': 12, // makes the handle easier to hit
      'border-opacity': 0,
    },
  },

  {
    selector: '.eh-hover',
    style: {
      'background-color': 'red',
    },
  },

  {
    selector: '.eh-source',
    style: {
      'border-width': 2,
      'border-color': 'red',
    },
  },

  {
    selector: '.eh-target',
    style: {
      'border-width': 2,
      'border-color': 'red',
    },
  },

  {
    selector: '.eh-preview, .eh-ghost-edge',
    style: {
      'background-color': 'red',
      'line-color': 'red',
      'target-arrow-color': 'red',
      'source-arrow-color': 'red',
    },
  },

  {
    selector: '.eh-ghost-edge.eh-preview-active',
    style: {
      opacity: 0,
    },
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': 'green',
    },
  },
];
