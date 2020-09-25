import clsx from 'clsx';
import React, { HTMLAttributes, useState } from 'react';
import { ExplorerOptions, TreeNode } from './types';
type ExplorerItemProps = HTMLAttributes<HTMLDivElement> & {
  node: TreeNode;
  selected?: boolean;
  level: number;
  options: ExplorerOptions;

  // handlers
  onUserFocus: (node: TreeNode, e: React.MouseEvent) => any;
  onRightClick: (node: TreeNode, e: React.MouseEvent) => any;
  // onUserSelect?: (e: React.MouseEvent<HTMLDivElement>, node: TreeNode) => any
  //classNameGroup?: string
};

const ExplorerItem: React.FC<ExplorerItemProps> = (props) => {
  const { node, selected, level, options, onUserFocus, onRightClick } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  // const handleSelect = (
  //   e: React.MouseEvent<HTMLDivElement>,
  //   childPayload?: any
  // ) => {
  //   e.stopPropagation()
  //   if (!childPayload) {
  //     setIsCollapsed(!isCollapsed)
  //   }
  //   if (onUserSelect) onUserSelect(e, childPayload || props.node)
  // }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.children.length) {
      // is directory
      setIsCollapsed(!isCollapsed);
    }
    onUserFocus(node, e);
  };
  const indentation = level * options.indentation + 'px';
  return (
    <>
      <div
        className={clsx('item', {
          parent: !!node.children.length,
          collapsed: isCollapsed,
          focused: node.focused,
        })}
        onClick={handleClick}
        onContextMenu={(e) => onRightClick(node, e)}
        style={{ display: 'flex' }}
      >
        {/* {!!node.children.length && <div>{isCollapsed ? '+' : '-'}</div>} */}
        <div className='label' style={{ marginLeft: indentation }}>
          {node.data.label || 'Unnamed'}
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
      {/* <div className={'children ' + isCollapsed ? 'collapsed' : ''}>
      
      </div> */}
    </>
    // <div className={classNames.classNameGroup}>
    //   <div
    //     style={{ display: 'flex' }}
    //     className={classNames.className}
    //     onClick={handleSelect}
    //   >
    //     {(!!children?.length || isContainer) && (
    //       <div>{isCollapsed ? '+' : '-'}</div>
    //     )}
    //     <div>{label}</div>
    //   </div>
    //   {!isCollapsed &&
    //     children?.map((childNode, index) => {
    //       return (
    //         <ExplorerItem
    //           key={index}
    //           label={childNode.data.label || `[${index}]`}
    //           node={childNode}
    //           onSelect={handleSelect}
    //           {...classNames}
    //         />
    //       )
    //     })}
    // </div>
  );
};
export default ExplorerItem;
