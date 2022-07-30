<template>
  <Sidebar />
  <div class="asiManagement" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <div></div>

          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col col-lg-2" style="width: 40%">
                <h4 id="title" class="title">ASI management</h4>
              </div>
              <div class="col-md-auto"></div>
              <div class="col col-lg-2">
                <button
                  id="saveButton"
                  type="button"
                  class="btn btn-secondary"
                  @click="saveAsi"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div
            class="alert alert-danger"
            role="alert"
            v-if="duplicatesError"
            :v-bind:duplicatesError="duplicatesError"
          >
            Some modules are duplicates
          </div>
          <div
            class="alert alert-danger"
            role="alert"
            v-if="emptyField"
            :v-bind:emptyField="emptyField"
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

          <!-- <h1>ASI management</h1> -->

          <!-- <div
            v-for="module in asiModuleGroups"
            :key="module.id_asi_module_group"
          >
            <h5>
              {{ module.id_asi_module_group }},{{ module.asi }} ,
              {{ module.module_group }}
            </h5>
          </div> -->

          <!-- <ASITable
            :ftpModules="allFtpModules"
            :tsmModules="allTsmModules"
            :cmModules="allCmModules"
            :ftpAsiModules="allFtpAsiModules"
            :tsmAsiModules="allTsmAsiModules"
            :cmAsiModules="allCmAsiModules"
          /> -->

          <div id="cardsContainers" class="container pt-3 pb-4">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr>
                      <td colspan="6" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          FTP
                        </label>
                      </td>
                      <td class="table-active">
                        <button
                          id="addFtpButton"
                          type="button"
                          class="btn btn-outline-primary"
                          @click="addNewRow(0)"
                        >
                          <i class="fas fa-plus-circle"></i>
                        </button>
                      </td>
                    </tr>
                    <tr
                      v-for="(module, i) in allFtpAsiModules"
                      :key="module.id_module"
                    >
                      <td colspan="4">
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          @change="onChangeModule($event, 0, i)"
                        >
                          <option
                            v-for="course in allFtpModules"
                            :key="course.id_module"
                            :selected="
                              course.code === module.code ? true : false
                            "
                            :value="course"
                          >
                            <b>Code:</b>
                            &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
                            {{ course.module_name }}, Site:&nbsp;&nbsp;
                            {{ course.site_initials }}, Credits:&nbsp;&nbsp;
                            {{ course.ects }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <label for="exampleColorInput" class="form-label">
                          Semester
                        </label>
                      </td>
                      <td>
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          @change="onChangeSemester($event, 0, i)"
                        >
                          <option
                            v-for="option in options"
                            :key="option"
                            :selected="
                              option === module.semester ? true : false
                            "
                            :value="option"
                          >
                            {{ option }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          @click="deleteRow(0, i)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          TSM
                        </label>
                      </td>
                      <td class="table-active">
                        <button
                          id="addTsmButton"
                          type="button"
                          class="btn btn-outline-primary"
                          @click="addNewRow(1)"
                        >
                          <i class="fas fa-plus-circle"></i>
                        </button>
                      </td>
                    </tr>
                    <tr
                      v-for="(module, i) in allTsmAsiModules"
                      :key="module.id_module"
                    >
                      <td colspan="4">
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          @change="onChangeModule($event, 1, i)"
                        >
                          <option
                            v-for="course in allTsmModules"
                            :key="course.id_module"
                            :selected="
                              course.code === module.code ? true : false
                            "
                          >
                            <b>Code:</b>
                            &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
                            {{ course.module_name }}, Site:&nbsp;&nbsp;
                            {{ course.site_initials }}, Credits:&nbsp;&nbsp;
                            {{ course.ects }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <label for="exampleColorInput" class="form-label">
                          Semester
                        </label>
                      </td>
                      <td>
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          @change="onChangeSemester($event, 1, i)"
                        >
                          <option
                            v-for="option in options"
                            :key="option"
                            :selected="
                              option === module.semester ? true : false
                            "
                            :value="option"
                          >
                            {{ option }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          @click="deleteRow(1, i)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          CM
                        </label>
                      </td>
                      <td class="table-active">
                        <button
                          id="addCmButton"
                          type="button"
                          class="btn btn-outline-primary"
                          @click="addNewRow(2)"
                        >
                          <i class="fas fa-plus-circle"></i>
                        </button>
                      </td>
                    </tr>
                    <tr
                      v-for="(module, i) in allCmAsiModules"
                      :key="module.id_module"
                    >
                      <td colspan="4">
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          @change="onChangeModule($event, 2, i)"
                        >
                          <option
                            v-for="course in allCmModules"
                            :key="course.id_module"
                            :selected="
                              course.code === module.code ? true : false
                            "
                          >
                            <b>Code:</b>
                            &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
                            {{ course.module_name }}, Site:&nbsp;&nbsp;
                            {{ course.site_initials }}, Credits:&nbsp;&nbsp;
                            {{ course.ects }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <label for="exampleColorInput" class="form-label">
                          Semester
                        </label>
                      </td>
                      <td>
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          @change="onChangeSemester($event, 2, i)"
                        >
                          <option
                            v-for="option in options"
                            :key="option"
                            :selected="
                              option === module.semester ? true : false
                            "
                            :value="option"
                          >
                            {{ option }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          @click="deleteRow(2, i)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
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
                <h4>Module group credits</h4>

                <table class="table table-light">
                  <thead>
                    <tr>
                      <td>Module group</td>
                      <td>Credits</td>
                      <td>Missing credits</td>
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
                      <td>
                        <label
                          v-if="9 - moduleCredits(0) >= 0"
                          for="exampleInputEmail1"
                          class="form-label"
                        >
                          {{ 9 - moduleCredits(0) }}
                        </label>
                        <label v-else>0</label>
                      </td>
                    </tr>
                    <tr>
                      <td>TSM</td>
                      <td>
                        <label for="exampleInputEmail1" class="form-label">
                          {{ moduleCredits(1) }}
                        </label>
                      </td>
                      <td>
                        <label
                          v-if="9 - moduleCredits(1) >= 0"
                          for="exampleInputEmail1"
                          class="form-label"
                        >
                          {{ 12 - moduleCredits(1) }}
                        </label>
                        <label v-else>0</label>
                      </td>
                    </tr>
                    <tr>
                      <td>CM</td>
                      <td>
                        <label for="exampleInputEmail1" class="form-label">
                          {{ moduleCredits(2) }}
                        </label>
                      </td>
                      <td>
                        <label
                          v-if="9 - moduleCredits(2) >= 0"
                          for="exampleInputEmail1"
                          class="form-label"
                        >
                          {{ 6 - moduleCredits(2) }}
                        </label>
                        <label v-else>0</label>
                      </td>
                    </tr>

                    <tr>
                      <td>Total</td>
                      <td>
                        <p>
                          {{ totalCredits }}
                        </p>
                      </td>
                      <td>
                        <p v-if="30 - totalCredits >= 0">
                          {{ 30 - totalCredits }}
                        </p>
                        <p v-else>0</p>
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
                <h4>Course semester balancing</h4>

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
  name: 'AsiManagementView',
  data: () => ({
    duplicatesError: false,
    pageSaved: false,
    options: ['1', '2', '3', '4', '5', '6'],

    // logs: {
    //   deletedRow: [],
    //   insertedRow: [],
    //   updatedRow: []
    // }

    logs: []
  }),
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
     ...mapActions(['fetchUserData']),
    ...mapActions(['fetchOldFtpAsiModules']),
    ...mapActions(['fetchOldTsmAsiModules']),
    ...mapActions(['fetchOldCmAsiModules']),

    ...mapActions(['fetchFtpModules']),
    ...mapActions(['fetchTsmModules']),
    ...mapActions(['fetchCmModules']),

    ...mapActions(['fetchFtpAsiModules']),
    ...mapActions(['fetchTsmAsiModules']),
    ...mapActions(['fetchCmAsiModules']),

    ...mapActions(['fetchAsiModuleGroups']),
    ...mapActions(['updateAsi']),
    ...mapActions(['removeProfileResponsibleApprovation']),
    ...mapActions(['removeAdvisorApprovation']),
    ...mapActions(['sendLogs']),
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['sendEmail']),
    ...mapActions(['fetchStudentAsiState']),

    checkDuplicates: function (array) {
      var valueArr = array.map(function (item) {
        return item.id_module
      })
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx
      })
      return isDuplicate
    },

    // calculateLogs: function (newModules, oldModules) {
    //   var insertedElement = newModules
    //     .filter(
    //       (item1) =>
    //         !oldModules.some((item2) => item2.id_module === item1.id_module)
    //     )
    //     .slice()
    //   this.logs.insertedRow.push(insertedElement)

    //   var deletedElement = oldModules
    //     .filter(
    //       (item1) =>
    //         !newModules.some((item2) => item2.id_module === item1.id_module)
    //     )
    //     .slice()

    //   this.logs.deletedRow.push(deletedElement)

    //   var updateElement = []
    //   var commonNew = newModules
    //     .slice()
    //     .filter((item1) =>
    //       oldModules.some((item2) => item2.id_module === item1.id_module)
    //     )

    //   var commonOld = oldModules
    //     .slice()
    //     .filter((item1) =>
    //       newModules.some((item2) => item2.id_module === item1.id_module)
    //     )

    //   for (var i = 0; i < commonNew.length; i++) {
    //     if (commonNew[i].semester !== commonOld[i].semester) {
    //       commonNew[i].old_value = commonOld[i].semester
    //       commonNew[i].new_value = commonNew[i].semester
    //       commonNew[i].field = 1
    //       updateElement.push(commonNew[i])
    //     }
    //   }

    //   this.logs.updatedRow.push(updateElement)
    // },

    calculateLogs: function (newModules, oldModules) {
      var insertedElement = newModules
        .filter(
          (item1) =>
            !oldModules.some((item2) => item2.id_module === item1.id_module)
        )
        .slice()

      for (var j = 0; j < insertedElement.length; j++) {
        insertedElement[j].action = 1
      }
      this.logs.push(insertedElement)
      //this.logs.insertedRow.push(insertedElement)

      var deletedElement = oldModules
        .filter(
          (item1) =>
            !newModules.some((item2) => item2.id_module === item1.id_module)
        )
        .slice()

      for (var k = 0; k < deletedElement.length; k++) {
        deletedElement[k].action = 2
      }
      this.logs.push(deletedElement)

      //this.logs.deletedRow.push(deletedElement)

      var updateElement = []
      var commonNew = newModules
        .slice()
        .filter((item1) =>
          oldModules.some((item2) => item2.id_module === item1.id_module)
        )

      var commonOld = oldModules
        .slice()
        .filter((item1) =>
          newModules.some((item2) => item2.id_module === item1.id_module)
        )

      for (var i = 0; i < commonNew.length; i++) {
        if (commonNew[i].semester !== commonOld[i].semester) {
          commonNew[i].old_value = commonOld[i].semester
          commonNew[i].new_value = commonNew[i].semester
          commonNew[i].field = 1
          commonNew[i].action = 3
          updateElement.push(commonNew[i])
        }
      }
      this.logs.push(updateElement)
      //this.logs.updatedRow.push(updateElement)
    },
    saveAsi: function () {
      var duplicatesCmModules = this.checkDuplicates(this.allCmAsiModules)
      var duplicatesTsmModules = this.checkDuplicates(this.allTsmAsiModules)
      var duplicatesFtpModules = this.checkDuplicates(this.allFtpAsiModules)

      if (duplicatesCmModules || duplicatesTsmModules || duplicatesFtpModules) {
        this.duplicatesError = true
        this.pageSaved = false
      } else {
        this.duplicatesError = false
        this.pageSaved = false
        if (confirm('Do you really want to save?')) {
          // this.logs.deletedRow = []
          // this.logs.insertedRow = []
          // this.logs.updatedRow = []

          this.logs = []

          this.calculateLogs(this.allFtpAsiModules, this.oldFtpAsiModules)
          this.calculateLogs(this.allTsmAsiModules, this.oldTsmAsiModules)
          this.calculateLogs(this.allCmAsiModules, this.oldCmAsiModules)

          var newModules = {
            asiModuleGroups: JSON.parse(JSON.stringify(this.asiModuleGroups)),
            allFtpAsiModules: JSON.parse(JSON.stringify(this.allFtpAsiModules)),
            allTsmAsiModules: JSON.parse(JSON.stringify(this.allTsmAsiModules)),
            allCmAsiModules: JSON.parse(JSON.stringify(this.allCmAsiModules))
          }

          var logs = this.logs.reduce(
            (a, e) => (Array.isArray(e) ? a.concat(e) : a.concat([e])),
            []
          )
          this.updateAsi({
            newModules
          })

          this.sendLogs({ logs })          
          this.sendEmail({
              To: this.userData[0].advisor_email,
              Subject: "ASI Approvation request",
              Body: "The student " + this.userData[0].student_name + " " + this.userData[0].student_surname 
                  + " send a request for approvation." 
          })

          this.pageSaved = true
          this.removeProfileResponsibleApprovation(this.loggedUser.AsiUserId)
          this.removeAdvisorApprovation(this.loggedUser.AsiUserId)
        }
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
    },
    onChangeSemester(event, i, k) {
      //const newSemester = parseInt(event.target.value)
      const newSemester = event.target.value
      if (i === 0) {
        this.allFtpAsiModules[k].semester = newSemester
      } else if (i === 1) {
        this.allTsmAsiModules[k].semester = newSemester
      } else if (i === 2) {
        this.allCmAsiModules[k].semester = newSemester
      }
    },
    onChangeModule(event, i, k) {
      if (i === 0) {
        ;(this.allFtpAsiModules[k].id_module =
          this.allFtpModules[event.target.selectedIndex].id_module),
          (this.allFtpAsiModules[k].code =
            this.allFtpModules[event.target.selectedIndex].code),
          (this.allFtpAsiModules[k].module_name =
            this.allFtpModules[event.target.selectedIndex].module_name),
          (this.allFtpAsiModules[k].ects =
            this.allFtpModules[event.target.selectedIndex].ects),
          (this.allFtpAsiModules[k].module_group_initials =
            this.allFtpModules[
              event.target.selectedIndex
            ].module_group_initials),
          (this.allFtpAsiModules[k].responsible_name =
            this.allFtpModules[event.target.selectedIndex].responsible_name),
          (this.allFtpAsiModules[k].responsible_surname =
            this.allFtpModules[event.target.selectedIndex].responsible_surname),
          (this.allFtpAsiModules[k].site =
            this.allFtpModules[event.target.selectedIndex].site),
          (this.allFtpAsiModules[k].site_initials =
            this.allFtpModules[event.target.selectedIndex].site_initials)
      } else if (i === 1) {
        ;(this.allTsmAsiModules[k].id_module =
          this.allTsmModules[event.target.selectedIndex].id_module),
          (this.allTsmAsiModules[k].code =
            this.allTsmModules[event.target.selectedIndex].code),
          (this.allTsmAsiModules[k].module_name =
            this.allTsmModules[event.target.selectedIndex].module_name),
          (this.allTsmAsiModules[k].ects =
            this.allTsmModules[event.target.selectedIndex].ects),
          (this.allTsmAsiModules[k].module_group_initials =
            this.allTsmModules[
              event.target.selectedIndex
            ].module_group_initials),
          (this.allTsmAsiModules[k].responsible_name =
            this.allTsmModules[event.target.selectedIndex].responsible_name),
          (this.allTsmAsiModules[k].responsible_surname =
            this.allTsmModules[event.target.selectedIndex].responsible_surname),
          (this.allTsmAsiModules[k].site =
            this.allTsmModules[event.target.selectedIndex].site),
          (this.allTsmAsiModules[k].site_initials =
            this.allTsmModules[event.target.selectedIndex].site_initials)
      } else if (i === 2) {
        ;(this.allCmAsiModules[k].id_module =
          this.allCmModules[event.target.selectedIndex].id_module),
          (this.allCmAsiModules[k].code =
            this.allCmModules[event.target.selectedIndex].code),
          (this.allCmAsiModules[k].module_name =
            this.allCmModules[event.target.selectedIndex].module_name),
          (this.allCmAsiModules[k].ects =
            this.allCmModules[event.target.selectedIndex].ects),
          (this.allCmAsiModules[k].module_group_initials =
            this.allCmModules[
              event.target.selectedIndex
            ].module_group_initials),
          (this.allCmAsiModules[k].responsible_name =
            this.allCmModules[event.target.selectedIndex].responsible_name),
          (this.allCmAsiModules[k].responsible_surname =
            this.allCmModules[event.target.selectedIndex].responsible_surname),
          (this.allCmAsiModules[k].site =
            this.allCmModules[event.target.selectedIndex].site),
          (this.allCmAsiModules[k].site_initials =
            this.allCmModules[event.target.selectedIndex].site_initials)
      }
    },
    deleteRow(i, k) {
      if (confirm('Do you really want to delete?')) {
        if (i === 0) {
          this.allFtpAsiModules.splice(k, 1)
        } else if (i === 1) {
          this.allTsmAsiModules.splice(k, 1)
        } else if (i === 2) {
          this.allCmAsiModules.splice(k, 1)
        }
      }
    },
    addNewRow(i) {
      if (i === 0) {
        this.allFtpAsiModules.push({
          id_module: this.allFtpModules[0].id_module,
          code: this.allFtpModules[0].code,
          module_name: this.allFtpModules[0].module_name,
          ects: this.allFtpModules[0].ects,
          semester: 1,
          module_group_initials: this.allFtpModules[0].module_group_initials,
          responsible_name: this.allFtpModules[0].responsible_name,
          responsible_surname: this.allFtpModules[0].responsible_surname,
          site: this.allFtpModules[0].site,
          site_initials: this.allFtpModules[0].site_initials
        })
      } else if (i === 1) {
        this.allTsmAsiModules.push({
          id_module: this.allTsmModules[0].id_module,
          code: this.allTsmModules[0].code,
          module_name: this.allTsmModules[0].module_name,
          ects: this.allTsmModules[0].ects,
          semester: 1,
          module_group_initials: this.allTsmModules[0].module_group_initials,
          responsible_name: this.allTsmModules[0].responsible_name,
          responsible_surname: this.allTsmModules[0].responsible_surname,
          site: this.allTsmModules[0].site,
          site_initials: this.allTsmModules[0].site_initials
        })
      } else if (i === 2) {
        this.allCmAsiModules.push({
          id_module: this.allCmModules[0].id_module,
          code: this.allCmModules[0].code,
          module_name: this.allCmModules[0].module_name,
          ects: this.allCmModules[0].ects,
          semester: 1,
          module_group_initials: this.allCmModules[0].module_group_initials,
          responsible_name: this.allCmModules[0].responsible_name,
          responsible_surname: this.allCmModules[0].responsible_surname,
          site: this.allCmModules[0].site,
          site_initials: this.allCmModules[0].site_initials
        })
      }

      // console.log(this.oldFtpAsiModules)
      // console.log(this.oldTsmAsiModules)
      // console.log(this.oldCmAsiModules)
    }
  },
  computed: {

    ...mapGetters(['userData']),
    ...mapGetters(['allFtpModules']),
    ...mapGetters(['allTsmModules']),
    ...mapGetters(['allCmModules']),
    ...mapGetters(['allFtpAsiModules']),
    ...mapGetters(['allTsmAsiModules']),
    ...mapGetters(['allCmAsiModules']),

    ...mapGetters(['oldFtpAsiModules']),
    ...mapGetters(['oldTsmAsiModules']),
    ...mapGetters(['oldCmAsiModules']),

    ...mapGetters(['asiModuleGroups']),
    ...mapGetters(['loggedUser']),
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
    }

    // allFtpAsiModules: function () {
    //   console.log(this.allFtpAsiModules.length)
    // },
    // allTsmAsiModules: function () {
    //   console.log(this.allTsmAsiModules.length)
    // },
    // allCmAsiModules: function () {
    //   console.log(this.allCmAsiModules.length)
    // },

    // oldFtpAsiModules: function () {
    //   console.log(this.oldFtpAsiModules)
    // },
    // oldTsmAsiModules: function () {
    //   console.log(this.oldTsmAsiModules)
    // },
    // oldCmAsiModules: function () {
    //   console.log(this.oldCmAsiModules)
    // }
  },
  created() {
    this.fetchFtpModules()
    this.fetchTsmModules()
    this.fetchCmModules()

    this.fetchFtpAsiModules()
    this.fetchTsmAsiModules()
    this.fetchCmAsiModules()
    this.fetchAsiModuleGroups()

    this.fetchOldFtpAsiModules()
    this.fetchOldTsmAsiModules()
    this.fetchOldCmAsiModules()

    this.fetchUserData()
    this.fetchStudentAsiState(this.loggedUser.AsiUserId)


    
  }
  // mounted() {
  //   console.log('Mount')
  // }
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
  align-content: center;
}
.asiManagement {
  text-align: center;
}
.title {
  padding: 2%;
}
/* #title {
  float: left;
  overflow: hidden;
}
#saveButton {
  float: left;
  overflow: hidden;
} */
</style>