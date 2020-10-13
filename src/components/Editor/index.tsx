import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../config';
import { styles } from '../../Flow/styles';
import { Asset } from '../../types';
import ExplorerReact from '../Explorer';
import GridLayout from '../GridLayout';
import Tabs, { Tab } from '../Tabs';
import ExplorerView from './ExplorerView';
import TabsView from './TabsView';

type EditorProps = {};
const MenuView = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;
  background-color: ${COLORS.background.shades[1]};
  height: 100%;
`;
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
const Editor: React.FC<EditorProps> = (props) => {
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
    <GridLayout>
      <div id='menu'>
        <MenuView>
          <h1>CytoScape Demo</h1>
          <Link to='/maps'>Map Editor</Link>
          <Link to='/audio'>resonance-audio</Link>
          <Link to='/flow'>Flow Editor</Link>
        </MenuView>
      </div>
      <div id='explorer'>
        <ExplorerView
          items={ASSETS}
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
        {/* <div
          className='tabs'
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <div style={{ height: '24px', borderBottom: '1px solid red' }}>
            test
          </div>
          <div
            style={{ background: 'green', overflow: 'auto', display: 'flex' }}
          >
            <div style={{ height: '1000px' }}>test</div>
          </div>
        </div> */}
      </div>
      <div
        id='footer'
        style={{
          background: COLORS.background.shades[1],
          borderTop: '1px solid ' + COLORS.lines.shades[0],
        }}
      >
        Footer
      </div>
    </GridLayout>
  );
};

export default Editor;
