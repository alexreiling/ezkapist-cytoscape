import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { COLORS } from '../../config';
import { Asset } from '../../types';
import ExplorerReact from '../Explorer';
import '../Explorer/styles.scss';

import { Item } from '../Explorer/types';
import { assetIcons } from './Icons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${COLORS.background.shades[3]};
  color: ${COLORS.foreground.default};
  svg {
    fill: ${COLORS.foreground.default};
    transition: all 0.3s ease-in-out;
  }

  .selected {
  }
  .react-explorer {
    height: 100%;
    overflow: auto;
  }
  .header {
    text-transform: uppercase;
    font-weight: bold;
    background-color: ${COLORS.background.shades[2]};
    box-shadow: 0px 3px 2px 0px rgba(34, 26, 15, 0.5);
    font-family: 'Mohave-Bold';
  }
  .list.collapsed {
    visibility: hidden;
    * {
      visibility: hidden;
    }
  }

  .item {
    padding-left: 8px;
    align-items: center;

    &:hover {
      background-color: ${COLORS.background.shades[4]};
    }
    &.focused {
      background-color: ${COLORS.background.shades[6]};
      color: ${COLORS.foreground.focused};
      svg {
        fill: ${COLORS.foreground.focused};
      }
    }
    &.folder.collapsed svg {
      transform: rotate(-90deg);
    }
    .label {
      height: 22px;
      line-height: 22px;
    }
    input {
      border: 1px solid ${COLORS.foreground.active1};
      outline: none;
      color: ${COLORS.foreground.focused};
      background: ${COLORS.background.shades[7]};
      font-family: Montserrat;
      font-size: 12px;
      height: 22px;
      flex: 1;
    }
  }
`;
const Header = styled.div`
  height: 32px;
  padding-left: 24px;
  line-height: 32px;
`;
const ContextMenu = styled.div`
  padding: 12px 18px;
  background: grey;
`;
type ExplorerViewProps = {
  items: Asset[];
  focusedItem?: Asset;
  onFocus: (item: Asset) => any;
};

const ExplorerView: React.FC<ExplorerViewProps> = (props) => {
  const { items, focusedItem } = props;
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const virtualElementRef = useRef<any>(null);
  const popperElementRef = useRef<any>(null);
  const { styles, attributes, forceUpdate } = usePopper(
    virtualElementRef.current,
    popperElementRef.current,
    {
      placement: 'right-start',
      // modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    }
  );
  const handleRightClick = (item: Item, e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    console.log(item);
    virtualElementRef.current = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
      }),
    };
    if (forceUpdate) forceUpdate();
    console.log(virtualElementRef.current.valueOf());
    setContextMenuVisible(true);
    const closeContextMenu = () => {
      console.log('closing');
      document.removeEventListener('click', closeContextMenu);
      setContextMenuVisible(false);
    };
    document.addEventListener('click', closeContextMenu);
    e.preventDefault();
  };

  const createAsset = () => {
    // create remotely
    //
  };
  const updateAsset = (asset: Asset) => {
    // folder and assets
  };
  const deleteAsset = () => {};

  return (
    <Wrapper>
      <Header>EXPLORER</Header>
      <ExplorerReact
        items={items.map((item) => ({
          ...item,
          classNames: item.type && [item.type],
          icon: item.type ? assetIcons[item.type] : assetIcons.undefined,
          payload: item,
          forceParentFeatures: item.type === 'folder',
        }))}
        focusedId={focusedItem?.id}
        renameId='2.1'
        onUserFocus={(item) =>
          item.payload?.type !== 'folder' && props.onFocus(item.payload!)
        }
        onRightClick={handleRightClick}
        onRename={(item, value) => {
          console.log(item, value);
        }}
        createAssetPopover={<div>Hi</div>}
      />
      <ContextMenu
        ref={popperElementRef}
        style={{
          ...styles.popper,
          display: contextMenuVisible ? 'block' : 'none',
        }}
        {...attributes.popper}
      >
        Hello
      </ContextMenu>
    </Wrapper>
  );
};

export default ExplorerView;
