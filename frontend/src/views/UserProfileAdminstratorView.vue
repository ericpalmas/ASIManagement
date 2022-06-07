<template>
  <Sidebar />
  <div class="AdministrativeDataView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <h4 class="title">User profile</h4>

        <div class="card-body" v-for="user in userData" :key="user.student_id">
          <div id="cardsContainers" class="container pt-3 pb-4">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr v-if="user.student_surname !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Student’s family name(s):
                        </div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="familyName">
                          {{ user.student_surname }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.student_name !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Student’s given name(s):
                        </div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentName">
                          {{ user.student_name }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.student_enrollment_number !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Enrollment Nr.:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="enrollmentNumber">
                          {{ user.student_enrollment_number }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.modality !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Modality:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentModality">
                          {{ user.modality }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.profile !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Profile:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentProfile">
                          {{ user.profile }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Profile responsible:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Prof. Roberto Mastropietro
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Istitute:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">ISIN</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Istitute director:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Prof. Tiziano Leidi</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Research areas</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Xxx (e.g. Bioelectronics)
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Awarded degree:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Master of Science in Engineering with specialty in
                          Computer Engineering
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Start of program:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">September 14, 2020</div>
                      </td>
                    </tr>
                    <tr v-if="user.advisor_id !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Student’s advisor:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentAdvisor">
                          {{ user.advisor_name }}
                          {{ user.advisor_surname }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div id="cardsContainers" class="container pt-3 pb-4">
            <div v-if="loggedUser !== undefined && loggedUser !== null">
              <div
                v-for="student in advisorStudents"
                :key="student.id_asi_user"
                class="pb-2"
              >
                <div class="card">
                  <div class="card-body">
                    <div class="container">
                      <div class="row">
                        <div class="col-sm-8" style="display: inline">
                          <h5 style="display: inline">
                            {{ student.name }} {{ student.surname }}
                          </h5>
                        </div>
                        <div class="col-sm-4" style="text-align: end">
                          <button
                            id="deleteStudent"
                            type="button"
                            class="btn btn-outline-danger"
                            @click="removeStudent(student)"
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
                        Add student
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div class="modal-body">
                      <p>Student list</p>

                      <select
                        class="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                        v-model="student"
                        v-on:change="onChangeStudent(student)"
                      >
                        <option
                          v-for="student in availableStudents"
                          :key="student.id_asi_user"
                          v-bind:value="student"
                        >
                          Name:&nbsp;&nbsp;{{ student.name }},
                          Surname:&nbsp;&nbsp;{{ student.surname }},
                          Email:&nbsp;&nbsp;{{ student.email }}
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
                        @click="addStudent"
                      >
                        Save changes
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
</template>
 
<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'UserProfileAdminstratorView',
  data: () => ({
    studentId: -1,
    id: 0,
    student: {},
    removedStudent: {}
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
    //...mapActions(['fetchUserData'])
    ...mapActions(['fetchSpecificUserData']),
    ...mapActions(['fetchSpecificAdvisorStudents']),
    ...mapActions(['fetchAvailableStudents']),
    ...mapActions(['followStudent']),
    ...mapActions(['stopFollowStudent']),
    ...mapActions(['fetchLoggedUser']),

    addStudent: function () {
      this.followStudent({
        student: this.student,
        advisorId: this.$route.params.userId
      })
    },
    removeStudent: function (student) {
      if (confirm('Do you really want to delete?')) {
        this.stopFollowStudent({
          student,
          advisorId: this.$route.params.userId
        })
      }
    }
  },
  computed: {
    ...mapGetters(['advisorStudents']),
    ...mapGetters(['availableStudents']),
    ...mapGetters(['loggedUser']),
    ...mapGetters(['userData'])
  },
  watch: {
    advisorStudents: function () {
      if (this.advisorStudents.length !== 0) {
        console.log(this.advisorStudents.length)
      }
    },
    availableStudents: function () {
      if (this.availableStudents.length !== 0) {
        console.log(this.availableStudents.length)
      }
    },
    loggedUser: function () {
      console.log(this.loggedUser)
    }
  },
  created() {
    this.fetchAvailableStudents()
    this.fetchLoggedUser()
    this.fetchSpecificUserData(this.$route.params.userId)
    this.fetchSpecificAdvisorStudents(this.$route.params.userId)
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
  text-align: start;
}

.AdministrativeDataView {
  text-align: start;
}

.title {
  padding: 2%;
}
</style>
