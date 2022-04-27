/**
 * @jest-environment jsdom
 */

import Vuex from 'vuex'
import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import LoginView from '../../src/views/LoginView.vue'

import { loginService } from '../../src/store/services/login.service'
import user from '../../src/store/modules/user'

const store = new Vuex.Store({
  state: {
    userData: [],
    userType: [],
    isLogin: false,
    token: null,
    user: null,
    message: null
  },
  getters: {
    userData: (state) => state.userData,
    userType: (state) => state.userType,
    token: (state) => state.token,
    loggedUser: (state) => state.user,
    isLogin: (state) => state.isLogin
  },
  actions: {
    changeLogInState({ commit }) {
      commit('notLoggedIn')
    },

    async login({ commit }, { username, password }) {
      commit('loginRequest', { username })

      let result = loginService.login(username, password)
      if (result) {
        const response = {
          Token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N1cm5hbWUiOiJiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoicHJvdmFAc3R1ZGVudC5zdXBzaS5jaCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN0dWRlbnQiLCJleHAiOjE2NTA5ODEyNTEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODczMiIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODczMiJ9.tOij8PL0YqjPs7_4qwRi5EpBRvhIc8FSdmfm8tzqhHc',
          Message: 'User found',
          AsiUserId: 43,
          AsiUserName: 'nome',
          AsiUserSurname: 'cognome',
          AsiUserEmail: 'prova@student.supsi.ch',
          Role: 'Student',
          status: 200
        }

        if (response.status == 200) {
          commit('loginSuccess', response)
        } else if (response.status == 404) {
          commit('loginFailure', response)
        }
      }
    }
  },
  mutations: {
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
})

const wrapper = shallowMount(LoginView, {
  global: {
    Plugin: [Vuex],
    mocks: {
      $store: store
    }
  }
})

describe('LoginView ', () => {
  test('test input email', async () => {
    // Arrange
    const input = wrapper.find('input[type=text]')

    // Act
    await input.setValue('my@mail.com')

    // Assert
    expect(input.element.value).toBe('my@mail.com')
  })

  test('test input password', async () => {
    const input = wrapper.find('input[type=password]')

    await input.setValue('1234')

    expect(input.element.value).toBe('1234')
  })

  test('test login passed', async () => {
    const email = wrapper.find('input[type=text]')
    email.setValue('prova@student.supsi.ch')
    const password = wrapper.find('input[type=password]')
    password.setValue('123456')

    const beforeClick = user.getters.isLogin(store.state)
    expect(beforeClick).toBe(false)

    await wrapper.find('button').trigger('click')

    const afterClick = user.getters.isLogin(store.state)
    expect(afterClick).toBe(true)
  })
})
