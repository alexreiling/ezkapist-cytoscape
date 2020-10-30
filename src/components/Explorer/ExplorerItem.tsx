import clsx from 'clsx';
import React, { HTMLAttributes, useState } from 'react';
import { isTemplateExpression } from 'typescript';
import { Icons } from './Icons';
import { ExplorerOptions, TreeNode } from './types';
type ExplorerItemProps = HTMLAttributes<HTMLDivElement> & {
  node: TreeNode;
  selected?: boolean;
  level: number;
  options: ExplorerOptions;

  // handlers
  onUserFocus: (node: TreeNode, e: React.MouseEvent) => any;
  onRightClick: (node: TreeNode, e: React.MouseEvent) => any;
};

const ExplorerItem: React.FC<ExplorerItemProps> = (props) => {
  const { node, selected, level, options, onUserFocus, onRightClick } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.data.forceParentFeatures || node.children.length) {
      // is directory
      setIsCollapsed(!isCollapsed);
    }
    onUserFocus(node, e);
  };
  const indentation = level * options.indentation + 'px';
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
        onContextMenu={(e) => onRightClick(node, e)}
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
          <div className='label'>{node.data.label || 'Unnamed'}</div>
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
              key={index}
            />
          );
        })}
    </>
  );
};
export default ExplorerItem;
