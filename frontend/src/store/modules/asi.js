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
  // get module of a student
  async fetchProjectsAsiStudentModules({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/projects/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setProjects', response.data)
  },
  async fetchSupplementaryModulesAsiStudentModules({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/supplementaryModules/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setAsiSupplementaryModules', response.data)
  },
  async fetchMasterProjectAsiStudentModules({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/masterProject/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setAsiMasterProject', response.data)
  },
  async fetchFtpAsiStudentModules({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/ftp/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setFtpAsiModules', response.data)
  },
  async fetchTsmAsiStudentModules({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/tsm/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setTsmAsiModules', response.data)
  },
  async fetchCmAsiStudentModules({ commit }, id) {
    const response = await axios.get('http://localhost:8732/api/asi/cm/' + id, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setCmAsiModules', response.data)
  },

  async fetchFtpAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/ftp', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setFtpAsiModules', response.data)
  },
  async fetchTsmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/tsm', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setTsmAsiModules', response.data)
  },
  async fetchCmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/cm', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setCmAsiModules', response.data)
  },
  async fetchAsiSupplementaryModules({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/supplementaryModules',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setAsiSupplementaryModules', response.data)
  },
  async fetchProjects({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/projects', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setProjects', response.data)
  },
  async fetchAsiMasterProject({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/masterProject',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setAsiMasterProject', response.data)
  },

  async fetchAsiModuleGroups({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/moduleGroups',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setAsiModuleGroups', response.data)
  },

  async updateAsi({ commit }, { newModules }) {
    console.log(newModules)
    await axios.post(
      'http://localhost:8732/api/asi',
      {
        moduleGroups: newModules.asiModuleGroups,
        ftpAsiModules: newModules.allFtpAsiModules,
        cmAsiModules: newModules.allCmAsiModules,
        tsmAsiModules: newModules.allTsmAsiModules
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('updateAsi', newModules)
  },

  async updateTechnicalAsi({ commit }, { newModules }) {
    console.log(newModules)
    await axios.post(
      'http://localhost:8732/api/asiTechicalModules',
      {
        moduleGroups: newModules.asiModuleGroups,
        projectAsiModules: newModules.asiProjects,
        supplementaryAsiModules: newModules.allSupplementaryModulesAsiModules,
        masterAsiModules: newModules.asiMasterProject
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('updateTechnicalAsi', newModules)
  }
}

const mutations = {
  //setAsi: (state, asi) => (state.asi = asi),
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
