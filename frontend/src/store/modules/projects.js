import axios from 'axios'

const state = {
  projects: []
}

const getters = {
  //asiProjects: (state) => state.projects
  tutorProjects: (state => state.projects)
}

const actions = {
  async fetchTutorProjects({ commit }) {
    const response = await axios.get('http://localhost:8732/api/tutorProjects', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setProjects', response.data)
  }
}

const mutations = {
  setProjects: (state, projects) => (state.projects = projects)
}

export default {
  state,
  getters,
  actions,
  mutations
}
