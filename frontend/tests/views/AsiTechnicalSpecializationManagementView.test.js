/**
 * @jest-environment jsdom
 */

import Vuex from 'vuex'
import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import AsiTechnicalSpecializationManagementView from '../../src/views/AsiTechnicalSpecializationManagementView.vue'

import user from '../../src/store/modules/user'

const store = new Vuex.Store({
  state: {
    asiSupplementaryModules: [],
    projects: [],
    asiMasterProject: [],
    asiModuleGroups: [],
    supplementaryModules: []
  },
  getters: {
    allSupplementaryModulesAsiModules: (state) => state.asiSupplementaryModules,
    asiProjects: (state) => state.projects,
    asiMasterProject: (state) => state.asiMasterProject,
    asiModuleGroups: (state) => state.asiModuleGroups,
    allSupplementaryModules: (state) => state.supplementaryModules
  },
  actions: {
    async fetchAsiSupplementaryModules({ commit }) {
      const response = [
        {
          id_asi_module: 309,
          asi_module_group: 6,
          asi_module_state: 1,
          id_module: 12,
          code: 'MC_MobSys',
          module_name: 'Supplementary course - Mobile Systems and Applications',
          module_group_initials: 'Supplementary module',
          module_group_id: 5,
          ects: 3,
          semester: 3,
          responsible_name: 'Silvia',
          responsible_surname: 'Giordano',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 310,
          asi_module_group: 6,
          asi_module_state: 1,
          id_module: 16,
          code: 'MP_DCAPVE',
          module_name:
            'Project - Design and configuration of automated production systems using Virtual Environments',
          module_group_initials: 'Supplementary module',
          module_group_id: 5,
          ects: 9,
          semester: 1,
          responsible_name: 'Diego',
          responsible_surname: 'Rovere',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_asi_module: 311,
          asi_module_group: 6,
          asi_module_state: 1,
          id_module: 26,
          code: 'MS_DBM',
          module_name: 'Seminar - Dynamic Behavior of Materials',
          module_group_initials: 'Supplementary module',
          module_group_id: 5,
          ects: 4,
          semester: 1,
          responsible_name: 'Ezio',
          responsible_surname: 'Cadoni',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]
      commit('setAsiSupplementaryModules', response)
    },
    async fetchProjects({ commit }) {
      const response = [
        {
          id_module: 47,
          code: 'MP9_0001',
          module_name:
            'Telemedicine platform for remote monitoring applications ',
          module_group_initials: 'Project',
          ects: 12,
          semester: 3,
          responsible_name: 'Alessandro',
          responsible_surname: 'Puiatti',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 48,
          code: 'MP15_0001',
          module_name: 'Asi management',
          module_group_initials: 'Project',
          ects: 15,
          semester: 4,
          responsible_name: 'Andrea',
          responsible_surname: 'Baldassari',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setProjects', response)
    },
    async fetchAsiMasterProject({ commit }) {
      const response = [
        {
          id_asi_module: 312,
          asi_module_group: 5,
          asi_module_state: 1,
          id_module: 65,
          code: 'r',
          module_name: 'tett',
          module_group_initials: 'Master thesis',
          module_group_id: 6,
          ects: 30,
          semester: 1,
          responsible_name: null,
          responsible_surname: null,
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setAsiMasterProject', response)
    },

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

    // async updateTechnicalAsi({ commit }, { newModules }) {
    //   console.log(newModules)
    //   await axios.post(
    //     'http://localhost:8732/api/asiTechicalModules',
    //     {
    //       moduleGroups: newModules.asiModuleGroups,
    //       projectAsiModules: newModules.asiProjects,
    //       supplementaryAsiModules: newModules.allSupplementaryModulesAsiModules,
    //       masterAsiModules: newModules.asiMasterProject
    //     },
    //     {
    //       headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    //     }
    //   )
    //   commit('updateTechnicalAsi', newModules)
    // },

    async fetchSupplementaryModules({ commit }) {
      const response = [
        {
          id_module: 12,
          code: 'MC_MobSys',
          module_name: 'Supplementary course - Mobile Systems and Applications',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Silvia',
          responsible_surname: 'Giordano',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 13,
          code: 'MC_URDM',
          module_name:
            'Supplementary course - Uncertain Reasoning and Data Mining',
          module_group_initials: 'Supplementary module',
          ects: 6,
          responsible_name: 'Marco',
          responsible_surname: 'Scutari',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 14,
          code: 'ML_MWWTP',
          module_name: 'Laboratory - Monitoring of WWTP process efficency',
          module_group_initials: 'Supplementary module',
          ects: 4,
          responsible_name: 'Roger',
          responsible_surname: 'Könin',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 15,
          code: 'MP_CAE',
          module_name: 'Project - Computer Aided Engineering',
          module_group_initials: 'Supplementary module',
          ects: 9,
          responsible_name: 'Luca',
          responsible_surname: 'Diviani',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 16,
          code: 'MP_DCAPVE',
          module_name:
            'Project - Design and configuration of automated production systems using Virtual Environments',
          module_group_initials: 'Supplementary module',
          ects: 9,
          responsible_name: 'Diego',
          responsible_surname: 'Rovere',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 17,
          code: 'MP_DMMIP',
          module_name:
            'Project - Design, monitoring and management of industrial plants',
          module_group_initials: 'Supplementary module',
          ects: 9,
          responsible_name: 'Claudio',
          responsible_surname: 'Rolandi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 18,
          code: 'MP_EnvBio',
          module_name: 'Project - Environmental Biotechnologies',
          module_group_initials: 'Supplementary module',
          ects: 9,
          responsible_name: 'Pamela',
          responsible_surname: 'Principi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 19,
          code: 'MP_FAC',
          module_name: 'Project - Fundamentals of Applied Chemistry',
          module_group_initials: 'Supplementary module',
          ects: 4,
          responsible_name: 'Andrea',
          responsible_surname: 'Castrovinci',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 20,
          code: 'MP_PilPro',
          module_name: 'Project - Piloting Process',
          module_group_initials: 'Supplementary module',
          ects: 9,
          responsible_name: 'Roger',
          responsible_surname: 'Könin',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 21,
          code: 'MS_AdvCer',
          module_name: 'Seminar - Advanced Ceramics',
          module_group_initials: 'Supplementary module',
          ects: 4,
          responsible_name: 'Alberto',
          responsible_surname: 'Ortona',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 22,
          code: 'MS_EngInRo*',
          module_name:
            'Seminar - Engineering of Industrial Robots (ex Advanced Robotics)',
          module_group_initials: 'Supplementary module',
          ects: 6,
          responsible_name: 'Anna',
          responsible_surname: 'Valente',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 23,
          code: 'MS_BioMat',
          module_name: 'Seminar - Biomaterials',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Giuseppe',
          responsible_surname: 'Perale',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 24,
          code: 'MS_China',
          module_name:
            'Seminar - Engineering practice within Chinese and Swiss culture',
          module_group_initials: 'Supplementary module',
          ects: 6,
          responsible_name: 'Luca',
          responsible_surname: 'Canetta',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 25,
          code: 'MS_CWWT',
          module_name:
            'Seminar - Design and calculation of a module wastewater treatment plant',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Roger',
          responsible_surname: 'Könin',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 26,
          code: 'MS_DBM',
          module_name: 'Seminar - Dynamic Behavior of Materials',
          module_group_initials: 'Supplementary module',
          ects: 4,
          responsible_name: 'Ezio',
          responsible_surname: 'Cadoni',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 27,
          code: 'MS_DMFPF',
          module_name:
            'Seminar - Design and management of facilities for pharmaceutical and food',
          module_group_initials: 'Supplementary module',
          ects: 6,
          responsible_name: 'Claudio',
          responsible_surname: 'Rolandi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 28,
          code: 'MS_EneBio',
          module_name: 'Seminar - Energy from biomasses',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Pamela',
          responsible_surname: 'Principi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 29,
          code: 'MS_EnSto',
          module_name: 'Seminar - Energy Storage',
          module_group_initials: 'Supplementary module',
          ects: 4,
          responsible_name: 'Maurizio',
          responsible_surname: 'Barbato',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 30,
          code: 'MS_CompGraph',
          module_name: 'Seminar - Computer Graphics',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Achille',
          responsible_surname: 'Peternier',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 31,
          code: 'MS_GameDe',
          module_name: 'Seminar - Game Development',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Achille',
          responsible_surname: 'Peternier',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 32,
          code: 'MS_TPEMAM',
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          module_group_initials: 'Supplementary module',
          ects: 6,
          responsible_name: 'Anna',
          responsible_surname: 'Valente',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 33,
          code: 'MS_TraMachi',
          module_name: 'Seminar - Traditional Machinig Technologies',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Oliver',
          responsible_surname: 'Avram',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 34,
          code: 'MS_VirtReal',
          module_name: 'Seminar - Virtual Reality',
          module_group_initials: 'Supplementary module',
          ects: 3,
          responsible_name: 'Achille',
          responsible_surname: 'Peternier',
          site: 'Lugano',
          site_initials: 'LU'
        }
      ]

      commit('setSupplementaryModules', response)
    }
  },
  mutations: {
    setAsiSupplementaryModules: (state, asiSupplementaryModules) =>
      (state.asiSupplementaryModules = asiSupplementaryModules),
    setProjects: (state, projects) => (state.projects = projects),
    setAsiMasterProject: (state, asiMasterProject) =>
      (state.asiMasterProject = asiMasterProject),
    setAsiModuleGroups: (state, asiModuleGroups) =>
      (state.asiModuleGroups = asiModuleGroups),

    updateTechnicalAsi: (state, newModules) => {
      ;(state.projects = newModules.asiProjects),
        (state.asiSupplementaryModules =
          newModules.allSupplementaryModulesAsiModules),
        (state.asiMasterProject = newModules.asiMasterProject)
    },
    setSupplementaryModules: (state, supplementaryModules) =>
      (state.supplementaryModules = supplementaryModules)
  }
})

const wrapper = shallowMount(AsiTechnicalSpecializationManagementView, {
  global: {
    Plugin: [Vuex],
    mocks: {
      $store: store
    }
  }
})

//  ...mapGetters(['asiProjects']),
//  ...mapGetters(['allSupplementaryModulesAsiModules']),
//  ...mapGetters(['asiMasterProject']),
//  ...mapGetters(['allSupplementaryModules']),
//  ...mapGetters(['asiModuleGroups'])

// this.fetchProjects()
// this.fetchSupplementaryModules()
// this.fetchAsiSupplementaryModules()
// this.fetchAsiMasterProject()
// this.fetchAsiModuleGroups(this.userData)

describe('Asi technical specialization view  ', () => {
  test('test add project', async () => {
    const button = wrapper.find('#addProjectButton')
    const asiProjects = wrapper.componentVM.asiProjects

    expect(asiProjects.length).toBe(2)

    await button.trigger('click')

    expect(asiProjects.length).toBe(3)
  })

  //    test('test add tsm modules', async () => {
  //      const button = wrapper.find('#addTsmButton')
  //      const tsmAsiModules = wrapper.componentVM.allTsmAsiModules

  //      expect(tsmAsiModules.length).toBe(4)

  //      await button.trigger('click')

  //      expect(tsmAsiModules.length).toBe(5)
  //    })

  //    test('test add cm modules', async () => {
  //      const button = wrapper.find('#addCmButton')
  //      const cmAsiModules = wrapper.componentVM.allCmAsiModules

  //      expect(cmAsiModules.length).toBe(5)

  //      await button.trigger('click')

  //      expect(cmAsiModules.length).toBe(6)
  //    })
})
