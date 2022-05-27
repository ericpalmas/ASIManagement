import axios from 'axios'
import { loginService } from '../services/login.service'

const state = {
  userData: [],
  userType: [],
  advisorStudents: [],
  availableStudents: [],
  studentsByProfile: [],
  advisors: [],
  students: [],
  profilesResponsible: [],
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
  studentsByProfile: (state) => state.studentsByProfile,
  students: (state) => state.students,
  advisors: (state) => state.advisors,
  profilesResponsible: (state) => state.profilesResponsible,
  userType: (state) => state.userType,
  token: (state) => state.token,
  isLogin: (state) => state.isLogin,
  user: (state) => state.user,
  loggedUser: (state) => state.loggedUser
}

const actions = {
  async fetchStudents({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/students',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setStudents', response.data)
  },
  async fetchStudentsByProfile({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/studentsByProfile',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setStudentsByProfile', response.data)
  },
  async fetchAdvisors({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/advisors',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setAdvisors', response.data)
  },

  async fetchProfilesResponsible({ commit }) {
    const response = await axios.get(
      'http://localhost:8732/api/asiuser/profilesResponsible',
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )
    commit('setProfilesResponsible', response.data)
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

  async register(
    { commit },
    { name, surname, email, password, profile, modality, role }
  ) {
    //commit('registrationRequest', { username })

    //let result = loginService.login(username, password)

    console.log(name, surname, email, password, profile, modality, role)

    const response = await axios.post(
      'http://localhost:8732/api/asiuser/register',
      {
        AsiUserName: name,
        AsiUserSurname: surname,
        AsiUserEmail: email,
        AsiUserPassword: password,
        Profile: profile,
        Modality: modality,
        Role: role
      }
    )

    if (response.status == 200) {
      commit('registrationSuccess', response.data[0])
      // localStorage.setItem('token', response.data.Token)
    } else if (response.status == 404) {
      //commit('registrationFailure', response.data)
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

  async removeStudent({ commit }, { id }) {
    const response = await axios.delete(
      'http://localhost:8732/api/asiuser/students/' + id,
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    )

    console.log(response.data)

    commit('setRemoveStudent', response.data)
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
  setStudentsByProfile: (state, studentsByProfile) =>
    (state.studentsByProfile = studentsByProfile),
  setAdvisors: (state, advisors) => (state.advisors = advisors),
  setStudents: (state, students) => (state.students = students),
  setProfilesResponsible: (state, profilesResponsible) =>
    (state.profilesResponsible = profilesResponsible),
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
  setRemoveStudent(state, students) {
    state.students = students
  },
  setStopFollowStudent(state, res) {
    state.advisorStudents = res.response.filter(
      (student) => student.advisor === res.advisorId
    )

    state.availableStudents = res.response
      .filter((student) => student.advisor === null)
      .filter((student) => student.id_user_type === 1)
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
  },
  registrationSuccess(state, newUser) {
    if (newUser.role === 1) {
      console.log(state, newUser)

      state.students.push(newUser)
      // state.students.push({
      //   name: newUser.name,
      //   surname: newUser.surname,
      //   email: newUser.email,
      //   enrollment_number: newUser.enrollmentNumber,
      //   advisor: null,
      //   profile_responsible: null,
      //   profile: newUser.profile,
      //   modality: newUser.modality
      // })
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
