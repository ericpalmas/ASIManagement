<template>
  <div class="AsiInfoView">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>AsiInfoView</h1>
          <h3 class="card-title">
            2. Goal of the study, competence to acquire, research institute and
            research topics
          </h3>

          <p class="card-text">
            The master degree is awarded if the student certifies at least 90
            ECTS credits. Mr. Xxx will study part time with the objective to
            complete his studies in 6 semesters. He will take central modules
            and prepare seminar presentations on topics he will have to learn
            and run several projects, including the master thesis.
          </p>

          <h3 class="card-title">
            2.1 Goals of the master study and competences to obtain
          </h3>
          <p class="card-text">Obligatory part: insert text.</p>

          <h3 class="card-title">2.2 Research institute</h3>
          <p class="card-text">Optional part: insert text if appropriate.</p>

          <h3 class="card-title">2.3 The research topics</h3>
          <p class="card-text">Optional part: insert text if appropriate.</p>
        </div>
      </div>

      <div class="card mt-3">
        <div class="card-body">
          <img
            src="../assets/structure.png"
            class="img-fluid"
            alt="master structure"
            max-width="100%"
            height="auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsiInfoView'
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

.AsiInfoView {
  text-align: center;
}
</style>
