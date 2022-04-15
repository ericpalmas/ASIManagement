import axios from 'axios'

const state = {
  asi: [],
  ftpAsiModules: [],
  tsmAsiModules: [],
  cmAsiModules: [],
  asiSupplementaryModules: [],
  projects: [],
  asiMasterProject: [],
  asiModuleGroups: []
}

const getters = {
  allAsiModules: (state) => state.asi,
  allFtpAsiModules: (state) => state.ftpAsiModules,
  allTsmAsiModules: (state) => state.tsmAsiModules,
  allCmAsiModules: (state) => state.cmAsiModules,
  allSupplementaryModulesAsiModules: (state) => state.asiSupplementaryModules,
  asiProjects: (state) => state.projects,
  asiMasterProject: (state) => state.asiMasterProject,
  asiModuleGroups: (state) => state.asiModuleGroups
}

const actions = {
  async fetchAsi({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/2')

    commit('setAsi', response.data)
  },
  async fetchFtpAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/ftp/2')

    commit('setFtpAsiModules', response.data)
  },
  async fetchTsmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/tsm/2')

    commit('setTsmAsiModules', response.data)
  },
  async fetchCmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/cm/2')

    commit('setCmAsiModules', response.data)
  },
  async fetchAsiSupplementaryModules({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/supplementaryModules/2'
    )
    commit('setAsiSupplementaryModules', response.data)
  },
  async fetchProjects({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/projects/2')

    commit('setProjects', response.data)
  },
  async fetchAsiMasterProject({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/masterProject/2'
    )
    commit('setAsiMasterProject', response.data)
  },
  async fetchAsiModuleGroups({ commit }, { username, password }) {
    console.log('ora va')
    console.log(username)
    console.log(password)

    const response = await axios.post(
      'http://localhost:8732/api/asi/moduleGroups',
      {
        AsiUserEmail: username,
        AsiUserPassword: password
      }
    )

    commit('setAsiModuleGroups', response.data)
  },

  async updateAsi({ commit }, { newModules }) {
    await axios.post('http://localhost:8732/api/asi', {
      moduleGroups: newModules.asiModuleGroups,
      ftpAsiModules: newModules.allFtpAsiModules,
      cmAsiModules: newModules.allCmAsiModules,
      tsmAsiModules: newModules.allTsmAsiModules
    })
    commit('updateAsi', newModules)
  },

  async updateTechnicalAsi({ commit }, { newModules }) {
    console.log(newModules)
    await axios.post('http://localhost:8732/api/asiTechicalModules', {
      moduleGroups: newModules.asiModuleGroups,
      projectAsiModules: newModules.asiProjects,
      supplementaryAsiModules: newModules.allSupplementaryModulesAsiModules,
      masterAsiModules: newModules.asiMasterProject
    })
    commit('updateTechnicalAsi', newModules)
  }

  // async updateTechnicalModules({ commit }, { newModules }) {
  //   await axios.post('http://localhost:8732/api/asi', {
  //     moduleGroups: newModules.asiModuleGroups,
  //     ftpAsiModules: newModules.allFtpAsiModules,
  //     cmAsiModules: newModules.allCmAsiModules,
  //     tsmAsiModules: newModules.allTsmAsiModules
  //   })
  //   commit('updateAsi', newModules)
  // }
}

const mutations = {
  setAsi: (state, asi) => (state.asi = asi),
  setFtpAsiModules: (state, ftpAsiModules) =>
    (state.ftpAsiModules = ftpAsiModules),
  setTsmAsiModules: (state, tsmAsiModules) =>
    (state.tsmAsiModules = tsmAsiModules),
  setCmAsiModules: (state, cmAsiModules) => (state.cmAsiModules = cmAsiModules),
  setAsiSupplementaryModules: (state, asiSupplementaryModules) =>
    (state.asiSupplementaryModules = asiSupplementaryModules),
  setProjects: (state, projects) => (state.projects = projects),
  setAsiMasterProject: (state, asiMasterProject) =>
    (state.asiMasterProject = asiMasterProject),
  setAsiModuleGroups: (state, asiModuleGroups) =>
    (state.asiModuleGroups = asiModuleGroups),

  updateAsi: (state, newModules) => {
    ;(state.ftpAsiModules = newModules.allFtpAsiModules),
      (state.cmAsiModules = newModules.allCmAsiModules),
      (state.tsmAsiModules = newModules.allTsmAsiModules)
  },
  updateTechnicalAsi: (state, newModules) => {
    ;(state.projects = newModules.asiProjects),
      (state.asiSupplementaryModules =
        newModules.allSupplementaryModulesAsiModules),
      (state.asiMasterProject = newModules.asiMasterProject)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
