import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import client from '../../../api';
import { COLORS } from '../../../config';
import useAssetStore, { TEMP_ID } from '../../../stores/useAssetStore';
import useUIStore from '../../../stores/useUIStore';
import { Asset, AssetType } from '../../../types';
import ExplorerReact from '../../Explorer';
import '../../Explorer/styles.scss';

import { Item } from '../../Explorer/types';
import { assetIcons } from '../Icons';
import ContextMenu, { ContextMenuProps } from '../../ContextMenu';
import ExplorerContextMenu from './ExplorerContextMenu';
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

const ExplorerView: React.FC = (props) => {
  // Asset Store
  let items = useAssetStore((state) => state.assets);
  const update = useAssetStore((state) => state.updateAsset);
  const create = useAssetStore((state) => state.createAsset);
  const remove = useAssetStore((state) => state.removeAsset);
  const createTemp = useAssetStore((state) => state.createTempAsset);

  // UI store
  const focusedItem = useUIStore((state) => state.focusedAsset);
  const focus = useUIStore((state) => state.focusAsset);
  const rightClickedItem = useUIStore((state) => state.rightClickedAsset);
  const rightClickItem = useUIStore((state) => state.rightClickAsset);

  const [renameItem, setRenameItem] = useState<Asset | undefined>();
  const [tempItem, setTempItem] = useState<Asset | undefined>();

  // context menu
  const [contextMenu, setContextMenu] = useState<
    ContextMenuProps | undefined
  >();

  const handleRightClick = (
    item: Item<Asset> | undefined,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    rightClickItem(item?.payload);
    setContextMenu({ pos: { x: e.clientX, y: e.clientY } });
  };
  const handleRename = async (
    item: Item<Asset>,
    value: string,
    cancel?: boolean
  ) => {
    const asset = item.payload!;
    asset.label = value;
    if (cancel) {
      setTempItem(undefined);
    } else if (asset.id === TEMP_ID) {
      console.log(asset);
      let remote = await create(asset);
      setTempItem(undefined);
      focus(remote);
    } else {
      await update(asset);
    }
    setRenameItem(undefined);
  };
  const createTempItem = (type: AssetType, parentId?: string) => {
    let tempItem = createTemp({ type, parentId });
    setTempItem(tempItem);
    setRenameItem(tempItem);
  };
  const handleParentChange = async (
    item: Item<Asset>,
    parent?: Item<Asset>
  ) => {
    console.log(parent);

    if (parent && parent.payload?.type !== 'folder') return;
    if (
      !window.confirm(
        `Are you sure you want to move ${item.label} into ${
          parent?.label || 'root'
        }?`
      )
    )
      return;
    const asset = item.payload!;
    asset.parentId = parent?.id;
    let remote = await update(asset);
    focus(remote);
  };
  const handleRemove = async (asset: Asset) => {
    if (!window.confirm(`Are you sure you want to remove ${asset.label}?`))
      return;
    await remove(asset);
  };
  if (tempItem) items = items.concat(tempItem);
  console.log('rendering explorer');

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
        renameId={renameItem?.id}
        onUserFocus={(item) => focus(item.payload!)}
        onRightClick={handleRightClick}
        onRename={handleRename}
        onParentChange={handleParentChange}
        createAssetPopover={<div>Hi</div>}
      />
      <ContextMenu
        pos={contextMenu?.pos}
        hide={!contextMenu}
        onDestroy={() => setContextMenu(undefined)}
      >
        <ExplorerContextMenu
          item={rightClickedItem}
          onCreate={createTempItem}
          onStartRename={(item) => setRenameItem(item)}
          onDelete={handleRemove}
        />
      </ContextMenu>
    </Wrapper>
  );
};

export default ExplorerView;
