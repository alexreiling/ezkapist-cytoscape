import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import ExplorerItem from './ExplorerItem';
import styled, { css } from 'styled-components';
import { Icons } from './svg';
import { buildTree } from './algo';
import { ExplorerOptions, Item, TreeNode } from './types';
import { usePopper } from 'react-popper';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  cursor: pointer;
`;
const GroupHeader = styled.div``;
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
export type ExplorerProps<T = any> = {
  label?: string;
  items: Item[];
  focusedId?: string;
  options?: ExplorerOptions;
  onUserFocus?: (item: Item, e: React.MouseEvent) => any;
  onRightClick?: (item: Item, e: React.MouseEvent) => any;
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

// TODO: use generic type definition on FC to allow proper return type for onSelect payload
const ExplorerReact: React.FC<
  HTMLAttributes<HTMLDivElement> & ExplorerProps<any>
> = (props) => {
  const {
    items,
    label,
    focusedId,
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
  const handleRightClick = (node: TreeNode, e: React.MouseEvent) => {
    if (props.onRightClick) props.onRightClick(node.data, e);
  };

  const root = buildTree(items, focusedId);
  return (
    <Wrapper className={className + ' react-explorer'}>
      <Header className='header'>
        <div style={{ display: 'flex', width: '100%' }}>
          <div className='label' onClick={() => setCollapsed(!collapsed)}>
            {label || 'Untitled'}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {/* <Popper
              visible={popperVisible}
              ref={popperElementRef}
              style={styles.popper}
              {...attributes.popper}
            >
              {createAssetPopover}
              <div ref={setArrowElement} style={styles.arrow} />
            </Popper> */}
          </div>
        </div>
        {/* <Toolbar>{onCreate && <AddFileIcon onClick={handleCreate} />}</Toolbar> */}
      </Header>
      <div
        className={'list' + (collapsed ? ' collapsed' : '')}
        style={{ overflow: 'auto' }}
      >
        {root.children.map((child, index) => {
          return (
            <ExplorerItem
              node={child}
              level={1}
              options={config}
              onUserFocus={handleFocus}
              onRightClick={handleRightClick}
              key={index}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
export default ExplorerReact;
