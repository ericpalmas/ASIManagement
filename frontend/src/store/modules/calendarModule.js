import axios from 'axios'

const state = {
  moduleCalendarYears: [],
  moduleCalendar: []
}

const getters = {
  moduleCalendarYears: (state) => state.moduleCalendarYears,
  moduleCalendar: (state) => state.moduleCalendar
}

const actions = {
  async fetchModuleCalendarYears({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/calendarModule/years',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setModuleCalendarYears', response.data)
  },
  async fetchModuleCalendar({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/calendarModule',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setModuleCalendar', response.data)
  }
}

const mutations = {
  setModuleCalendarYears: (state, moduleCalendarYears) =>
    (state.moduleCalendarYears = moduleCalendarYears),
  setModuleCalendar: (state, moduleCalendar) =>
    (state.moduleCalendar = moduleCalendar)
}

export default {
  state,
  getters,
  actions,
  mutations
}
