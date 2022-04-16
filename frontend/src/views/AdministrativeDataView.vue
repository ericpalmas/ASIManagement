<template>
  <div class="AdministrativeDataView">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <h1 class="title">AdministrativeDataView</h1>

        <div class="card-body" v-for="user in userData" :key="user.student_id">
          <div class="row justify-content-center">
            <div class="col-3">Student’s family name(s):</div>
            <div class="col-3">{{ user.student_surname }}</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Student’s given name(s):</div>
            <div class="col-3">{{ user.student_name }}</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Enrollment Nr.:</div>
            <div class="col-3">{{ user.student_enrollment_number }}</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Modality:</div>
            <div class="col-3">{{ user.modality }}</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Profile:</div>
            <div class="col-3">{{ user.profile }}</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Profile responsible:</div>
            <div class="col-3">Prof. Roberto Mastropietro</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Istitute:</div>
            <div class="col-3">ISIN</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Istitute director:</div>
            <div class="col-3">Prof. Tiziano Leidi</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Research areas</div>
            <div class="col-3">Xxx (e.g. Bioelectronics)</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Awarded degree:</div>
            <div class="col-3">
              Master of Science in Engineering with specialty in Computer
              Engineering
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Start of program:</div>
            <div class="col-3">September 14, 2020</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-3">Student’s advisor:</div>
            <div class="col-3">
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
