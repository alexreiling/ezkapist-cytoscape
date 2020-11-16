import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import ExplorerItem from './ExplorerItem';
import styled, { css } from 'styled-components';
import { Icons } from './Icons';
import { buildTree } from './algo';
import { ExplorerOptions, Item, TreeNode } from './types';
import Header from './Header';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export type ExplorerProps<T> = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  items: Item<T>[];
  focusedId?: string;
  renameId?: string;
  onRename?: (item: Item<T>, value: string, cancel?: boolean) => any;
  options?: ExplorerOptions;
  onUserFocus?: (item: Item<T>, e: React.MouseEvent) => any;
  onRightClick?: (item: Item<T> | undefined, e: React.MouseEvent) => any;
  onParentChange?: (item: Item<T>, parent?: Item<T>) => any;
  createAssetPopover?: React.ReactElement;
  // onSelect?: (
  //   node: TreeNode<ExplorerItemModel<T>>,
  //   e: React.MouseEvent<HTMLDivElement>
  // ) => any
  // onCreate?: (item: ExplorerItemModel, groupId?: string) => any
  // classNameItem?: string
  // classNameGroup?: string
  // groups?: {
  //   label?: string
  //   items: ExplorerItemModel<T>[]
  //   onCreate?: (item: ExplorerItemModel, groupId?: string) => any
  // }[]
};

const ExplorerReact = <T,>(props: ExplorerProps<T>) => {
  const { items, label, focusedId, renameId, className, options } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [draggedNode, setDraggedNode] = useState<TreeNode | undefined>();

  const config: ExplorerOptions = { indentation: 8, ...options };

  // handlers
  const handleFocus = (node: TreeNode, e: React.MouseEvent) => {
    if (props.onUserFocus) props.onUserFocus(node.data, e);
  };
  const handleRightClick = (
    node: TreeNode | undefined,
    e: React.MouseEvent
  ) => {
    if (props.onRightClick) props.onRightClick(node?.data, e);
  };
  const handleRename = (node: TreeNode, value: string, cancel?: boolean) => {
    if (props.onRename) props.onRename(node.data, value, cancel);
  };
  const handleDrop = (node?: TreeNode) => {
    if (!draggedNode || draggedNode.data.id === node?.data.id) return;
    if (props.onParentChange)
      props.onParentChange(draggedNode?.data, node?.data);
  };

  // view
  const root = buildTree(items, {
    focusedId,
    renameId,
  });
  return (
    <Wrapper
      className={className + ' react-explorer'}
      onContextMenu={(e) => handleRightClick(undefined, e)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleDrop();
      }}
    >
      <Header collapsed={collapsed} setCollapsed={setCollapsed} label={label} />
      <div
        className={'list' + (collapsed ? ' collapsed' : '')}
        style={{
          overflow: 'auto',
          height: '100%',
        }}
      >
        <ExplorerItem
          node={root}
          level={0}
          options={config}
          onUserFocus={handleFocus}
          onRightClick={handleRightClick}
          onRename={handleRename}
          onUserDrag={(node) => setDraggedNode(node)}
          onUserDrop={handleDrop}
        />
      </div>
    </Wrapper>
  );
};
export default ExplorerReact;
