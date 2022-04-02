import { createStore } from 'vuex'
import modules from './modules/modules'

export default createStore({
  state: {
    counter: 10
  },
  getters: {
    times2(state) {
      return state.counter * 2
    }
  },
  mutations: {
    setCounter(state, value) {
      state.counter = value
    }
  },
  actions: {},
  modules: {
    modules
  }
})
