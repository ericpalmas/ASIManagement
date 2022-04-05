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
                >
                  <option
                    v-for="course in ftp_modules"
                    :key="course.id_module"
                    :selected="course.code === module.code ? true : false"
                  >
                    <b>Code:</b>
                    &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
                    {{ course.module_name }}, Site:&nbsp;&nbsp;
                    {{ course.site }}, Credits:&nbsp;&nbsp; {{ course.ects }}
                  </option>
                </select>
              </td>
              <td>
                <label for="exampleColorInput" class="form-label">
                  Semester
                </label>
              </td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Default input"
                  aria-label="default input example"
                  :value="module.semester"
                />
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
                >
                  <option
                    v-for="course in ftp_modules"
                    :key="course.id_module"
                    :selected="course.code === module.code ? true : false"
                  >
                    <b>Code:</b>
                    &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
                    {{ course.module_name }}, Site:&nbsp;&nbsp;
                    {{ course.site }}, Credits:&nbsp;&nbsp; {{ course.ects }}
                  </option>
                </select>
              </td>
              <td>
                <label for="exampleColorInput" class="form-label">
                  Semester
                </label>
              </td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Default input"
                  aria-label="default input example"
                  :value="module.semester"
                />
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
                >
                  <option
                    v-for="course in ftp_modules"
                    :key="course.id_module"
                    :selected="course.code === module.code ? true : false"
                  >
                    <b>Code:</b>
                    &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
                    {{ course.module_name }}, Site:&nbsp;&nbsp;
                    {{ course.site }}, Credits:&nbsp;&nbsp; {{ course.ects }}
                  </option>
                </select>
              </td>
              <td>
                <label for="exampleColorInput" class="form-label">
                  Semester
                </label>
              </td>
              <td>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Default input"
                  aria-label="default input example"
                  :value="module.semester"
                />
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
              <td v-if="semester.n_courses !== 0">{{ i }}</td>
              <td v-if="semester.n_courses !== 0">{{ semester.n_courses }}</td>
              <td v-if="semester.n_courses !== 0">{{ semester.credits }}</td>
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
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 }
      ]

      for (const module of this.ftp_asi_modules) {
        const semester = parseInt(module.semester)
        if (!isNaN(semester)) {
          const courseCredits = parseInt(module.ects)

          semesterCourses[semester].n_courses =
            semesterCourses[semester].n_courses + 1
          semesterCourses[semester].credits =
            semesterCourses[semester].credits + courseCredits
        }
      }

      for (const module of this.tsm_asi_modules) {
        const semester = parseInt(module.semester)
        if (!isNaN(semester)) {
          const courseCredits = parseInt(module.ects)

          semesterCourses[semester].n_courses =
            semesterCourses[semester].n_courses + 1
          semesterCourses[semester].credits =
            semesterCourses[semester].credits + courseCredits
        }
      }

      for (const module of this.cm_asi_modules) {
        const semester = parseInt(module.semester)
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

    // deleteRow(i, k) {
    //   this.courses[i].modules.splice(k, 1)
    // },

    deleteRow(i, k) {
      if (i === 0) this.ftp_asi_modules.splice(k, 1)
      else if (i === 1) this.tsm_asi_modules.splice(k, 1)
      else if (i === 2) this.cm_asi_modules.splice(k, 1)
    },

    // addNewRow(i) {
    //   this.courses[i].modules.push({
    //     code: 'code',
    //     module_title: 'course',
    //     site: 'LU',
    //     credits: 3,
    //     semester: '3'
    //   })
    // }

    addNewRow(i) {
      if (i === 0) {
        this.ftp_asi_modules.push(this.ftp_modules[0])
      } else if (i === 1) {
        this.tsm_asi_modules.push(this.tsm_modules[0])
      } else if (i === 2) {
        this.cm_asi_modules.push(this.cm_modules[0])
      }
    }
  }
}
</script>

<style scoped>
.course-table {
  padding: 2%;
}
</style>