<template>
  <Sidebar />
  <div class="AdministrativeDataView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body" v-for="user in userData" :key="user.student_id">
          <div id="cardsContainers" class="container">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr v-if="user.student_surname !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Name:</div>
                      </td>
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left" id="familyName">
                          {{ user.student_name }}&nbsp;
                          {{ user.student_surname }}
                        </div>
                      </td>
                    </tr>

                    <tr v-if="user.student_enrollment_number !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Enrollment Number.:</div>
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
                          {{ user.profile_responsible_name }}&nbsp;
                          {{ user.profile_responsible_surname }}
                        </div>
                      </td>
                    </tr>

                    <tr v-if="user.advisor_id !== null">
                      <td style="width: 40 %; padding-left: 4%">
                        <div style="text-align: left">Advisor:</div>
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
        <div class="card-body">
          <div id="cardsContainers" class="container pt-2 pb-2">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          FTP
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr
                      v-for="module in allFtpAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>

                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          TSM
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr
                      v-for="module in allTsmAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          CM
                        </label>
                      </td>
                      <td class="table-active">
                        {{ $route.params.id }}
                      </td>
                    </tr>
                    <tr
                      v-for="module in allCmAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="cardsContainers" class="container pt-2 pb-2">
            <div class="card">
              <div class="card-body">
                <table class="table table-light">
                  <tbody>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          Projects
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr v-for="module in asiProjects" :key="module.id_module">
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>

                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          Supplementary modules
                        </label>
                      </td>
                      <td class="table-active"></td>
                    </tr>
                    <tr
                      v-for="module in allSupplementaryModulesAsiModules"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="table-active">
                        <label for="exampleColorInput" class="form-label">
                          Master thesis
                        </label>
                      </td>
                      <td class="table-active">
                        {{ $route.params.id }}
                      </td>
                    </tr>
                    <tr
                      v-for="module in asiMasterProject"
                      :key="module.id_module"
                    >
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Code: &nbsp;&nbsp; {{ module.code }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Name: &nbsp;&nbsp; {{ module.module_name }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Site: &nbsp;&nbsp; {{ module.site_initials }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Credits: &nbsp;&nbsp; {{ module.ects }}
                        </label>
                      </td>
                      <td>
                        <label for="exampleDataList" class="form-label">
                          Semester: &nbsp;&nbsp; {{ module.semester }}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="userData[0] !== null">
            <button class="btn btn-danger" @click="generateFile">
              generate PDF
            </button>
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
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { logo } from '../assets/logoBase64'

export default {
  name: 'AsiSummaryPreviewView',
  //props: ['userId'],
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions(['fetchUserData']),
    ...mapActions(['fetchLoggedUser']),
    ...mapActions(['fetchAsiModuleGroups']),

    ...mapActions(['fetchProjects']),
    ...mapActions(['fetchSupplementaryModules']),
    ...mapActions(['fetchAsiSupplementaryModules']),
    ...mapActions(['fetchAsiMasterProject']),
    ...mapActions(['fetchAdvisors']),
    ...mapActions(['updateTechnicalAsi']),
    ...mapActions(['removeProfileResponsibleApprovation']),
    ...mapActions(['removeAdvisorApprovation']),

    ...mapActions(['fetchFtpModules']),
    ...mapActions(['fetchTsmModules']),
    ...mapActions(['fetchCmModules']),
    ...mapActions(['fetchFtpAsiModules']),
    ...mapActions(['fetchTsmAsiModules']),
    ...mapActions(['fetchCmAsiModules']),
    ...mapActions(['updateAsi']),
    ...mapActions(['removeProfileResponsibleApprovation']),
    ...mapActions(['removeAdvisorApprovation']),

    arrayOfObjectToArrayOfstrings: function (array) {
      var result = []
      for (var i = 0; i < array.length; i++) {
        var row = []
        row.push(array[i].code)
        row.push(array[i].module_name)
        row.push(array[i].site_initials)
        row.push(array[i].ects)
        row.push(array[i].semester)
        result.push(row)
      }
      return result
    },

    generateFile() {
      var doc = new jsPDF('p', 'pt', 'a4')

      var ftpModules = this.arrayOfObjectToArrayOfstrings(this.allFtpAsiModules)
      var tsmModules = this.arrayOfObjectToArrayOfstrings(this.allTsmAsiModules)
      var cmModules = this.arrayOfObjectToArrayOfstrings(this.allCmAsiModules)

      var projectsModules = this.arrayOfObjectToArrayOfstrings(this.asiProjects)
      var supplementaryModules = this.arrayOfObjectToArrayOfstrings(
        this.allSupplementaryModulesAsiModules
      )
      var masterModules = this.arrayOfObjectToArrayOfstrings(
        this.asiMasterProject
      )

      doc.addImage(logo, 'JPEG', 35, 30)
      doc.setFont('Times new roman')
      doc.setFontSize(12)
      doc.text(
        'Name: ' +
          this.userData[0].student_name +
          ' ' +
          this.userData[0].student_surname,
        45,
        100
      )
      doc.text('Profile: ' + this.userData[0].profile, 45, 120)
      doc.text('Modality: ' + this.userData[0].modality, 45, 140)
      doc.text(
        'Profile responsible: ' +
          this.userData[0].profile_responsible_name +
          ' ' +
          this.userData[0].profile_responsible_surname,
        45,
        160
      )
      doc.text(
        'Advisor: ' +
          this.userData[0].advisor_name +
          ' ' +
          this.userData[0].advisor_surname,
        45,
        180
      )

      doc.text('Fundamental theoretical principles', 40, 240)

      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: 250,
        body: ftpModules
      })

      var finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Technical / scientific modules')

      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: tsmModules
      })

      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Context modules')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: cmModules
      })

      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Projects')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: projectsModules
      })
      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Supplementary modules')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: supplementaryModules
      })
      finalY = doc.lastAutoTable.finalY + 20
      doc.text(40, finalY, 'Master thesis')
      autoTable(doc, {
        head: [['Code', 'Name', 'Site', 'Credits', 'Semester']],
        startY: finalY + 20,
        body: masterModules
      })
      doc.save('asi.pdf')
    }
  },

  computed: {
    ...mapGetters(['userData']),
    ...mapGetters(['loggedUser']),
    ...mapGetters(['asiModuleGroups']),

    ...mapGetters(['allFtpModules']),
    ...mapGetters(['allTsmModules']),
    ...mapGetters(['allCmModules']),
    ...mapGetters(['allFtpAsiModules']),
    ...mapGetters(['allTsmAsiModules']),
    ...mapGetters(['allCmAsiModules']),

    ...mapGetters(['advisors']),
    ...mapGetters(['asiProjects']),
    ...mapGetters(['allSupplementaryModules']),
    ...mapGetters(['allSupplementaryModulesAsiModules']),
    ...mapGetters(['asiMasterProject'])
  },
  created() {
    // user data
    this.fetchUserData()

    //asi
    this.fetchFtpModules()
    this.fetchTsmModules()
    this.fetchCmModules()
    this.fetchFtpAsiModules()
    this.fetchTsmAsiModules()
    this.fetchCmAsiModules()
    this.fetchAsiModuleGroups()

    //technical modules
    this.fetchProjects()
    this.fetchSupplementaryModules()
    this.fetchAsiSupplementaryModules()
    this.fetchAsiMasterProject()
    this.fetchAsiModuleGroups()
    this.fetchAdvisors()
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
