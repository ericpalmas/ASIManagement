<template>
  <Sidebar />
  <div class="AdministrativeDataView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <h2 class="title">User registration</h2>
        <div class="card-body">
          <div id="cardsContainers" class="container pt-3 pb-4">
            <div id="errors">
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
                v-if="roleMismatchError"
                :v-bind:roleMismatchError="roleMismatchError"
              >
                A student can't be a profile responsible
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
                class="alert alert-danger"
                role="alert"
                v-if="roleEmptyError"
                :v-bind:roleEmptyError="roleEmptyError"
              >
                Role is not defined
              </div>
              <div
                class="alert alert-danger"
                role="alert"
                v-if="emailWrongFormatError"
                :v-bind:emailWrongFormatError="emailWrongFormatError"
              >
                Formato email scorretto
              </div>
              <div
                class="alert alert-success"
                role="alert"
                v-if="pageSaved"
                :v-bind:pageSaved="pageSaved"
              >
                Page saved correctly
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col">
                      <!-- <div class="row g-3 align-items-center">
                        <div class="col-auto">
                          <label for="inputPassword6" class="col-form-label">
                            Password
                          </label>
                        </div>
                        <div class="col-auto">
                          <input
                            type="password"
                            id="inputPassword6"
                            class="form-control"
                            aria-describedby="passwordHelpInline"
                          />
                        </div>
                      </div> -->

                      <div class="mb-3 row">
                        <label
                          for="recipient-name"
                          class="col-sm-3 col-form-label"
                        >
                          Name:
                        </label>

                        <div class="col-sm-7">
                          <input
                            type="text"
                            class="form-control"
                            id="recipient-name"
                            v-model="name"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="recipient-name"
                          class="col-sm-3 col-form-label"
                        >
                          Surname:
                        </label>
                        <div class="col-sm-7">
                          <input
                            type="text"
                            class="form-control"
                            id="recipient-name"
                            v-model="surname"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="exampleFormControlInput1"
                          class="col-sm-3 col-form-label"
                        >
                          Email
                        </label>

                        <div class="col-sm-7">
                          <input
                            class="form-control"
                            type="email"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            v-model="email"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="recipient-name"
                          class="col-sm-3 col-form-label"
                        >
                          Enrollment number:
                        </label>
                        <div class="col-sm-7">
                          <input
                            type="text"
                            class="form-control"
                            id="recipient-name"
                            v-model="enrollmentNumber"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-3 col-form-label"
                        >
                          Password
                        </label>
                        <div class="col-sm-7">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword"
                            v-model="password"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-3 col-form-label"
                        >
                          Confirm password
                        </label>
                        <div class="col-sm-7">
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword"
                            v-model="confirmedPassword"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Profile
                        </label>
                        <div class="col-sm-7">
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
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Modality
                        </label>

                        <div class="col-sm-7">
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
                      </div>
                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Role
                        </label>
                        <div class="col-sm-7">
                          <div class="form-check">
                            <div
                              v-if="
                                profileResponsibleOption === false &&
                                adminOption === false &&
                                advisorOption === false
                              "
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDisabled"
                                v-model="studentOption"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Student
                              </label>
                            </div>
                            <div v-else>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDisabled"
                                disabled
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Student
                              </label>
                            </div>
                          </div>

                          <!-- <div class="form-check">
                            <div v-if="adminOption === false">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDisabled"
                                v-model="studentOption"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Student
                              </label>
                            </div>

                            <div v-else>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDisabled"
                                disabled
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                Student
                              </label>
                            </div>
                          </div> -->

                          <div class="form-check">
                            <div
                              v-if="
                                adminOption === false && studentOption === false
                              "
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                                v-model="advisorOption"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Advisor
                              </label>
                            </div>
                            <div v-else>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="false"
                                id="flexCheckChecked"
                                disabled
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Advisor
                              </label>
                            </div>
                          </div>
                          <div class="form-check">
                            <div
                              v-if="
                                adminOption === false && studentOption === false
                              "
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                                v-model="profileResponsibleOption"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Profile Responsible
                              </label>
                            </div>

                            <div v-else>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckChecked"
                                disabled
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Profile Responsible
                              </label>
                            </div>
                          </div>

                          <div class="form-check">
                            <div
                              v-if="
                                profileResponsibleOption === false &&
                                studentOption === false &&
                                advisorOption === false
                              "
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                                v-model="adminOption"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Administrator
                              </label>
                            </div>
                            <div v-else>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                                disabled
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Administrator
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <button
                  type="button"
                  class="btn btn-secondary "
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'UserRegistrationAdministratorView',
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
    roleMismatchError: false,
    roleEmptyError: false,
    confirmedPasswordError: false,
    emailWrongFormatError: false,
    pageSaved: false,
    studentOption: false,
    advisorOption: false,
    profileResponsibleOption: false,
    adminOption: false
  }),
  props: ['userId'],
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

    defineRole: function () {
      if (
        this.studentOption &&
        !this.advisorOption &&
        !this.profileResponsibleOption &&
        !this.adminOption
      ) {
        this.role = 1
      } else if (
        !this.studentOption &&
        this.advisorOption &&
        !this.profileResponsibleOption &&
        !this.adminOption
      ) {
        this.role = 5
      } else if (
        !this.studentOption &&
        !this.advisorOption &&
        this.profileResponsibleOption &&
        !this.adminOption
      ) {
        this.role = 8
      } else if (
        !this.studentOption &&
        !this.advisorOption &&
        !this.profileResponsibleOption &&
        this.adminOption
      ) {
        this.role = 6
      }
      // else if (
      //   this.studentOption &&
      //   this.advisorOption &&
      //   !this.profileResponsibleOption &&
      //   !this.adminOption
      // ) {
      //   this.role = 7
      // }
      //  else if (
      //   this.studentOption &&
      //   this.advisorOption &&
      //   this.profileResponsibleOption &&
      //   !this.adminOption
      // ) {
      //   this.role = 10
      // }
      else if (
        !this.studentOption &&
        this.advisorOption &&
        this.profileResponsibleOption &&
        !this.adminOption
      ) {
        this.role = 9
      }
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

      console.log('Student: ' + this.studentOption)
      console.log('Advisor: ' + this.advisorOption)
      console.log('Responsible: ' + this.profileResponsibleOption)
      console.log('Admin: ' + this.adminOption)

      if (
        this.studentOption === true &&
        this.profileResponsibleOption === true &&
        this.advisorOption === false &&
        this.adminOption === false
      ) {
        this.roleMismatchError = true
        this.pageSaved = false
      } else {
        this.roleMismatchError = false
        this.pageSaved = false

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

            if (
              !this.studentOption &&
              !this.advisorOption &&
              !this.profileResponsibleOption &&
              !this.adminOption
            ) {
              this.roleEmptyError = true

              console.log('errorreeeeeee')
            } else {
              this.roleEmptyError = false
              this.defineRole()

              const validateEmail = (email) => {
                return String(email)
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
              }
              if (!validateEmail(this.email)) {
                this.emailWrongFormatError = true
              } else {
                this.emailWrongFormatError = false
                if (confirm('Do you really want to save?')) {
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
                  this.pageSaved = true
                }
              }
            }
          } else {
            this.confirmedPasswordError = true
          }
        } else {
          this.emptyFieldsError = true
        }
      }
    }

    // if (
    //   this.name !== '' &&
    //   this.surname !== '' &&
    //   this.email !== '' &&
    //   this.enrollmentNumber !== '' &&
    //   this.password !== '' &&
    //   this.confirmedPassword !== '' &&
    //   this.modality !== -1 &&
    //   this.profile !== -1
    // ) {
    //   this.emptyFieldsError = false

    //   if (this.password === this.confirmedPassword) {
    //     this.confirmedPasswordError = false

    //     const {
    //       name,
    //       surname,
    //       email,
    //       enrollmentNumber,
    //       password,
    //       modality,
    //       role,
    //       profile
    //     } = this
    //     this.register({
    //       name,
    //       surname,
    //       email,
    //       enrollmentNumber,
    //       password,
    //       modality,
    //       profile,
    //       role
    //     })
    //   } else {
    //     this.confirmedPasswordError = true
    //   }
    // } else {
    //   this.emptyFieldsError = true
    // }
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

.AdministrativeDataView {
  text-align: center;
}

.title {
  padding: 2%;
}
</style>
