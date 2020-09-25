// external data structures

import { HTMLAttributes } from 'react';

export interface Item<T = any> {
  id?: string;
  label?: string;
  parentId?: string;
  isContainer?: boolean;
  payload?: T;
}

// internal (tree) structures
export interface TreeNode {
  parent?: TreeNode;
  focused?: boolean;
  children: TreeNode[];
  data: Item;
}

// options
export interface ExplorerOptions {
  indentation: number;
}
