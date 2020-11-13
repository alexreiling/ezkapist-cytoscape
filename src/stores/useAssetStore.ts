import create from 'zustand';
import client from '../api';
import { Asset, AssetType } from '../types';

type State = {
  assets: Asset[];
  initialize: () => any;
  createAsset: (type: AssetType, parentId?: string) => Promise<Asset>;
};
const useAssetStore = create<State>((set) => ({
  assets: [],

  // setup
  initialize: async () => {
    let assets = await client.getMany();
    set((state) => ({ assets }));
  },

  // CRUD
  updateAsset: () => {},
  createAsset: async (type, parentId) => {
    let asset = await client.create(type, parentId);
    set((state) => ({ assets: [...state.assets, asset] }));
    return asset;
  },
  removeAsset: () => {},
}));
export default useAssetStore;
