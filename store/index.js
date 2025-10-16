// index.js
// import Api from '@/plugins/api'
// export const plugins = [Api]
export const strict = false
export const state = () => ({
  processData: [],
  detailsInter: '',
  changeDetailsData: '',
  secondLevel: '',
  activeIndex1: '',
  activeIndex2: '',
  //一级菜单导航
  publicKey: '',
  companyName: '',
  bigLogoPath: '',
  smallLogoPath: '',
  loginLogoPath: '',
  apiGate: '',
  user: {},
  equipments: [],
  departments: [],
  currentEquipment: {},
  currentDepartment: {},
  // menus: 用户的目录
  menus: [],
  isAside: false,
  appName: '',
  instanceId: '',
  config: '',
  dataMessage: {},
  tagNavList: [], // 标签导航信息
  tagNavModel: '', // 选中的标签
  // menus: [],
  // 所有目录
  allMenus: {},
  localeInfo: [
    {
      type: 'zh',
      name: '中文'
    },
    {
      type: 'en',
      name: 'English'
    }
  ],
  locales: ['zh', 'en'],
  locale: 'zh',
  workTime: '', // 工作时间
  ruleInfo: { name: '111' } || JSON.parse(sessionStorage.getItem('nodeInfo')),
  copyRule: false, //复制规则
  areaRuleSelectId: '', //工艺规则返回选中项
  themeSelectId: '', //主题配置选中项
  httpRequestList: []
})
export const getters = {
  // ...
  getJurisdiction: state => routeName => {
    var resources = state.user.resources
    if (!state.user.resources) {
      var user = JSON.parse(localStorage.getItem('user'))
      resources = user.resources
    }
    return resources.indexOf(routeName) > -1
  }
}

export const mutations = {
  SET_RULE(state, ruleInfo) {
    state.ruleInfo = ruleInfo
  },
  SET_WORKTIME(state, workTime) {
    state.workTime = workTime
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  allMenus(state, allMenus) {
    state.allMenus = allMenus
  },
  setUser(state, user) {
    if (!user) return
    state.user = user
  },
  /**
   * @author: wangHongFei
   * @description: 设置导航栏当前选择的页面
   */
  setTagNavModel(state, tagNavModel) {
    console.debug('setTagNavModel:', tagNavModel)
    var item = tagNavModel.name
    state.tagNavModel = item
  },
  /**
   * @author: wangHongFei
   * @description: 设置导航栏列表
   */
  setTagNavList(state, tagNavList) {
    console.debug('导航目录stort：', tagNavList)
    if (typeof tagNavList === 'object') {
      if (isNaN(tagNavList.length)) {
        console.debug('对象')
        var isAddPath = true
        if (tagNavList && state.tagNavList) {
          state.tagNavList.map(function(item, index) {
            if (item.name === tagNavList.name) {
              isAddPath = false
            }
          })
        }
        if (isAddPath) {
          var pathItem = {
            name: tagNavList.name,
            path: tagNavList.path,
            metaName: tagNavList.metaName
          }
          state.tagNavList.push(pathItem)
        }
      } else {
        console.debug('数组')
        state.tagNavList = []
        tagNavList.map(function(item, index) {
          // var pathItem = { name: item.name, path: item.path }
          state.tagNavList.push(item)
        })
      }
    }
  },
  setInitInfo(state, result) {
    state.publicKey = result.publicKey
    state.apiGate = result.apiGate
    if (!result.version) {
      return
    }
    var versionInfo =
      typeof result.version.content === 'string'
        ? JSON.parse(result.version.content)
        : result.version.content
    var array = versionInfo[0].split(',')
    // console.log(versionInfo)
    state.companyName = versionInfo[0]
    state.bigLogoPath = (versionInfo[3] ? versionInfo[3] : '').split(':')[1] // 找张默认图片
    state.smallLogoPath = (versionInfo[2] ? versionInfo[2] : '').split(':')[1]
    state.baseUrl =
      versionInfo.length < 5 ? 'http://localhost:8099' : versionInfo[4]
    state.loginLogoPath = (versionInfo[5] ? versionInfo[5] : '').split(':')[1] // 登录页logo
  },
  setSymmkey(state, symmkey) {
    state.symmkey = symmkey
  },
  addHttpRequestList(state, payload) {
    if (payload === 0) {
      //强行中断时才向下执行
      state.httpRequestList.forEach(item => {
        item('interrupt') //给个标志，中断请求
      })
      state.httpRequestList = []
    } else {
      state.httpRequestList.push(payload)
    }
  }
}

export const actions = {
  getNodeInfo({ commit }, nodeInfo) {
    commit('SET_RULE', nodeInfo)
  },
  async removeHttpRequestList(ctx) {
    ctx.commit('addHttpRequestList', 0)
  }
  // async nuxtServerInit({ commit }, { app }) {
  //   console.debug('nuxt server init')
  //   const result = await app.$axios.$post('/user/getPublicKey.form', {
  //     version: 0
  //   })
  //   // console.log(JSON.stringify(result))
  //   commit('setInitInfo', result)
  // }
}
