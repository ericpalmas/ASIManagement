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

  //   async addTodo({ commit }, title) {
  //     const response = await axios.post(
  //       'https://jsonplaceholder.typicode.com/todos',
  //       { title, completed: false }
  //     )

  //     commit('newTodo', response.data)
  //   },
  //   async deleteTodo({ commit }, id) {
  //     await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

  //     commit('removeTodo', id)
  //   },
  //   async filterTodos({ commit }, e) {
  //     // Get selected number
  //     const limit = parseInt(
  //       e.target.options[e.target.options.selectedIndex].innerText
  //     )

  //     const response = await axios.get(
  //       `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
  //     )

  //     commit('setTodos', response.data)
  //   },
  //   async updateTodo({ commit }, updTodo) {
  //     const response = await axios.put(
  //       `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
  //       updTodo
  //     )

  //     commit('updateTodo', response.data)
  //   },
}

const mutations = {
  setModules: (state, modules) => (state.modules = modules),
  setFtpModules: (state, ftpModules) => (state.ftpModules = ftpModules),
  setTsmModules: (state, tsmModules) => (state.tsmModules = tsmModules),
  setCmModules: (state, cmModules) => (state.cmModules = cmModules),
  setSupplementaryModules: (state, supplementaryModules) =>
    (state.supplementaryModules = supplementaryModules)

  //   newTodo: (state, todo) => state.todos.unshift(todo),
  //   removeTodo: (state, id) =>
  //     (state.todos = state.todos.filter((todo) => todo.id !== id)),
  //   updateTodo: (state, updTodo) => {
  //     const index = state.todos.findIndex((todo) => todo.id === updTodo.id)
  //     if (index !== -1) {
  //       state.todos.splice(index, 1, updTodo)
  //     }
  //   },
}

export default {
  state,
  getters,
  actions,
  mutations
}
