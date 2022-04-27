/**
 * @jest-environment jsdom
 */

import Vuex from 'vuex'
import axios from 'axios'
import { shallowMount } from '@vue/test-utils'
import AdministrativeDataView from '../../src/views/AdministrativeDataView.vue'

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
    userData: (state) => state.userData
  },
  actions: {
    async fetchUserData({ commit }) {
      const response = [
        {
          student_id: 2,
          student_name: 'Marco',
          student_surname: 'Rossi',
          student_enrollment_number: '21-456-059',
          modality: 'Full-time',
          profile: 'Computer science',
          advisor_id: null,
          advisor_name: 'Andrea',
          advisor_surname: 'Baldassari'
        }
      ]

      commit('setUserData', response)
    }
  },
  mutations: {
    setUserData: (state, userData) => (state.userData = userData)
  }
})

const wrapper = shallowMount(AdministrativeDataView, {
  global: {
    Plugin: [Vuex],
    mocks: {
      $store: store
    }
  }
})

describe('test administrative data view', () => {
  test('test family name', async () => {
    // Arrange
    const familyName = wrapper.find('#familyName')

    // Assert
    expect(familyName.text()).toBe('Rossi')
  })

  test('test student name', async () => {
    const studentName = wrapper.find('#studentName')

    expect(studentName.text()).toBe('Marco')
  })

  test('test enrollment number', async () => {
    const enrollmentNumber = wrapper.find('#enrollmentNumber')

    expect(enrollmentNumber.text()).toBe('21-456-059')
  })

  test('test student modality', async () => {
    const studentModality = wrapper.find('#studentModality')

    expect(studentModality.text()).toBe('Full-time')
  })

  test('test student profile', async () => {
    const studentProfile = wrapper.find('#studentProfile')

    expect(studentProfile.text()).toBe('Computer science')
  })

  test('test student advisor', async () => {
    const studentAdvisor = wrapper.find('#studentAdvisor')

    expect(studentAdvisor.text()).toBe('Prof. Andrea Baldassari')
  })
})
