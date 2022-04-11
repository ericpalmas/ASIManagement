<template>
  <div class="course-list">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1 class="title">Login view</h1>
          <div class="mb-3 row">
            <label
              for="exampleFormControlInput1"
              class="col-sm-2 col-form-label"
            >
              NetId
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView'
}
</script>


<style scoped>
.cardsContainers {
  min-height: 100vh;
  width: 50%;
  border: 5px solid #616161;
  padding-top: 2%;
  background-color: #eeeded;
  text-align: center;
}

.course-list {
  text-align: center;
}
.title {
  padding: 2%;
}
</style>