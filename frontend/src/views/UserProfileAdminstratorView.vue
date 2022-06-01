<template>
  <Sidebar />
  <div class="AdministrativeDataView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <h4 class="title">User profile</h4>
        <div class="card-body" v-for="user in userData" :key="user.student_id">
          <div id="cardsContainers" class="container pt-3 pb-4">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr v-if="user.student_surname !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Student’s family name(s):
                        </div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="familyName">
                          {{ user.student_surname }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.student_name !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Student’s given name(s):
                        </div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentName">
                          {{ user.student_name }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.student_enrollment_number !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Enrollment Nr.:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="enrollmentNumber">
                          {{ user.student_enrollment_number }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.modality !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Modality:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentModality">
                          {{ user.modality }}
                        </div>
                      </td>
                    </tr>
                    <tr v-if="user.profile !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Profile:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentProfile">
                          {{ user.profile }}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Profile responsible:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Prof. Roberto Mastropietro
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Istitute:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">ISIN</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Istitute director:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Prof. Tiziano Leidi</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Research areas</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Xxx (e.g. Bioelectronics)
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Awarded degree:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">
                          Master of Science in Engineering with specialty in
                          Computer Engineering
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Start of program:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">September 14, 2020</div>
                      </td>
                    </tr>
                    <tr v-if="user.advisor_id !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Student’s advisor:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="studentAdvisor">
                          {{ user.advisor_name }}
                          {{ user.advisor_surname }}
                        </div>
                      </td>
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
import { mapGetters, mapActions } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'UserProfileAdminstratorView',
  props: ['userId'],
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    //...mapActions(['fetchUserData'])
    ...mapActions(['fetchSpecificUserData'])
  },
  computed: {
    ...mapGetters(['userData'])
  },
  created() {
    //this.fetchUserData()
    this.fetchSpecificUserData(this.$route.params.userId)
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

.AdministrativeDataView {
  text-align: center;
}

.title {
  padding: 2%;
}
</style>
