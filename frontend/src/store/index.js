import { createStore } from 'vuex'
import modules from './modules/modules'
import asi from './modules/asi'
import projects from './modules/projects'

export default createStore({
  modules: {
    modules,
    asi,
    projects
  }
})
