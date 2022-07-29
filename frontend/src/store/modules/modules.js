import axios from 'axios'

const state = {
  modules: [],
  ftpModules: [],
  tsmModules: [],
  cmModules: [],
  supplementaryModules: [],
  moduleGroups: [],
  moduleProfiles: [],
  sites: []
}

const getters = {
  allModules: (state) => state.modules,
  allFtpModules: (state) => state.ftpModules,
  allTsmModules: (state) => state.tsmModules,
  allCmModules: (state) => state.cmModules,
  allSupplementaryModules: (state) => state.supplementaryModules,
  moduleGroups: (state) => state.moduleGroups,
  moduleProfiles: (state) => state.moduleProfiles,
  sites: (state) => state.sites,
}

const actions = {


  async removeModule({ commit }, { id }) {
    await axios.delete('http://localhost:8732/api/module/' + id, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setRemoveModule', id)
  },
  async registerModule(_, { code, name, description, ects, site, responsible, moduleProfile, moduleGroup , moduleCalendar }) {
    console.log(code, name, description, ects, site, responsible, moduleProfile, moduleGroup , moduleCalendar)
  
    await axios.post(
        'http://localhost:8732/api/module',
        {
          code: code,
          name: name,
          description: description,
          ects: ects,
          site: site,
          responsible: responsible,
          module_profile: moduleProfile,
          module_group: moduleGroup,
          moduleCalendar: moduleCalendar
        },{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

  },

  async fetchModuleProfiles({ commit }) {
    const response = await axios.get('http://localhost:8732/api/moduleProfiles', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setModuleProfiles', response.data)
  },
  async fetchSites({ commit }) {
    const response = await axios.get('http://localhost:8732/api/sites', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setSites', response.data)
  },
  async fetchModuleGroups({ commit }) {
    const response = await axios.get('http://localhost:8732/api/moduleGroups', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setModuleGroups', response.data)
  },
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
}

const mutations = {
  setModules: (state, modules) => (state.modules = modules),
  setFtpModules: (state, ftpModules) => (state.ftpModules = ftpModules),
  setTsmModules: (state, tsmModules) => (state.tsmModules = tsmModules),
  setCmModules: (state, cmModules) => (state.cmModules = cmModules),
  setSupplementaryModules: (state, supplementaryModules) =>
    (state.supplementaryModules = supplementaryModules),
  setModuleGroups: (state, moduleGroups) => (state.moduleGroups = moduleGroups),
  setModuleProfiles: (state, moduleProfiles) => (state.moduleProfiles = moduleProfiles),
  setSites: (state, sites) => (state.sites = sites),
  setRemoveModule: (state, id) => (state.modules = state.modules.filter((module) => module.id_module !== id)),
}

export default {
  state,
  getters,
  actions,
  mutations
}
