import axios from 'axios'

const state = {
  profiles: []
}

const getters = {
  profiles: (state) => state.profiles
}

const actions = {
  async fetchProfiles({ commit }) {
    const response = await axios.get('http://localhost:8732/api/profile', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setProfiles', response.data)
  }
}

const mutations = {
  setProfiles: (state, profiles) => (state.profiles = profiles)
}

export default {
  state,
  getters,
  actions,
  mutations
}
