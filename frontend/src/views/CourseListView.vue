<template>
  <div class="course-list">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>CourseListView</h1>
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Code</th>
                  <th scope="col">ECTS</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Name</th>
                  <th scope="col">Responsible</th>

                  <th
                    scope="col"
                    v-for="(year, i) in moduleCalendarYears"
                    :key="i"
                  >
                    <span v-if="year.start_year === year.end_year">
                      Spring {{ year.start_year }}
                    </span>
                    <span v-else>
                      Fall {{ year.start_year }} /
                      {{ year.end_year.toString().slice(-2) }}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="module in allModules" :key="module.id_module">
                  <th scope="row">1</th>
                  <td>{{ module.code }}</td>
                  <td>{{ module.ects }}</td>
                  <td></td>
                  <td>{{ module.module_name }}</td>
                  <td>
                    {{ module.responsible_surname }}
                    {{ module.responsible_name }}
                  </td>
                  <td v-for="(year, i) in moduleCalendarYears" :key="i">
                    <span
                      v-if="calculateCalendar(year, module.id_module) === 1"
                    >
                      X
                    </span>

                    <span
                      v-else-if="
                        calculateCalendar(year, module.id_module) === 2
                      "
                    >
                      (X)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CourseListView',
  methods: {
    ...mapActions(['fetchModules']),
    ...mapActions(['fetchModuleCalendarYears']),
    ...mapActions(['fetchModuleCalendar']),
    calculateCalendar: function (year, id) {
      var filteredArray = this.moduleCalendar.filter(
        (module) => module.id_module === id
      )

      var res = filteredArray.some(
        (item) =>
          item.start_year === year.start_year && item.end_year === year.end_year
      )

      if (res) {
        return 1
      } else {
        var res2 = filteredArray.some(
          (item) =>
            item.fall_enough_sub === true || item.spring_enough_sub === true
        )
        if (res2) {
          return 2
        } else {
          return 0
        }
      }
    }
  },
  computed: {
    ...mapGetters(['allModules']),
    ...mapGetters(['moduleCalendarYears']),
    ...mapGetters(['moduleCalendar'])
  },
  created() {
    this.fetchModules()
    this.fetchModuleCalendarYears()
    this.fetchModuleCalendar()
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

.course-list {
  text-align: center;
}
</style>