import {
  filterUrl,
  funcUrlDel,
  generateTree,
  initialOpenedList,
  openNewPage
} from '@/lib/Menu'
import { resourceListNoPage } from '@/lib/system'
import { post } from '@/lib/Util'
import { clearHttpRequestingList } from '@/lib/Util'
// import { goToPage } from '@/utils/routeUtil'

const sleep = function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
// 清空缓存dialogVisible信息
export function clearDialogVisible(app) {
  app.store.commit('whb/setAlarmDealDialogVisible', false)
  app.store.commit('whb/setRealTimeParamDialogVisible', false)
  app.store.commit('whb/setHiddenDetailDialogVisible', false)
}
// 路由守卫
export default ({ app }) => {
  app.router.afterEach((to, from) => {
    openNewPage(app, to.name, to.path, to.fullPath, to.params, to.query)
    window.scrollTo(0, 0)
  })

  app.router.beforeEach(async (to, from, next) => {
    clearHttpRequestingList()
    clearDialogVisible(app)
    const { query } = to
    /*org: "redirect"
token: "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJ1c2VyTmFtZSI6IuiMhuiNo-S8nyIsImV4cCI6MTY1NzMyNzAwNywidXNlcklkIjoiMDIzOTU4In0.EoXptaXKGS3hasK-TCYS10glKQDtH9V04H1dR0iMfqw"
userId: "023958"*/
    // 判断资源来源是否为后端重定向
    // 获取url参数，如果有token信息，直接塞入localstorage
    if (query.org && query.org === 'redirect') {
      !!query.token && localStorage.setItem('token', query.token)
      !!query.userId && localStorage.setItem('userId', query.userId)
      !!query.userName && localStorage.setItem('userName', query.userName)
      !!query.token && app.store.commit('user/setToken', query.token)
      !!query.userId && app.store.commit('user/setUserNo', query.userId)
      !!query.userName && app.store.commit('user/setUserName', query.userName)
    }
    /*if (query.org === 'redirect') {
      // 存在性判断可以简化，因为严格相等会自动处理
      if (query.token) {
        localStorage.setItem('token', query.token)
        app.store.commit('user/setToken', query.token)
      }
      if (query.userId) {
        localStorage.setItem('userId', query.userId)
        app.store.commit('user/setUserNo', query.userId)
      }
      if (query.userName && query.userName !== '') {
        localStorage.setItem('userName', query.userName)
        app.store.commit('user/setUserName', query.userName)
      } else {
        localStorage.setItem('userName', query.userName)
        app.store.commit('user/setUserName', query.userName)
      }
    }*/
    // 判断是否显示头部
    if (query.showHeader !== undefined) {
      app.store.commit('menu/showHeader', parseInt(query.showHeader))
    }

    // 判断系统是否已经记录token
    const token = localStorage.getItem('token')
    if (!token) {
      // 没有token,记录当前页面Url
      // console.warn('没有token，开始重定向')
      // 直接跳转到统一认证登录页
      // 重定向搭到后端登录请求
      const userName = localStorage.getItem('userId'),
        href = window.location.href
      // window.location.href = `http://10.1.11.181:9730`
      next()
    } else {
      next()
      // 用户菜单没有加载时直接请求用户权限菜单
      if (
        // windows 对象上的系统初始化标志位
        !window.SYSTEM_MENU_LOADED
      ) {
        await sleep(0)
        // 系统初始化时，设置头部显示
        app.store.commit('menu/showHeader', true)
        // 判断是否显示头部
        query.showHeader !== undefined &&
          app.store.commit('menu/showHeader', !!parseInt(query.showHeader))
        await sleep(0)
        // console.log('重新请求数据')
        // 初始化标签固定页
        initialOpenedList(app)
        if (
          to.path ===
          '/EquipConditionMonitor/WideThickPlateFactory/MonitorRoute'
        ) {
          // await goToPage(to, next)
        } else {
          next()
          // 判断用户访问的路由权限是否存在
          if (
            app.store.state.menu.allMenus &&
            !app.store.state.menu.allMenus.find(
              item =>
                item.url === to.path ||
                item.url === decodeURIComponent(filterUrl(to.fullPath))
            ) &&
            to.path !== '/'
          ) {
            await app.router.push('/')
          }

          // 删除页面token参数
          if (query.org && query.org === 'redirect') {
            funcUrlDel()
          }
        }
      }
    }
  })
}
