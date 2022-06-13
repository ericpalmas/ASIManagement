<template>
  <Sidebar />
  <div class="asiManagement" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <div class="container">
            <div class="row justify-content-md-center">
              <div
                v-if="userData[0] !== null"
                class="col col-lg-2"
                style="width: 40%"
              >
                <h4 id="title" class="title">
                  {{ userData[0].student_name }} 
                  {{ userData[0].student_surname }}
                </h4>
              </div>
              <div class="col-md-auto">
                <div id="approvation">
                  <div v-if="asiStudentState.advisor_approvation">
                    <button type="button" class="btn btn-success">
                      Approved
                      <i class="fas fa-check"></i>
                    </button>
                  </div>
                  <div v-else>
                    <button type="button" class="btn btn-warning me-2">
                      Not approvved
                      <i class="fas fa-loader"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col col-lg-2">
                <div id="approvation">
                  <div v-if="asiStudentState.advisor_approvation === false">
                    <button
                      type="button"
                      class="btn btn-light"
                      @click="approveAsi"
                    >
                      Approve
                    </button>
                  </div>
                  <div v-else>
                    <button
                      type="button"
                      class="btn btn-light"
                      @click="removeAsiApprovation"
                    >
                      Remove approvation
                    </button>
                  </div>
                </div>
              </div>
              <div class="col col-lg-2">
                <div v-if="userData[0] !== null">
                  <button class="btn btn-danger" @click="generateFile">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="container">
            <p v-for="module in asiModuleGroups" :key="module.id_module">
              {{ module.id_asi_module_group }}
            </p>
          </div> -->

          <div
            class="alert alert-danger"
            role="alert"
            v-if="ftpModulesError"
            :v-bind:ftpModulesError="ftpModulesError"
          >
            At least {{ asiModuleGroups[0].min_ects }} credits are required in
            FTP modules
          </div>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="tsmModulesError"
            :v-bind:tsmModulesError="tsmModulesError"
          >
            At least {{ asiModuleGroups[1].min_ects }} credits are required in
            TSM modules
          </div>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="cmModulesError"
            :v-bind:cmModulesError="cmModulesError"
          >
            At least {{ asiModuleGroups[2].min_ects }} credits are required in
            CM modules
          </div>

          <div
            class="alert alert-danger"
            role="alert"
            v-if="externalModulesError"
            :v-bind:externalModulesError="externalModulesError"
          >
            Maximum 9 credits outiside SUPSI
          </div>

          <div
            class="alert alert-danger"
            role="alert"
            v-if="supplementaryModulesError"
            :v-bind:supplementaryModulesError="supplementaryModulesError"
          >
            At least {{ asiModuleGroups[4].min_ects }} credits are required in
            supplementary modules
          </div>

          <div
            class="alert alert-info"
            role="alert"
            v-if="projectsError"
            :v-bind:projectsError="projectsError"
          >
            At least {{ asiModuleGroups[3].min_ects }} and Maximum
            {{ asiModuleGroups[3].max_ects }} credits are required in projects
          </div>

          <div
            class="alert alert-info"
            role="alert"
            v-if="numberProjectError"
            :v-bind:numberProjectError="numberProjectError"
          >
            At least {{ asiModuleGroups[3].min_modules_number }} and Maximum
            {{ asiModuleGroups[3].max_modules_number }} projects required
          </div>

          <div
            class="alert alert-info"
            role="alert"
            v-if="masterError"
            :v-bind:masterError="masterError"
          >
            {{ asiModuleGroups[5].min_modules_number }} master project required
          </div>

          <div
            class="alert alert-danger"
            role="alert"
            v-if="totalCreditsError"
            :v-bind:totalCreditsError="totalCreditsError"
          >
            The sum of FTP, TSM and CM credits must be 30
          </div>

          <div
            class="alert alert-info"
            role="alert"
            v-if="totalTechnicalCreditsError"
            :v-bind:totalTechnicalCreditsError="totalTechnicalCreditsError"
          >
            The sum of Supplementary modules and Projects credits must be 30
          </div>

          <div id="cardsContainers" class="container pt-3 pb-4">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          FTP
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr
                      v-for="module in allFtpAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>

                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          TSM
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr
                      v-for="module in allTsmAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          CM
                        </label>
                      </td>
                      <td class="table-active">
                        {{ $route.params.id }}
                      </td>
                    </tr>
                    <tr
                      v-for="module in allCmAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="cardsContainers" class="container pt-3 pb-4">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          Projects
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr v-for="module in asiProjects" :key="module.id_module">
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>

                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          Supplementary modules
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr
                      v-for="module in allSupplementaryModulesAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          Master thesis
                        </label>
                      </td>
                      <td class="table-active">
                        {{ $route.params.id }}
                      </td>
                    </tr>
                    <tr
                      v-for="module in asiMasterProject"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="cardsContainers" class="container pt-3 pb-4">
            <div class="card">
              <div class="card-body">
                <h1>Module group credits</h1>

                <table class="table table-light">
                  <thead>
                    <tr>
                      <td>Module group</td>
                      <td>Credits</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>FTP</td>
                      <td>
                        <label for="exampleInputEmail1" class="form-label">
                          {{ moduleCredits(0) }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>TSM</td>
                      <td>
                        <label for="exampleInputEmail1" class="form-label">
                          {{ moduleCredits(1) }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>CM</td>
                      <td>
                        <label for="exampleInputEmail1" class="form-label">
                          {{ moduleCredits(2) }}
                        </label>
                      </td>
                    </tr>

                    <tr>
                      <td>Total</td>
                      <td>
                        <p>
                          {{ totalCredits }}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="cardsContainers" class="container pt-3 pb-4">
            <div class="card">
              <div class="card-body">
                <h1>Course semester balancing</h1>

                <table class="table table-light">
                  <thead>
                    <tr>
                      <td>Semester</td>
                      <td>N. Courses</td>
                      <td>Credits</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(semester, i) in semesterNumberCourses" :key="i">
                      <td>{{ semester.semester }}</td>
                      <td>{{ semester.n_courses }}</td>
                      <td>{{ semester.credits }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
//import ASITable from '../components/ASITable.vue'
import { mapGetters, mapActions } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { logo } from '../assets/logoBase64'

// export default {
//   components: { Sidebar },
//   setup() {
//     return { sidebarWidth }
//   }
// }

export default {
  name: 'StudentView',
  data: () => ({
    approved: false,
    ftpModulesError: false,
    tsmModulesError: false,
    cmModulesError: false,
    supplementaryModulesError: false,
    projectsError: false,
    masterError: false,
    externalModulesError: false,
    numberProjectError: false,
    minMasterError: false,
    totalCreditsError: false,
    totalTechnicalCreditsError: false
  }),
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions(['fetchFtpAsiStudentModules']),
    ...mapActions(['fetchTsmAsiStudentModules']),
    ...mapActions(['fetchCmAsiStudentModules']),
    ...mapActions(['fetchProjectsAsiStudentModules']),
    ...mapActions(['fetchSupplementaryModulesAsiStudentModules']),
    ...mapActions(['fetchMasterProjectAsiStudentModules']),
    ...mapActions(['fetchStudentAsiState']),
    ...mapActions(['advisorApprovation']),
    ...mapActions(['removeAdvisorApprovation']),
    ...mapActions(['fetchStudentAsiModuleGroups']),
    ...mapActions(['fetchSpecificUserData']),

    arrayOfObjectToArrayOfstrings: function (array) {
      var result = []
      for (var i = 0; i < array.length; i++) {
        var row = []
        row.push(array[i].code)
        row.push(array[i].module_name)
        row.push(array[i].site_initials)
        row.push(array[i].ects)
        row.push(array[i].semester)
        result.push(row)
      }
      return result
    },
    generateFile() {
      var doc = new jsPDF('p', 'pt', 'a4')

      var ftpModules = this.arrayOfObjectToArrayOfstrings(this.allFtpAsiModules)
      var tsmModules = this.arrayOfObjectToArrayOfstrings(this.allTsmAsiModules)
      var cmModules = this.arrayOfObjectToArrayOfstrings(this.allCmAsiModules)

      var projectsModules = this.arrayOfObjectToArrayOfstrings(this.asiProjects)
      var supplementaryModules = this.arrayOfObjectToArrayOfstrings(
        this.allSupplementaryModulesAsiModules
      )
      var masterModules = this.arrayOfObjectToArrayOfstrings(
        this.asiMasterProject
      )

      doc.addImage(logo, 'JPEG', 35, 30)
      doc.setFont('Times new roman')
      doc.setFontSize(12)
      doc.text(
        'Name: ' +
          this.userData[0].student_name +
          ' ' +
          this.userData[0].student_surname,
        45,
        100
      )
      doc.text('Profile: ' + this.userData[0].profile, 45, 120)
      doc.text('Modality: ' + this.userData[0].modality, 45, 140)
      doc.text(
        'Profile responsible: ' +
          this.userData[0].profile_responsible_name +
          ' ' +
          this.userData[0].profile_responsible_surname,
        45,
        160
      )
      doc.text(
        'Advisor: ' +
          this.userData[0].advisor_name +
          ' ' +
          this.userData[0].advisor_surname,
        45,
        180
      )

      doc.text('Fundamental theoretical principles', 40, 240)

      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: 250,
        body: ftpModules
      })

      var finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Technical / scientific modules')

      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: tsmModules
      })

      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Context modules')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: cmModules
      })

      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Projects')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: projectsModules
      })
      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Supplementary modules')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: supplementaryModules
      })
      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Master thesis')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: masterModules
      })
      doc.save('asi.pdf')
    },

    approveAsi: function () {
      // check ftp
      var ftpEcts = this.allFtpAsiModules.reduce(
        (accum, item) => accum + item.ects,
        0
      )
      console.log(ftpEcts)
      if (ftpEcts < this.asiModuleGroups[0].min_ects) {
        this.ftpModulesError = true
      } else {
        this.ftpModulesError = false
      }

      // check tsm
      var tsmEcts = this.allTsmAsiModules.reduce(
        (accum, item) => accum + item.ects,
        0
      )
      console.log(tsmEcts)
      if (tsmEcts < this.asiModuleGroups[1].min_ects) {
        this.tsmModulesError = true
      } else {
        this.tsmModulesError = false
      }

      // check cm
      var cmEcts = this.allCmAsiModules.reduce(
        (accum, item) => accum + item.ects,
        0
      )
      console.log(cmEcts)
      if (cmEcts < this.asiModuleGroups[2].min_ects) {
        this.cmModulesError = true
      } else {
        this.cmModulesError = false
      }

      // check projects
      this.projectsError = false
      for (var i = 0; i < this.asiProjects.lenght; i++) {
        if (
          this.asiProjects[i].ects < this.asiModuleGroups[3].min_ects ||
          this.asiProjects[i].ects > this.asiModuleGroups[3].max_ects
        )
          this.projectsError = true
      }

      if (
        this.asiProjects.length < this.asiModuleGroups[3].min_modules_number ||
        this.asiProjects.length > this.asiModuleGroups[3].max_modules_number
      ) {
        this.numberProjectError = true
      } else {
        this.numberProjectError = false
      }

      // check supplementary
      var supplModulesEcts = this.allSupplementaryModulesAsiModules.reduce(
        (accum, item) => accum + item.ects,
        0
      )
      console.log(supplModulesEcts)
      if (supplModulesEcts < this.asiModuleGroups[4].min_ects) {
        this.supplementaryModulesError = true
      } else {
        this.supplementaryModulesError = false
      }

      // check master
      if (this.asiMasterProject.length < 1) {
        this.minMasterError = true
      } else {
        this.minMasterError = false
      }

      var externalCredits = this.allTsmAsiModules
        .filter((m) => m.id_site !== 1)
        .reduce((accum, item) => accum + item.ects, 0)

      if (externalCredits > 9) {
        this.externalModulesError = true
      } else {
        this.externalModulesError = false
      }

      if (cmEcts + tsmEcts + ftpEcts < 30) {
        this.totalCreditsError = true
      } else {
        this.totalCreditsError = false
      }

      var projectsEcts = this.asiProjects.reduce(
        (accum, item) => accum + item.ects,
        0
      )
      if (supplModulesEcts + projectsEcts < 30) {
        this.totalTechnicalCreditsError = true
      } else {
        this.totalTechnicalCreditsError = false
      }

      if (
        !this.ftpModulesError &&
        !this.tsmModulesError &&
        !this.cmModulesError &&
        !this.supplementaryModulesError &&
        !this.externalModulesError &&
        !this.totalCreditsError
      ) {
        if (
          this.minMasterError ||
          this.numberProjectError ||
          this.totalTechnicalCreditsError
        ) {
          if (confirm('Project and master thesis not defined, continue?')) {
            if (confirm('Do you really want to approve?')) {
              this.advisorApprovation(this.$route.params.studentId)
            }
          }
        } else {
          if (confirm('Do you really want to approve?')) {
            this.advisorApprovation(this.$route.params.studentId)
          }
        }
      }
    },

    removeAsiApprovation: function () {
      if (confirm('Do you really want to remove approvation?')) {
        this.removeAdvisorApprovation(this.$route.params.studentId)
      }
    },

    moduleCredits: function (i) {
      var tot = 0
      if (i === 0) {
        for (const module of this.allFtpAsiModules) {
          const number = parseInt(module.ects)
          if (!isNaN(number)) {
            tot += number
          }
        }
      } else if (i === 1) {
        for (const module of this.allTsmAsiModules) {
          const number = parseInt(module.ects)
          if (!isNaN(number)) {
            tot += number
          }
        }
      } else if (i === 2) {
        for (const module of this.allCmAsiModules) {
          const number = parseInt(module.ects)
          if (!isNaN(number)) {
            tot += number
          }
        }
      }
      return tot
    }
  },
  computed: {
    ...mapGetters(['allFtpAsiModules']),
    ...mapGetters(['allTsmAsiModules']),
    ...mapGetters(['allCmAsiModules']),
    ...mapGetters(['asiProjects']),
    ...mapGetters(['allSupplementaryModulesAsiModules']),
    ...mapGetters(['asiMasterProject']),
    ...mapGetters(['asiStudentState']),
    ...mapGetters(['asiModuleGroups']),
    ...mapGetters(['userData']),

    totalCredits: function () {
      var tot = 0

      for (const module of this.allFtpAsiModules) {
        const number = parseInt(module.ects)
        if (!isNaN(number)) {
          tot += number
        }
      }
      for (const module of this.allTsmAsiModules) {
        const number = parseInt(module.ects)
        if (!isNaN(number)) {
          tot += number
        }
      }
      for (const module of this.allCmAsiModules) {
        const number = parseInt(module.ects)
        if (!isNaN(number)) {
          tot += number
        }
      }
      return tot
    },

    semesterNumberCourses: function () {
      var semesterCourses = [
        { semester: 1, n_courses: 0, credits: 0 },
        { semester: 2, n_courses: 0, credits: 0 },
        { semester: 3, n_courses: 0, credits: 0 },
        { semester: 4, n_courses: 0, credits: 0 },
        { semester: 5, n_courses: 0, credits: 0 },
        { semester: 6, n_courses: 0, credits: 0 }
      ]

      for (const module of this.allFtpAsiModules) {
        const semester = parseInt(module.semester) - 1

        if (!isNaN(semester)) {
          const courseCredits = parseInt(module.ects)

          semesterCourses[semester].n_courses =
            semesterCourses[semester].n_courses + 1
          semesterCourses[semester].credits =
            semesterCourses[semester].credits + courseCredits
        }
      }

      for (const module of this.allTsmAsiModules) {
        const semester = parseInt(module.semester) - 1
        if (!isNaN(semester)) {
          const courseCredits = parseInt(module.ects)

          semesterCourses[semester].n_courses =
            semesterCourses[semester].n_courses + 1
          semesterCourses[semester].credits =
            semesterCourses[semester].credits + courseCredits
        }
      }

      for (const module of this.allCmAsiModules) {
        const semester = parseInt(module.semester) - 1
        if (!isNaN(semester)) {
          const courseCredits = parseInt(module.ects)

          semesterCourses[semester].n_courses =
            semesterCourses[semester].n_courses + 1
          semesterCourses[semester].credits =
            semesterCourses[semester].credits + courseCredits
        }
      }

      return semesterCourses
    }
  },
  watch: {
    allFtpModules: function () {
      if (this.allFtpModules.length !== 0) {
        console.log(this.allFtpModules.length)
      }
    },
    allTsmModules: function () {
      if (this.allTsmModules.length !== 0) {
        console.log(this.allTsmModules.length)
      }
    },
    allCmModules: function () {
      if (this.allCmModules.length !== 0) {
        console.log(this.allCmModules.length)
      }
    },
    asiStudentState: function () {
      if (this.asiStudentState) {
        console.log(this.asiStudentState)
      }
    }
  },
  created() {
    this.fetchFtpAsiStudentModules(this.$route.params.studentId)
    this.fetchTsmAsiStudentModules(this.$route.params.studentId)
    this.fetchCmAsiStudentModules(this.$route.params.studentId)
    this.fetchProjectsAsiStudentModules(this.$route.params.studentId)
    this.fetchSupplementaryModulesAsiStudentModules(
      this.$route.params.studentId
    )
    this.fetchMasterProjectAsiStudentModules(this.$route.params.studentId)
    this.fetchStudentAsiState(this.$route.params.studentId)
    this.fetchStudentAsiModuleGroups(this.$route.params.studentId)

    this.fetchSpecificUserData(this.$route.params.studentId)
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

.asiManagement {
  text-align: center;
}
.title {
  padding: 2%;
}

#approvation {
  text-align: start;
}
</style>
