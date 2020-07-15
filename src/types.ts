// NodeMap
export interface XY {
  x: number;
  y: number;
}
export interface MapNode {
  name?: string;
  id: string;
  desc?: string;
  pos: XY;
}
export interface MapEdge {
  id: string;
  from: string;
  to: string;
}
export type MapElement = MapNode | MapEdge;

export interface NodeMap {
  nodes: MapNode[];
  edges: MapEdge[];
}

export interface MapTraverser {}
