<template>
  <div class="course-list">
    <div id="cardsContainers" class="container pt-3" style="width: 40%">
      <div class="card">
        <div class="card-body">
          <form ref="form">
            <h2 class="pb-4">Sign in</h2>
            <div id="inputContainer" class="pb-4">
              <!-- <form-group label-for="usernameLabel1"> -->
              <input
                id="input"
                type="text"
                class="form-control"
                name="username"
                v-model="username"
                required
                placeholder="Enter username..."
              />
              <!-- </form-group> -->
              <!-- <form-group label-for="exampleInput2"> -->
              <input
                id="input"
                type="password"
                class="form-control"
                name="password"
                v-model="password"
                required
                placeholder="Enter password..."
              />
              <!-- </form-group> -->
            </div>

            <button type="button" class="btn btn-primary" @click="doLogin">
              Log in
            </button>
          </form>
          <!-- 
          <div class="modal-footer clearfix">
            <button @click="doLogin">Log in</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginView',

  data: () => ({
    username: '',
    password: ''
  }),
  computed: {
    ...mapGetters(['isLogin']),
    ...mapGetters(['token']),
    ...mapGetters(['loggedUser'])
  },

  watch: {
    isLogin: function () {
      if (this.isLogin) {
        window.location.href = '/AsiManagement'
      }
    }
  },

  created() {
    this.changeLogInState()
  },

  methods: {
    ...mapActions(['login']),
    ...mapActions(['changeLogInState']),
    reset() {
      this.$refs.form.reset()
    },
    doLogin() {
      const { username, password } = this
      if (this.username != '' && this.password != '') {
        this.login({ username, password })
      } else {
        alert('Please fill the text!')
      }
    }
  }
}
</script>

<style scoped>
.cardsContainers {
  min-height: 100vh;
  width: 80%;
  border: 5px solid #616161;
  padding-top: 2%;
  background-color: #eeeded;
  text-align: center;
}

.course-list {
  text-align: center;
}
.title {
  padding: 2%;
}

#input {
  align-self: center;
  margin: 2%;
}

form {
  width: 60%;
  text-align: center;
  display: inline-block;
}
</style>