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
  },
  async login({ commit }, user) {
    var AsiUser = {
      AsiUserEmail: 'marco.',
      AsiUserPassword: '123456'
    }
    const response = await axios.post(
      'http://localhost:8732/api/asiuser/login',
      { AsiUser, completed: false }
    )

    commit('login', response.data)
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
