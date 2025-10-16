export const state = () => ({
  factoryList: [],
  newFactoryList: [],
  factoryListHeader: []
})

export const mutations = {
  setFactoryList(state, factoryList) {
    state.factoryList = factoryList
  },
  setNewFactoryList(state, factoryList) {
    state.newFactoryList = factoryList
  },
  setFactoryListHeader(state, factoryListHeader) {
    state.factoryListHeader = factoryListHeader
  }
}

export const getters = {
  getFactoryList(state) {
    return state.factoryList
  },
  getNewFactoryList(state) {
    return state.newFactoryList
  },
  getFactoryListHeader(state) {
    return state.factoryListHeader
  }
}
