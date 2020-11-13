// external data structures

import { HTMLAttributes } from 'react';

export interface Item<T = any> {
  id?: string;
  label?: string;
  parentId?: string;
  classNames?: string[];
  payload?: T;
  icon?: React.ReactElement;
  forceParentFeatures?: boolean;
}

// internal (tree) structures
export interface TreeNode {
  parent?: TreeNode;
  asInput?: boolean;
  focused?: boolean;
  children: TreeNode[];
  data: Item;
}

// options
export interface ExplorerOptions {
  indentation: number;
}
