<template>
  <div class="project">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1 class="title">Select user type</h1>

          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Student</h5>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Advisor</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectUserTypeView'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardsContainers {
  min-height: 100vh;
  width: 80%;
  border: 5px solid #616161;
  padding-top: 2%;
  background-color: #eeeded;
  text-align: center;
}

.title {
  padding: 2%;
}

.project {
  text-align: center;
}
</style>

