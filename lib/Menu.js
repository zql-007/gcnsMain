import {
  getResource,
  saveByAppInfos
} from '@/lib/productDataApply/steelmakingProcess'

const sleep = function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
/**
 * 根据后端全量列表生成树状菜单结构数据
 * @param menuList 需处理菜单列表
 * @param pid  父级id
 * @returns {*[]}
 */
import { post } from '@/lib/Util'
import { pageLogSave, pageLogSave10 } from '@/api/system'

export const getMenuData = function(menuList = [], pid = '') {
  const data = []
  // 本次递归第一级菜单
  for (let item of menuList) {
    if (!item.parentId) item.parentId = ''
    item.disabled = !item.status
    if (item.parentId === pid) {
      data.push(item)
    }
  }
  // 根据sort排序
  data.sort((a, b) => a.sort - b.sort)
  // 本次递归二级菜单
  for (let item of data) {
    item.children = getMenuData(menuList, item.id)
    if (!item.children.length) {
      delete item.children
    }
  }
  // console.log(data)
  return data
}
/**
 * 生成树结构
 * @param list
 * @returns {*[]}
 */
// export const generateTree = function(list) {
//   const roots = []
//   list.forEach(item => {
//     list.findIndex(node => node.id === item.parentId) === -1 && roots.push(item)
//   })
//   roots.forEach(item => {
//     item.children = getMenuData(list, item.id)
//   })
//   return roots
// }
export const generateTree = function(list, type = 1) {
  const roots = []
  const pages = []
  const menus = list.map(item => {
    item.routes = item.name
    item.iconUrl = item.iconUrl
    item.deskUrl = item.deskUrl
    list.findIndex(node => node.id === item.parentId) === -1 && roots.push(item)
    return Object.assign({}, item)
  })
  roots.forEach(item => {
    item.children = getMenuData(menus, item.id, pages)
  })
  if (type === 1) {
    return roots
  } else {
    return { roots, pages }
  }
}

export async function getMenus(store) {
  const userNo = localStorage.getItem('userId')
  console.log('userNo', userNo)
  // post(getResource, { u }).then(res => {
  //   if (res.success) {
  //     localStorage.setItem('userDetail', JSON.stringify(res.data))
  //   }
  // })
  const data = await post(getResource, { userNo })
  if (data.success) {
    const list = data.data.map(item => {
      delete item.createDateTime
      delete item.createUserNo
      delete item.desc
      delete item.updateDateTime
      delete item.updateUserNo
      return item
    })
    const menu = list.filter(item => item.type === 'menu')
    const widget = list.filter(item => item.type === 'plugin')
    const button = list
      .filter(item => item.type === 'button')
      .map(item => item.url)
    const menuTree = generateTree(menu, 2)
    console.log('总menuTree', menuTree)
    // 缓存菜单、按钮权限数据
    store.commit('menu/setAllMenus', list)
    store.commit('menu/setMenuStore', menuTree.roots)
    store.commit('menu/setUserMenuList', [])
    store.commit('menu/setPageButtonPower', button)
    /*store.commit('menu/widgetList', generateTree(widget))
    store.commit('menu/setMenuPages', menuTree.pages)*/
  }
  return new Promise(resolve => resolve(true))
}
/* 不缓存添加到tag标签上的页面 */
export const notKeepalivePage = ['/']

/**
 * 打开新页面
 * @param app vm实力
 * @param name 路由名
 * @param path 路由路径
 * @param fullPath 完整路径
 * @param params 路由参数
 * @param query 路由query参数
 */
