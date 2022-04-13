<template>
  <div id="cardsContainers" class="container pt-3 pb-4">
    <div class="card">
      <div class="card-body">
        <table class="table table-light">
          <tbody>
            <tr>
              <td colspan="6" class="table-active">
                <label for="exampleColorInput" class="form-label">FTP</label>
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
            <tr v-for="(module, i) in ftp_asi_modules" :key="module.id_module">
              <td colspan="4">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  @change="onChangeModule($event, 0, i)"
                >
                  <option
                    v-for="course in ftp_modules"
                    :key="course.id_module"
                    :selected="course.code === module.code ? true : false"
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
                  @click="deleteRow(0, i)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="6" class="table-active">
                <label for="exampleColorInput" class="form-label">TSM</label>
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
            <tr v-for="(module, i) in tsm_asi_modules" :key="module.id_module">
              <td colspan="4">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  @change="onChangeModule($event, 1, i)"
                >
                  <option
                    v-for="course in tsm_modules"
                    :key="course.id_module"
                    :selected="course.code === module.code ? true : false"
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
            <tr>
              <td colspan="6" class="table-active">
                <label for="exampleColorInput" class="form-label">CM</label>
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
            <tr v-for="(module, i) in cm_asi_modules" :key="module.id_module">
              <td colspan="4">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  @change="onChangeModule($event, 2, i)"
                >
                  <option
                    v-for="course in cm_modules"
                    :key="course.id_module"
                    :selected="course.code === module.code ? true : false"
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
                  @click="deleteRow(2, i)"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-primary">Salva</button>
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
</template>



