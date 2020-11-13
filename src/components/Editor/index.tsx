import React, { useEffect, useState } from 'react';
import client from '../../api';
import { COLORS } from '../../config';
import useAssetStore from '../../stores/useAssetStore';
import { Asset } from '../../types';
import GridLayout from '../GridLayout';
import ExplorerView from './ExplorerView';
import MainMenu from './MainMenu';
import TabsView from './TabsView';

type EditorProps = {};

const Editor: React.FC<EditorProps> = (props) => {
  const assets = useAssetStore((state) => state.assets);
  const init = useAssetStore((state) => state.initialize);
  const createAsset = useAssetStore((state) => state.createAsset);
  const [openAssets, setOpenAssets] = useState<Asset[]>([]);
  const [focusedAsset, setFocusedAsset] = useState<Asset | undefined>(
    undefined
  );

  const handleFocus = (asset: Asset) => {
    let found = false;
    for (let i = 0; i < openAssets.length; i++) {
      if (openAssets[i].id === asset.id) {
        found = true;
        break;
      }
    }
    if (!found) setOpenAssets([...openAssets, asset]);
    setFocusedAsset(asset);
  };
  const handleClose = (asset: Asset) => {
    setOpenAssets([...openAssets.filter((a) => a.id !== asset.id)]);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <GridLayout>
      <div id='menu'>
        <MainMenu />
      </div>
      <div id='explorer'>
        <ExplorerView
          items={assets}
          focusedItem={focusedAsset}
          onFocus={handleFocus}
        />
      </div>
      <div id='tabs' style={{ display: 'flex' }}>
        <TabsView
          assets={openAssets}
          focused={focusedAsset}
          onFocus={handleFocus}
          onClose={handleClose}
        />
      </div>
      <div
        id='footer'
        style={{
          background: COLORS.background.shades[1],
          borderTop: '1px solid ' + COLORS.lines.shades[0],
        }}
      >
        <button onClick={() => createAsset('flow')}>Add Flow</button>
      </div>
    </GridLayout>
  );
};

export default Editor;
