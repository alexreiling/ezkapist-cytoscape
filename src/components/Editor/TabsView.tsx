import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config';
import { Asset } from '../../types';
import Tabs, { Tab } from '../Tabs';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${COLORS.background.shades[1]};
  color: ${COLORS.foreground.default};

  .tab-head {
    padding: 4px 8px;
  }
  .header {
    background-color: ${COLORS.background.shades[0]};
    color: ${COLORS.foreground.default};
  }
  .item {
    &.focused {
      background-color: ${COLORS.background.shades[1]};
      color: ${COLORS.foreground.focused};
    }
  }
  .body {
  }
  .tab {
    padding: 16px;
  }
`;

const TestViewWithState: React.FC<any> = (props) => {
  const [text, setText] = useState('');
  return (
    <input
      style={{ height: '1000px' }}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
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
                focused={asset.id === focused?.id}
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
            width: '100%',
          }}
        >
          keins ausgewählt
        </div>
      )}
    </Wrapper>
  );
};

export default TabsView;
