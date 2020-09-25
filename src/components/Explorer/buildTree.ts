export type TreeNode<T = any> = {
  data: {
    id?: string
    parentId?: string
  } & T
  parent?: TreeNode<T>
  children: TreeNode<T>[]
}

export default function buildTree<T>(
  items: ({
    id?: string
    parentId?: string
  } & T)[] = [],
  rootData?: {
    id?: string
    parentId?: string
  } & T
): TreeNode<T> {
  const root: TreeNode<T> = { children: [], data: rootData || ({} as any) }
  if (!items?.length) return root

  let lookup: { [id: string]: TreeNode<T> } = {}
  let haveNoIds: TreeNode<T>[] = []
  items.forEach((data) => {
    let node = { data, children: [] }
    if (data.id) lookup[data.id] = node
    else haveNoIds.push(node)
  })
  let nodeList = Object.values(lookup).concat(haveNoIds)

  nodeList.forEach((node) => {
    const {
      data: { parentId },
    } = node
    let parent: TreeNode<T> | undefined
    if (parentId) {
      parent = lookup[parentId]
      console.log(parentId)

      if (!parent) {
        parent = {
          children: [],
          data: { id: parentId, label: parentId } as any,
        }
        lookup[parentId] = parent
        root.children.push(parent)
      }
    } else parent = root
    parent.children.push(node)
    node.parent = parent
  })
  return root
}
