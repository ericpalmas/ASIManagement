import { createStore } from 'vuex'
import modules from './modules/modules'
import asi from './modules/asi'
import projects from './modules/projects'
import user from './modules/user'
import calendarModule from './modules/calendarModule'
import modality from './modules/modality'
import profile from './modules/profile'
import logs from './modules/log'

export default createStore({
  modules: {
    modules,
    asi,
    projects,
    user,
    calendarModule,
    profile,
    modality,
    logs
  }
})
