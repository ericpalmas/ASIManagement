import axios from 'axios'

const state = {
  asi: [],
  ftpAsiModules: [],
  tsmAsiModules: [],
  cmAsiModules: [],
  asiSupplementaryModules: [],
  asiMasterProject: []
}

const getters = {
  allAsiModules: (state) => state.asi,
  allFtpAsiModules: (state) => state.ftpAsiModules,
  allTsmAsiModules: (state) => state.tsmAsiModules,
  allCmAsiModules: (state) => state.cmAsiModules,
  allSupplementaryModulesAsiModules: (state) => state.asiSupplementaryModules,
  asiMasterProject: (state) => state.asiMasterProject
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
  },
  async fetchAsiSupplementaryModules({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/supplementaryModules/2'
    )
    commit('setAsiSupplementaryModules', response.data)
  },
  async fetchAsiMasterProject({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/masterProject/2'
    )
    commit('setAsiMasterProject', response.data)
  },

  async updateAsi({ commit }, ftpModules, cmModules, tsmModules) {
    console.log(ftpModules)
    console.log(cmModules)
    console.log(tsmModules)
    //delete old modules
    // const response = await axios.delete(
    //   'http://localhost:8732/api/asi'
    // )

    //commit('newAsi', response.data)
  }
}

const mutations = {
  setAsi: (state, asi) => (state.asi = asi),
  setFtpAsiModules: (state, ftpAsiModules) =>
    (state.ftpAsiModules = ftpAsiModules),
  setTsmAsiModules: (state, tsmAsiModules) =>
    (state.tsmAsiModules = tsmAsiModules),
  setCmAsiModules: (state, cmAsiModules) => (state.cmAsiModules = cmAsiModules),
  setAsiSupplementaryModules: (state, asiSupplementaryModules) =>
    (state.asiSupplementaryModules = asiSupplementaryModules),
  setAsiMasterProject: (state, asiMasterProject) =>
    (state.asiMasterProject = asiMasterProject)
  //newTodo: (state, asi) => state.asi.unshift(asi),
}

export default {
  state,
  getters,
  actions,
  mutations
}
