<template>
  <div class="asiManagement">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>Technical specialization with an MRU</h1>

          <!-- <div
            v-for="module in allSupplementaryModules"
            :key="module.id_module"
          >
            <h5>{{ module.code }}</h5>
            <h5>{{ module.module_name }}</h5>
            <h5>{{ module.ects }}</h5>
          </div> -->

          <!-- <div
            v-for="module in allSupplementaryModulesAsiModules"
            :key="module.id_module"
          >
            <h5>{{ module.code }}</h5>
            <h5>{{ module.module_name }}</h5>
            <h5>{{ module.ects }}</h5>
          </div> -->

          <ASITechnicalTable
            :projectsProps="asiProjects"
            :supplementaryModulesProps="allSupplementaryModules"
            :supplementaryAsiModulesProps="allSupplementaryModulesAsiModules"
            :asiMasterProjectProps="asiMasterProject"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AsiTechnicalSpecializationManagementView',
  components: {
    ASITechnicalTable
  },
  methods: {
    ...mapActions(['fetchProjects']),
    ...mapActions(['fetchSupplementaryModules']),
    ...mapActions(['fetchAsiSupplementaryModules']),
    ...mapActions(['fetchAsiMasterProject'])
  },
  computed: {
    ...mapGetters(['asiProjects']),
    ...mapGetters(['allSupplementaryModules']),
    ...mapGetters(['allSupplementaryModulesAsiModules']),
    ...mapGetters(['asiMasterProject'])
  },
  created() {
    this.fetchProjects()
    this.fetchSupplementaryModules()
    this.fetchAsiSupplementaryModules()
    this.fetchAsiMasterProject()
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
