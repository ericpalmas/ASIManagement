<template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">Student List</h4>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="confirmedPasswordError"
            :v-bind:confirmedPasswordError="confirmedPasswordError"
          >
            Password and confirmed password are different
          </div>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="emptyFieldsError"
            :v-bind:emptyFieldsError="emptyFieldsError"
          >
            Empty field
          </div>
          <div
            class="alert alert-success"
            role="alert"
            v-if="pageSaved"
            :v-bind:pageSaved="pageSaved"
          >
            Page saved correctly
          </div>

          <div v-if="loggedUser !== undefined && loggedUser !== null">
            <div
              v-for="student in students"
              :key="student.id_asi_user"
              class="pb-2"
            >
              <div class="card">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-8">
                        <label>
                          <h5>{{ student.name }} {{ student.surname }}</h5>
                        </label>
                        <!-- <router-link
                          style="text-decoration: none"
                          :to="{
                            name: 'StudentView',
                            params: { studentId: student.id_asi_user }
                          }"
                        >
                        </router-link> -->
                      </div>
                      <div class="col-sm-4">
                        <button
                          id="deleteStudent"
                          type="button"
                          class="btn btn-outline-danger"
                          @click="deleteStudent(student.id_asi_user)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
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
                      Student registration
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          v-model="name"
                        />
                      </div>

                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          Surname:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          v-model="surname"
                        />
                      </div>

                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          v-model="email"
                        />
                      </div>

                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          Enrollment number:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                          v-model="enrollmentNumber"
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Password
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword"
                            v-model="password"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="inputPassword" class="col-form-label">
                          Confirm password
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword"
                            v-model="confirmedPassword"
                          />
                        </div>
                      </div>

                      <div class="mb-3">
                        <label for="inputPassword" class="col-form-label">
                          Profile
                        </label>

                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          v-model="profile"
                        >
                          <option
                            v-for="profile in profiles"
                            :key="profile.id_profile"
                            :value="profile.id_profile"
                          >
                            {{ profile.name }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-3">
                        <label for="inputPassword" class="col-form-label">
                          Modality
                        </label>

                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          v-model="modality"
                        >
                          <option
                            v-for="modality in modalities"
                            :key="modality.id_modality"
                            :value="modality.id_modality"
                          >
                            {{ modality.name }}
                          </option>
                        </select>
                      </div>
                    </form>
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
                      @click="registerStudent()"
                    >
                      Register
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'StudentListAdministratorView',
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
    ...mapActions(['fetchStudents']),
    ...mapActions(['fetchAvailableStudents']),
    ...mapActions(['followStudent']),
    ...mapActions(['stopFollowStudent']),
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['fetchProfiles']),
    ...mapActions(['fetchModalities']),
    ...mapActions(['register']),
    ...mapActions(['removeStudent']),

    deleteStudent: function (removedId) {
      if (confirm('Do you really want to remove?')) {
        this.removeStudent({
          id: removedId
        })
      }
      console.log(removedId)
    },

    registerStudent: function () {
      console.log(this.name)
      console.log(this.surname)
      console.log(this.email)
      console.log(this.enrollmentNumber)
      console.log(this.password)
      console.log(this.confirmedPassword)
      console.log(this.modality)
      console.log(this.profile)

      if (
        this.name !== '' &&
        this.surname !== '' &&
        this.email !== '' &&
        this.enrollmentNumber !== '' &&
        this.password !== '' &&
        this.confirmedPassword !== '' &&
        this.modality !== -1 &&
        this.profile !== -1
      ) {
        this.emptyFieldsError = false

        if (this.password === this.confirmedPassword) {
          this.confirmedPasswordError = false

          const {
            name,
            surname,
            email,
            enrollmentNumber,
            password,
            modality,
            role,
            profile
          } = this
          this.register({
            name,
            surname,
            email,
            enrollmentNumber,
            password,
            modality,
            profile,
            role
          })
        } else {
          this.confirmedPasswordError = true
        }
      } else {
        this.emptyFieldsError = true
      }
    }
  },

  computed: {
    ...mapGetters(['modalities']),
    ...mapGetters(['profiles']),
    ...mapGetters(['students']),
    ...mapGetters(['loggedUser'])
  },
  watch: {
    loggedUser: function () {
      console.log(this.loggedUser)
    },
    students: function () {
      console.log(this.students)
    }
  },
  created() {
    this.fetchStudents()
    this.fetchLoggedUser()
    this.fetchProfiles()
    this.fetchModalities()
  }
}
</script>

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
