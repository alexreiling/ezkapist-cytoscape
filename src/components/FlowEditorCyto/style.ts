import { NodeSingular } from 'cytoscape';
import { DATA } from '../../Flow/config';

export const flowStyle = [
  {
    selector: '.eh-source',
    style: {
      'border-width': 2,
      'border-color': 'red',
    },
  },

  // {
  //   selector: '.eh-preview, .eh-ghost-edge',
  //   style: {
  //     'background-color': 'red',
  //     'line-color': 'red',
  //     'target-arrow-color': 'red',
  //     'source-arrow-color': 'red',
  //   },
  // },

  {
    selector: '.eh-ghost-edge.eh-preview-active',
    style: {
      opacity: 0,
    },
  },
  {
    selector: 'node:parent:selected',
    style: {
      'background-color': 'lightblue',
    },
  },
];
