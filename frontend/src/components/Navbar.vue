
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
        <div id="elemento">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a v-if="name !== null" class="nav-link" href="#">{{ name }}</a>
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

export default {
  name: 'Navbar',

  data: () => ({
    name: localStorage.getItem('name')
  }),
  computed: {
    ...mapGetters(['token'])
  },

  methods: {
    ...mapActions(['clearState']),
    reset() {
      this.clearState()
      if (this.token === null) window.location.href = '/'
    }
  }
}
</script>

<style scoped>
/* #wrapper {
  background: red;
  overflow: hidden;
}
#elemento {
  background: green;
  float: right;
} */
</style>
