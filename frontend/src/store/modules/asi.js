import axios from 'axios'

const state = {
  asi: [],
  ftpAsiModules: [],
  tsmAsiModules: [],
  cmAsiModules: []
}

const getters = {
  allAsiModules: (state) => state.asi,
  allFtpAsiModules: (state) => state.ftpAsiModules,
  allTsmAsiModules: (state) => state.tsmAsiModules,
  allCmAsiModules: (state) => state.cmAsiModules
}

const actions = {
  async fetchAsi({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/2')

    commit('setAsi', response.data)
  },
  async fetchFtpAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/ftp/2')

    commit('setFtpAsiModules', response.data)
  },
  async fetchTsmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/tsm/2')

    commit('setTsmAsiModules', response.data)
  },
  async fetchCmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/cm/2')

    commit('setCmAsiModules', response.data)
  }
}

const mutations = {
  setAsi: (state, asi) => (state.asi = asi),
  setFtpAsiModules: (state, ftpAsiModules) =>
    (state.ftpAsiModules = ftpAsiModules),
  setTsmAsiModules: (state, tsmAsiModules) =>
    (state.tsmAsiModules = tsmAsiModules),
  setCmAsiModules: (state, cmAsiModules) => (state.cmAsiModules = cmAsiModules)
}

export default {
  state,
  getters,
  actions,
  mutations
}
