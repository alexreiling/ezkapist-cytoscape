import React from 'react';
import styled from 'styled-components';
import useUIStore from '../../../stores/useUIStore';
import { Asset, AssetType } from '../../../types';

const Wrapper = styled.div``;

type ExplorerContextMenuProps = {
  item?: Asset;
  onCreate: (type: AssetType, parentId?: string) => any;
  onStartRename: (asset: Asset) => any;
  onDelete: (asset: Asset) => any;
};

const ExplorerContextMenu: React.FC<ExplorerContextMenuProps> = (props) => {
  const { item, onCreate, onStartRename, onDelete } = props;
  return (
    <>
      {(!item || item.type === 'folder') && (
        <>
          <div onClick={() => onCreate('flow', item?.id)}>New Flow</div>
          <div onClick={() => onCreate('map', item?.id)}>New Map</div>
          <div onClick={() => onCreate('character', item?.id)}>
            New Character
          </div>
          <div onClick={() => onCreate('world', item?.id)}>New World</div>
          <div onClick={() => onCreate('folder', item?.id)}>New Folder</div>
          <hr />
        </>
      )}
      <div
        onClick={() => {
          onStartRename(item!);
        }}
      >
        Rename
      </div>
      <div
        onClick={() => {
          onDelete(item!);
        }}
      >
        Delete
      </div>
    </>
  );
};

export default ExplorerContextMenu;
