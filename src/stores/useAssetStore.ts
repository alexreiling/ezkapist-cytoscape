import create from 'zustand';
import client from '../api';
import { Asset, AssetType, TempAsset } from '../types';

export const TEMP_ID = '_temp_';
type State = {
  assets: Asset[];
  initialize: () => any;
  createAsset: (atLeastType: TempAsset) => Promise<Asset>;
  createTempAsset: (atLeastType: TempAsset) => Asset;
  updateAsset: (updatedAsset: Asset) => Promise<Asset>;
  removeAsset: (asset: Asset) => any;
};
const useAssetStore = create<State>((set) => ({
  assets: [],

  // setup
  initialize: async () => {
    let assets = await client.getMany();
    set(() => ({ assets }));
  },

  // CRUD
  updateAsset: async (updatedAsset) => {
    let remoteAsset = await client.update(updatedAsset);
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === remoteAsset.id ? remoteAsset : asset
      ),
    }));

    return remoteAsset;
  },
  createAsset: async (atLeastType: TempAsset) => {
    let sanitized: any = { ...atLeastType };
    delete sanitized.id;
    let asset = await client.create(sanitized);
    set((state) => ({ assets: [...state.assets, asset] }));
    return asset;
  },
  createTempAsset: (atLeastType: TempAsset) => {
    return { ...atLeastType, id: TEMP_ID };
  },
  removeAsset: async (asset: Asset) => {
    await client.remove(asset);
    set((state) => ({
      assets: state.assets.filter((a) => a.id !== asset.id),
    }));
    return;
  },
}));
export default useAssetStore;
