import { Item, TreeNode } from './types';
const addChild = (parent: TreeNode, child: TreeNode) => {
  child.parent = parent;
  parent.children.push(child);
};
const openParent = (node?: TreeNode) => {
  if (!node) return;
  openParent(node.parent);
  node.collapsed = false;
};
export const buildTree = (
  items: Item[],
  state: {
    focusedId?: string;
    renameId?: string;
  }
): TreeNode => {
  let focusedNode: TreeNode | undefined;
  let inputNode: TreeNode | undefined;
  const root: TreeNode = {
    children: [],
    data: {},
    collapsed: true,
  };
  const seenNodes: {
    [key: string]: TreeNode;
  } = {};
  const orphansByParentId: {
    [key: string]: TreeNode[];
  } = {};
  items.forEach((item) => {
    const children = (item.id && orphansByParentId[item.id]) || [];
    let node: TreeNode = {
      children,
      data: item,

      collapsed: true,
    };
    if (!!state.focusedId && state.focusedId === item.id) focusedNode = node;
    if (!!state.renameId && state.renameId === item.id) inputNode = node;
    children.forEach((child) => (child.parent = node));

    if (!item.parentId) {
      addChild(root, node);
    } else {
      let parent = seenNodes[item.parentId];
      if (parent) {
        addChild(parent, node);
      } else {
        const orphans = orphansByParentId[item.parentId];
        if (orphans) orphans.push(node);
        else orphansByParentId[item.parentId] = [node];
      }
    }
    if (item.id) seenNodes[item.id] = node;
  });
  if (focusedNode) {
    focusedNode.focused = true;
    openParent(focusedNode.parent);
  }
  if (inputNode) {
    inputNode.asInput = true;
    openParent(inputNode.parent);
  }
  return root;
};
