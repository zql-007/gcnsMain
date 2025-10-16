/*import {
  GET_PUBLIC_KEY,
  LOGIN_URL,
  GET_CLIENT_FIND_BASIC_DATA_CONFIG_BY_TYPE
} from '@/lib/ApiURL'*/
import cryptoJs from 'crypto-js'
import MD5 from 'md5'
import keys from '@/lib/Keys'
import { objEqual } from '@/lib/tools'
import Vue from 'vue'
import axios from 'axios'

// 清空cancelToken中的cancel函数
export function clearHttpRequestingList() {
  // 路由切换检测是否强行中断， 强行中断时才向下执行
  if (Vue.$httpRequestList.length > 0) {
    Vue.$httpRequestList.forEach(item => {
      // console.log('interrupt', item)
      // 给个标志，中断请求
      item.cancel('interrupt')
    })
    Vue.$httpRequestList = []
  }
}
export function error(title, content, showClose) {
  // console.log(content, window.$nuxt.$t(content))
  window.$nuxt.$notify.error({
    title: window.$nuxt.$t(title) || title,
    message: window.$nuxt.$t(content),
    showClose: false
  })
}

export function getConfig(key) {
  return window ? window.$nuxt.$t(key) || key : ''
}

export function success(title, content, showClose) {
  window.$nuxt.$notify.success({
    title: window.$nuxt.$t(title) || title,
    message: window.$nuxt.$t(content) || content,
    showClose: !showClose
  })
}
/**
 * 将用户数据存放在以用户_id_开头的item下面
 * @param { string } key key值
 * @param { any } data value值
 */
export function persist(key, data) {
  data = typeof data === 'object' ? JSON.stringify(data) : data
  const userId = JSON.parse(localStorage.getItem('user') || '{"userId": 0}')
    .userId
  localStorage.setItem('_' + userId + '_' + key, data)
}

/**
 * 获取用户item下的数据
 * @param { string } key 需要获取的key值
 */
export function getValue(key) {
  const userId = JSON.parse(localStorage.getItem('user') || '{"userId": 0}')
    .userId
  return localStorage.getItem('_' + userId + '_' + key)
}

/**
 * 获取登录后的用户信息
 */
export function getStorageUser() {
  return !process.server ? JSON.parse(localStorage.getItem('user')) : null
}

/**
 * 获取同步密钥
 */
export function getSymmkey() {
  return !process.server ? localStorage.getItem(keys.SYMMKEY) : null
}

/**
 * 保存同步密钥
 */
export function setSymmkey(symmkey) {
  localStorage.setItem(keys.SYMMKEY, symmkey)
}

/**
 * RSA 加密
 * @param { any } data 待加密的对象
 */
export function rsaEncrypt(data) {
  const { JSEncrypt } = require('jsencrypt')
  const publicKey = window.$nuxt.$store.state.publicKey
  if (typeof data === 'object') data = JSON.stringify(data)
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(data)
}

/**
 * aes加密，
 * return { content: '', index: ''}
 */
export function aesEncrypt(data) {
  const symmkey = getSymmkey()
  const user = getStorageUser()

  if (!user || !symmkey) {
    error('home.systemInfo', 'home.loginTimeExpired')
    window.$nuxt.$router.push({
      path: '/login',
      query: { url: window.$nuxt.$router.currentRoute.path }
    })
    return
  }
  const userId = user.userId
  const device = process.env.device
  if (typeof data === 'object') data = JSON.stringify(data)
  data = encodeURIComponent(data)
  const key = cryptoJs.enc.Utf8.parse(symmkey)
  const iv = cryptoJs.enc.Utf8.parse('0102030405060708')
  const srcs = cryptoJs.enc.Utf8.parse(data)
  const encrypted = cryptoJs.AES.encrypt(srcs, key, {
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  })
  return {
    content: encrypted.toString(),
    index: userId + '_' + device
  }
}

/**
 * aes 解密
 */
export function aesDecrypt(data) {
  const symmkey = getSymmkey()
  console.log('symmkey is ,', symmkey)
  const key = cryptoJs.enc.Utf8.parse(symmkey)
  const iv = cryptoJs.enc.Utf8.parse('0102030405060708')
  try {
    const decrypted = cryptoJs.AES.decrypt(data, key, {
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    })
    if (decrypted) {
      return decrypted.toString(cryptoJs.enc.Utf8)
    }
  } catch (e) {
    loginByToken(localStorage.getItem('token'))
  }
}

