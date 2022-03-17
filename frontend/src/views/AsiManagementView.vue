<template>
  <div class="asiManagement">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>ASI management</h1>
          <b-card-text>Fundamental theoretical principles</b-card-text>

          <ASITable
            :parametri="[
              {
                code: 'FTP_BioEng ',
                module_title: 'Biology, physiology and anatomy for engineers',
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
            ]"
          />

          <b-card-text>Technical / scientific modules</b-card-text>

          <ASITable
            :parametri="[
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
            ]"
          />

          <b-card-text>Context modules</b-card-text>

          <ASITable
            :parametri="[
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
            ]"
          />

          <b-button title="Save file">
            <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
//import AsiManagementTable from '../components/AsiManagementTable.vue'
import ASITable from '../components/ASITable.vue'
//import VuetableDemo from '../components/VuetableDemo.vue'

export default {
  name: 'AsiManagementView',
  components: {
    //AsiManagementTable,
    ASITable
    //VuetableDemo,
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .asiManagement {
  margin: auto;
  height: 60%;
  width: 80%;
  border: 5px solid #616161;
  padding: 10px;
  background-color: #ffffff;
}
.card {
  margin-top: 10%;
  margin-bottom: 10%;

  margin-top: 4%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #3f4254;
}
.card.card-custom {
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  background-color: #ffffff !important;
}

.mb-6,
.my-6 {
  margin-bottom: 1.5rem !important;
}
.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
} */

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
