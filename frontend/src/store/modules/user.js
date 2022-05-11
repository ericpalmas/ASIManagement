import axios from 'axios'
import { loginService } from '../services/login.service'

const state = {
  userData: [],
  userType: [],
  advisorStudents: [],
  availableStudents: [],
  advisors: [],
  isLogin: false,
  token: null,
  user: null,
  message: null,
  loggedUser: null
}

const getters = {
  userData: (state) => state.userData,
  advisorStudents: (state) => state.advisorStudents,
  availableStudents: (state) => state.availableStudents,
  advisors: (state) => state.advisors,
  userType: (state) => state.userType,
  token: (state) => state.token,
  isLogin: (state) => state.isLogin,
  user: (state) => state.user,
  loggedUser: (state) => state.loggedUser
}

const actions = {
  async fetchAdvisors({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/advisors',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setAdvisors', response.data)
  },
  async fetchAvailableStudents({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/availableStudents',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setAvailableStudents', response.data)
  },
  async fetchAdvisorStudents({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/advisorStudents',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setAdvisorStudents', response.data)
  },
  async fetchLoggedUser({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/current',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setLoggedUser', response.data)
  },
  async fetchUserData({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/adminData',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setUserData', response.data)
  },

  async fetchUserType({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/type/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    commit('setUserType', response.data)
  },

  async login({ commit }, { username, password }) {
    commit('loginRequest', { username })

    let result = loginService.login(username, password)
    if (result) {
      const response = await axios.post(
        'http://localhost:8732/api/asiuser/login',
        {
          AsiUserEmail: username,
          AsiUserPassword: password
        }
      )

      if (response.status == 200) {
        commit('loginSuccess', response.data)
        localStorage.setItem('token', response.data.Token)
      } else if (response.status == 404) {
        commit('loginFailure', response.data)
      }
    }
  },

  async followStudent({ commit }, { id, advisorId }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/followStudent/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    var res = {
      response: response.data,
      advisorId: advisorId
    }
    commit('setFollowStudent', res)
  },

  async stopFollowStudent({ commit }, { id, advisorId }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/stopFollowStudent/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    var res = {
      response: response.data,
      advisorId: advisorId
    }
    commit('setStopFollowStudent', res)
  },
  async logout({ commit }) {
    commit('resetState')
  },
  async clearState({ commit }) {
    localStorage.removeItem('token')
    commit('resetState')
  },
  async changeLogInState({ commit }) {
    commit('notLoggedIn')
  }
}

const mutations = {
  setUserData: (state, userData) => (state.userData = userData),
  setAdvisorStudents: (state, advisorStudents) =>
    (state.advisorStudents = advisorStudents),
  setAvailableStudents: (state, availableStudents) =>
    (state.availableStudents = availableStudents),

  setAdvisors: (state, advisors) => (state.advisors = advisors),
  setUserType: (state, userType) => (state.userType = userType),

  resetState(state) {
    state.isLogin = false
    state.token = null
    state.user = null
  },
  loginRequest(state, user) {
    state.isLogin = false
    state.token = null
    state.user = user
  },
  loginSuccess(state, response) {
    state.isLogin = true
    state.token = response.Token
    state.message = response.Message
    state.user = {
      AsiUserId: response.AsiUserId,
      AsiUserName: response.AsiUserName,
      AsiUserSurname: response.AsiUserSurname,
      AsiUserEmail: response.AsiUserEmail,
      Role: response.Role
    }
  },
  setFollowStudent(state, res) {
    state.advisorStudents = res.response.filter(
      (student) => student.advisor === res.advisorId
    )

    //console.log(res.response)
    state.availableStudents = res.response
      .filter((student) => student.advisor === null)
      .filter((student) => student.id_user_type === 1)

    //console.log(state.availableStudents)
  },
  setStopFollowStudent(state, res) {
    state.advisorStudents = res.response.filter(
      (student) => student.advisor === res.advisorId
    )
    //console.log(res.response)

    state.availableStudents = res.response
      .filter((student) => student.advisor === null)
      .filter((student) => student.id_user_type === 1)

    // console.log(
    //   (state.availableStudents = res.response.filter(
    //     (student) => student.advisor === null
    //   ))
    // )

    // console.log(
    //   (state.availableStudents = res.response.filter(
    //     (student) => student.id_user_type === 1
    //   ))
    // )
    // console.log(state.availableStudents)
  },
  loginFailure(state, response) {
    state.isLogin = false
    state.message = response.Message
  },
  notLoggedIn(state) {
    state.isLogin = false
  },
  setLoggedUser(state, userLogged) {
    state.loggedUser = userLogged
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
