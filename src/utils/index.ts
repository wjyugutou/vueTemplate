export interface TreeNodeConfig {
  id: string
  parentId: string
  childrenList: string
}

export type TreeNode<T extends [...string[]]> = {
  [K in T[number]]: TreeNode<T>
} & {
  [key: string]: any
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} args 配置项 必须显示指定才有类型提示 id:'id' parentId:'parentId' childrenList:'children'
 * @example handleTree([], 'id', 'parentId', 'children')
 */
export function generatTreeNode<T extends [...string[]]>(data: any[], ...args: T) {
  const config: TreeNodeConfig = {
    id: args[0],
    parentId: args[1],
    childrenList: args[2],
  }

  const childrenListMap: Record<string, TreeNode<T>[]> = {}
  const nodeIds: Record<string, TreeNode<T>> = {}
  const tree: TreeNode<T>[] = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (!childrenListMap[parentId]) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (!nodeIds[parentId]) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o: TreeNode<T>) {
    if (childrenListMap[o[config.id]] !== null) {
      // @ts-expect-error xxxx
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

/**
 * 参数处理 encodeURIComponent
 * @example queryString({ a: '1', b: '2' }) // a=1&b=2
 * queryString({ a: { b: 1, c: { d: 1 } } }) // 'a%5Bb%5D=1&a%5Bc%5D=%5Bobject%20Object%5D'
 */
export function queryString(params: Record<string, any>) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(params)}=`
            result += `${subPart + encodeURIComponent(value[key])}&`
          }
        }
      }
      else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  if (result.length) {
    result = result.slice(0, -1)
  }
  return result
}
