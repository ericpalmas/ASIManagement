
   
<template>
  <Sidebar />
  <div class="asiManagement" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col col-lg-2" style="width: 60%">
                <h4 id="title" class="title">
                  Technical specialization with an MRU
                </h4>
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
            v-if="notContiguousError"
            :v-bind:notContiguousError="notContiguousError"
          >
            Project semesters must be contigous
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
            class="alert alert-danger"
            role="alert"
            v-if="emptySemester"
            :v-bind:emptySemester="emptySemester"
          >
            No semester selected
          </div>

          <div
            class="alert alert-success"
            role="alert"
            v-if="pageSaved"
            :v-bind:pageSaved="pageSaved"
          >
            Page saved correctly
          </div>

          <!-- <div v-else-if="notContiguousError === false">prova</div> -->
          <!-- <div
            v-for="module in asiModuleGroups"
            :key="module.id_asi_module_group"
          >
            <h5>{{ module.id_asi_module_group }}</h5>
          </div> -->

          <!-- table table-light -->
          <table class="table table-light">
            <thead>
              <tr>
                <td colspan="1">Code</td>
                <td colspan="2">Module title</td>
                <td colspan="1">ECTS</td>
                <td colspan="1">Tutor</td>
                <td colspan="1">Semester</td>
                <td colspan="1"></td>
              </tr>
            </thead>
            <!-- asiProjects -->
            <tbody>
              <tr>
                <td colspan="6" class="table-active">
                  <label for="exampleColorInput" class="form-label">
                    asiProjects
                  </label>
                </td>
                <td class="table-active">
                  <button
                    id="addProjectButton"
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addNewRow(0)"
                    :disabled="asiProjects.length === 2"
                  >
                    <i class="fas fa-plus-circle"></i>
                  </button>
                </td>
              </tr>
              <tr
                v-for="(project, i) in asiProjects"
                :key="i"
                style="width: 100%"
              >
                <td span="1" style="width: 15%">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="code"
                    aria-label="default input example"
                    v-model="project.code"
                    @change="onChangeCode($event, 0, i)"
                  />
                </td>
                <td colspan="2">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="module name"
                    aria-label="default input example"
                    v-model="project.module_name"
                    @change="onChangeModuleName($event, 0, i)"
                  />
                </td>
                <td colspan="1" span="1" style="width: 10%">
                  <input
                    class="form-control"
                    type="number"
                    placeholder="ects"
                    aria-label="default input example"
                    v-model="project.ects"
                    min="9"
                    max="15"
                    @change="onChangeEcts($event, 0, i)"
                  />
                </td>
                <td colspan="1" span="1" style="width: 17%">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeResponsible($event, 0, i)"
                  >
                    <option
                      v-for="advisor in advisors"
                      :key="advisor.id_asi_user"
                      :value="advisor.id_asi_user"
                      :selected="
                        advisor.id_asi_user === project.responsible
                          ? true
                          : false
                      "
                    >
                      {{ advisor.name }}&nbsp;
                      {{ advisor.surname }}
                    </option>
                  </select>
                </td>
                <td colspan="1" span="1" style="width: 10%">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li v-for="(option, k) in options" :key="k">
                      <a class="dropdown-item">
                        <div
                          v-if="project.semester.split(',').includes(option)"
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            @change="
                              updateProjectSemester(0, i, $event, option)
                            "
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            &nbsp; {{ option }}
                          </label>
                        </div>
                        <div v-else>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            @change="
                              updateProjectSemester(0, i, $event, option)
                            "
                          />

                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            &nbsp; {{ option }}
                          </label>
                        </div>
                      </a>
                    </li>
                  </ul>
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
            </tbody>
            <!-- Supplementary modules -->
            <tbody>
              <tr>
                <td colspan="6" class="table-active">
                  <label for="exampleColorInput" class="form-label">
                    Supplementary modules
                  </label>
                </td>
                <td class="table-active">
                  <button
                    id="addSupplementaryModuleButton"
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addNewRow(1)"
                  >
                    <i class="fas fa-plus-circle"></i>
                  </button>
                </td>
              </tr>
              <tr
                v-for="(module, i) in allSupplementaryModulesAsiModules"
                :key="module.id_module"
                style="width: 100%"
              >
                <td colspan="4">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeModule($event, 1, i)"
                  >
                    <option
                      v-for="course in allSupplementaryModules"
                      :key="course.id_module"
                      :selected="
                        course.id_module === module.id_module ? true : false
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
                <td colspan="1" span="1" style="width: 10%"></td>
                <td colspan="1" span="1" style="width: 10%">
                  <!-- <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeSemester($event, 1, i)"
                  >
                    <option
                      v-for="(option, k) in options"
                      :key="k"
                      :selected="option === module.semester ? true : false"
                    >
                      {{ option }}
                    </option>
                  </select> -->

                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeSemester($event, 1, i)"
                  >
                    <option
                      v-for="option in options"
                      :key="option"
                      :selected="option === module.semester ? true : false"
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
            </tbody>
            <!-- Master -->
            <tbody>
              <tr>
                <td colspan="6" class="table-active">
                  <label for="exampleColorInput" class="form-label">
                    Master
                  </label>
                </td>
                <td class="table-active">
                  <button
                    id="addMasterThesisButton"
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addNewRow(2)"
                    :disabled="asiMasterProject.length === 1"
                  >
                    <i class="fas fa-plus-circle"></i>
                  </button>
                </td>
              </tr>
              <tr
                v-for="(project, i) in asiMasterProject"
                :key="i"
                style="width: 100%"
              >
                <td span="1" style="width: 15%">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="code"
                    aria-label="default input example"
                    v-model="project.code"
                  />
                </td>
                <td colspan="2">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="module name"
                    aria-label="default input example"
                    v-model="project.module_name"
                  />
                </td>
                <td colspan="1" span="1" style="width: 10%">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="ects"
                    aria-label="default input example"
                    disabled
                    v-model="project.ects"
                  />
                </td>
                <td colspan="1" span="1" style="width: 17%">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeResponsible($event, 2, i)"
                  >
                    <option
                      v-for="advisor in advisors"
                      :key="advisor.id_asi_user"
                      :value="advisor.id_asi_user"
                      :selected="
                        advisor.id_asi_user === project.responsible
                          ? true
                          : false
                      "
                    >
                      {{ advisor.name }}&nbsp;
                      {{ advisor.surname }}
                    </option>
                  </select>
                </td>

                <td colspan="1" span="1" style="width: 10%">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li v-for="(option, k) in options" :key="k">
                        <a class="dropdown-item">
                          <div
                            v-if="project.semester.split(',').includes(option)"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                              @change="
                                updateProjectSemester(2, i, $event, option)
                              "
                              checked
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              &nbsp; {{ option }}
                            </label>
                          </div>
                          <div v-else>
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                              @change="
                                updateProjectSemester(2, i, $event, option)
                              "
                            />

                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              &nbsp; {{ option }}
                            </label>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
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
  </div>
