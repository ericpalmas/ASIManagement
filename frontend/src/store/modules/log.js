import axios from 'axios'

const state = {
  logs: []
}

const getters = {
  logs: (state) => state.logs
}

const actions = {
  async fetchLogs({ commit }) {
    const response = await axios.get('http://localhost:8732/api/logs', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setLogs', response.data)
  }
}

const mutations = {
  setLogs: (state, logs) => (state.logs = logs)
}

export default {
  state,
  getters,
  actions,
  mutations
}
