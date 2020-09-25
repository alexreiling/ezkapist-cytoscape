import React, { useState } from 'react';
import styled from 'styled-components';
import { Asset } from '../../types';
import Tabs, { Tab } from '../Tabs';

const Wrapper = styled.div``;

const TestViewWithState: React.FC<any> = (props) => {
  const [text, setText] = useState('');
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
};

type TabViewProps = {
  assets: Asset[];
  focused?: Asset;
  onClose: (asset: Asset) => any;
  onFocus: (asset: Asset) => any;
};

const TabsView: React.FC<TabViewProps> = (props) => {
  const { assets, focused } = props;
  return (
    <Wrapper>
      {!!assets.length ? (
        <Tabs
          onUserFocus={(index, data) => props.onFocus(assets[index])}
          onClose={(index, data) => props.onClose(assets[index])}
        >
          {assets.map((asset, index) => {
            return (
              <Tab
                title={asset.id}
                selected={asset.id === focused?.id}
                key={index}
              >
                <TestViewWithState />
              </Tab>
            );
          })}
        </Tabs>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          keins ausgewählt
        </div>
      )}
    </Wrapper>
  );
};

export default TabsView;
