import { Item, TreeNode } from './types'
const addChild = (parent: TreeNode, child: TreeNode) => {
  child.parent = parent
  parent.children.push(child)
}
export const buildTree = (items: Item[], focusedId?: string): TreeNode => {
  const root: TreeNode = {
    children: [],
    data: {},
  }
  const seenNodes: {
    [key: string]: TreeNode
  } = {}
  const orphansByParentId: {
    [key: string]: TreeNode[]
  } = {}
  items.forEach((item) => {
    const children = (item.id && orphansByParentId[item.id]) || []

    let node: TreeNode = {
      children,
      data: item,
      focused: !!focusedId && focusedId === item.id,
    }
    if (!item.parentId) {
      addChild(root, node)
    } else {
      let parent = seenNodes[item.parentId]
      if (parent) {
        addChild(parent, node)
      } else {
        const orphans = orphansByParentId[item.parentId]
        if (orphans) orphans.push(node)
        else orphansByParentId[item.parentId] = [node]
      }
    }
    if (item.id) seenNodes[item.id] = node
  })
  return root
}
