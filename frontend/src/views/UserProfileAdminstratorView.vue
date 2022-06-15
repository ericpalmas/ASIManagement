<template>
  <Sidebar />
  <div
    v-if="userData !== null"
    class="AdministrativeDataView"
    :style="{ 'margin-left': sidebarWidth }"
  >
    <Navbar />
    <div
      v-if="loggedUser !== undefined && loggedUser !== null"
      id="cardsContainers"
      class="container pt-3"
    >
      <div class="card">
        <div class="container">
          <div class="row justify-content-md-center pt-4">
            <!-- <div
              class="alert alert-danger"
              role="alert"
              v-if="confirmedPasswordError"
              :v-bind:confirmedPasswordError="confirmedPasswordError"
            >
              Password and confirmed password are different
            </div> -->
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
              class="alert alert-success"
              role="alert"
              v-if="pageSaved"
              :v-bind:pageSaved="pageSaved"
            >
              Page saved correctly
            </div>
            <div class="col-md-auto"></div>
            <div class="col col-lg-2">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="enableEditing"
              >
                <i class="fas fa-edit"></i>
              </button>
            </div>
            <div class="col col-lg-2">
              <button
                v-if="!edit"
                disabled
                type="button"
                class="btn btn-outline-secondary"
              >
                <i class="fas fa-save"></i>
              </button>
              <button
                v-else
                type="button"
                class="btn btn-outline-secondary"
                @click="updateUserProfile"
              >
                <i class="fas fa-save"></i>
              </button>
            </div>
          </div>
        </div>

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
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="familyName"
                        >
                          {{ user.student_surname }}
                        </div>
                        <div v-else>
                          <input
                            style="width: 50%"
                            class="form-control form-control-sm"
                            type="text"
                            v-model="user.student_surname"
                          />
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
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="studentName"
                        >
                          {{ user.student_name }}
                        </div>
                        <div v-else>
                          <input
                            style="width: 50%"
                            class="form-control form-control-sm"
                            type="text"
                            v-model="user.student_name"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.student_email !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Email:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="studentName"
                        >
                          {{ user.student_email }}
                        </div>
                        <div v-else>
                          <input
                            style="width: 50%"
                            class="form-control form-control-sm"
                            type="text"
                            v-model="user.student_email"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.student_enrollment_number !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Enrollment Nr.:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="enrollmentNumber"
                        >
                          {{ user.student_enrollment_number }}
                        </div>
                        <div v-else>
                          <input
                            style="width: 50%"
                            class="form-control form-control-sm"
                            type="text"
                            v-model="user.student_enrollment_number"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.modality !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Modality:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="studentModality"
                        >
                          {{ user.modality }}
                        </div>
                        <div v-else>
                          <select
                            style="width: 40%"
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            @change="onChangeModality($event)"
                          >
                            <option
                              v-for="modality in modalities"
                              :key="modality.id_modality"
                              :selected="
                                modality.id_modality === user.modality
                                  ? true
                                  : false
                              "
                              :value="modality.id_modality"
                            >
                              {{ modality.name }}
                            </option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.profile !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Profile:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="studentProfile"
                        >
                          {{ user.profile }}
                        </div>
                        <div v-else>
                          <select
                            style="width: 40%"
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            @change="onChangeProfile($event)"
                          >
                            <option
                              v-for="profile in profiles"
                              :key="profile.id_profile"
                              :value="profile.id_profile"
                              :selected="
                                profile.id_profile === user.id_profile
                                  ? true
                                  : false
                              "
                            >
                              {{ profile.name }}
                            </option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.profile_responsible_id !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Profile responsible:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          {{ user.profile_responsible_name }}
                          {{ user.profile_responsible_surname }}
                        </div>
                      </td>
                    </tr>
                    <!-- <tr>
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
                    </tr>-->
                    <tr v-if="user.advisor_id !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Student’s advisor:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <!-- <div style="text-align: left" id="studentAdvisor">
                          {{ user.advisor_name }} {{ user.advisor_surname }}
                        </div> -->
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="studentAdvisor"
                        >
                          {{ user.advisor_name }} {{ user.advisor_surname }}
                        </div>
                        <div v-else>
                          <select
                            style="width: 40%"
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            @change="onChangeAdvisor($event)"
                          >
                            <option
                              v-for="advisor in advisors"
                              :key="advisor.id_asi_user"
                              :value="advisor.id_asi_user"
                              :selected="
                                advisor.id_asi_user === user.advisor_id
                                  ? true
                                  : false
                              "
                            >
                              {{ advisor.name }} {{ advisor.surname }}
                            </option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.role !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Role:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div
                          v-if="!edit"
                          style="text-align: left"
                          id="studentProfile"
                        >
                          <div class="form-check">
                            <div
                              v-if="
                                user.role === 1 ||
                                user.role === 7 ||
                                user.role === 10
                              "
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckChecked"
                                disabled
                                checked
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Student
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
                                Student
                              </label>
                            </div>
                            <div
                              v-if="
                                user.role === 5 ||
                                user.role === 7 ||
                                user.role === 9 ||
                                user.role === 10
                              "
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckChecked"
                                disabled
                                checked
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

                            <div
                              v-if="
                                user.role === 8 ||
                                user.role === 9 ||
                                user.role === 10
                              "
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckChecked"
                                disabled
                                checked
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

                            <div v-if="user.role === 6">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckChecked"
                                disabled
                                checked
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
                        <div v-else class="col-sm-7">
                          <div class="form-check">
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
                          </div>
                          <div class="form-check">
                            <div v-if="adminOption === false">
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
                            <div v-if="adminOption === false">
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="
            userData[0].role === 5 ||
            userData[0].role === 7 ||
            userData[0].role === 9 ||
            userData[0].role === 10
          "
          class="card-body"
        >
          <div id="cardsContainers" class="container pt-3 pb-4">
            <div v-if="loggedUser !== undefined && loggedUser !== null">
              <h5>Students</h5>
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
                v-if="
                  userData[0].role === 5 ||
                  userData[0].role === 7 ||
                  userData[0].role === 9 ||
                  userData[0].role === 10
                "
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
    removedStudent: {},
    edit: false,
    save: false,
    name: '',
    surname: '',
    email: '',
    enrollmentNumber: '',
    password: '',
    confirmedPassword: '',
    modality: -1,
    profile: -1,
    role: -1,
    advisor: -1,
    emptyFieldsError: false,
    roleMismatchError: false,
    roleEmptyError: false,
    confirmedPasswordError: false,
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
    //...mapActions(['fetchUserData'])
    ...mapActions(['fetchSpecificUserData']),
    ...mapActions(['fetchSpecificAdvisorStudents']),
    ...mapActions(['fetchAvailableStudents']),
    ...mapActions(['followStudent']),
    ...mapActions(['stopFollowStudent']),
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['fetchProfiles']),
    ...mapActions(['fetchModalities']),
    ...mapActions(['fetchAdvisors']),
    ...mapActions(['updateUser']),

    enableEditing: function () {
      this.edit = !this.edit
    },
    enableSave: function () {
      this.save = !this.save
    },
    onChangeModality: function (e) {
      this.modality = e.target.value
    },
    onChangeProfile: function (e) {
      this.profile = e.target.value
    },
    onChangeAdvisor: function (e) {
      this.advisor = e.target.value
    },
    updateUserProfile: function () {
      console.log('SURNAME: ' + this.userData[0].student_surname)
      console.log('NAME: ' + this.userData[0].student_name)
      console.log('EMAIL: ' + this.userData[0].student_email)
      console.log(
        'ENROLLMENT NUMBER: ' + this.userData[0].student_enrollment_number
      )

      if (
        this.studentOption &&
        !this.advisorOption &&
        !this.profileResponsibleOption &&
        !this.adminOption
      ) {
        console.log('1')
        this.role = 1
      } else if (
        !this.studentOption &&
        this.advisorOption &&
        !this.profileResponsibleOption &&
        !this.adminOption
      ) {
        console.log('5')
        this.role = 5
      } else if (
        !this.studentOption &&
        !this.advisorOption &&
        !this.profileResponsibleOption &&
        this.adminOption
      ) {
        console.log('6')
        this.role = 6
      } else if (
        this.studentOption &&
        this.advisorOption &&
        !this.profileResponsibleOption &&
        !this.adminOption
      ) {
        console.log('7')
        this.role = 7
      } else if (
        !this.studentOption &&
        !this.advisorOption &&
        this.profileResponsibleOption &&
        !this.adminOption
      ) {
        console.log('8')
        this.role = 8
      } else if (
        !this.studentOption &&
        this.advisorOption &&
        this.profileResponsibleOption &&
        !this.adminOption
      ) {
        console.log('9')
        this.role = 9
      } else if (
        this.studentOption &&
        this.advisorOption &&
        this.profileResponsibleOption &&
        !this.adminOption
      ) {
        console.log('10')
        this.role = 10
      }

      var newModality =
        this.modality !== -1 ? this.modality : this.userData[0].id_modality
      var newProfile =
        this.profile !== -1 ? this.profile : this.userData[0].id_profile
      var newAdvisor =
        this.advisor !== -1 ? this.advisor : this.userData[0].advisor_id
      var newRole = this.role !== -1 ? this.role : this.userData[0].role

      console.log('MODALITY: ' + newModality)
      console.log('PROFILE: ' + newProfile)
      console.log('ADVISOR: ' + newAdvisor)
      console.log('ROLE: ' + newRole)

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
          this.userData[0].student_name !== '' &&
          this.userData[0].student_surname !== '' &&
          this.userData[0].student_email !== '' &&
          this.userData[0].student_enrollment_number !== ''
          // this.password !== '' &&
          // this.confirmedPassword !== '' &&
          // this.modality !== -1 &&
          // this.profile !== -1
        ) {
          this.emptyFieldsError = false

          // if (this.password === this.confirmedPassword) {
          //   this.confirmedPasswordError = false

          if (
            !this.studentOption &&
            !this.advisorOption &&
            !this.profileResponsibleOption &&
            !this.adminOption
          ) {
            this.roleEmptyError = true
          } else {
            this.roleEmptyError = false
            //this.defineRole()

            if (confirm('Do you really want to save?')) {
              // const {
              //   name,
              //   surname,
              //   email,
              //   enrollmentNumber,
              //   password,
              //   modality,
              //   role,
              //   profile
              // } = this

              this.updateUser({
                id: this.$route.params.userId,
                name: this.userData[0].student_name,
                surname: this.userData[0].student_surname,
                email: this.userData[0].student_email,
                enrollmentNumber: this.userData[0].student_enrollment_number,
                //   password,
                modality: newModality,
                profile: newProfile,
                role: newRole,
                advisor: newAdvisor
              })
              this.edit = !this.edit
            }
          }
          // } else {
          //   this.confirmedPasswordError = true
          // }
        } else {
          this.emptyFieldsError = true
        }
      }
    },
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
    ...mapGetters(['userData']),
    ...mapGetters(['modalities']),
    ...mapGetters(['profiles']),
    ...mapGetters(['advisors'])
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
    this.fetchProfiles()
    this.fetchModalities()
    this.fetchAdvisors()
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
  align-content: center;
}

.AdministrativeDataView {
  text-align: start;
}
/* .cardsContainers {
  min-height: 100vh;
  width: 60%;
  border: 5px solid #616161;
  padding-top: 2%;
  background-color: #eeeded;
  text-align: center;
  align-content: center;
}
.asiManagement {
  text-align: center;
} */
.title {
  padding: 2%;
}
</style>
