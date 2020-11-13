import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../config';
import useUIStore from '../../stores/useUIStore';
import { Asset } from '../../types';
import Tabs, { Tab } from '../Tabs';
import '../Tabs/styles.scss';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${COLORS.background.shades[1]};
  color: ${COLORS.foreground.default};

  .tab-head {
    padding: 0px 8px;
    border-right: 1px solid #252526;
    color: ${COLORS.foreground.inactive};

    svg {
      fill: ${COLORS.foreground.inactive};
    }
    &.focused {
      background-color: ${COLORS.background.shades[1]};
      color: ${COLORS.foreground.focused};
      svg {
        fill: ${COLORS.foreground.focused};
      }
    }
  }
  .header {
    height: 32px;
    line-height: 32px;
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

type TabViewProps = {};

const TabsView: React.FC<TabViewProps> = (props) => {
  const assets = useUIStore((state) => state.openAssets);
  const focused = useUIStore((state) => state.focusedAsset);
  const focus = useUIStore((state) => state.focusAsset);
  const close = useUIStore((state) => state.closeAsset);
  return (
    <Wrapper>
      {!!assets.length ? (
        <Tabs
          onUserFocus={(index, data) => focus(assets[index])}
          onClose={(index, data) => close(assets[index])}
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
            alignItems: 'c enter',
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
