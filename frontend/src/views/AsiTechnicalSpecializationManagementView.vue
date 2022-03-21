<template>
  <div class="asiManagement">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>Technical specialization with an MRU</h1>

          <ASITechnicalTable
            :parametri="[
              {
                module_group: 'Projects',
                modules: [
                  {
                    code: 'MP9_0001 ',
                    module_title:
                      'Telemedicine platform for remote monitoring applications (tutor: Alessandro Puiatti)',
                    credits: '9',
                    semester: '2'
                  },
                  {
                    code: 'MP9_0001',
                    module_title:
                      'Telemedicine platform for remote monitoring applications (tutor: Alessandro Puiatti)',
                    credits: '3',
                    semester: '3'
                  },
                  {
                    code: 'MP15_0001 ',
                    module_title: 'Gestionale master of science in engineering',
                    credits: '15',
                    semester: '3'
                  }
                ]
              },
              {
                module_group: 'Supplementary modules',
                modules: [
                  {
                    code: 'MC_MobSys ',
                    module_title: 'Mobile Systems and Applications',
                    credits: '3',
                    semester: '2'
                  }
                ]
              },
              {
                module_group: 'Master thesis',
                modules: [
                  {
                    code: 'MP30_0001',
                    module_title: 'Xxx (tutor: Xxx)',
                    credits: '30',
                    semester: '5'
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
    </div>
  </div>
</template>




<script>
//import ASITable from '../components/ASITable.vue'
import ASITechnicalTable from '../components/ASITechnicalTable.vue'

export default {
  name: 'AsiTechnicalSpecializationManagementView',
  components: {
    ASITechnicalTable
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
  /* text-align: center; */
}

.asiManagement {
  text-align: center;
}
</style>