export async function loginByToken(token) {
  // console.log('login by token is invoke, ', window.$nuxt.$t('home.systemInfo'))
  if (!token) {
    error('home.systemInfo', 'home.loginTimeExpired')
    window.$nuxt.$router.push('/login')
  }
  if (typeof token === 'string') token = JSON.parse(token)
  let result = await post(LOGIN_URL, token, 'no')
  window.$nuxt.$store.commit('setUser', result)
  return result
}

/**
 * 用户登录
 * @param { string } name 用户名
 * @param { string } password 密码
 */
export async function login(name, password) {
  const store = window.$nuxt.$store
  const wordArray = cryptoJs.lib.WordArray.random(8)
  const symmkey = cryptoJs.enc.Hex.stringify(wordArray)
  const token = {
    client: process.env.device,
    data: rsaEncrypt({ name, password, symmkey })
  }
  const result = await loginByToken(token)
  if (result.status === 'success') {
    result.photo = '/file/' + result.name + '/photo/user.file'
    result.password = MD5(password)
    store.commit('setUser', result)
    localStorage.setItem('user', JSON.stringify(result))
    localStorage.setItem('token', JSON.stringify(token))
    setSymmkey(symmkey)
  }
  console.log(result)
  return result
}

/**
 * post 方式获取服务器端信息,不加密
 * @param { string } url 请求的url地址
 * @param { object } data value值
 * @param { string } isNotify 'no'不自动提示请求结果，默认在屏幕右上角显示服务器请求结果
 */
/*export async function post(url, data, isNotify = 'yes') {
  const tmp = await window.$nuxt.$postService(
    url,
    data || {},
    isNotify || 'yes'
  )
  return tmp
}*/

/*1、post 函数是异步的，它返回一个 Promise 对象。由于 post 函数返回的是 Promise 对象，所以可以使用 async/await 来调用这个函数
* 2、在 post 函数中，使用了 axios.post 方法来发起 HTTP 请求，axios.post 本身是异步操作，它返回一个 Promise 对象。post 函数内部将
*  axios.post 的结果封装在一个新的 Promise 中，并根据请求的结果进行 resolve 或 reject。因此，调用 post 函数会立即返回一个 Promise 对象，
* 不会阻塞后续代码的执行，所以它是异步的*/
export const post = (url, data) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json'
  }
  if (headers['refresh-token']) {
    localStorage.setItem('token', headers['refresh-token'])
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  // console.log('请求头信息:', headers)
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { headers })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(new Error(`请求失败，状态码: ${response.status}`))
        }
      })
      .catch(error => {
        reject(error)
        // console.log('error', error)
        if (error.response && error.response.status === 401) {
          // token失效，删除本地token,重定向到智慧桌面窗口
          // let redirectUrl = 'http://10.1.11.181:9730'
          window.location.href = redirectUrl
        }
      })
  })
}

/**
 * post 方式 加密获取服务器端信息
 * @param { string } url 请求的url地址
 * @param { object } data value值
 * @param { string } isNotify 'no'不自动提示请求结果，默认在屏幕右上角显示服务器请求结果
 */
export async function $post(url, data, isNotify) {
  if (process.server) return
  console.log('$post url======', url)
  const symmkey = getSymmkey()
  const user = getStorageUser()

  if (!user || !symmkey) {
    window.$nuxt.$router.push({
      path: '/login',
      query: { url: window.$nuxt.$router.currentRoute.path }
    })
    return
  }

  data = aesEncrypt(data || {})
  const tmp = await window.$nuxt.$postService(url, data, isNotify || 'yes')
  console.debug('tmp, ', tmp, url)
  if (tmp.status === 'sysError' && tmp.code != '500') {
    window.$nuxt.$router.push({
      path: '/login',
      query: { url: window.$nuxt.$router.currentRoute.path }
    })
    return
  }
  if (!tmp) return
  return aesDecrypt(tmp.data)
}

/**
 * get 方式 获取服务器端信息,不加密
 * @param { string } url 请求的url地址
 * @param { object } data value值
 * @param { string } isNotify 'no'不自动提示请求结果，默认在屏幕右上角显示服务器请求结果
 */
export async function get(url, data, isNotify = 'yes') {
  return await window.$nuxt.$getService(url, data || {}, isNotify || 'yes')
}

/**
 * get 方式 加密获取服务器端信息
 * @param { string } url 请求的url地址
 * @param { object } data value值
 * @param { string } isNotify 'no'不自动提示请求结果，默认在屏幕右上角显示服务器请求结果
 */
