import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import MapEditorCyto from './components/MapEditorCyto';
import FlowEditorCyto from './components/FlowEditorCyto';

import ResonanceAudioSandbox from './components/ResonanceAudioSandbox';

import MainMenu from './components/MainMenu';
import GridLayout from './components/GridLayout';
import ExplorerView from './components/Editor/ExplorerView';
import { Asset } from './types';
import TabsView from './components/Editor/TabsView';

const ASSETS: Asset[] = [
  {
    id: '1',
    label: '1',
  },
  {
    id: '1.1',
    label: '1.1',
    parentId: '1',
  },
  {
    id: '1.2',
    label: '1.2',
    parentId: '1',
  },
  {
    id: '2',
    label: '2',
  },
  {
    id: '2.1',
    label: '2.1',
    parentId: '2',
  },
  {
    id: '3',
    label: '3 (leere Gruppe)',
  },
  {
    id: '4',
    label: '4 (top-level file)',
  },
  {
    id: '5',
    label: '5 (missing parent)',
    parentId: 'x',
  },
];

const App: React.FC = (props) => {
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

  return (
    <Router>
      <GridLayout>
        <div id='menu'>
          <MainMenu />
        </div>
        <div id='explorer'>
          <ExplorerView
            items={ASSETS}
            focusedItem={focusedAsset}
            onFocus={handleFocus}
          />
        </div>
        <div id='tabs'>
          <TabsView
            assets={openAssets}
            focused={focusedAsset}
            onFocus={handleFocus}
            onClose={handleClose}
          />
        </div>
        <div id='footer'>Footer</div>
      </GridLayout>
    </Router>
  );
};

export default App;
