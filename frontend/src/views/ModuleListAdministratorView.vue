<template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">Module list</h4>
          <div v-if="loggedUser !== undefined && loggedUser !== null">
            <div
              v-for="module in allModules"
              :key="module.id_asi_user"
              class="pb-2"
            >
              <div class="card">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-8">
                      
                          <h6 style="display: inline">
                            {{ module.code }}
                          </h6>
                          &nbsp;&nbsp;
                          <h6 style="display: inline">
                            {{ module.module_name }}
                          </h6>
                          &nbsp;&nbsp;
                          <p style="display: inline">
                            {{ module.ects }}
                          </p>
                          &nbsp;&nbsp;
                          <p style="display: inline">
                            {{ module.module_profile_initials }}
                          </p>
                          &nbsp;&nbsp;
                          <p style="display: inline">
                            {{ module.site_initials }}
                          </p>
                          &nbsp;&nbsp;
                          <p style="display: inline">
                            {{ module.responsible_name }}
                            {{ module.responsible_surname }}
                          </p>
                      </div>
                      <div class="col-sm-4">
                        <button
                          id="deleteStudent"
                          type="button"
                          class="btn btn-outline-danger"
                          @click="deleteModule(module.id_module)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-md-start pt-4">
              <div class="col col-lg-2" style="width: 20%">
                <router-link
                  style="text-decoration: none"
                  :to="{
                    name: 'ModuleCreationView',
                    params: {}
                  }"
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i class="fas fa-file-import"></i>
                    Add module
                  </button>
                </router-link>
              </div>
              <div class="col col-lg-2" style="width: 35%">
                <div class="input-group mb-3">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile02"
                  />
                  <label class="input-group-text" for="inputGroupFile02">
                    Upload
                  </label>
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
  name: 'StudentListView',
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
    ...mapActions(['fetchModules']),
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['removeModule']),


    onChangeStudent: function (event) {
      this.studentId = event.target.value
    },
    addStudent: function () {
      this.followStudent({ id: this.id, advisorId: this.loggedUser.AsiUserId })
    },
    deleteModule: function (removedId) {
      if (confirm('Do you really want to remove?')) {
        this.removeModule({
          id: removedId
        })
      }
    }
  },

  computed: {
    ...mapGetters(['allModules']),
    ...mapGetters(['loggedUser'])
  },
  watch: {
    modules: function () {
      if (this.modules.length !== 0) {
        console.log(this.modules.length)
      }
    },
    availableStudents: function () {
      if (this.availableStudents.length !== 0) {
        console.log(this.availableStudents.length)
      }
    },
    loggedUser: function () {
      console.log(this.loggedUser)
    }
  },
  created() {
    this.fetchModules()
    this.fetchLoggedUser()
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
</style>
