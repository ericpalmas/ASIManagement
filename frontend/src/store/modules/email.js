import axios from 'axios'

const state = {
    email: null
}

const getters = {
    email: (state) => state.email,

}

const actions = {
  async sendEmail({ commit }, {To, Subject, Body}) {

    console.log(To, Subject, Body)
    To = "eric.palmas@student.supsi.ch"
    const response = await axios.post('http://localhost:8732/api/email',  {
        To: To,
        Subject: Subject,
        Body: Body,
      },{
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })



      if (response.status == 200) {
        commit('emailSuccess', response.data)
      } else if (response.status == 404) {
        commit('emailFailure', response.data)
      }

  }
}

const mutations = {
    emailFailure(state, response) {
        state.email = {
          message: response.message,
          code: response.status,
        }
      },
  emailSuccess(state, response) {
    state.email = {
      message: response.message,
      code: response.status,
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
