<template>
  <div class="AdministrativeDataView">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <h1 class="title">AdministrativeDataView</h1>

        <div class="card-body" v-for="user in userData" :key="user.student_id">
          <div class="row justify-content-start">
            <div class="col-4">Student’s family name(s):</div>
            <div class="col-4">{{ user.student_surname }}</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Student’s given name(s):</div>
            <div class="col-4">{{ user.student_name }}</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Enrollment Nr.:</div>
            <div class="col-4">{{ user.student_enrollment_number }}</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Modality:</div>
            <div class="col-4">{{ user.modality }}</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Profile:</div>
            <div class="col-4">{{ user.profile }}</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Profile responsible:</div>
            <div class="col-4">Prof. Roberto Mastropietro</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Istitute:</div>
            <div class="col-4">ISIN</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Istitute director:</div>
            <div class="col-4">Prof. Tiziano Leidi</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Research areas</div>
            <div class="col-4">Xxx (e.g. Bioelectronics)</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Awarded degree:</div>
            <div class="col-4">
              Master of Science in Engineering with specialty in Computer
              Engineering
            </div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Start of program:</div>
            <div class="col-4">September 14, 2020</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Student’s advisor:</div>
            <div class="col-4">
              Prof. {{ user.advisor_name }} {{ user.advisor_surname }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AdministrativeDataView',
  methods: {
    ...mapActions(['fetchUserData'])
  },
  computed: {
    ...mapGetters(['userData'])
  },
  created() {
    this.fetchUserData()
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
