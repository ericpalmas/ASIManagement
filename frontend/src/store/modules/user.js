import axios from 'axios'
import { loginService } from '../services/login.service'

const state = {
  userData: [],
  userType: [],
  isLogin: false,
  token: null,
  user: null,
  message: null
}

const getters = {
  userData: (state) => state.userData,
  userType: (state) => state.userType,
  token: (state) => state.token,
  loggedUser: (state) => state.user,
  isLogin: (state) => state.isLogin
}

const actions = {
  async fetchUserData({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asiuser/5', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })

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
        // ,
        // {
        //   headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        // }
      )

      if (response.status == 200) {
        commit('loginSuccess', response.data)
        localStorage.setItem('token', response.data.Token)
        localStorage.setItem('name', response.data.AsiUserName)
        localStorage.setItem('surname', response.data.AsiUserSurname)
        localStorage.setItem('email', response.data.AsiUserEmail)
        localStorage.setItem('id', response.data.AsiUserId)
        localStorage.setItem('role', response.data.Role)
      } else if (response.status == 404) {
        commit('loginFailure', response.data)
      }
    }
  },
  async logout({ commit }) {
    commit('resetState')
  },
  async clearState({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('surname')
    localStorage.removeItem('email')
    localStorage.removeItem('id')
    localStorage.removeItem('role')
    commit('resetState')
  },
  async changeLogInState({ commit }) {
    commit('notLoggedIn')
  }
}

const mutations = {
  setUserData: (state, userData) => (state.userData = userData),
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
  loginFailure(state, response) {
    state.isLogin = false
    state.message = response.Message
  },
  notLoggedIn(state) {
    state.isLogin = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