</template>




<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'AsiTechnicalSpecializationManagementView',
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    values: [],
    options: ['1', '2', '3', '4', '5', '6'],
    notContiguousError: false,
    duplicatesError: false,
    emptyField: false,
    pageSaved: false,
    emptySemester: false,
    logs: []
  }),

  methods: {
    ...mapActions(['fetchOldProjects']),
    ...mapActions(['fetchOldAsiSupplementaryModules']),
    ...mapActions(['fetchOldAsiMasterProject']),

    ...mapActions(['fetchProjects']),
    ...mapActions(['fetchSupplementaryModules']),
    ...mapActions(['fetchAsiSupplementaryModules']),

    ...mapActions(['fetchAsiMasterProject']),
    ...mapActions(['fetchAsiModuleGroups']),
    ...mapActions(['fetchAdvisors']),
    ...mapActions(['updateTechnicalAsi']),
    ...mapActions(['removeProfileResponsibleApprovation']),
    ...mapActions(['removeAdvisorApprovation']),
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['sendLogs']),

    checkContiguous: function (stringSemester) {
      var array = stringSemester.split(',')
      var sortedArray = array.map((i) => Number(i)).sort()
      var error = false
      for (var i = 0; i < sortedArray.length; i++) {
        if (i !== 0) {
          if (sortedArray[i] - sortedArray[i - 1] !== 1) error = true
        }
      }
      return error
    },

    checkDuplicates: function (array) {
      var valueArr = array.map(function (item) {
        return item.id_module
      })
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx
      })
      return isDuplicate
    },

    checkEmptyField: function (array) {
      var emptyField = false
      for (var i = 0; i < array.length; i++) {
        if (array[i].code === '') emptyField = true
        if (array[i].module_name === '') emptyField = true
      }
      return emptyField
    },

    calculateProjectLogs: function (newModules, oldModules) {
      var insertedElement = newModules
        .filter(
          (item1) =>
            !oldModules.some(
              (item2) =>
                item2.code === item1.code || item2.id_module === item1.id_module
            )
        )
        .slice()

      for (var k = 0; k < insertedElement.length; k++) {
        insertedElement[k].action = 1
      }
      this.logs.push(insertedElement)
      //this.logs.insertedRow.push(insertedElement)

      var deletedElement = oldModules
        .filter(
          (item1) =>
            !newModules.some(
              (item2) =>
                item2.code === item1.code || item2.id_module === item1.id_module
            )
        )

        .slice()

      for (var j = 0; j < deletedElement.length; j++) {
        deletedElement[j].action = 2
      }
      this.logs.push(deletedElement)
      //this.logs.deletedRow.push(deletedElement)

      console.log(oldModules)
      console.log(newModules)

      var updateElement = []

      for (var i = 0; i < newModules.length; i++) {
        for (var u = 0; u < oldModules.length; u++) {
          if (oldModules[u].id_module == newModules[i].id_module) {

            if (newModules[i].semester !== oldModules[u].semester) {

              const update = {...newModules[i]}   
              update.old_value = oldModules[u].semester
              update.new_value = newModules[i].semester
              update.field = 1
              update.action = 3
              updateElement.push(update)          
            }

            if (newModules[i].ects !== oldModules[u].ects) {
        

              const update = {...newModules[i]}   
              update.old_value = oldModules[u].ects
              update.new_value = newModules[i].ects
              update.field = 2
              update.action = 3
              updateElement.push(update)          
            }
            if (newModules[i].responsible !== oldModules[u].responsible) {
     
              const update = {...newModules[i]}   
              update.old_value = oldModules[u].responsible
              update.new_value = newModules[i].responsible
              update.field = 3
              update.action = 3
              updateElement.push(update)          

            }

            if (newModules[i].code !== oldModules[u].code) {
                     
              const update = {...newModules[i]}   
              update.old_value = oldModules[u].code
              update.new_value = newModules[i].code
              update.field = 4
              update.action = 3
              updateElement.push(update)          

            }
            if (newModules[i].module_name !== oldModules[u].module_name) {
                       
              const update = {...newModules[i]}   
              update.old_value = oldModules[u].module_name
              update.new_value = newModules[i].module_name
              update.field = 5
              update.action = 3
              updateElement.push(update)

            }
            
          }
        }
      }

      this.logs.push(updateElement)
    },

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
      var firstProjectControl = false
      var secondProjectControl = false
      var masterProjectControl = false

      if (this.asiProjects[0] !== undefined) {
        firstProjectControl = this.checkContiguous(this.asiProjects[0].semester)
      }
      if (this.asiProjects[1] !== undefined) {
        secondProjectControl = this.checkContiguous(
          this.asiProjects[1].semester
        )
      }
      if (this.asiMasterProject[0] !== undefined) {
        masterProjectControl = this.checkContiguous(
          this.asiMasterProject[0].semester
        )
      }
      var duplicatesSupplementaryModules = this.checkDuplicates(
        this.allSupplementaryModulesAsiModules
      )
      var emptyFieldProject = this.checkEmptyField(this.asiProjects)
      var emptyFieldMaster = this.checkEmptyField(this.asiMasterProject)

      if (firstProjectControl || secondProjectControl || masterProjectControl) {
        this.notContiguousError = true
        this.pageSaved = false
      } else if (duplicatesSupplementaryModules) {
        this.duplicatesError = true
        this.pageSaved = false
      } else if (emptyFieldProject || emptyFieldMaster) {
        this.emptyField = true
        this.pageSaved = false
      } else {
        if (confirm('Do you really want to save?')) {
          console.log('VECCHI')
          console.log(this.oldProjects)
          console.log(this.oldAsiSupplementaryModules)
          console.log(this.oldAsiMasterProject)

          console.log('NUOVI')
          console.log(this.asiProjects)
          console.log(this.allSupplementaryModulesAsiModules)
          console.log(this.asiMasterProject)

          // this.logs.deletedRow = []
          // this.logs.insertedRow = []
          // this.logs.updatedRow = []

          this.logs = []

          this.calculateProjectLogs(this.asiProjects, this.oldProjects)
          this.calculateLogs(
            this.allSupplementaryModulesAsiModules,
            this.oldAsiSupplementaryModules
          )
          this.calculateProjectLogs(
            this.asiMasterProject,
            this.oldAsiMasterProject
          )

          this.notContiguousError = false
          this.emptyField = false
          this.duplicatesError = false
          this.pageSaved = false
          this.emptySemester = false

          var newModules = {
            asiModuleGroups: JSON.parse(JSON.stringify(this.asiModuleGroups)),
            asiProjects: JSON.parse(JSON.stringify(this.asiProjects)),
            allSupplementaryModulesAsiModules: JSON.parse(
              JSON.stringify(this.allSupplementaryModulesAsiModules)
            ),
            asiMasterProject: JSON.parse(JSON.stringify(this.asiMasterProject))
          }

          if (newModules.asiProjects[0] !== undefined) {
            newModules.asiProjects[0].firstProjectValues =
              this.asiProjects[0].semester.split(',')

            //console.log(newModules.asiProjects[0].firstProjectValues)
          }
          if (newModules.asiProjects[1] !== undefined) {
            newModules.asiProjects[1].secondProjectValues =
              this.asiProjects[1].semester.split(',')

            //console.log(newModules.asiProjects[1].secondProjectValues)
          }
          if (newModules.asiMasterProject[0] !== undefined) {
            newModules.asiMasterProject[0].masterProjectValues =
              this.asiMasterProject[0].semester.split(',')

            console.log(newModules.asiMasterProject[0].masterProjectValues)
            console.log('CONTROLLARE CHE I SEMEStri SIANO VUOTI')
          }

          var logs = this.logs.reduce(
            (a, e) => (Array.isArray(e) ? a.concat(e) : a.concat([e])),
            []
          )
          this.updateTechnicalAsi({
            newModules
          })
          this.sendLogs({ logs })

          //this.sendLogs({ logs })

          this.pageSaved = true
          this.removeProfileResponsibleApprovation(this.loggedUser.AsiUserId)
          this.removeAdvisorApprovation(this.loggedUser.AsiUserId)
        }
      }
    },

    splitAndJoin: function (stringSemester, e, option) {
      var semesterArray = stringSemester.split(',')
      if (e.target.checked === true) {
        semesterArray.push(option)
      } else {
        var index = semesterArray.indexOf(option)
        semesterArray.splice(index, 1)
      }
      var reverse = semesterArray.join(',')
      if (reverse.charAt(0) === ',') {
        reverse = reverse.substring(1)
      }
      return reverse
    },

    updateProjectSemester(i, k, e, option) {
      if (i === 0) {
        this.asiProjects[k].semester = this.splitAndJoin(
          this.asiProjects[k].semester,
          e,
          option
        )
        //console.log(this.asiProjects[k].semester)
      } else if (i === 2) {
        this.asiMasterProject[k].semester = this.splitAndJoin(
          this.asiMasterProject[k].semester,
          e,
          option
        )
        //console.log(this.asiMasterProject[k].semester)
      }
    },

    // mettere controllo prima di cancellare una riga
    deleteRow(i, k) {
      if (confirm('Do you really want to delete?')) {
        if (i === 0) {
          this.asiProjects.splice(k, 1)
        } else if (i === 1) {
          this.allSupplementaryModulesAsiModules.splice(k, 1)
        } else if (i === 2) {
          this.asiMasterProject.splice(k, 1)
        }
      }
    },
    addNewRow(i) {
      if (i === 0) {
        this.asiProjects.push({
          id_module: -1,
          code: '',
          module_name: '',
          ects: 15,
          semester: '1',
          responsible: this.advisors[0].id_asi_user
        })
        // if (this.asiProjects.length === 1) this.firstProjectValues = ['1']
        // else if (this.asiProjects.length === 2) this.secondProjectValues = ['1']
      } else if (i === 1) {
        this.allSupplementaryModulesAsiModules.push({
          id_module: this.allSupplementaryModules[0].id_module,
          code: this.allSupplementaryModules[0].code,
          module_name: this.allSupplementaryModules[0].module_name,
          ects: this.allSupplementaryModules[0].ects,
          semester: 1,
          module_group_initials:
            this.allSupplementaryModules[0].module_group_initials,
          responsible_name: this.allSupplementaryModules[0].responsible_name,
          responsible_surname:
            this.allSupplementaryModules[0].responsible_surname,
          site: this.allSupplementaryModules[0].site,
          site_initials: this.allSupplementaryModules[0].site_initials
        })
      } else if (i === 2) {
        this.asiMasterProject.push({
          id_module: -1,
          code: '',
          module_name: '',
          ects: 30,
          semester: '1',
          responsible: this.advisors[0].id_asi_user
        })
        //if (this.asiMasterProject.length === 1) this.masterProjectValues = ['1']
      }
    },
    onChangeResponsible(event, i, k) {
      const newResponsible = parseInt(event.target.value)
      //console.log(newResponsible)
      if (i === 0) {
        this.asiProjects[k].responsible = newResponsible
      } else if (i === 1) {
        this.asiProjects[k].responsible = newResponsible
      } else if (i === 2) {
        this.asiMasterProject[k].responsible = newResponsible
      }
    },
    onChangeSemester(event, i, k) {
      //const newSemester = parseInt(event.target.value)
      const newSemester = event.target.value

      //console.log(event.target.value)
      if (i === 0) {
        this.asiProjects[k].semester = newSemester
      } else if (i === 1) {
        this.allSupplementaryModulesAsiModules[k].semester = newSemester
      } else if (i === 2) {
        this.asiMasterProject[k].semester = newSemester
      }
    },
    onChangeEcts(event, i, k) {
      const newEcts = parseInt(event.target.value)
      //console.log(event.target.value, i, k)
      if (i === 0) {
        this.asiProjects[k].ects = newEcts
      } else if (i === 1) {
        this.allSupplementaryModulesAsiModules[k].ects = newEcts
      } else if (i === 2) {
        this.asiMasterProject[k].ects = newEcts
      }
    },
    onChangeCode(event, i, k) {
      const newCode = event.target.value
      //(event.target.value, i, k)
      if (i === 0) {
        this.asiProjects[k].code = newCode
      } else if (i === 1) {
        this.allSupplementaryModulesAsiModules[k].code = newCode
      } else if (i === 2) {
        this.asiMasterProject[k].code = newCode
      }
    },
    onChangeModuleName(event, i, k) {
      const newModuleName = event.target.value
      //console.log(event.target.value, i, k)
      if (i === 0) {
        this.asiProjects[k].module_name = newModuleName
      } else if (i === 1) {
        this.allSupplementaryModulesAsiModules[k].module_name = newModuleName
      } else if (i === 2) {
        this.asiMasterProject[k].module_name = newModuleName
      }
    },
    onChangeModule(event, i, k) {
      if (i === 1) {
        ;(this.allSupplementaryModulesAsiModules[k].id_module =
          this.allSupplementaryModules[event.target.selectedIndex].id_module),
          (this.allSupplementaryModulesAsiModules[k].code =
            this.allSupplementaryModules[event.target.selectedIndex].code),
          (this.allSupplementaryModulesAsiModules[k].module_name =
            this.allSupplementaryModules[
              event.target.selectedIndex
            ].module_name),
          (this.allSupplementaryModulesAsiModules[k].ects =
            this.allSupplementaryModules[event.target.selectedIndex].ects),
          (this.allSupplementaryModulesAsiModules[k].module_group_initials =
            this.allSupplementaryModules[
              event.target.selectedIndex
            ].module_group_initials),
          (this.allSupplementaryModulesAsiModules[k].responsible_name =
            this.allSupplementaryModules[
              event.target.selectedIndex
            ].responsible_name),
          (this.allSupplementaryModulesAsiModules[k].responsible_surname =
            this.allSupplementaryModules[
              event.target.selectedIndex
            ].responsible_surname),
          (this.allSupplementaryModulesAsiModules[k].site =
            this.allSupplementaryModules[event.target.selectedIndex].site),
          (this.allSupplementaryModulesAsiModules[k].site_initials =
            this.allSupplementaryModules[
              event.target.selectedIndex
            ].site_initials)
      }
    }
  },
  computed: {
    ...mapGetters(['asiProjects']),
    ...mapGetters(['allSupplementaryModulesAsiModules']),
    ...mapGetters(['asiMasterProject']),

    ...mapGetters(['oldProjects']),
    ...mapGetters(['oldAsiSupplementaryModules']),
    ...mapGetters(['oldAsiMasterProject']),

    ...mapGetters(['advisors']),
    ...mapGetters(['allSupplementaryModules']),
    ...mapGetters(['asiModuleGroups']),
    ...mapGetters(['loggedUser'])
  },
  watch: {
    // asiProjects: function () {
    //   if (this.asiProjects.length !== 0) {
    //     console.log(this.asiProjects)
    //   }
    // },
    // allSupplementaryModulesAsiModules: function () {
    //   if (this.allSupplementaryModulesAsiModules.length !== 0) {
    //     console.log(this.allSupplementaryModulesAsiModules)
    //   }
    // },
    // asiMasterProject: function () {
    //   if (this.asiMasterProject.length !== 0) {
    //     console.log(this.asiMasterProject)
    //   }
    // }
  },
  created() {
    //     ...mapActions(['fetchOldProjects']),
    // ...mapActions(['fetchOldAsiSupplementaryModules']),
    // ...mapActions(['fetchOldAsiMasterProject']),

    this.fetchOldProjects()
    this.fetchOldAsiSupplementaryModules()
    this.fetchOldAsiMasterProject()

    this.fetchProjects()
    this.fetchSupplementaryModules()
    this.fetchAsiSupplementaryModules()

    this.fetchAsiMasterProject()
    this.fetchAsiModuleGroups()
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
  /* text-align: center; */
}
#dropdownMenuButton1 {
  background-color: #e5e6e7;
  border-color: #dfe0e1;
  color: white;
}
.asiManagement {
  text-align: center;
}
.title {
  padding: 2%;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
