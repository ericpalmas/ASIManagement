import axios from 'axios'

const state = {
  userData: []
}

const getters = {
  userData: (state) => state.userData
}

const actions = {
  async fetchUserData({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asiuser/5')

    commit('setUserData', response.data)
  }
}

const mutations = {
  setUserData: (state, userData) => (state.userData = userData)
}

export default {
  state,
  getters,
  actions,
  mutations
}
