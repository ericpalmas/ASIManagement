import axios from 'axios'

const state = {
  modalities: []
}

const getters = {
  modalities: (state) => state.modalities
}

const actions = {
  async fetchModalities({ commit }) {
    const response = await axios.get('http://localhost:8732/api/modality', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    console.log(response)

    commit('setModalities', response.data)
  }
}

const mutations = {
  setModalities: (state, modalities) => (state.modalities = modalities)
}

export default {
  state,
  getters,
  actions,
  mutations
}
