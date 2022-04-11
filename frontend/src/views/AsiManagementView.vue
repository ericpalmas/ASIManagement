<template>
  <div class="asiManagement">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <!-- <h1>ASI management</h1> -->

          <!-- <div v-for="module in allFtpAsiModules" :key="module.id_module">
            <h5>{{ module.code }}</h5>
            <h5>{{ module.module_name }}</h5>
            <h5>{{ module.ects }}</h5>
          </div> -->

          <ASITable
            :ftpModules="allFtpModules"
            :tsmModules="allTsmModules"
            :cmModules="allCmModules"
            :ftpAsiModules="allFtpAsiModules"
            :tsmAsiModules="allTsmAsiModules"
            :cmAsiModules="allCmAsiModules"
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
import ASITable from '../components/ASITable.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AsiManagementView',
  components: {
    ASITable
  },
  methods: {
    ...mapActions(['fetchFtpModules']),
    ...mapActions(['fetchTsmModules']),
    ...mapActions(['fetchCmModules']),
    ...mapActions(['fetchFtpAsiModules']),
    ...mapActions(['fetchTsmAsiModules']),
    ...mapActions(['fetchCmAsiModules'])
  },
  computed: {
    ...mapGetters(['allFtpModules']),
    ...mapGetters(['allTsmModules']),
    ...mapGetters(['allCmModules']),
    ...mapGetters(['allFtpAsiModules']),
    ...mapGetters(['allTsmAsiModules']),
    ...mapGetters(['allCmAsiModules'])
  },
  created() {
    this.fetchFtpModules()
    this.fetchTsmModules()
    this.fetchCmModules()
    this.fetchFtpAsiModules()
    this.fetchTsmAsiModules()
    this.fetchCmAsiModules()
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
.title {
  padding: 2%;
}
</style>
