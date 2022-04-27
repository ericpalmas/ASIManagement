import axios from 'axios'

const state = {
  modules: [],
  ftpModules: [],
  tsmModules: [],
  cmModules: [],
  supplementaryModules: []
}

const getters = {
  allModules: (state) => state.modules,
  allFtpModules: (state) => state.ftpModules,
  allTsmModules: (state) => state.tsmModules,
  allCmModules: (state) => state.cmModules,
  allSupplementaryModules: (state) => state.supplementaryModules
}

const actions = {
  async fetchModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/module', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setModules', response.data)
  },
  async fetchFtpModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/ftp', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setFtpModules', response.data)
  },
  async fetchTsmModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/tsm', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setTsmModules', response.data)
  },
  async fetchCmModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/cm', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setCmModules', response.data)
  },
  async fetchSupplementaryModules({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/supplementaryModules',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setSupplementaryModules', response.data)
  }
}

const mutations = {
  setModules: (state, modules) => (state.modules = modules),
  setFtpModules: (state, ftpModules) => (state.ftpModules = ftpModules),
  setTsmModules: (state, tsmModules) => (state.tsmModules = tsmModules),
  setCmModules: (state, cmModules) => (state.cmModules = cmModules),
  setSupplementaryModules: (state, supplementaryModules) =>
    (state.supplementaryModules = supplementaryModules)
}

export default {
  state,
  getters,
  actions,
  mutations
}
