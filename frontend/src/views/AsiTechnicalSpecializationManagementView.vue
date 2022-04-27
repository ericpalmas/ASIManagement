<template>
  <Sidebar />
  <div class="asiManagement" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1 class="title">Technical specialization with an MRU</h1>

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
                <td colspan="1">Semester</td>
                <td colspan="1">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="saveAsi"
                  >
                    <i class="fas fa-save"></i>
                  </button>
                </td>
              </tr>
            </thead>
            <!-- asiProjects -->
            <tbody>
              <tr>
                <td colspan="5" class="table-active">
                  <label for="exampleColorInput" class="form-label">
                    asiProjects
                  </label>
                </td>
                <td class="table-active">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addNewRow(0)"
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
                    @change="onChangeEcts($event, 0, i)"
                  />
                </td>
                <td colspan="1" span="1" style="width: 10%">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeSemester($event, 0, i)"
                  >
                    <option
                      value="1"
                      :selected="1 === project.semester ? true : false"
                    >
                      1
                    </option>
                    <option
                      value="2"
                      :selected="2 === project.semester ? true : false"
                    >
                      2
                    </option>
                    <option
                      value="3"
                      :selected="3 === project.semester ? true : false"
                    >
                      3
                    </option>
                    <option
                      value="4"
                      :selected="4 === project.semester ? true : false"
                    >
                      4
                    </option>
                    <option
                      value="5"
                      :selected="5 === project.semester ? true : false"
                    >
                      5
                    </option>
                    <option
                      value="6"
                      :selected="6 === project.semester ? true : false"
                    >
                      6
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
            </tbody>
            <!-- Supplementary modules -->
            <tbody>
              <tr>
                <td colspan="5" class="table-active">
                  <label for="exampleColorInput" class="form-label">
                    Supplementary modules
                  </label>
                </td>
                <td class="table-active">
                  <button
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
                <td colspan="1" span="1" style="width: 10%">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeSemester($event, 1, i)"
                  >
                    <option
                      value="1"
                      :selected="1 === module.semester ? true : false"
                    >
                      1
                    </option>
                    <option
                      value="2"
                      :selected="2 === module.semester ? true : false"
                    >
                      2
                    </option>
                    <option
                      value="3"
                      :selected="3 === module.semester ? true : false"
                    >
                      3
                    </option>
                    <option
                      value="4"
                      :selected="4 === module.semester ? true : false"
                    >
                      4
                    </option>
                    <option
                      value="5"
                      :selected="5 === module.semester ? true : false"
                    >
                      5
                    </option>
                    <option
                      value="6"
                      :selected="6 === module.semester ? true : false"
                    >
                      6
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
                <td colspan="5" class="table-active">
                  <label for="exampleColorInput" class="form-label">
                    Master
                  </label>
                </td>
                <td class="table-active">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addNewRow(2)"
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
                    v-model="project.ects"
                  />
                </td>
                <td colspan="1" span="1" style="width: 10%">
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    @change="onChangeSemester($event, 2, i)"
                  >
                    <option
                      value="1"
                      :selected="1 === project.semester ? true : false"
                    >
                      1
                    </option>
                    <option
                      value="2"
                      :selected="2 === project.semester ? true : false"
                    >
                      2
                    </option>
                    <option
                      value="3"
                      :selected="3 === project.semester ? true : false"
                    >
                      3
                    </option>
                    <option
                      value="4"
                      :selected="4 === project.semester ? true : false"
                    >
                      4
                    </option>
                    <option
                      value="5"
                      :selected="5 === project.semester ? true : false"
                    >
                      5
                    </option>
                    <option
                      value="6"
                      :selected="6 === project.semester ? true : false"
                    >
                      6
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
  </div>
</template>




<script>
//import ASITable from '../components/ASITable.vue'
//import ASITechnicalTable from '../components/ASITechnicalTable.vue'
import { mapGetters, mapActions } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'

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
    userData: {
      username: 'marco.rossi@student.supsi.ch',
      password: '123456'
    }
  }),

  methods: {
    ...mapActions(['fetchProjects']),
    ...mapActions(['fetchSupplementaryModules']),
    ...mapActions(['fetchAsiSupplementaryModules']),
    ...mapActions(['fetchAsiMasterProject']),
    ...mapActions(['fetchAsiModuleGroups']),
    ...mapActions(['updateTechnicalAsi']),

    saveAsi: function () {
      // controllo che non ci siano corsi uguali
      // console.log(this.asiProjects)
      // console.log(this.allSupplementaryModulesAsiModules)
      // console.log(this.asiMasterProject)

      var newModules = {
        asiModuleGroups: this.asiModuleGroups,
        asiProjects: this.asiProjects,
        allSupplementaryModulesAsiModules:
          this.allSupplementaryModulesAsiModules,
        asiMasterProject: this.asiMasterProject
      }

      this.updateTechnicalAsi({
        newModules
      })
    },

    // mettere controllo prima di cancellare una riga
    deleteRow(i, k) {
      if (i === 0) {
        this.asiProjects.splice(k, 1)
      } else if (i === 1) {
        this.allSupplementaryModulesAsiModules.splice(k, 1)
      } else if (i === 2) {
        this.asiMasterProject.splice(k, 1)
      }
    },

    addNewRow(i) {
      if (i === 0) {
        this.asiProjects.push({
          id_module: -1,
          code: '',
          module_name: '',
          ects: 15,
          semester: 1
        })
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
          semester: 1
        })
      }
    },
    onChangeSemester(event, i, k) {
      const newSemester = parseInt(event.target.value)
      console.log(event.target.value, i, k)
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
      console.log(event.target.value, i, k)
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

      console.log(event.target.value, i, k)
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

      console.log(event.target.value, i, k)
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
    ...mapGetters(['allSupplementaryModules']),
    ...mapGetters(['allSupplementaryModulesAsiModules']),
    ...mapGetters(['asiMasterProject']),
    ...mapGetters(['asiModuleGroups'])
  },
  watch: {
    asiProjects: function () {
      if (this.asiProjects.length !== 0) {
        console.log(this.asiProjects.length)
      }
    },
    allSupplementaryModulesAsiModules: function () {
      if (this.allSupplementaryModulesAsiModules.length !== 0) {
        console.log(this.allSupplementaryModulesAsiModules.length)
      }
    },
    asiMasterProject: function () {
      if (this.asiMasterProject.length !== 0) {
        console.log(this.asiMasterProject.length)
      }
    }
  },
  created() {
    this.fetchProjects()
    this.fetchSupplementaryModules()
    this.fetchAsiSupplementaryModules()
    this.fetchAsiMasterProject()
    this.fetchAsiModuleGroups(this.userData)
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

.asiManagement {
  text-align: center;
}
.title {
  padding: 2%;
}
</style>
