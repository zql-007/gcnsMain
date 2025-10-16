export const state = () => ({
  alarmDealDialogVisible: false,
  realTimeParamDialogVisible: false,
  hiddenDetailDialogVisible: false,
  pointList: []
})

export const mutations = {
  setAlarmDealDialogVisible(state, visible) {
    state.alarmDealDialogVisible = visible
  },
  setRealTimeParamDialogVisible(state, visible) {
    state.realTimeParamDialogVisible = visible
  },
  setHiddenDetailDialogVisible(state, visible) {
    state.hiddenDetailDialogVisible = visible
  },
  setPointList(state, list) {
    state.pointList = list
  }
}

export const getters = {
  getAlarmDealDialogVisible(state) {
    return state.alarmDealDialogVisible
  },
  getRealTimeParamDialogVisible(state) {
    return state.realTimeParamDialogVisible
  },
  getHiddenDetailDialogVisible(state) {
    return state.hiddenDetailDialogVisible
  },
  getPointList(state) {
    return state.pointList
  }
}
