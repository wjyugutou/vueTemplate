import type { EditableTreeNode } from 'unplugin-vue-router'
import fs from 'node:fs/promises'
import path from 'node:path'

interface RouteInfo {
  parent?: Partial<RouteInfo>
  path: string
  fullPath: string
  name: string
  meta: Record<string, any>
  children?: (RouteInfo | undefined)[]
  component?: string
}

/**
 * 此函数意在解决自动生成路由时，无法将获取的路由信息注册到后台的问题
 * @param {RouteInfo} route 生成的路由对象
 */
export function beforeWriteFilesFn(route: EditableTreeNode) {
  const routeInfo = getRouteInfo(route)
  writeRouteInfo(routeInfo)
  writeRouteTreeInfo(route)
}

// 获取路由信息
function getRouteInfo(route: EditableTreeNode) {
  const routeInfo: RouteInfo = {
    parent: ({
      path: route.parent?.path,
      fullPath: route.parent?.fullPath,
      name: route.parent?.name,
      meta: route.parent?.meta,
      component: route.parent?.component,
    }),
    fullPath: route.fullPath,
    path: route.path,
    name: route.name,
    meta: (route.meta),
    children: route.children?.map(getRouteInfo),
    component: route.component,
  }
  return routeInfo
}

//
async function writeRouteInfo(routeInfo?: RouteInfo) {
  try {
    const __dirname = import.meta.dirname
    const filePath = path.join(__dirname, 'routes.json')

    // 判断文件是否存在，不存在则创建
    await fs.access(filePath).catch(() => fs.appendFile(filePath, '{}', 'utf-8'))

    if (!routeInfo)
      return

    await fs.writeFile(filePath, JSON.stringify(routeInfo, null, 2), 'utf-8')
  }
  catch (error) {
    console.error('writeRouteInfo', error)
  }
}

async function writeRouteTreeInfo(routeTree: EditableTreeNode) {
  try {
    const __dirname = import.meta.dirname
    const filePath = path.join(__dirname, 'routeTree.json')

    // 判断文件是否存在，不存在则创建
    await fs.access(filePath).catch(() => fs.appendFile(filePath, '{}', 'utf-8'))

    // JSON.stringify 无法处理 map 类型

    const data = routeTree as unknown as EditableTreeNode & { _children: EditableTreeNode[] }
    data._children = routeTree.children

    await fs.writeFile(filePath, JSON.stringify(routeTree, null, 2), 'utf-8')
  }
  catch (error) {
    console.error('writeRouteInfo', error)
  }
}
