/**
 * @jest-environment jsdom
 */

import Vuex from 'vuex'
import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import CourseListView from '../../src/views/CourseListView.vue'

const store = new Vuex.Store({
  state: {
    modules: [],
    moduleCalendarYears: [],
    moduleCalendar: []
  },
  getters: {
    allModules: (state) => state.modules,
    moduleCalendarYears: (state) => state.moduleCalendarYears,
    moduleCalendar: (state) => state.moduleCalendar
  },
  actions: {
    async fetchModules({ commit }) {
      const response = [
        {
          id_module: 1,
          code: 'TSM_AdvCompG',
          module_name: 'Advanced computer graphics',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Achille',
          responsible_surname: 'Peternier',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 3,
          code: 'TSM_AdvDataMgmt',
          module_name:
            'Advanced Data Management – non standard database systems',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Roberto',
          responsible_surname: 'Mastropietro',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 4,
          code: 'TSM_DataAnaCla',
          module_name: 'Data Analysis and Classification',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Roberto',
          responsible_surname: 'Mastropietro',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 5,
          code: 'TSM_DevOps',
          module_name: 'DevOps of cloud-native applications',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Tiziano',
          responsible_surname: 'Leidi',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 6,
          code: 'TSM_FactPlan',
          module_name: 'Factory Planning',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Luca',
          responsible_surname: 'Canetta',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 7,
          code: 'TSM_IndContr',
          module_name: 'Industrial Control',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Emanuele',
          responsible_surname: 'Carpanzano',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 8,
          code: 'TSM_IoT',
          module_name: 'Internet of Things',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Alessandro',
          responsible_surname: 'Puiatti',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 9,
          code: 'TSM_MatSelDes',
          module_name: 'Materials Selection and Design',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Alberto',
          responsible_surname: 'Ortona',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 10,
          code: 'TSM_PlaFaAna',
          module_name: 'Plastics failure analysis and prevention',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Andrea',
          responsible_surname: 'Castrovinci',
          site: 'Lugano',
          site_initials: 'LU'
        },
        {
          id_module: 11,
          code: 'TSM_StrVibr',
          module_name: 'Structural and Vibration',
          module_group_initials: 'TSM',
          ects: 3,
          responsible_name: 'Giacomo',
          responsible_surname: 'Bianchi',
          site: 'Lugano',
          site_initials: 'LU'
        },
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
        },
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
        },
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

      commit('setModules', response)
    },

    async fetchModuleCalendarYears({ commit }) {
      const response = [
        {
          start_year: 2020,
          end_year: 2021
        },
        {
          start_year: 2021,
          end_year: 2021
        },
        {
          start_year: 2021,
          end_year: 2022
        },
        {
          start_year: 2022,
          end_year: 2022
        },
        {
          start_year: 2022,
          end_year: 2023
        },
        {
          start_year: 2023,
          end_year: 2023
        },
        {
          start_year: 2023,
          end_year: 2024
        },
        {
          start_year: 2024,
          end_year: 2024
        }
      ]

      commit('setModuleCalendarYears', response)
    },
    async fetchModuleCalendar({ commit }) {
      const response = [
        {
          id_module: 35,
          module_name: 'Advanced Algorithms and Data Structures',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 35,
          module_name: 'Advanced Algorithms and Data Structures',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 35,
          module_name: 'Advanced Algorithms and Data Structures',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 35,
          module_name: 'Advanced Algorithms and Data Structures',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 36,
          module_name: 'Applied Statistics and Data Analysis',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 36,
          module_name: 'Applied Statistics and Data Analysis',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 36,
          module_name: 'Applied Statistics and Data Analysis',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 36,
          module_name: 'Applied Statistics and Data Analysis',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 37,
          module_name: 'Approximation Algorithms',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 37,
          module_name: 'Approximation Algorithms',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 37,
          module_name: 'Approximation Algorithms',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 37,
          module_name: 'Approximation Algorithms',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 38,
          module_name: 'Biology, physiology and anatomy for engineers',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 38,
          module_name: 'Biology, physiology and anatomy for engineers',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 38,
          module_name: 'Biology, physiology and anatomy for engineers',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 38,
          module_name: 'Biology, physiology and anatomy for engineers',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 39,
          module_name: 'Modeling, Simulation and Optimization',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 39,
          module_name: 'Modeling, Simulation and Optimization',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 39,
          module_name: 'Modeling, Simulation and Optimization',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 39,
          module_name: 'Modeling, Simulation and Optimization',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 40,
          module_name: 'Multi-agent systems',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 40,
          module_name: 'Multi-agent systems',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 40,
          module_name: 'Multi-agent systems',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 40,
          module_name: 'Multi-agent systems',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 41,
          module_name: 'Ordinary Differential Equations and Dynamical Systems',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 41,
          module_name: 'Ordinary Differential Equations and Dynamical Systems',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 41,
          module_name: 'Ordinary Differential Equations and Dynamical Systems',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 41,
          module_name: 'Ordinary Differential Equations and Dynamical Systems',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 42,
          module_name: 'Advanced Project Management',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 43,
          module_name: 'Innovation and Lean',
          start_year: 2020,
          end_year: 2021,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 43,
          module_name: 'Innovation and Lean',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 43,
          module_name: 'Innovation and Lean',
          start_year: 2022,
          end_year: 2023,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 43,
          module_name: 'Innovation and Lean',
          start_year: 2023,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 44,
          module_name:
            'Integrated Sustainable Management of production systems',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 44,
          module_name:
            'Integrated Sustainable Management of production systems',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 44,
          module_name:
            'Integrated Sustainable Management of production systems',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 44,
          module_name:
            'Integrated Sustainable Management of production systems',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 45,
          module_name: 'Quality and Risk Management',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 45,
          module_name: 'Quality and Risk Management',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 45,
          module_name: 'Quality and Risk Management',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 45,
          module_name: 'Quality and Risk Management',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 1,
          module_name: 'Advanced computer graphics',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 1,
          module_name: 'Advanced computer graphics',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 1,
          module_name: 'Advanced computer graphics',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 1,
          module_name: 'Advanced computer graphics',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 3,
          module_name:
            'Advanced Data Management – non standard database systems',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 3,
          module_name:
            'Advanced Data Management – non standard database systems',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 3,
          module_name:
            'Advanced Data Management – non standard database systems',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 3,
          module_name:
            'Advanced Data Management – non standard database systems',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 4,
          module_name: 'Data Analysis and Classification',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 4,
          module_name: 'Data Analysis and Classification',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 4,
          module_name: 'Data Analysis and Classification',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 4,
          module_name: 'Data Analysis and Classification',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 5,
          module_name: 'DevOps of cloud-native applications',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 6,
          module_name: 'Factory Planning',
          start_year: 2020,
          end_year: 2021,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 6,
          module_name: 'Factory Planning',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 6,
          module_name: 'Factory Planning',
          start_year: 2022,
          end_year: 2023,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 6,
          module_name: 'Factory Planning',
          start_year: 2023,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 7,
          module_name: 'Industrial Control',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 7,
          module_name: 'Industrial Control',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 7,
          module_name: 'Industrial Control',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 7,
          module_name: 'Industrial Control',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 8,
          module_name: 'Internet of Things',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 8,
          module_name: 'Internet of Things',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 8,
          module_name: 'Internet of Things',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 8,
          module_name: 'Internet of Things',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 9,
          module_name: 'Materials Selection and Design',
          start_year: 2020,
          end_year: 2021,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 9,
          module_name: 'Materials Selection and Design',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 9,
          module_name: 'Materials Selection and Design',
          start_year: 2022,
          end_year: 2023,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 9,
          module_name: 'Materials Selection and Design',
          start_year: 2023,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 10,
          module_name: 'Plastics failure analysis and prevention',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 10,
          module_name: 'Plastics failure analysis and prevention',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 10,
          module_name: 'Plastics failure analysis and prevention',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 10,
          module_name: 'Plastics failure analysis and prevention',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 11,
          module_name: 'Structural and Vibration',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 11,
          module_name: 'Structural and Vibration',
          start_year: 2021,
          end_year: 2022,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 11,
          module_name: 'Structural and Vibration',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 11,
          module_name: 'Structural and Vibration',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 12,
          module_name: 'Supplementary course - Mobile Systems and Applications',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 12,
          module_name: 'Supplementary course - Mobile Systems and Applications',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 12,
          module_name: 'Supplementary course - Mobile Systems and Applications',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 12,
          module_name: 'Supplementary course - Mobile Systems and Applications',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 13,
          module_name:
            'Supplementary course - Uncertain Reasoning and Data Mining',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 13,
          module_name:
            'Supplementary course - Uncertain Reasoning and Data Mining',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 13,
          module_name:
            'Supplementary course - Uncertain Reasoning and Data Mining',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 13,
          module_name:
            'Supplementary course - Uncertain Reasoning and Data Mining',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 14,
          module_name: 'Laboratory - Monitoring of WWTP process efficency',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 15,
          module_name: 'Project - Computer Aided Engineering',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 15,
          module_name: 'Project - Computer Aided Engineering',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 15,
          module_name: 'Project - Computer Aided Engineering',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 16,
          module_name:
            'Project - Design and configuration of automated production systems using Virtual Environments',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 16,
          module_name:
            'Project - Design and configuration of automated production systems using Virtual Environments',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 16,
          module_name:
            'Project - Design and configuration of automated production systems using Virtual Environments',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 17,
          module_name:
            'Project - Design, monitoring and management of industrial plants',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 17,
          module_name:
            'Project - Design, monitoring and management of industrial plants',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 17,
          module_name:
            'Project - Design, monitoring and management of industrial plants',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 17,
          module_name:
            'Project - Design, monitoring and management of industrial plants',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 17,
          module_name:
            'Project - Design, monitoring and management of industrial plants',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 17,
          module_name:
            'Project - Design, monitoring and management of industrial plants',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 18,
          module_name: 'Project - Environmental Biotechnologies',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 18,
          module_name: 'Project - Environmental Biotechnologies',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 19,
          module_name: 'Project - Fundamentals of Applied Chemistry',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 20,
          module_name: 'Project - Piloting Process',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 21,
          module_name: 'Seminar - Advanced Ceramics',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 21,
          module_name: 'Seminar - Advanced Ceramics',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 21,
          module_name: 'Seminar - Advanced Ceramics',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 22,
          module_name:
            'Seminar - Engineering of Industrial Robots (ex Advanced Robotics)',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 22,
          module_name:
            'Seminar - Engineering of Industrial Robots (ex Advanced Robotics)',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: true
        },
        {
          id_module: 22,
          module_name:
            'Seminar - Engineering of Industrial Robots (ex Advanced Robotics)',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 23,
          module_name: 'Seminar - Biomaterials',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 23,
          module_name: 'Seminar - Biomaterials',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 23,
          module_name: 'Seminar - Biomaterials',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 23,
          module_name: 'Seminar - Biomaterials',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 24,
          module_name:
            'Seminar - Engineering practice within Chinese and Swiss culture',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 24,
          module_name:
            'Seminar - Engineering practice within Chinese and Swiss culture',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 24,
          module_name:
            'Seminar - Engineering practice within Chinese and Swiss culture',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 24,
          module_name:
            'Seminar - Engineering practice within Chinese and Swiss culture',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 25,
          module_name:
            'Seminar - Design and calculation of a module wastewater treatment plant',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 25,
          module_name:
            'Seminar - Design and calculation of a module wastewater treatment plant',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 25,
          module_name:
            'Seminar - Design and calculation of a module wastewater treatment plant',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 25,
          module_name:
            'Seminar - Design and calculation of a module wastewater treatment plant',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 26,
          module_name: 'Seminar - Dynamic Behavior of Materials',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 26,
          module_name: 'Seminar - Dynamic Behavior of Materials',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 26,
          module_name: 'Seminar - Dynamic Behavior of Materials',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 26,
          module_name: 'Seminar - Dynamic Behavior of Materials',
          start_year: 2023,
          end_year: 2024,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 27,
          module_name:
            'Seminar - Design and management of facilities for pharmaceutical and food',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 28,
          module_name: 'Seminar - Energy from biomasses',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 29,
          module_name: 'Seminar - Energy Storage',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 30,
          module_name: 'Seminar - Computer Graphics',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 30,
          module_name: 'Seminar - Computer Graphics',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 30,
          module_name: 'Seminar - Computer Graphics',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 30,
          module_name: 'Seminar - Computer Graphics',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 31,
          module_name: 'Seminar - Game Development',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 31,
          module_name: 'Seminar - Game Development',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 31,
          module_name: 'Seminar - Game Development',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 31,
          module_name: 'Seminar - Game Development',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2020,
          end_year: 2021,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2021,
          end_year: 2022,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: true,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: true,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2022,
          end_year: 2023,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2023,
          end_year: 2024,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 32,
          module_name:
            'Seminar - Technologies, Processes and Equipment for Metal based Additive Manufacturing',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 33,
          module_name: 'Seminar - Traditional Machinig Technologies',
          start_year: 2021,
          end_year: 2022,
          fall_semester: true,
          spring_semester: false,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 34,
          module_name: 'Seminar - Virtual Reality',
          start_year: 2021,
          end_year: 2021,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 34,
          module_name: 'Seminar - Virtual Reality',
          start_year: 2022,
          end_year: 2022,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 34,
          module_name: 'Seminar - Virtual Reality',
          start_year: 2023,
          end_year: 2023,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        },
        {
          id_module: 34,
          module_name: 'Seminar - Virtual Reality',
          start_year: 2024,
          end_year: 2024,
          fall_semester: false,
          spring_semester: true,
          fall_enough_sub: false,
          spring_enough_sub: false,
          more_semester: false
        }
      ]

      commit('setModuleCalendar', response)
    }
  },
  mutations: {
    setModules: (state, modules) => (state.modules = modules),
    setModuleCalendarYears: (state, moduleCalendarYears) =>
      (state.moduleCalendarYears = moduleCalendarYears),
    setModuleCalendar: (state, moduleCalendar) =>
      (state.moduleCalendar = moduleCalendar)
  }
})

const wrapper = shallowMount(CourseListView, {
  global: {
    Plugin: [Vuex],
    mocks: {
      $store: store
    }
  }
})

describe('test course list view', () => {
  test('test code module', async () => {
    // Arrange
    const moduleCode = wrapper.find('#moduleCode')

    // Assert
    expect(moduleCode.text()).toBe('TSM_AdvCompG')
  })

  test('test ects module', async () => {
    const moduleEcts = wrapper.find('#moduleEcts')

    expect(moduleEcts.text()).toBe('3')
  })

  test('test name module', async () => {
    const moduleName = wrapper.find('#moduleName')

    expect(moduleName.text()).toBe('Advanced computer graphics')
  })

  test('test responsible module', async () => {
    const moduleResponsible = wrapper.find('#moduleResponsible')

    expect(moduleResponsible.text()).toBe('Peternier Achille')
  })
})
