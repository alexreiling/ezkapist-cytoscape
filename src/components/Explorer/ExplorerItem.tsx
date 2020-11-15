import clsx from 'clsx';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { ExplorerOptions, TreeNode } from './types';
type ExplorerItemProps = HTMLAttributes<HTMLDivElement> & {
  node: TreeNode;
  level: number;
  options: ExplorerOptions;

  // handlers
  onUserFocus: (node: TreeNode, e: React.MouseEvent) => any;
  onRightClick: (node: TreeNode, e: React.MouseEvent) => any;
  onRename: (node: TreeNode, value: string, cancel?: boolean) => any;
};

const ExplorerItem: React.FC<ExplorerItemProps> = (props) => {
  const { node, level, options, onUserFocus, onRightClick, onRename } = props;

  const open = node.children.some((child) => child.asInput);

  const [tempName, setTempName] = useState(node.data.label || '');
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (open) setIsCollapsed(!open);
  }, [open]);

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
  const indentation = level * options.indentation + 'px';
  const value = node.data.label || 'Unnamed';

  return (
    <>
      <div
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
      {!isCollapsed &&
        node.children.map((child, index) => {
          return (
            <ExplorerItem
              node={child}
              level={level + 1}
              options={options}
              onUserFocus={onUserFocus}
              onRightClick={onRightClick}
              onRename={onRename}
              key={index}
            />
          );
        })}
    </>
  );
};
export default ExplorerItem;
