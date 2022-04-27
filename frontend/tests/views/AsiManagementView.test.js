/**
 * @jest-environment jsdom
 */

import Vuex from 'vuex'
import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import AsiManagementView from '../../src/views/AsiManagementView.vue'

import user from '../../src/store/modules/user'

const store = new Vuex.Store({
  state: {
    ftpModules: [],
    tsmModules: [],
    cmModules: [],
    ftpAsiModules: [],
    tsmAsiModules: [],
    cmAsiModules: [],
    asiModuleGroups: []
  },
  getters: {
    allFtpAsiModules: (state) => state.ftpAsiModules,
    allTsmAsiModules: (state) => state.tsmAsiModules,
    allCmAsiModules: (state) => state.cmAsiModules,
    allFtpModules: (state) => state.ftpModules,
    allTsmModules: (state) => state.tsmModules,
    allCmModules: (state) => state.cmModules,
    asiModuleGroups: (state) => state.asiModuleGroups
  },
  actions: {
    async fetchAsiModuleGroups({ commit }, { username, password }) {
      const response = [
        {
          id_asi_module_group: 1,
          asi: 10,
          module_group: 1,
          name: 'Marco',
          surname: 'Rossi',
          id_asi_user: 2
        },
        {
          id_asi_module_group: 2,
          asi: 10,
          module_group: 2,
          name: 'Marco',
          surname: 'Rossi',
          id_asi_user: 2
        },
        {
          id_asi_module_group: 3,
          asi: 10,
          module_group: 3,
          name: 'Marco',
          surname: 'Rossi',
          id_asi_user: 2
        },
        {
          id_asi_module_group: 4,
          asi: 10,
          module_group: 4,
          name: 'Marco',
          surname: 'Rossi',
          id_asi_user: 2
        },
        {
          id_asi_module_group: 5,
          asi: 10,
          module_group: 6,
          name: 'Marco',
          surname: 'Rossi',
          id_asi_user: 2
        },
        {
          id_asi_module_group: 6,
          asi: 10,
          module_group: 5,
          name: 'Marco',
          surname: 'Rossi',
          id_asi_user: 2
        }
      ]

      commit('setAsiModuleGroups', response)
    },
    async fetchFtpAsiModules({ commit }) {
      const response = [
        {
          id_asi_module: 200,
          asi_module_group: 1,
          asi_module_state: 1,
          id_module: 36,
          code: 'FTP_AppStat',
          module_name: 'Applied Statistics and Data Analysis',
          module_group_initials: 'FTP',
          module_group_id: 1,
          ects: 3,
          semester: 2,
          responsible_name: 'Francesca',
          responsible_surname: 'Faraci',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 201,
          asi_module_group: 1,
          asi_module_state: 1,
          id_module: 38,
          code: 'FTP_BioEng',
          module_name: 'Biology, physiology and anatomy for engineers',
          module_group_initials: 'FTP',
          module_group_id: 1,
          ects: 3,
          semester: 3,
          responsible_name: 'Igor',
          responsible_surname: 'Stefanini',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 202,
          asi_module_group: 1,
          asi_module_state: 1,
          id_module: 40,
          code: 'FTP_MultiASys',
          module_name: 'Multi-agent systems',
          module_group_initials: 'FTP',
          module_group_id: 1,
          ects: 3,
          semester: 4,
          responsible_name: 'Alessandro',
          responsible_surname: 'Facchini',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setFtpAsiModules', response)
    },
    async fetchTsmAsiModules({ commit }) {
      const response = [
        {
          id_asi_module: 203,
          asi_module_group: 2,
          asi_module_state: 1,
          id_module: 3,
          code: 'TSM_AdvDataMgmt',
          module_name:
            'Advanced Data Management – non standard database systems',
          module_group_initials: 'TSM',
          module_group_id: 2,
          ects: 3,
          semester: 3,
          responsible_name: 'Roberto',
          responsible_surname: 'Mastropietro',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 204,
          asi_module_group: 2,
          asi_module_state: 1,
          id_module: 1,
          code: 'TSM_AdvCompG',
          module_name: 'Advanced computer graphics',
          module_group_initials: 'TSM',
          module_group_id: 2,
          ects: 3,
          semester: 2,
          responsible_name: 'Achille',
          responsible_surname: 'Peternier',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 205,
          asi_module_group: 2,
          asi_module_state: 1,
          id_module: 1,
          code: 'TSM_AdvCompG',
          module_name: 'Advanced computer graphics',
          module_group_initials: 'TSM',
          module_group_id: 2,
          ects: 3,
          semester: 1,
          responsible_name: 'Achille',
          responsible_surname: 'Peternier',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 206,
          asi_module_group: 2,
          asi_module_state: 1,
          id_module: 1,
          code: 'TSM_AdvCompG',
          module_name: 'Advanced computer graphics',
          module_group_initials: 'TSM',
          module_group_id: 2,
          ects: 3,
          semester: 1,
          responsible_name: 'Achille',
          responsible_surname: 'Peternier',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setTsmAsiModules', response)
    },
    async fetchCmAsiModules({ commit }) {
      const response = [
        {
          id_asi_module: 207,
          asi_module_group: 3,
          asi_module_state: 1,
          id_module: 42,
          code: 'CM_AdvProjMgmt',
          module_name: 'Advanced Project Management',
          module_group_initials: 'CM',
          module_group_id: 3,
          ects: 3,
          semester: 2,
          responsible_name: 'Antonio',
          responsible_surname: 'Bassi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 208,
          asi_module_group: 3,
          asi_module_state: 1,
          id_module: 44,
          code: 'CM_IntSust',
          module_name:
            'Integrated Sustainable Management of production systems',
          module_group_initials: 'CM',
          module_group_id: 3,
          ects: 3,
          semester: 1,
          responsible_name: 'Alessandro',
          responsible_surname: 'Fontana',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 209,
          asi_module_group: 3,
          asi_module_state: 1,
          id_module: 42,
          code: 'CM_AdvProjMgmt',
          module_name: 'Advanced Project Management',
          module_group_initials: 'CM',
          module_group_id: 3,
          ects: 3,
          semester: 1,
          responsible_name: 'Antonio',
          responsible_surname: 'Bassi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 210,
          asi_module_group: 3,
          asi_module_state: 1,
          id_module: 42,
          code: 'CM_AdvProjMgmt',
          module_name: 'Advanced Project Management',
          module_group_initials: 'CM',
          module_group_id: 3,
          ects: 3,
          semester: 1,
          responsible_name: 'Antonio',
          responsible_surname: 'Bassi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 211,
          asi_module_group: 3,
          asi_module_state: 1,
          id_module: 42,
          code: 'CM_AdvProjMgmt',
          module_name: 'Advanced Project Management',
          module_group_initials: 'CM',
          module_group_id: 3,
          ects: 3,
          semester: 1,
          responsible_name: 'Antonio',
          responsible_surname: 'Bassi',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setCmAsiModules', response)
    },
    // async updateAsi({ commit }, { newModules }) {
    //   await axios.post(
    //     'http://localhost:8732/api/asi',
    //     {
    //       moduleGroups: newModules.asiModuleGroups,
    //       ftpAsiModules: newModules.allFtpAsiModules,
    //       cmAsiModules: newModules.allCmAsiModules,
    //       tsmAsiModules: newModules.allTsmAsiModules
    //     },
    //     {
    //       headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    //     }
    //   )
    //   commit('updateAsi', newModules)
    // },

    async fetchFtpModules({ commit }) {
      const response = [
        {
          id_module: 35,
          code: 'FTP_AdvAlgDS',
          module_name: 'Advanced Algorithms and Data Structures',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Fabrizio',
          responsible_surname: 'Grandoni',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 36,
          code: 'FTP_AppStat',
          module_name: 'Applied Statistics and Data Analysis',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Francesca',
          responsible_surname: 'Faraci',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 37,
          code: 'FTP_ApprAlg',
          module_name: 'Approximation Algorithms',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Fabrizio',
          responsible_surname: 'Grandoni',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 38,
          code: 'FTP_BioEng',
          module_name: 'Biology, physiology and anatomy for engineers',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Igor',
          responsible_surname: 'Stefanini',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 39,
          code: 'FTP_ModSim',
          module_name: 'Modeling, Simulation and Optimization',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Andrea',
          responsible_surname: 'Rizzoli',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 40,
          code: 'FTP_MultiASys',
          module_name: 'Multi-agent systems',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Alessandro',
          responsible_surname: 'Facchini',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 41,
          code: 'FTP_OrdDiff',
          module_name: 'Ordinary Differential Equations and Dynamical Systems',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Oliver',
          responsible_surname: 'Villa',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setFtpModules', response)
    },
    async fetchTsmModules({ commit }) {
      const response = [
        {
          id_module: 35,
          code: 'FTP_AdvAlgDS',
          module_name: 'Advanced Algorithms and Data Structures',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Fabrizio',
          responsible_surname: 'Grandoni',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 36,
          code: 'FTP_AppStat',
          module_name: 'Applied Statistics and Data Analysis',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Francesca',
          responsible_surname: 'Faraci',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 37,
          code: 'FTP_ApprAlg',
          module_name: 'Approximation Algorithms',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Fabrizio',
          responsible_surname: 'Grandoni',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 38,
          code: 'FTP_BioEng',
          module_name: 'Biology, physiology and anatomy for engineers',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Igor',
          responsible_surname: 'Stefanini',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 39,
          code: 'FTP_ModSim',
          module_name: 'Modeling, Simulation and Optimization',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Andrea',
          responsible_surname: 'Rizzoli',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 40,
          code: 'FTP_MultiASys',
          module_name: 'Multi-agent systems',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Alessandro',
          responsible_surname: 'Facchini',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 41,
          code: 'FTP_OrdDiff',
          module_name: 'Ordinary Differential Equations and Dynamical Systems',
          module_group_initials: 'FTP',
          ects: 3,
          responsible_name: 'Oliver',
          responsible_surname: 'Villa',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setTsmModules', response)
    },
    async fetchCmModules({ commit }) {
      const response = [
        {
          id_module: 42,
          code: 'CM_AdvProjMgmt',
          module_name: 'Advanced Project Management',
          module_group_initials: 'CM',
          ects: 3,
          responsible_name: 'Antonio',
          responsible_surname: 'Bassi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 43,
          code: 'CM_InnoLEAN',
          module_name: 'Innovation and Lean',
          module_group_initials: 'CM',
          ects: 3,
          responsible_name: 'Paolo',
          responsible_surname: 'Pedrazzoli',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 44,
          code: 'CM_IntSust',
          module_name:
            'Integrated Sustainable Management of production systems',
          module_group_initials: 'CM',
          ects: 3,
          responsible_name: 'Alessandro',
          responsible_surname: 'Fontana',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 45,
          code: 'CM_QRM',
          module_name: 'Quality and Risk Management',
          module_group_initials: 'CM',
          ects: 3,
          responsible_name: 'Donatella',
          responsible_surname: 'Corti',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setCmModules', response)
    }
  },
  mutations: {
    setFtpModules: (state, ftpModules) => (state.ftpModules = ftpModules),
    setTsmModules: (state, tsmModules) => (state.tsmModules = tsmModules),
    setCmModules: (state, cmModules) => (state.cmModules = cmModules),
    setFtpAsiModules: (state, ftpAsiModules) =>
      (state.ftpAsiModules = ftpAsiModules),
    setTsmAsiModules: (state, tsmAsiModules) =>
      (state.tsmAsiModules = tsmAsiModules),
    setCmAsiModules: (state, cmAsiModules) =>
      (state.cmAsiModules = cmAsiModules),
    updateAsi: (state, newModules) => {
      ;(state.ftpAsiModules = newModules.allFtpAsiModules),
        (state.cmAsiModules = newModules.allCmAsiModules),
        (state.tsmAsiModules = newModules.allTsmAsiModules)
    },
    setAsiModuleGroups: (state, asiModuleGroups) =>
      (state.asiModuleGroups = asiModuleGroups)
  }
})

const wrapper = shallowMount(AsiManagementView, {
  global: {
    Plugin: [Vuex],
    mocks: {
      $store: store
    }
  }
})

describe('Asi management view  ', () => {
  test('test add ftp modules', async () => {
    const button = wrapper.find('#addFtpButton')
    const ftpAsiModules = wrapper.componentVM.allFtpAsiModules

    expect(ftpAsiModules.length).toBe(3)

    await button.trigger('click')

    expect(ftpAsiModules.length).toBe(4)
  })

  test('test add tsm modules', async () => {
    const button = wrapper.find('#addTsmButton')
    const tsmAsiModules = wrapper.componentVM.allTsmAsiModules

    expect(tsmAsiModules.length).toBe(4)

    await button.trigger('click')

    expect(tsmAsiModules.length).toBe(5)
  })

  test('test add cm modules', async () => {
    const button = wrapper.find('#addCmButton')
    const cmAsiModules = wrapper.componentVM.allCmAsiModules

    expect(cmAsiModules.length).toBe(5)

    await button.trigger('click')

    expect(cmAsiModules.length).toBe(6)
  })
})
