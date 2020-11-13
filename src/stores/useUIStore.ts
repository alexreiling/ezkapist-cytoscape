import create from 'zustand';
import { Asset } from '../types';

type State = {
  openAssets: Asset[];
  focusedAsset?: Asset;
  focusAsset: (asset: Asset) => any;
  closeAsset: (asset: Asset) => any;
};
const useUIStore = create<State>((set, get) => ({
  openAssets: [],
  focusAsset: (asset) => {
    let found = false;
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
  closeAsset: (asset: Asset) => {
    set((state) => ({
      openAssets: state.openAssets.filter((a) => a.id !== asset.id),
    }));
  },
}));
export default useUIStore;
