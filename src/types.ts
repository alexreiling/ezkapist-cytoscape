import AssetExplorer from './components/AssetExplorer';

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
interface Folder {
  id: string;
  name?: string;
}
export type AssetType = 'world' | 'map' | 'character' | 'flow' | 'folder';

export interface Asset {
  id: string;
  label?: string;
  parentId?: string;
  type: AssetType;
}
export interface TempAsset extends Partial<Omit<Asset, 'id'>> {
  type: AssetType;
}
