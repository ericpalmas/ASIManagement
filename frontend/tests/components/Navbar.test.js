/**
 * @jest-environment jsdom
 */

import Vuex from 'vuex'
import axios from 'axios'
import { shallowMount } from '@vue/test-utils'

import Navbar from '../../src/components/Navbar.vue'

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
    async clearState({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('surname')
      localStorage.removeItem('email')
      localStorage.removeItem('id')
      localStorage.removeItem('role')
      commit('resetState')
    }
  },
  mutations: {
    resetState(state) {
      state.isLogin = false
      state.token = null
      state.user = null
    }
  }
})

const wrapper = shallowMount(Navbar, {
  global: {
    Plugin: [Vuex],
    mocks: {
      $store: store
    }
  }
})

describe('test navbar', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'token test')
  })

  test('test logout', async () => {
    // Arrange

    // Act
    await wrapper.find('#exitButton').trigger('click')

    // Assert
    expect(localStorage.getItem('token')).toBe(null)
  })

  //    test('test input password', async () => {
  //      const input = wrapper.find('input[type=password]')

  //      await input.setValue('1234')

  //      expect(input.element.value).toBe('1234')
  //    })

  //    test('test login passed', async () => {
  //      const email = wrapper.find('input[type=text]')
  //      email.setValue('prova@student.supsi.ch')
  //      const password = wrapper.find('input[type=password]')
  //      password.setValue('123456')

  //      const beforeClick = user.getters.isLogin(store.state)
  //      expect(beforeClick).toBe(false)

  //      await wrapper.find('button').trigger('click')

  //      const afterClick = user.getters.isLogin(store.state)
  //      expect(afterClick).toBe(true)
  //    })
})
