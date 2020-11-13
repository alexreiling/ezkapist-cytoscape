import React, { useEffect, useState } from 'react';
import client from '../../api';
import { COLORS } from '../../config';
import useAssetStore from '../../stores/useAssetStore';
import useUIStore from '../../stores/useUIStore';
import { Asset } from '../../types';
import GridLayout from '../GridLayout';
import ExplorerView from './ExplorerView';
import MainMenu from './MainMenu';
import TabsView from './TabsView';

type EditorProps = {};

const Editor: React.FC<EditorProps> = (props) => {
  const init = useAssetStore((state) => state.initialize);

  useEffect(() => {
    init();
  }, []);
  return (
    <GridLayout>
      <div id='menu'>
        <MainMenu />
      </div>
      <div id='explorer'>
        <ExplorerView />
      </div>
      <div id='tabs' style={{ display: 'flex' }}>
        <TabsView />
      </div>
      <div
        id='footer'
        style={{
          background: COLORS.background.shades[1],
          borderTop: '1px solid ' + COLORS.lines.shades[0],
        }}
      ></div>
    </GridLayout>
  );
};

export default Editor;
