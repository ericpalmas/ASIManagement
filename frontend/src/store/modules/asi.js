import axios from 'axios'

const state = {
  asi: [],
  ftpAsiModules: [],
  tsmAsiModules: [],
  cmAsiModules: [],
  asiSupplementaryModules: [],
  asiMasterProject: [],
  asiModuleGroups: []
}

const getters = {
  allAsiModules: (state) => state.asi,
  allFtpAsiModules: (state) => state.ftpAsiModules,
  allTsmAsiModules: (state) => state.tsmAsiModules,
  allCmAsiModules: (state) => state.cmAsiModules,
  allSupplementaryModulesAsiModules: (state) => state.asiSupplementaryModules,
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
  }
  // async updateAsi({ commit }, ftpModules, cmModules, tsmModules) {
  //   console.log(ftpModules)
  //   console.log(cmModules)
  //   console.log(tsmModules)

  //   var asiUpdate = {
  //     idAsi: 10,
  //     ftpModules: [
  //       {
  //         id_module: 36,
  //         code: 'FTP_AppStat',
  //         module_name: 'Applied Statistics and Data Analysis',
  //         module_group_initials: 'FTP',
  //         ects: 3,
  //         semester: 2,
  //         responsible_name: 'Francesca',
  //         responsible_surname: 'Faraci',
  //         site: 'Lugano',
  //         site_initials: 'LU'
  //       },
  //       {
  //         id_module: 38,
  //         code: 'FTP_BioEng',
  //         module_name: 'Biology, physiology and anatomy for engineers',
  //         module_group_initials: 'FTP',
  //         ects: 3,
  //         semester: 3,
  //         responsible_name: 'Igor',
  //         responsible_surname: 'Stefanini',
  //         site: 'Lugano',
  //         site_initials: 'LU'
  //       },
  //       {
  //         id_module: 40,
  //         code: 'FTP_MultiASys',
  //         module_name: 'Multi-agent systems',
  //         module_group_initials: 'FTP',
  //         ects: 3,
  //         semester: 4,
  //         responsible_name: 'Alessandro',
  //         responsible_surname: 'Facchini',
  //         site: 'Lugano',
  //         site_initials: 'LU'
  //       }
  //     ]
  //   }

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
  setAsiMasterProject: (state, asiMasterProject) =>
    (state.asiMasterProject = asiMasterProject),
  setAsiModuleGroups: (state, asiModuleGroups) =>
    (state.asiModuleGroups = asiModuleGroups)

  //newTodo: (state, asi) => state.asi.unshift(asi),
}

export default {
  state,
  getters,
  actions,
  mutations
}
