import axios from 'axios'

const state = {
  asi: [],
  asiState: {},
  asiStudentState: {},
  asiModuleGroups: [],

  ftpAsiModules: [],
  tsmAsiModules: [],
  cmAsiModules: [],

  oldFtpAsiModules: [],
  oldTsmAsiModules: [],
  oldCmAsiModules: [],

  asiSupplementaryModules: [],
  projects: [],
  asiMasterProject: [],

  oldAsiSupplementaryModules: [],
  oldProjects: [],
  oldAsiMasterProject: []
}

const getters = {
  allAsiModules: (state) => state.asi,
  allFtpAsiModules: (state) => state.ftpAsiModules,
  allTsmAsiModules: (state) => state.tsmAsiModules,
  allCmAsiModules: (state) => state.cmAsiModules,

  oldFtpAsiModules: (state) => state.oldFtpAsiModules,
  oldTsmAsiModules: (state) => state.oldTsmAsiModules,
  oldCmAsiModules: (state) => state.oldCmAsiModules,

  allSupplementaryModulesAsiModules: (state) => state.asiSupplementaryModules,
  asiProjects: (state) => state.projects,
  asiMasterProject: (state) => state.asiMasterProject,

  oldAsiSupplementaryModules: (state) => state.oldAsiSupplementaryModules,
  oldProjects: (state) => state.oldProjects,
  oldAsiMasterProject: (state) => state.oldAsiMasterProject,

  asiModuleGroups: (state) => state.asiModuleGroups,
  asiState: (state) => state.asiState,
  asiStudentState: (state) => state.asiStudentState
}

