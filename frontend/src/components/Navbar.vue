
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="wrapper">
        <a class="navbar-brand" href="#" style="padding-left: 3%">
          <img
            id="supsiLogo"
            src="@/assets/logo.svg"
            alt=""
            width="130"
            height="28"
          />
        </a>
        <div
          class="collapse navbar-collapse flex-grow-1 text-right"
          id="myNavbar"
        >
          <ul class="navbar-nav ms-auto flex-nowrap">
            <li class="nav-item">
              <a
                v-if="loggedUser !== undefined && loggedUser !== null"
                class="nav-link"
                href="#"
              >
                {{ loggedUser.AsiUserName }}
              </a>
              <a v-else class="nav-link" href="#">Login</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Logout
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    class="dropdown-item"
                    id="exitButton"
                    href="#"
                    @click="reset"
                  >
                    Exit
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex'
import router from '../router/index'

export default {
  name: 'Navbar',

  data: () => ({
    //token: localStorage.getItem('token')
    // user: this.user,
    // loggedUser: this.loggedUser
  }),
  computed: {
    ...mapGetters(['token']),
    ...mapGetters(['loggedUser'])
    // ...mapGetters(['user'])
  },

  methods: {
    ...mapActions(['clearState']),
    ...mapActions(['fetchLoggedUser']),

    reset() {
      this.clearState()
      if (this.token === null) {
        router.push({ name: 'LoginView' })
      }
    }
  },

  created() {
    this.fetchLoggedUser()
  },

  watch: {
    loggedUser: function () {
      console.log(this.loggedUser)
    }
  }
}
</script>

<style scoped>
/* #wrapper {
  background: red;
  overflow: hidden;
}*/
#elemento {
  float: right;
  overflow: hidden;
}
</style>
