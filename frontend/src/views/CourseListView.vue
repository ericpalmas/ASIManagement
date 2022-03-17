<template>
  <div class="course-list">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>CourseListView</h1>
          <div class="table-responsive">
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
                <tr>
                  <th scope="row">1</th>
                  <td>FTP_AdvAlgDS</td>
                  <td>3</td>
                  <td></td>
                  <td>Advanced Algorithms and Data Structures</td>
                  <td>Grandoni, Fabrizio</td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>FTP_AppStat</td>
                  <td>3</td>
                  <td></td>
                  <td>Applied Statistics and Data Analysis</td>
                  <td>Faraci, Francesca (SUPSI)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>FTP_ApprAlg</td>
                  <td>3</td>
                  <td></td>
                  <td>Approximation Algorithms</td>
                  <td>Grandoni, Fabrizio</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <!-- tsm courses -->
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>TSM_AdvCompG</td>
                  <td>3</td>
                  <td>CS</td>
                  <td>Advanced computer graphics</td>
                  <td>Peternier, Achille</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>TSM_AdvDataMgmt</td>
                  <td>3</td>
                  <td>CS</td>
                  <td>
                    Advanced Data Management – non standard database systems
                  </td>
                  <td>Mastropietro, Roberto</td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                  <td>X</td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>TSM_DataAnaCla</td>
                  <td>3</td>
                  <td>DS</td>
                  <td>Data Analysis and Classification</td>
                  <td>Mastropietro, Roberto</td>
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

export default {
  name: 'CourseListView',
  components: {}
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