export const state = () => ({
  userTreeMenuList: [],
  allMenus: [], //所有菜单
  userMenuList: [], // 用户树状组件
  menuStore: [], // 所有菜单，包含所有子系统（应用中心使用）
  pageButtonPower: [], // 所有权限按钮
  showHeader: true, // 头部是否显示
  menuCollapse: false, // 侧边栏展开状态
  dataDictionary: null, //数据字典
  pageOpenedList: [],
  currentPageName: '',
  currentPageId: ''
})
export const mutations = {
  setDataDictionary(state, dataDictionary) {
    state.dataDictionary = dataDictionary
  },
  setMenuStore(state, list) {
    state.menuStore = list
  },
  setUserMenuList(state, list) {
    state.userMenuList = list || []
  },
  setUserTreeMenuList(state, list) {
    state.userTreeMenuList = list || []
  },
  setAllMenus(state, list) {
    state.allMenus = list || []
  },
  setPageButtonPower(state, list) {
    state.pageButtonPower = list || []
  },
  showHeader(state, value) {
    state.showHeader = value
  },
  menuCollapse(state, value) {
    state.menuCollapse = value
  },
  setOpenedList(state, list) {
    state.pageOpenedList = list
  },
  updateOpenedList(state, get) {
    let openedPage = state.pageOpenedList[get.index]
    if (get.params) {
      openedPage.params = get.params
    }
    if (get.query) {
      openedPage.query = get.query
    }
    if (get.fullPath) {
      openedPage.fullPath = get.fullPath
    }
    // state.pageOpenedList.splice(get.index, 1, openedPage)
  },
  setPageTag(state, tagObj) {
    state.pageOpenedList.push(tagObj)
  },
  removePageTag(state, path) {
    state.pageOpenedList = state.pageOpenedList.filter(
      item => item.fullPath !== path
    )
  },
  closeOtherPage(state, name) {
    state.pageOpenedList = state.pageOpenedList.filter(
      item =>
        item.path === state.currentPageName ||
        item.fullPath === state.currentPageName ||
        item.fixed
    )
  },
  setCurrentPageName(state, path) {
    state.currentPageName = path
  },
  SET_CURRENT_PAGE_ID(state, currentPageId) {
    state.currentPageId = currentPageId
  }
}

export const getters = {
  getDataDictionary(state) {
    return state.dataDictionary
  },
  getUserTreeMenuList(state) {
    return state.userTreeMenuList
  },
  getUserMenuList(state) {
    return state.userMenuList
  },
  getAllMenus(state) {
    return state.allMenus
  },
  getPageButtonPower(state) {
    return state.pageButtonPower
  },
  getShowHeader(state) {
    return state.showHeader
  },
  getMenuCollapse(state) {
    return state.menuCollapse
  },
  getPageOpenedList(state) {
    return state.pageOpenedList
  },
  getCurrentPageName(state) {
    return state.currentPageName
  },
  getCurrentPageId(state) {
    return state.currentPageId
  }
}
