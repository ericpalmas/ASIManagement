 <template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">Project list</h4>
          <div v-if="loggedUser !== undefined && loggedUser !== null">
            <div
              v-for="project in tutorProjects"
              :key="project.id_module"
              class="pb-2"
            >
              <div class="card">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-8">
                      
                          <h5 style="display: inline">
                            {{ project.code }}
                            {{ project.name }}
                          </h5>
                          &nbsp;&nbsp;
                          <p  style="display: inline">
                            Nome studente
                          </p>
                      </div>
                    </div>
                  </div>
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
  name: 'StudentListResponsibleProfileView',
  data: () => ({
    studentId: -1,
    id: 0
  }),
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['fetchTutorProjects'])
  },

  computed: {
    ...mapGetters(['loggedUser']),
    ...mapGetters(['tutorProjects'])
  },
  watch: {
    // advisorStudents: function () {
    //   if (this.advisorStudents.length !== 0) {
    //     console.log(this.advisorStudents.length)
    //   }
    // },
    // availableStudents: function () {
    //   if (this.availableStudents.length !== 0) {
    //     console.log(this.availableStudents.length)
    //   }
    // },
    // loggedUser: function () {
    //   console.log(this.loggedUser)
    // }
  },
  created() {
    this.fetchLoggedUser()
    this.fetchTutorProjects()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.student p {
  /* other styles goes here... */
  display: inline-block;
  vertical-align: top;
}

.student h5 {
  /* other styles goes here... */
  display: inline-block;
  vertical-align: top;
}
</style>
