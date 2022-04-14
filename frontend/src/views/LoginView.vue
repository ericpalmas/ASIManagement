<template>
  <div class="course-list">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <form ref="form">
            <form-group id="usernameGroup1" label-for="usernameLabel1">
              <input
                id="usernameInput"
                type="text"
                name="username"
                v-model="username"
                required
                placeholder="Enter username..."
              />
            </form-group>
            <form-group id="exampleInputGroup2" label-for="exampleInput2">
              <input
                id="exampleInput2"
                type="password"
                name="password"
                v-model="password"
                required
                placeholder="Enter password..."
              />
            </form-group>
          </form>
          <div class="divider" />
          <h2>{{ sessionData.length }}</h2>

          <div class="modal-footer clearfix">
            <router-link to="/AsiCourseList" @click="doLogin">
              {{ sessionData.length }}
            </router-link>
          </div>
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
    // userType: false,
  }),
  computed: {
    ...mapGetters(['sessionData'])
  },

  watch: {
    sessionData: function () {
      if (this.sessionData.length !== 0) {
        console.log(this.sessionData.length)
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    // ...mapActions(['fetchUserType']),

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
    // redirect() {
    //   if (this.sessionData.length !== 0) {
    //     this.router.push(`/AsiManagement`)
    //   }
    // }
    // getUserType() {
    //   const route = useRoute()

    //   if (this.sessionData.length !== 0) {
    //     this.fetchUserType(this.sessionData[0].id_asi_user)
    //     this.userType = true
    //   }
    // },
    // getModuleGroups() {
    //   if (this.sessionData.length !== 0) {
    //     const { username, password } = this
    //     if (this.username != '' && this.password != '') {
    //       this.fetchAsiModuleGroups({ username, password })
    //       this.moduleGroup = true
    //     } else {
    //       alert('Please fill the text!')
    //     }
    //   }
    // },
    // eeee() {
    //   const route = useRoute()

    //   if (this.moduleGroup & this.userType) {
    //     route.push({ path: '/AsiManagement' })
    //   }
    // }
  }
}
</script>

<style scoped>
.cardsContainers {
  min-height: 100vh;
  width: 50%;
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
</style>