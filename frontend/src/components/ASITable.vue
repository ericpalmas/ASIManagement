<template>
  <div id="cardsContainers" class="container pt-3 pb-4">
    <div class="card">
      <div class="card-body">
        <!-- <div v-for="module in ftp_modules" :key="module.id_module">
          <h5>{{ module.code }}</h5>
          <h5>{{ module.module_name }}</h5>
          <h5>{{ module.ects }}</h5>
        </div> -->

        <!-- <div v-for="module in allAsiModules" :key="module.id_module">
            <h5>{{ module.code }}</h5>
            <h5>{{ module.module_name }}</h5>
            <h5>{{ module.ects }}</h5>
          </div> -->

        <!-- <div v-for="module in allAsiModules" :key="module.id_module">
            <h5>{{ module.code }}</h5>
            <h5>{{ module.module_name }}</h5>
            <h5>{{ module.ects }}</h5>
          </div> -->

        <table class="table table-light">
          <tbody v-for="(module, i) in asi_modules" :key="module.id_module">
            <tr v-if="i === 0">
              <td colspan="6" class="table-active">
                <label for="exampleColorInput" class="form-label">
                  {{ module.initials }}
                </label>
              </td>
              <td class="table-active">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="addNewRow(i)"
                >
                  <i class="fas fa-plus-circle"></i>
                </button>
              </td>
            </tr>
            <tr
              v-if="
                i !== 0 &&
                asi_modules[i - 1].initials !== asi_modules[i].initials
              "
            >
              <td colspan="6" class="table-active">
                <label for="exampleColorInput" class="form-label">
                  {{ module.initials }}
                </label>
              </td>
              <td class="table-active">
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="addNewRow(i)"
                >
                  <i class="fas fa-plus-circle"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                >
                  <option
                    v-for="course in available_modules"
                    :key="course.id_module"
                    :selected="course.code === module.code ? true : false"
                  >
                    <b>Code:</b>
                    &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
                    {{ course.module_name }}, Site:&nbsp;&nbsp;
                    {{ course.site }}, Credits:&nbsp;&nbsp; {{ course.ects }},
                    Semester:&nbsp;&nbsp;
                    {{ course.semester }}
                  </option>
                </select>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteRow(i, k)"
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
            <tr v-for="(course, i) in courses" :key="i">
              <td>{{ course.module_group }}</td>

              <td>
                <label for="exampleInputEmail1" class="form-label">
                  {{ moduleCredits(course.module_group) }}
                </label>
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>
                <p>{{ totalCredits }}</p>
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
    parametri: Array,
    asiModules: Array,
    availableModules: Array,
    ftpModules: Array,
    tsmModules: Array,
    cmModules: Array
  },
  data() {
    return {
      total_credits: 0,
      module_credits: 0,
      courses: this.parametri,
      asi_modules: this.asiModules,
      available_modules: this.availableModules,
      ftp_modules: this.ftpModules,
      tsm_modules: this.tsmModules,
      cm_modules: this.cmModules
      //modules: this.modules
    }
  },

  computed: {
    totalCredits: function () {
      var tot = 0
      for (const course of this.courses) {
        for (const module of course.modules) {
          const number = parseInt(module.credits)
          if (!isNaN(number)) {
            tot += number
          }
        }
      }
      return tot
    },
    semesterNumberCourses: function () {
      //var semesterCourses = [0, 0, 0, 0, 0, 0, 0, 0]

      var semesterCourses = [
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 },
        { n_courses: 0, credits: 0 }
      ]

      for (const course of this.courses) {
        for (const module of course.modules) {
          //const number = parseInt(module.credits)
          const semester = parseInt(module.semester)
          if (!isNaN(semester)) {
            const courseCredits = parseInt(module.credits)

            //semesterCourses[semester] = semesterCourses[semester] + 1
            semesterCourses[semester].n_courses =
              semesterCourses[semester].n_courses + 1
            semesterCourses[semester].credits =
              semesterCourses[semester].credits + courseCredits
          }
        }
      }
      return semesterCourses
    }
  },

  methods: {
    // saveInvoice() {
    //   console.log(JSON.stringify(this.courses))
    // },

    moduleCredits: function (moduleGroup) {
      var tot = 0
      for (const course of this.courses) {
        if (course.module_group === moduleGroup) {
          for (const module of course.modules) {
            const number = parseInt(module.credits)

            if (!isNaN(number)) {
              tot += number
            }
          }
        }
      }
      return tot
    },

    deleteRow(i, k) {
      // console.log(this.courses[i].module_group)
      // console.log('elemento da cancellare: ' + k)
      // console.log(this.courses[i].modules[k])
      this.courses[i].modules.splice(k, 1)
    },
    addNewRow(i) {
      this.courses[i].modules.push({
        code: 'code',
        module_title: 'course',
        site: 'LU',
        credits: 3,
        semester: '3'
      })

      //console.log(this.courses[i].modules)
    }
  }
}
</script>

<style scoped>
.course-table {
  padding: 2%;
}
</style>