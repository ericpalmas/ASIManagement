<template>
  <div class="asiManagement">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>ASI management</h1>

          <ASITable
            :parametri="[
              {
                module_group: 'FTP',
                modules: [
                  {
                    code: 'FTP_BioEng ',
                    module_title:
                      'Biology, physiology and anatomy for engineers',
                    site: 'LU',
                    credits: '3',
                    semester: '3'
                  },
                  {
                    code: 'FTP_AppSta',
                    module_title: 'Applied Statistics and Data Analysis',
                    site: 'LU',
                    credits: '3',
                    semester: '2'
                  },
                  {
                    code: 'FTP_MultiASys ',
                    module_title: 'Multi-agent systems',
                    site: 'LU',
                    credits: '3',
                    semester: '4'
                  }
                ]
              },

              {
                module_group: 'TSM',
                modules: [
                  {
                    code: 'USI_UserExp ',
                    module_title: 'User Experience Design',
                    site: 'LU',
                    credits: '6',
                    semester: '2'
                  },
                  {
                    code: 'USI_ProStyles ',
                    module_title: 'Programming Styles',
                    site: 'LU',
                    credits: '3',
                    semester: '1'
                  },
                  {
                    code: 'TSM_AdvDataMgmt ',
                    module_title: 'Advanced Data Management',
                    site: 'LU',
                    credits: '3',
                    semester: '1'
                  }
                ]
              },

              {
                module_group: 'CM',
                modules: [
                  {
                    code: 'CM_QRM ',
                    module_title: 'Quality and risk management',
                    site: 'LU',
                    credits: '6',
                    semester: '2'
                  },
                  {
                    code: 'CM_AdvPM ',
                    module_title: 'Advanced project management',
                    site: 'LU',
                    credits: '3',
                    semester: '1'
                  },
                  {
                    code: 'CM_IntSust ',
                    module_title:
                      'Integrated Sustainable Management of production systems',
                    site: 'LU',
                    credits: '3',
                    semester: '1'
                  }
                ]
              }
            ]"
          />

          <b-button title="Save file">
            <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </div>

      <div id="cardsContainers" class="container pt-3 pb-4">
        <div class="card">
          <div class="card-body">
            <h1>Corsi per ogni semestre</h1>

            <table class="table table-light">
              <thead>
                <tr>
                  <td>Semester</td>
                  <td>N. Courses</td>
                  <td>Credits</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>3</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>1</td>
                  <td>3</td>
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
import ASITable from '../components/ASITable.vue'

export default {
  name: 'AsiManagementView',
  components: {
    ASITable
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

.asiManagement {
  text-align: center;
}
</style>
