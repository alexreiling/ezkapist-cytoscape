import { Item, TreeNode } from './types';
const addChild = (parent: TreeNode, child: TreeNode) => {
  child.parent = parent;
  parent.children.push(child);
};
export const buildTree = (
  items: Item[],
  state: {
    focusedId?: string;
    renameId?: string;
  }
): TreeNode => {
  const root: TreeNode = {
    children: [],
    data: {},
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
      focused: !!state.focusedId && state.focusedId === item.id,
      asInput: !!state.renameId && state.renameId === item.id,
    };
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

  return root;
};
