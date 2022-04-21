import axios from 'axios'
import { loginService } from '../services/login.service'

const state = {
  userData: [],
  sessionData: [],
  userType: [],
  isLogin: false,
  token: null,
  user: null
}

const getters = {
  userData: (state) => state.userData,
  sessionData: (state) => state.sessionData,
  userType: (state) => state.userType,
  token: (state) => state.token
}

const actions = {
  async fetchUserData({ commit }) {
    const response = await axios.get('http://localhost:8732/api/asiuser/5')

    commit('setUserData', response.data)
  },
  async fetchUserType({ commit }, id) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/type/' + id
    )

    commit('setUserType', response.data)
  },

  async login({ commit }, { username, password }) {
    commit('loginRequest', { username })

    let result = loginService.login(username, password)
    if (result) {
      console.log('login success')

      const response = await axios.post(
        'http://localhost:8732/api/asiuser/login',
        {
          AsiUserEmail: username,
          AsiUserPassword: password
        }
      )
      commit('loginSuccess', { username })
      //commit('loginFailure', { username })

      console.log(response.data)

      // loginSuccess(state) {
      //   state.isLogin = true
      //   state.token = null
      //   state.user = null
      // },
      // loginFailure(state) {
      //   state.isLogin = false
      // }

      //commit('setToken', response.data)
    }
  },
  async logout({ commit }) {
    commit('resetState')
    //router.push('/')
  },
  async clearState({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  setUserData: (state, userData) => (state.userData = userData),
  setSessionData: (state, sessionData) => (state.sessionData = sessionData),
  setUserType: (state, userType) => (state.userType = userType),
  //setToken: (state, token) => (state.token = token),

  resetState(state) {
    state.isLogin = false
    state.token = null
    state.user = null
  },
  loginRequest(state, user) {
    state.isLogin = true
    state.token = null
    state.user = user
  },
  loginSuccess(state) {
    state.isLogin = true
    state.token = null
    state.user = null
  },
  loginFailure(state) {
    state.isLogin = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
