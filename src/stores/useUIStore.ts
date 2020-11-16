import { set } from 'lodash';
import create from 'zustand';
import { Asset } from '../types';
import useAssetStore from './useAssetStore';
import _ from 'lodash';

type State = {
  openAssets: Asset[];
  focusedAsset?: Asset;
  rightClickedAsset?: Asset;
  updateAsset: (asset: Asset) => any;
  focusAsset: (asset: Asset) => any;
  closeAsset: (asset: Asset) => any;
  rightClickAsset: (asset?: Asset) => any;
};
const useUIStore = create<State>((set, get) => {
  const update = (assets: Asset[] | null) => {
    if (!assets) return;
    const openAssets = _.intersectionWith(
      get().openAssets,
      assets,
      (a, b) => a.id === b.id
    );
    set(() => ({
      openAssets,
    }));
  };
  useAssetStore.subscribe(update, (state) => state.assets);
  return {
    openAssets: [],
    focusAsset: (asset) => {
      let found = asset.type === 'folder';
      let open = get().openAssets;
      for (let i = 0; i < open.length; i++) {
        if (open[i].id === asset.id) {
          found = true;
          break;
        }
      }
      set(() => ({
        openAssets: found ? open : [...open, asset],
        focusedAsset: asset,
      }));
    },
    rightClickAsset: (asset) => {
      set(() => ({ rightClickedAsset: asset }));
    },
    closeAsset: (asset: Asset) => {
      set((state) => ({
        openAssets: state.openAssets.filter((a) => a.id !== asset.id),
      }));
    },
    updateAsset: (updatedAsset) => {
      set((state) => ({
        openAssets: state.openAssets.map((asset) =>
          asset.id === updatedAsset.id ? updatedAsset : asset
        ),
      }));
    },
  };
});
export default useUIStore;