<script>
export default {
  name: 'ASITable',
  props: {
    ftpModules: Array,
    tsmModules: Array,
    cmModules: Array,
    ftpAsiModules: Array,
    tsmAsiModules: Array,
    cmAsiModules: Array
  },
  data() {
    return {
      ftp_modules: this.ftpModules,
      tsm_modules: this.tsmModules,
      cm_modules: this.cmModules,
      ftp_asi_modules: this.ftpAsiModules,
      tsm_asi_modules: this.tsmAsiModules,
      cm_asi_modules: this.cmAsiModules
    }
  },

  computed: {
    totalCredits: function () {
      var tot = 0

      for (const module of this.ftp_asi_modules) {
        const number = parseInt(module.ects)
        if (!isNaN(number)) {
          tot += number
        }
      }
      for (const module of this.tsm_asi_modules) {
        const number = parseInt(module.ects)
        if (!isNaN(number)) {
          tot += number
        }
      }
      for (const module of this.cm_asi_modules) {
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

      for (const module of this.ftp_asi_modules) {
        const semester = parseInt(module.semester) - 1

        if (!isNaN(semester)) {
          const courseCredits = parseInt(module.ects)

          semesterCourses[semester].n_courses =
            semesterCourses[semester].n_courses + 1
          semesterCourses[semester].credits =
            semesterCourses[semester].credits + courseCredits
        }
      }

      for (const module of this.tsm_asi_modules) {
        const semester = parseInt(module.semester) - 1
        if (!isNaN(semester)) {
          const courseCredits = parseInt(module.ects)

          semesterCourses[semester].n_courses =
            semesterCourses[semester].n_courses + 1
          semesterCourses[semester].credits =
            semesterCourses[semester].credits + courseCredits
        }
      }

      for (const module of this.cm_asi_modules) {
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
  methods: {
    moduleCredits: function (i) {
      var tot = 0
      if (i === 0) {
        for (const module of this.ftp_asi_modules) {
          const number = parseInt(module.ects)
          if (!isNaN(number)) {
            tot += number
          }
        }
      } else if (i === 1) {
        for (const module of this.tsm_asi_modules) {
          const number = parseInt(module.ects)
          if (!isNaN(number)) {
            tot += number
          }
        }
      } else if (i === 2) {
        for (const module of this.cm_asi_modules) {
          const number = parseInt(module.ects)
          if (!isNaN(number)) {
            tot += number
          }
        }
      }
      return tot
    },

    onChangeSemester(event, i, k) {
      const newSemester = parseInt(event.target.value)
      console.log(event.target.value, i, k)
      if (i === 0) {
        this.ftp_asi_modules[k].semester = newSemester
      } else if (i === 1) {
        this.tsm_asi_modules[k].semester = newSemester
      } else if (i === 2) {
        this.cm_asi_modules[k].semester = newSemester
      }
    },

    onChangeModule(event, i, k) {
      if (i === 0) {
        ;(this.ftp_asi_modules[k].id_module =
          this.ftp_modules[event.target.selectedIndex].id_module),
          (this.ftp_asi_modules[k].code =
            this.ftp_modules[event.target.selectedIndex].code),
          (this.ftp_asi_modules[k].module_name =
            this.ftp_modules[event.target.selectedIndex].module_name),
          (this.ftp_asi_modules[k].ects =
            this.ftp_modules[event.target.selectedIndex].ects),
          (this.ftp_asi_modules[k].module_group_initials =
            this.ftp_modules[event.target.selectedIndex].module_group_initials),
          (this.ftp_asi_modules[k].responsible_name =
            this.ftp_modules[event.target.selectedIndex].responsible_name),
          (this.ftp_asi_modules[k].responsible_surname =
            this.ftp_modules[event.target.selectedIndex].responsible_surname),
          (this.ftp_asi_modules[k].site =
            this.ftp_modules[event.target.selectedIndex].site),
          (this.ftp_asi_modules[k].site_initials =
            this.ftp_modules[event.target.selectedIndex].site_initials)
      } else if (i === 1) {
        ;(this.tsm_asi_modules[k].id_module =
          this.tsm_modules[event.target.selectedIndex].id_module),
          (this.tsm_asi_modules[k].code =
            this.tsm_modules[event.target.selectedIndex].code),
          (this.tsm_asi_modules[k].module_name =
            this.tsm_modules[event.target.selectedIndex].module_name),
          (this.tsm_asi_modules[k].ects =
            this.tsm_modules[event.target.selectedIndex].ects),
          (this.tsm_asi_modules[k].module_group_initials =
            this.tsm_modules[event.target.selectedIndex].module_group_initials),
          (this.tsm_asi_modules[k].responsible_name =
            this.tsm_modules[event.target.selectedIndex].responsible_name),
          (this.tsm_asi_modules[k].responsible_surname =
            this.tsm_modules[event.target.selectedIndex].responsible_surname),
          (this.tsm_asi_modules[k].site =
            this.tsm_modules[event.target.selectedIndex].site),
          (this.tsm_asi_modules[k].site_initials =
            this.tsm_modules[event.target.selectedIndex].site_initials)
      } else if (i === 2) {
        ;(this.cm_asi_modules[k].id_module =
          this.cm_modules[event.target.selectedIndex].id_module),
          (this.cm_asi_modules[k].code =
            this.cm_modules[event.target.selectedIndex].code),
          (this.cm_asi_modules[k].module_name =
            this.cm_modules[event.target.selectedIndex].module_name),
          (this.cm_asi_modules[k].ects =
            this.cm_modules[event.target.selectedIndex].ects),
          (this.cm_asi_modules[k].module_group_initials =
            this.cm_modules[event.target.selectedIndex].module_group_initials),
          (this.cm_asi_modules[k].responsible_name =
            this.cm_modules[event.target.selectedIndex].responsible_name),
          (this.cm_asi_modules[k].responsible_surname =
            this.cm_modules[event.target.selectedIndex].responsible_surname),
          (this.cm_asi_modules[k].site =
            this.cm_modules[event.target.selectedIndex].site),
          (this.cm_asi_modules[k].site_initials =
            this.cm_modules[event.target.selectedIndex].site_initials)
      }

      console.log(this.ftp_asi_modules)
      console.log(this.tsm_asi_modules)
      console.log(this.cm_asi_modules)
    },

    deleteRow(i, k) {
      if (i === 0) this.ftp_asi_modules.splice(k, 1)
      else if (i === 1) this.tsm_asi_modules.splice(k, 1)
      else if (i === 2) this.cm_asi_modules.splice(k, 1)
    },

    addNewRow(i) {
      if (i === 0) {
        this.ftp_asi_modules.push({
          id_module: this.ftp_modules[0].id_module,
          code: this.ftp_modules[0].code,
          module_name: this.ftp_modules[0].module_name,
          ects: this.ftp_modules[0].ects,
          semester: 1,
          module_group_initials: this.ftp_modules[0].module_group_initials,
          responsible_name: this.ftp_modules[0].responsible_name,
          responsible_surname: this.ftp_modules[0].responsible_surname,
          site: this.ftp_modules[0].site,
          site_initials: this.ftp_modules[0].site_initials
        })
      } else if (i === 1) {
        this.tsm_asi_modules.push({
          id_module: this.tsm_modules[0].id_module,
          code: this.tsm_modules[0].code,
          module_name: this.tsm_modules[0].module_name,
          ects: this.tsm_modules[0].ects,
          semester: 1,
          module_group_initials: this.tsm_modules[0].module_group_initials,
          responsible_name: this.tsm_modules[0].responsible_name,
          responsible_surname: this.tsm_modules[0].responsible_surname,
          site: this.tsm_modules[0].site,
          site_initials: this.tsm_modules[0].site_initials
        })
      } else if (i === 2) {
        this.cm_asi_modules.push({
          id_module: this.cm_modules[0].id_module,
          code: this.cm_modules[0].code,
          module_name: this.cm_modules[0].module_name,
          ects: this.cm_modules[0].ects,
          semester: 1,
          module_group_initials: this.cm_modules[0].module_group_initials,
          responsible_name: this.cm_modules[0].responsible_name,
          responsible_surname: this.cm_modules[0].responsible_surname,
          site: this.cm_modules[0].site,
          site_initials: this.cm_modules[0].site_initials
        })
      }
      console.log(this.ftp_asi_modules)
    }
  }
}
</script>

<style scoped>
.course-table {
  padding: 2%;
}
</style>