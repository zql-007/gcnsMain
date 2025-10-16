export const state = () => ({
  userNo: '',
  userName: '',
  token: '',
  role: '',
  userInfo: {
    userId: '',
    userNo: '',
    userName: '',
    phone: '',
    token: '',
    role: '',
    classNo: '',
    className: '',
    workDeptNo: '',
    workDeptName: '',
    factoryNo: '',
    factoryCode: '',
    factoryName: '',
    businessUnitNo: '',
    businessUnitCode: '',
    businessUnitName: '',
    fullName: '',
    area: '',
    areaNo: '',
    equipNo: '',
    equipName: ''
  }
})

export const mutations = {
  setUserNo(state, userNo) {
    state.userNo = userNo
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setToken(state, token) {
    state.token = token
  },
  setRole(state, role) {
    state.role = role
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

export const getters = {
  getUserNo(state) {
    return state.userNo
  },
  getUserName(state) {
    return state.userName
  },
  getToken(state) {
    return state.token
  },
  getUserRole(state) {
    return state.role
  },
  getUserInfo(state) {
    return state.userInfo
  }
}
