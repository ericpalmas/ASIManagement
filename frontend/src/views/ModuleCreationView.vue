 <template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="container pb-4">Module creation</h4>
          <div v-if="loggedUser !== undefined && loggedUser !== null">
            <div class="card">
              <div class="card-body">
                <form>
                  <div class="row">
                    <div class="col">
                      <div class="mb-3 row">
                        <label
                          for="exampleFormControlInput1"
                          class="col-sm-3 col-form-label"
                        >
                          Code
                        </label>

                        <div class="col-sm-7">
                          <input
                            class="form-control"
                            type="email"
                            id="exampleFormControlInput1"
                            v-model="code"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="recipient-name"
                          class="col-sm-3 col-form-label"
                        >
                          Name:
                        </label>

                        <div class="col-sm-7">
                          <input
                            type="text"
                            class="form-control"
                            id="recipient-name"
                            v-model="name"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="recipient-name"
                          class="col-sm-3 col-form-label"
                        >
                          Description:
                        </label>
                        <div class="col-sm-7">
                          <div class="form-floating">
                            <textarea
                              class="form-control"
                              v-model="description"
                              placeholder="Leave a comment here"
                              id="floatingTextarea2"
                              style="height: 100px"
                            ></textarea>
                            <label for="floatingTextarea2"></label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-3 col-form-label"
                        >
                          Credits
                        </label>
                        <div class="col-sm-6">
                          <input
                            class="form-control"
                            type="number"
                            aria-label="default input example"
                            min="3"
                            max="15"
                            v-model="ects"
                          />
                        </div>
                      </div>

                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-3 col-form-label"
                        >
                          Responsible
                        </label>

                        <div class="col-sm-6">
                          <select
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            v-model="responsible"
                          >
                            <option
                              v-for="responsible in responsibles"
                              :key="responsible.id_asi_user"
                              :value="responsible.id_asi_user"
                            >
                              {{ responsible.name }} {{ responsible.surname }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-3 col-form-label"
                        >
                          Module group
                        </label>

                        <div class="col-sm-6">
                          <select
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            v-model="moduleGroup"
                          >
                            <option
                              v-for="moduleGroup in moduleGroups"
                              :key="moduleGroup.id_module_group"
                              :value="moduleGroup.id_module_group"
                            >
                              {{ moduleGroup.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label
                          for="inputPassword"
                          class="col-sm-3 col-form-label"
                        >
                          Site
                        </label>

                        <div class="col-sm-6">
                          <select
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            v-model="site"
                          >
                            <option
                              v-for="site in sites"
                              :key="site.id_site"
                              :value="site.id_site"
                            >
                              {{ site.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label
                          for="exampleFormControlInput1"
                          class="col-sm-3 col-form-label pb-4"
                        >
                          Module calendar
                 </label>

                  <div class="row">
                    

                    <div class="col">
                      <div class="m-1 row">
                        <table class="table" style="width: 88%">
                          <tbody >
                            <tr >
                              <td colspan="2" class="table-active" >
                                <label
                                  for="exampleColorInput"
                                  class="form-label"
                                >
                                  Option
                                </label>
                              </td>
                              <td class="table-active" style="width: 0%">
                                <button
                                  id="addFtpButton"
                                  type="button"
                                  class="btn btn-outline-primary"
                                  @click="addNewRow()"
                                >
                                  <i class="fas fa-plus-circle"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-for="(module, i) in moduleCalendar" :key="i">
                              <td style="width: 30%;">
                                <select
                                  class="form-select form-select-sm"
                                  aria-label=".form-select-sm example"
                                >
                                  <option>
                                    Semester:&nbsp;Spring,&nbsp;&nbsp; Start:&nbsp;&nbsp;2022, &nbsp;&nbsp; End:&nbsp;2022
                                  </option>
                                  <option>
                                    Semester:&nbsp;Fall,&nbsp;&nbsp; Start:&nbsp;&nbsp;2022, &nbsp;&nbsp; End:&nbsp;2023
                                  </option>
                                    <option>
                                    Semester:&nbsp;Spring,&nbsp;&nbsp; Start:&nbsp;&nbsp;2023, &nbsp;&nbsp; End:&nbsp;2023
                                  </option>
                                  <option>
                                    Semester:&nbsp;Fall,&nbsp;&nbsp; Start:&nbsp;&nbsp;2023, &nbsp;&nbsp; End:&nbsp;2024
                                  </option>
                                    <option>
                                    Semester:&nbsp;Spring,&nbsp;&nbsp; Start:&nbsp;&nbsp;2024, &nbsp;&nbsp; End:&nbsp;2024
                                  </option>
                                  <option>
                                    Semester:&nbsp;Fall,&nbsp;&nbsp; Start:&nbsp;&nbsp;2024, &nbsp;&nbsp; End:&nbsp;2025
                                  </option>



                         


                                </select>
                              </td>

                              <td colspan="1" style="width: 5%">
                                <div class="form-check" >
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Enought sub necessary
                                  </label>
                                </div>
                                <!-- <div class="form-check" >
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckChecked"
                                    checked
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckChecked"
                                  >
                                    Spring
                                  </label>
                                </div> -->
                              </td>
                              <td style="width: 0%">
                                <button
                                  type="button"
                                  class="btn btn-outline-danger"
                                  @click="deleteRow(i)"
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
                </form>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="registerModule()"
                >
                  Register
                </button>
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
  name: 'ModuleCreationView',
  data: () => ({
    moduleGroup: -1,
    responsible: -1,
    site: -1,
    studentId: -1,
    id: 0,
    ects: 3,
    name: '',
    code: '',
    description: '',
    moduleCalendar: []
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
    ...mapActions(['fetchModuleGroups']),
    ...mapActions(['fetchResponsibles']),
    ...mapActions(['fetchSites']),

    deleteRow(i) {
      if (confirm('Do you really want to delete?')) {
        this.moduleCalendar.splice(i, 1)
      }
    },
    addNewRow() {
      console.log('new year ')
      this.moduleCalendar.push({
        year: 2022
      })
    },

    registerModule: function () {
      console.log(this.code)
      console.log(this.name)
      console.log(this.description)
      console.log(this.site)
      console.log(this.ects)
      console.log(this.moduleGroup)
      console.log(this.responsible)
    }
  },

  computed: {
    ...mapGetters(['loggedUser']),
    ...mapGetters(['moduleGroups']),
    ...mapGetters(['responsibles']),
    ...mapGetters(['sites'])
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
    this.fetchModuleGroups()
    this.fetchResponsibles()
    this.fetchSites()
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
