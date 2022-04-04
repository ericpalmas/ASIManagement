import axios from 'axios'

const state = {
  asi: []
}

const getters = {
  allAsiModules: (state) => state.asi
}

const actions = {
  async fetchAsi({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/2')

    commit('setAsi', response.data)
  }
}

const mutations = {
  setAsi: (state, asi) => (state.asi = asi)
}

export default {
  state,
  getters,
  actions,
  mutations
}