export const openNewPage = function(app, name, path, fullPath, params, query) {
  if (!app.store) {
    return
  }
  // 过滤url参数，去除主系统添加的额外参数
  const filterFullPath = filterUrl(fullPath)
  window.myGlobalFilterFullPath = filterFullPath
  let pageOpenedList = app.store.state.menu.pageOpenedList
  let openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  while (i < openedPageLen) {
    //是否报警明细,报警明细不匹配参数
    if (
      filterFullPath.indexOf(
        '/EquipConditionMonitor/WideThickPlateFactory/Alarm/AlarmManagement'
      ) !== -1
    ) {
      if (
        pageOpenedList[i].fullPath.indexOf(
          '/EquipConditionMonitor/WideThickPlateFactory/Alarm/AlarmManagement'
        ) !== -1
      ) {
        // 页面已经打开
        app.store.commit('menu/updateOpenedList', {
          index: i,
          params: params,
          fullPath: filterFullPath,
          query: query
        })
        tagHasOpened = true
        break
      }
    } else {
      if (filterFullPath === pageOpenedList[i].fullPath) {
        // 页面已经打开
        app.store.commit('menu/updateOpenedList', {
          index: i,
          params: params,
          fullPath: filterFullPath,
          query: query
        })
        tagHasOpened = true
        break
      }
    }
    i++
  }
  if (!tagHasOpened) {
    !notKeepalivePage.find(item => item === path) &&
      app.store.commit('menu/setPageTag', {
        name: name,
        path: path,
        fullPath: filterFullPath,
        params: params,
        query: query
      })
  }
  app.store.commit('menu/setCurrentPageName', filterFullPath)
  visitCount(filterFullPath, app.store.state.menu)
}

// 标签固定页配置（固定在左侧）
// [{
//   path: '/feature/factory?factory=1',
//   fullPath: '/feature/factory?factory=1',
//   params: {},
//   query: {},
//   fixed: true
// }]
const fixedPageList = []
/**
 * 初始化pageOpenedList,添加固定页
 * @param app nuxt实例
 */
export const initialOpenedList = function(app) {
  const openList = app.store.state.menu.pageOpenedList.filter(
    item => !fixedPageList.find(fixed => fixed.fullPath === item.fullPath)
  )
  // 塞入固定页
  openList.unshift(...fixedPageList)
  app.store.commit('menu/setOpenedList', openList)
}

/**
 * 记录用户访问情况
 * @param fullPath
 * @param menu
 */
let visitCountTask = null
let visitCountTask10S = null
const visitCountInterval10S = 10000 // 有效访问时间 10S
export async function visitCount(fullPath, menu) {
  visitCountTask && clearTimeout(visitCountTask)
  visitCountTask10S && clearTimeout(visitCountTask10S)
  await sleep(0)
  // 匹配菜单数据
  const matchMenu = menu.allMenus.find(item => item.url === fullPath)
  const token = localStorage.getItem('token')
  if (!matchMenu || !token) return
  // 判断是否为叶子节点
  const children = menu.allMenus.filter(
    item => item.parentId === matchMenu.id && item.type === 'menu'
  )
  if (children.length) return
  // 保存用户访问记录
  // post(pageLogSave, {
  //   resourceId: matchMenu.id
  // })
  // console.log('matchMenu', matchMenu)
  visitCountTask10S = setTimeout(() => {
    post(saveByAppInfos, {
      menuCode: matchMenu.code,
      userNo: localStorage.getItem('userId')
    })
  }, visitCountInterval10S)
}

/**
 * 删除url中某个参数,并修改地址栏
 */
export function funcUrlDel() {
  const url = filterUrl(window.location.href)
  window.history.replaceState({}, 0, url)
}

/**
 * 删除url中指定参数,并返回
 */
export function filterUrl(path) {
  if (path.indexOf('?') === -1) return path
  const baseUrl = path.split('?')[0] + '?'
  const query = path.split('?')[1]
  const obj = {}
  const arr = query.split('&')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split('=')
    obj[arr[i][0]] = arr[i][1]
  }
  ;['userId', 'token', 'org', 'showHeader', 'password'].forEach(
    item => delete obj[item]
  )
  const url =
    baseUrl +
    JSON.stringify(obj)
      .replace(/[\"\{\}]/g, '')
      .replace(/\:/g, '=')
      .replace(/\,/g, '&')
  return url.endsWith('?') ? url.split('?')[0] : url
}
