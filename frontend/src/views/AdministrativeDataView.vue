<template>
  <div class="AdministrativeDataView">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <h1>AdministrativeDataView</h1>
        <div class="card-body">
          <div class="row justify-content-start">
            <div class="col-4">Student’s family name(s):</div>
            <div class="col-4">Palmas</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Student’s given name(s):</div>
            <div class="col-4">Eric</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Enrollment Nr.:</div>
            <div class="col-4">16-682-056</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Modality:</div>
            <div class="col-4">Part-time</div>
          </div>
          <div class="row justify-content-start">
            <div class="col-4">Profile:</div>
            <div class="col-4">Computer Science</div>
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
            <div class="col-4">Prof. Alessandro Puiatti</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdministrativeDataView'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .AdministrativeDataView {
  margin: auto;
  min-height: 100vh;
  width: 60%;
  border: 5px solid #616161;
  padding: 10px;
  background-color: #ffffff;
  text-align: center;
}
.cardsContainers {
  min-height: 100vh;
  width: 60%;
  border: 5px solid #616161;
  padding-top: 2%;
  background-color: #eeeded;
  text-align: center;
} */

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
</style>
