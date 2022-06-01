<template>
  <Sidebar />
  <div class="asiManagement" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col col-lg-2" style="width: 40%">
                <h4 id="title" class="title">Student informations</h4>
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
            </div>
          </div>

          <!-- <div>
            Advisor approvation:
            <label>{{ asiStudentState.advisor_approvation }}</label>
          </div>

          <div>
            Responsible profile approvation:
            <label>{{ asiStudentState.profile_responsible_approvation }}</label>
          </div> -->

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

// export default {
//   components: { Sidebar },
//   setup() {
//     return { sidebarWidth }
//   }
// }

export default {
  name: 'StudentView',
  data: () => ({
    approved: false
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

    approveAsi: function () {
      if (confirm('Do you really want to approve?')) {
        this.advisorApprovation(this.$route.params.studentId)
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