export async function $get(url, data, isNotify) {
  data = aesEncrypt(data || {})
  const tmp = await window.$nuxt.$postService(url, data, isNotify || 'yes')
  return aesDecrypt(tmp)
}

/**
 * [fixMenus 删选出父类叶子节点，然后去递归子节点，组织数据成{children:[{}]} 格式]
 * @param  {[type]} menus            [description]
 * @param  {[type]} fromParentIsNull ['yes' 时，只有当parent 为null时才能作为第一级目录]
 * @return {[type]}                  [description]
 */
export function fixMenus(menus, fromParentIsNull) {
  let parents = []
  menus.map((obj, idx) => {
    obj.children = []
  })
  if (fromParentIsNull && fromParentIsNull === 'yes') {
    parents = menus.filter(menu => !menu.parent && !menu.pId)
  } else {
    parents = menus.filter(menu => {
      if (!menu.parent && !menu.pId) return true
      var i = 0
      var length = menus.length
      for (; i < length; i++) {
        var tmp = menus[i]
        if (menu.parent && tmp.id === menu.parent.id) {
          return false
        }
        if (menu.pId && tmp.id === menu.pId) {
          return false
        }
        // if ((menu.parent && tmp.id === menu.parent.id) || (menu.pId && tmp.id === menu.pId)) return false
        // else if () return true
      }
      return true
    })
  }
  parents.map((obj, idx) => {
    arrageMenus(menus, obj)
  })
  return parents
}

/**
 * [arrageMenus 递归menus, 生成格式为{[children: []]}]
 * @param  {[type]} menus  [description]
 * @param  {[type]} parent [description]
 * @return {[type]}        [description]
 */
export function arrageMenus(menus, parent) {
  let objPid = parent.id
  menus.map((obj, index) => {
    var pId = ''
    if (obj.parent) {
      pId = obj.parent.id
    } else {
      pId = obj.pId ? obj.pId : 0
    }
    if (objPid === pId) {
      delete obj.children
      if (!parent.children) parent.children = []
      parent.children.push(arrageMenus(menus, obj))
    }
  })
  return parent
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  var routeEqualBool = false
  if (route1.name === route2.name) {
    if (objEqual(params1, params2)) {
      if (objEqual(query1, query2)) {
        routeEqualBool = true
      }
    }
  }
  return routeEqualBool
}

/**
 * [findBasicDataConfigByType 查询整理基础数据]
 * @return {[type]} [description]
 */
export async function findBasicDataConfigByType(type) {
  var info = await post(
    GET_CLIENT_FIND_BASIC_DATA_CONFIG_BY_TYPE,
    {
      type: type
    },
    'no'
  )
  // var data = JSON.parse(info)
  var data = info
  var dataContent = []
  if (data.content) {
    dataContent = JSON.parse(data.content)
    data.content = dataContent
    if (data.flag === 'json') {
      var dataTypeContent = []
      dataContent.map(function(item, index) {
        var itemType = typeof item === 'string' ? JSON.parse(item) : item
        dataTypeContent.push(itemType)
      })
      data.content = dataTypeContent
    }
  }
  return data.content
}

/**
 * @description: 介质类型，用于selsect选择框
 */
export function findMediumTypeBySelect() {
  let options = []
  var labelObj = {
    0: '混合煤气',
    1: '电',
    2: '净化压缩空气',
    3: '普通压缩空气',
    4: '氮气',
    5: '氧气',
    6: '蒸汽',
    7: '软水',
    8: '静环水',
    9: '浊环水',
    10: '补充水',
    11: '高炉煤气',
    12: '转炉煤气',
    13: '焦炉煤气'
  }
  for (var i in labelObj) {
    options.push({ label: labelObj[i], value: Number(i) })
  }
  return options
}

/**
 * param table参数
 * needCalcColumnIndex 需要求和的列的index数组 [1, 2, 3], 第一二三列需要求和
 */
export function calcColumsSum(param, needCalcColumnIndex) {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }

    const exist = needCalcColumnIndex.some(idx => {
      return idx == index
    })
    if (needCalcColumnIndex.length > 0 && !exist) return

    const values = data.map(item => Number(getColumnValue(item, column)))

    if (!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      // sums[index] += ' 元'
    } else {
      sums[index] = ''
    }
  })

  return sums
}
export function getColumnValue(item, column) {
  if (column.property.search('\\.') > -1) {
    const props = column.property.split('.')
    props.some(p => {
      item = item[p]
      if (!item) return true
    })
    return item
  }
  return item[column.property] ? item[column.property] : 0
}
