import clsx from 'clsx';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { ExplorerOptions, TreeNode } from './types';
import _ from 'lodash';

type ExplorerItemProps = HTMLAttributes<HTMLDivElement> & {
  node: TreeNode;
  level: number;
  options: ExplorerOptions;

  // handlers
  onUserFocus: (node: TreeNode, e: React.MouseEvent) => any;
  onRightClick: (node: TreeNode, e: React.MouseEvent) => any;
  onRename: (node: TreeNode, value: string, cancel?: boolean) => any;
  onUserDrag: (node: TreeNode, e: React.DragEvent) => any;
  onUserDrop: (node: TreeNode, e: React.DragEvent) => any;
};

const ExplorerItem: React.FC<ExplorerItemProps> = (props) => {
  const {
    node,
    level,
    options,
    onUserFocus,
    onRightClick,
    onRename,
    onUserDrag,
    onUserDrop,
  } = props;

  // const open = node.children.some((child) => child.asInput || child.focused);

  const [tempName, setTempName] = useState(node.data.label || '');
  const [isCollapsed, setIsCollapsed] = useState(node.collapsed);

  useEffect(() => {
    if (!node.collapsed) setIsCollapsed(false);
  }, [node.collapsed]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.data.forceParentFeatures || node.children.length) {
      // is directory
      setIsCollapsed(!isCollapsed);
    }
    onUserFocus(node, e);
  };
  const handleRename = (cancel?: boolean) => {
    console.log('rename', tempName);
    onRename(node, tempName, cancel);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUserDrop(node, e);
  };
  const indentation = level * options.indentation + 'px';
  const value = node.data.label || 'Unnamed';

  let children = _.orderBy(node.children, [
    (item) => (!!item.data.forceParentFeatures ? -1 : 1),
    'data.label',
  ]).map((child, index) => {
    return (
      <ExplorerItem
        {...props}
        node={child}
        level={level + 1}
        options={options}
        key={index}
      />
    );
  });

  if (!node.parent) return <>{children}</>;
  return (
    <>
      <div
        draggable
        onDragStart={(e) => onUserDrag(node, e)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={clsx(
          'item',
          {
            parent: node.data.forceParentFeatures || !!node.children.length,
            collapsed: isCollapsed,
            focused: node.focused,
          },
          ...(node.data.classNames || [])
        )}
        onClick={handleClick}
        onContextMenu={(e) => {
          e.stopPropagation();
          onRightClick(node, e);
        }}
        style={{}}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            alignItems: 'center',
            marginLeft: indentation,
          }}
        >
          {node.data.icon && node.data.icon}
          {!node.asInput ? (
            <div className='label'>{value}</div>
          ) : (
            <input
              autoFocus
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => handleRename()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                else if (e.key === 'Escape') handleRename(true);
              }}
            />
          )}
        </div>
      </div>
      {!isCollapsed && children}
    </>
  );
};
export default ExplorerItem;
