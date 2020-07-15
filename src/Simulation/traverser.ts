import {
  Core,
  NodeSingular,
  NodeCollection,
  EventObject,
  Position,
} from 'cytoscape';
import { advanceTowardsDest, randomItem } from './util';
import { DATA_FIELD } from '../config';
import { addGlobalListeners } from '../components/MapEditorCyto/handlers';

const INIT_KEY = 'ezkapist-traverser-initialized';
export enum TraverserState {
  Moving,
  Idle,
  Unplaced,
}
export enum TraverserAutoRouting {
  None,
  Random,
}

export interface TraverserOptions extends TraverserParams {
  position: Position;
}
interface Scratch {
  dest?: NodeSingular;
  loc?: NodeSingular;
  dir?: Position;
}
interface TraverserParams {
  speed: number;
  state: TraverserState;
  name?: string;
  destId?: string;
  locId?: string;
  autoRouting: TraverserAutoRouting;
  audioUrl?: string;
}

export const extendCytoscapeWithTraverser = (cy: Core) => {
  cy.addListener('add', '.traverser', (e: EventObject) => {
    setUpScratch(e.target);
  });
};
const defaultParams: TraverserParams = {
  speed: 2,
  state: TraverserState.Idle,
  autoRouting: TraverserAutoRouting.None,
};
export const createTraverser = (
  cy: Core,
  options: Partial<TraverserOptions> = {}
) => {
  if (!cy.scratch(INIT_KEY)) {
    extendCytoscapeWithTraverser(cy);
    cy.scratch(INIT_KEY, true);
  }
  const { position, ...params } = {
    ...defaultParams,
    ...options,
  };

  const { x1, y1, w, h } = cy.extent();
  const initPosition = {
    x: x1 + w / 2,
    y: y1 + h / 2,
    ...position,
  };
  const node = cy.add({
    grabbable: false,
    classes: 'traverser',
    position: initPosition,
    data: {
      [DATA_FIELD]: params as TraverserParams,
    },
  });
  return node;
};
const setUpScratch = (t: NodeSingular) => {
  const {
    data: { destId, locId },
  } = getDataAndScratch(t);
  const loc = locId
    ? (t.cy().getElementById(locId) as NodeSingular)
    : undefined;
  const dest = destId
    ? (t.cy().getElementById(destId) as NodeSingular)
    : undefined;
  setDataAndScratch(t, undefined, { dest, loc });
};
export const getDataAndScratch = (t: NodeSingular) => {
  return {
    data: (t.data(DATA_FIELD) || {}) as TraverserParams,
    scratch: (t.scratch(DATA_FIELD) || {}) as Scratch,
  };
};
export const setDataAndScratch = (
  t: NodeSingular,
  updatedData?: Partial<TraverserParams>,
  updatedScratch?: Partial<Scratch>
) => {
  let { data, scratch } = getDataAndScratch(t);
  if (data) t.data(DATA_FIELD, { ...data, ...updatedData });
  if (scratch) t.scratch(DATA_FIELD, { ...scratch, ...updatedScratch });
  return t;
};
export const handleArrivalAt = (t: NodeSingular, dest: NodeSingular) => {
  const { data } = getDataAndScratch(t);

  setDataAndScratch(
    t,
    {
      locId: dest.id(),
      destId: undefined,
    },
    {
      loc: dest,
      dest: undefined,
    }
  );

  t.position(dest.position());

  if (data.autoRouting === TraverserAutoRouting.Random) {
    let neighbors = dest.neighborhood('node') as NodeCollection;
    let newDest = randomItem(neighbors.toArray());
    t = setDestination(t, newDest);
  } else {
    setDataAndScratch(t, { state: TraverserState.Idle });
  }
  return t;
};
export const setDestination = (t: NodeSingular, dest: NodeSingular) => {
  setDataAndScratch(t, { destId: dest.id() }, { dest });
  return t;
};
const handleLeave = (t: NodeSingular) => {
  setDataAndScratch(t, { locId: undefined }, { loc: undefined });
};
export const updateTraverser = (t: NodeSingular, delta: number) => {
  const {
    data: { speed, state },
    scratch: { dest, loc },
  } = getDataAndScratch(t);
  const position = t.position();
  if (state === TraverserState.Moving && dest) {
    if (loc && speed > 0) handleLeave(t);

    const { dir, completed } = advanceTowardsDest(
      position,
      dest.position(),
      delta,
      speed
    );

    if (completed) handleArrivalAt(t, dest);
    else {
      setDataAndScratch(t, undefined, { dir });
      t.shift(dir);
    }
  }
};