const actions = {
  async removeProfileResponsibleApprovation({ commit }, id) {
    await axios.post(
      'http://localhost:8732/api/asi/removeProfileResponsibleApprovation/' + id,
      {},
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('disableProfileResponsibleApprovation')
  },

  async removeAdvisorApprovation({ commit }, id) {
    await axios.post(
      'http://localhost:8732/api/asi/removeAdvisorApprovation/' + id,
      {},
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('disableAdvisorApprovation')
  },
  async advisorApprovation({ commit }, id) {
    await axios.post(
      'http://localhost:8732/api/asi/advisorApprovation/' + id,
      {},
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('enableAdvisorApprovation')
  },
  async profileResponsibleApprovation({ commit }, id) {
    await axios.post(
      'http://localhost:8732/api/asi/profileResponsibleApprovation/' + id,
      {},
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('enableProfileResponsibleApprovation')
  },
  async fetchAsiState({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/state', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setAsiState', response.data[0])
  },

  async fetchStudentAsiState({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/state/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setAsiStudentState', response.data[0])
  },
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

  async fetchOldFtpAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/ftp', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setOldFtpAsiModules', response.data)
  },
  async fetchOldTsmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/tsm', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setOldTsmAsiModules', response.data)
  },
  async fetchOldCmAsiModules({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/cm', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setOldCmAsiModules', response.data)
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

  async fetchOldAsiSupplementaryModules({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/supplementaryModules',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setOldAsiSupplementaryModules', response.data)
  },
  async fetchOldProjects({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asi/projects', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

    commit('setOldProjects', response.data)
  },
  async fetchOldAsiMasterProject({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/masterProject',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setOldAsiMasterProject', response.data)
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

  async fetchStudentAsiModuleGroups({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asi/moduleGroups/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setAsiModuleGroups', response.data)
  },

  async updateAsi({ commit }, { newModules }) {
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

  async sendLogs(_, { logs }) {
    console.log(logs)
    await axios.post(
      'http://localhost:8732/api/logs',
      {
        logs
      },

      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
  },

  async sendAdvisorLogs(_, { logs }) {
    console.log(logs)
    await axios.post(
      'http://localhost:8732/api/advisorlogs',
      {
        logs
      },

      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
  },

  async sendProfileResponsibleLogs(_, { logs }) {
    console.log(logs)
    await axios.post(
      'http://localhost:8732/api/profileresponsiblelogs',
      {
        logs
      },

      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
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
  setFtpAsiModules: (state, ftpAsiModules) =>
    (state.ftpAsiModules = ftpAsiModules),
  setTsmAsiModules: (state, tsmAsiModules) =>
    (state.tsmAsiModules = tsmAsiModules),
  setCmAsiModules: (state, cmAsiModules) => (state.cmAsiModules = cmAsiModules),

  setOldFtpAsiModules: (state, oldFtpAsiModules) =>
    (state.oldFtpAsiModules = oldFtpAsiModules),
  setOldTsmAsiModules: (state, oldTsmAsiModules) =>
    (state.oldTsmAsiModules = oldTsmAsiModules),
  setOldCmAsiModules: (state, oldCmAsiModules) =>
    (state.oldCmAsiModules = oldCmAsiModules),

  setAsiSupplementaryModules: (state, asiSupplementaryModules) =>
    (state.asiSupplementaryModules = asiSupplementaryModules),
  setProjects: (state, projects) => (state.projects = projects),
  setAsiMasterProject: (state, asiMasterProject) =>
    (state.asiMasterProject = asiMasterProject),

  setOldAsiSupplementaryModules: (state, oldAsiSupplementaryModules) =>
    (state.oldAsiSupplementaryModules = oldAsiSupplementaryModules),
  setOldProjects: (state, oldProjects) => (state.oldProjects = oldProjects),
  setOldAsiMasterProject: (state, oldAsiMasterProject) =>
    (state.oldAsiMasterProject = oldAsiMasterProject),

  setAsiModuleGroups: (state, asiModuleGroups) =>
    (state.asiModuleGroups = asiModuleGroups),

  setAsiState: (state, asiState) => (state.asiState = asiState),
  setAsiStudentState: (state, asiStudentState) =>
    (state.asiStudentState = asiStudentState),

  enableAdvisorApprovation: (state) => {
    state.asiStudentState.advisor_approvation = true
  },
  disableAdvisorApprovation: (state) => {
    state.asiStudentState.advisor_approvation = false
  },

  enableProfileResponsibleApprovation: (state) => {
    state.asiStudentState.profile_responsible_approvation = true
  },
  disableProfileResponsibleApprovation: (state) => {
    state.asiStudentState.profile_responsible_approvation = false
  },

  updateAsi: (state, newModules) => {
    ;(state.ftpAsiModules = JSON.parse(
      JSON.stringify(newModules.allFtpAsiModules)
    )),
      (state.tsmAsiModules = JSON.parse(
        JSON.stringify(newModules.allTsmAsiModules)
      )),
      (state.cmAsiModules = JSON.parse(
        JSON.stringify(newModules.allCmAsiModules)
      )),
      (state.oldFtpAsiModules = JSON.parse(
        JSON.stringify(newModules.allFtpAsiModules)
      )),
      (state.oldTsmAsiModules = JSON.parse(
        JSON.stringify(newModules.allTsmAsiModules)
      )),
      (state.oldCmAsiModules = JSON.parse(
        JSON.stringify(newModules.allCmAsiModules)
      )),
      console.log(state)
  },
  updateTechnicalAsi: (state, newModules) => {
    ;(state.projects = JSON.parse(JSON.stringify(newModules.asiProjects))),
      (state.asiSupplementaryModules = JSON.parse(
        JSON.stringify(newModules.allSupplementaryModulesAsiModules)
      )),
      (state.asiMasterProject = JSON.parse(
        JSON.stringify(newModules.asiMasterProject)
      )),
      (state.oldProjects = JSON.parse(JSON.stringify(newModules.asiProjects))),
      (state.oldAsiSupplementaryModules = JSON.parse(
        JSON.stringify(newModules.allSupplementaryModulesAsiModules)
      )),
      (state.oldAsiMasterProject = JSON.parse(
        JSON.stringify(newModules.asiMasterProject)
      )),
      console.log(state)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
