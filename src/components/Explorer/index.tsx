import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import ExplorerItem from './ExplorerItem';
import styled, { css } from 'styled-components';
import { Icons } from './Icons';
import { buildTree } from './algo';
import { ExplorerOptions, Item, TreeNode } from './types';
import { usePopper } from 'react-popper';
import Header from './Header';
import { findByLabelText } from '@testing-library/react';
import { rename } from 'fs';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Label = styled.div`
  flex: 1;
`;
const Toolbar = styled.div`
  margin-left: auto;
`;
const AddFileIcon = styled(Icons.AddFile)`
  height: 100%;
  width: 24px;
  stroke: white;
  fill: white;
  padding: 2px;
`;
const Popper = styled.div<{ visible?: boolean }>`
  display: none;
  ${(p) =>
    p.visible &&
    css`
      display: block;
    `}
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
  const {
    items,
    label,
    focusedId,
    renameId,
    className,
    options,
    onUserFocus,
    onRightClick,
    createAssetPopover,
  } = props;

  const [collapsed, setCollapsed] = useState(false);

  // Popper
  // const [popperVisible, setPopperVisible] = useState(false);
  const referenceElementRef = useRef<any>(null);
  const popperElementRef = useRef<any>(null);
  // const [arrowElement, setArrowElement] = useState<any>(null);

  // const { styles, attributes } = usePopper(
  //   referenceElementRef.current,
  //   popperElementRef.current,
  //   {
  //     // modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  //   }
  // );
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
  console.log(focusedId);
  const root = buildTree(items, {
    focusedId,
    renameId,
  });
  return (
    <Wrapper
      className={className + ' react-explorer'}
      onContextMenu={(e) => handleRightClick(undefined, e)}
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
        />
      </div>
    </Wrapper>
  );
};
export default ExplorerReact;
