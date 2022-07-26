<template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">History</h4>
          <div class="card">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Student </th>
                        <th scope="col">Advisor </th>
                        <th scope="col">Start date</th>
                        <th scope="col">End date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="log in logs" :key="log.id_log">
                        <td style="width: 0%"></td> 
                        <td style="width: 20%" >{{ log.student_name }} {{ log.student_surname }}</td>
                        <td style="width: 40%" >{{ log.advisor_name }} {{ log.advisor_surname }}</td>

                        <td v-if="log.start_date !== null"   style="width: 10%">
                         {{ log.start_date.substring(8, 10) }}/{{ log.start_date.substring(5, 7) }}/{{ log.start_date.substring(0, 4) }}
                        </td>
                        <td v-else></td> 

                        <td v-if="log.end_date !== null"  style="width: 10%">
                         {{ log.end_date.substring(8, 10) }}/{{ log.end_date.substring(5, 7) }}/{{ log.end_date.substring(0, 4) }}
                        </td>
                        <td v-else></td> 
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'StudentAdvisorHistoryAdministratorView',
  data: () => ({}),
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions(['fetchStudentAdvisorHistory'])
  },

  computed: {
    ...mapGetters(['logs'])
  },
  watch: {},
  created() {
    this.fetchStudentAdvisorHistory()
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
.title {
  padding: 2%;
}

#deleteStudent {
  float: right;
  overflow: hidden;
}
</style>
