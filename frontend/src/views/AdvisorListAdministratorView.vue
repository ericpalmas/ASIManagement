<template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">Advisor list</h4>
          <div v-if="loggedUser !== undefined && loggedUser !== null">
            <div
              v-for="advisor in advisors"
              :key="advisor.id_asi_user"
              class="pb-2"
            >
              <div class="card">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-8">
                        <!-- <router-link
                          style="text-decoration: none"
                          :to="{
                            name: 'StudentView',
                            params: { studentId: advisor.id_asi_user }
                          }"
                        >
                          <h5>{{ advisor.name }} {{ advisor.surname }}</h5>
                        </router-link> -->

                        <router-link
                          style="text-decoration: none"
                          :to="{
                            name: 'UserProfileAdminstratorView',
                            params: { userId: advisor.id_asi_user }
                          }"
                        >
                          <h5>
                            {{ advisor.name }}
                            {{ advisor.surname }}
                          </h5>
                        </router-link>
                      </div>
                      <div class="col-sm-4">
                        <button
                          id="deleteStudent"
                          type="button"
                          class="btn btn-outline-danger"
                          @click="deleteUser(advisor.id_asi_user)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'AdvisorListAdministratorView',
  data: () => ({
    studentId: -1,
    id: 0,
    name: '',
    surname: '',
    email: '',
    enrollmentNumber: '',
    password: '',
    confirmedPassword: '',
    modality: -1,
    profile: -1,
    role: 1,
    emptyFieldsError: false,
    confirmedPasswordError: false,
    pageSaved: false
  }),
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions(['fetchAdvisors']),
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['removeUser']),

    deleteUser: function (removedId) {
      if (confirm('Do you really want to remove?')) {
        this.removeUser({
          id: removedId
        })
      }
      console.log(removedId)
    },

    addAdvisor: function () {
      //this.followStudent({ id: this.id, advisorId: this.loggedUser.AsiUserId })
      console.log(this.name)
    }
  },

  computed: {
    //...mapGetters(['advisorStudents']),
    ...mapGetters(['advisors']),
    ...mapGetters(['loggedUser'])
  },
  watch: {
    // advisorStudents: function () {
    //   if (this.advisorStudents.length !== 0) {
    //     console.log(this.advisorStudents.length)
    //   }
    // },
    // availableStudents: function () {
    //   if (this.availableStudents.length !== 0) {
    //     console.log(this.availableStudents.length)
    //   }
    // },
    loggedUser: function () {
      console.log(this.loggedUser)
    }
  },
  created() {
    this.fetchAdvisors()
    this.fetchLoggedUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardsContainers {
  min-height: 100vh;
  width: 60%;
  border: 5px solid #616161;
  padding-top: 2%;
  background-color: #eeeded;
  text-align: center;
}
.title {
  padding: 2%;
}

#deleteStudent {
  float: right;
  overflow: hidden;
}
</style>
