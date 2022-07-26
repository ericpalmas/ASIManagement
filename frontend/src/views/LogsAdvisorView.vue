<template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">Log list</h4>

          <div class="card">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Action</th>
                        <th scope="col">Code</th>
                        <th scope="col">Module</th>

                        <th scope="col">Semester</th>
                        <th scope="col">Ects</th>
                        <th scope="col">Student</th>
                        <th scope="col">Advisor</th>
                        <th scope="col">Date</th>

                        <th scope="col">Field</th>
                        <th scope="col">Old</th>
                        <th scope="col">New</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="log in logs" :key="log.id_log">
                        <th scope="row">
                          <i
                            v-if="log.id_action === 1"
                            class="fas fa-plus-circle"
                          ></i>
                          <i
                            v-else-if="log.id_action === 2"
                            class="fas fa-trash"
                          ></i>
                          <i
                            v-else-if="log.id_action === 3"
                            class="fas fa-edit"
                          ></i>
                          <i
                            v-else-if="log.id_action === 4"
                            class="fas fa-check"
                          ></i>
                          <i v-else-if="log.id_action === 5">&#xe0b8;</i>
                        </th>
                        <td>{{ log.action_name.toUpperCase() }}</td>
                        <td>{{ log.code }}</td>
                        <td>{{ log.module_name }}</td>

                        <td>{{ log.semester }}</td>
                        <td>{{ log.ects }}</td>
                        <td>
                          {{ log.student_name }} {{ log.student_surname }}
                        </td>
                        <td>
                          {{ log.advisor_name }} {{ log.advisor_surname }}
                        </td>
                        <td v-if="log.date !== null" colspan="1" span="1" style="width: 10%">
                         {{ log.date.substring(8, 10) }}/{{ log.date.substring(5, 7) }}/{{ log.date.substring(0, 4) }}
                        </td>

                        <td v-if="log.id_action === 3 && log.id_field !== null">
                          {{ log.field_name }}
                        </td>
                        <td v-else></td>

                        <td v-if="log.id_action === 3 && log.id_field !== null">
                          {{ log.old_value }}
                        </td>
                        <td v-else></td>

                        <td v-if="log.id_action === 3 && log.id_field !== null">
                          {{ log.new_value }}
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
  name: 'LogsAdvisorView',
  data: () => ({}),
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions(['fetchAdvisorLogs'])
  },

  computed: {
    ...mapGetters(['logs'])
  },
  watch: {},
  created() {
    this.fetchAdvisorLogs()
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
