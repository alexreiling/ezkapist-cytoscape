import { Core, NodeDefinition } from 'cytoscape';
import { XY, MapNode } from '../../types';
import shortid from 'shortid';

export const defaultStyle = [
  {
    selector: '.traverser',
    style: {
      width: 12,
      height: 12,
      'z-index': 10,
      'background-color': 'black',
    },
  },
  {
    selector: '.traverser-dest-pointer',
    style: {
      'mid-target-arrow-shape': 'triangle',
      'arrow-scale': 2,
      'line-color': 'black',
    },
  },
  {
    selector: '.eh-handle',
    style: {
      'background-color': 'red',
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

export const defaultMapNode = (position?: XY): NodeDefinition => {
  const id = shortid.generate();
  return {
    position,
    classes: 'static',
    data: {
      ezkapist: {
        id,
        pos: position,
      } as MapNode,
      id,
    },
  };
};
