<template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">Profile responsible List</h4>
          <div v-if="loggedUser !== undefined && loggedUser !== null">
            <div
              v-for="profileResponsible in profilesResponsible"
              :key="profileResponsible.id_asi_user"
              class="pb-2"
            >
              <div class="card">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-8">
                        <h5>
                          {{ profileResponsible.name }}
                          {{ profileResponsible.surname }}
                        </h5>
                      </div>
                      <div class="col-sm-4">
                        <button
                          id="deleteStudent"
                          type="button"
                          class="btn btn-outline-danger"
                          @click="
                            removeProfileResponsible(
                              profileResponsible.id_asi_user
                            )
                          "
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <button
              type="button"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i class="fas fa-plus-circle"></i>
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add advisor
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div class="modal-body">
                    <p>Advisor list</p>

                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      v-model="id"
                    >
                      <option
                        v-for="advisor in advisors"
                        :key="advisor.id_asi_user"
                        v-bind:value="advisor.id_asi_user"
                      >
                        Name:&nbsp;&nbsp;{{ advisor.name }},
                        Surname:&nbsp;&nbsp;{{ advisor.surname }},
                        Email:&nbsp;&nbsp;{{ advisor.email }}
                      </option>
                    </select>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      @click="addAdvisor"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div> -->
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
  name: 'ProfileResponsibleListAdministratorView',
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
    ...mapActions(['fetchProfilesResponsible']),
    ...mapActions(['fetchLoggedUser']),

    // onChangeStudent: function (event) {
    //   this.studentId = event.target.value
    // },
    addAdvisor: function () {
      //this.followStudent({ id: this.id, advisorId: this.loggedUser.AsiUserId })
      console.log(this.name)
    },
    removeProfileResponsible: function (removedId) {
      // this.stopFollowStudent({
      //   id: removedId,
      //   advisorId: this.loggedUser.AsiUserId
      // })
      console.log(removedId)
    }
  },

  computed: {
    //...mapGetters(['advisorStudents']),
    ...mapGetters(['profilesResponsible']),
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
    this.fetchProfilesResponsible()
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
