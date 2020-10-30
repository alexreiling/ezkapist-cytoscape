export const DATA_FIELD = 'ezkapist';
export const paths = {
  icons: '/images/',
};
export const style = [
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
];
export const COLORS = {
  background: {
    shades: [
      '#131510',
      '#221A0F',
      '#362E24',
      '#362712',
      '#523718',
      '#70481E',
      '#7C5021',
    ],
  },
  foreground: {
    default: '#B0B0B0',
    focused: 'white',
    active: 'white',
    active1: '#FFD3BB',
    inactive: '#6B6B6B',
  },
  lines: {
    shades: ['#444444'],
  },
};
