<template>
  <div class="course-list">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>CourseListView</h1>
          <div class="table-responsive">
            <!-- <div v-for="module in allModules" :key="module.module_id">
              {{ module.id_module }}, {{ module.code }},
              {{ module.module_name }}
            </div> -->

            <!-- <div class="card card-body m-4">
              <h3>Options API + Vuex</h3>
              <h5 class="text-center">{{ counter }} x 2 = {{ times2 }}</h5>
              <button class="btn btn-primary" @click="inc">Increment</button>
            </div> -->
            <table class="table align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Code</th>
                  <th scope="col">ECTS</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Name</th>
                  <th scope="col">Responsible</th>
                  <th scope="col">Fall 2020/21</th>
                  <th scope="col">Spring 2021</th>
                  <th scope="col">Fall 2021/22</th>
                  <th scope="col">Spring 2022</th>
                  <th scope="col">Fall 2022/23</th>
                  <th scope="col">Spring 2023</th>
                  <th scope="col">Fall 2023/24</th>
                  <th scope="col">Spring 24</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="module in allModules" :key="module.module_id">
                  <th scope="row">1</th>
                  <td>{{ module.code }}</td>
                  <td>{{ module.ects }}</td>
                  <td></td>
                  <td>{{ module.module_name }}</td>
                  <td>
                    {{ module.responsible_surname }}
                    {{ module.responsible_name }}
                  </td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CourseListView',
  methods: {
    ...mapActions(['fetchModules'])
  },
  computed: mapGetters(['allModules']),
  created() {
    this.fetchModules()
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

.course-list {
  text-align: center;
}
</style>