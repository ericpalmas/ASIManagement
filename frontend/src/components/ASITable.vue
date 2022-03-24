<template>
  <table class="table table-light">
    <!-- <thead>
      <tr>
        <td>Code</td>
        <td>Module title</td>
        <td>Site</td>
        <td>ECTS</td>
        <td>Semester</td>
        <td colspan="2"></td>
      </tr>
    </thead> -->
    <tbody v-for="(course, i) in courses" :key="i">
      <tr>
        <td colspan="6" class="table-active">
          <label for="exampleColorInput" class="form-label">
            {{ course.module_group }}
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
      <tr v-for="(item, k) in course.modules" :key="k">
        <td colspan="6">
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
          >
            <!-- qua devo ciclare le option e selezionare quella scelta, in base ad item.code -->
            <option
              value="FTP_AdvAlgDS"
              selected="item.code === FTP_AdvAlgDS ? true : false"
            >
              FTP_AdvAlgDS
            </option>
            <option
              value="FTP_AppStat"
              selected="item.code === FTP_AppStat ? true : false"
            >
              FTP_AppStat
            </option>
            <option
              value="FTP_ApprAlg"
              selected="item.code === FTP_ApprAlg ? true : false"
            >
              FTP_ApprAlg
            </option>
            <option value="FTP_BioEng" selected="true">
              <b>Code:</b>
              &nbsp;&nbsp; FTP_BioEng, Name:&nbsp;&nbsp; Biology, physiology and
              anatomy for engineers, Site:&nbsp;&nbsp; LU, Credits:&nbsp;&nbsp;
              3, Semester:&nbsp;&nbsp; 3
            </option>
          </select>
        </td>

        <!-- <td>
          <button type="button" class="btn btn-outline-secondary">
            <i class="fas fa-edit"></i>
          </button>
        </td> -->

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
    parametri: Array
  },
  data() {
    return {
      total_credits: 0,
      module_credits: 0,
      courses: this.parametri
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

  watch: {},

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