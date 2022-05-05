<template>
  <Sidebar />
  <div class="AsiInfoView" :style="{ 'margin-left': sidebarWidth }">
    <Navbar />
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <div class="container">
            <div class="row">
              <!-- theory modules -->
              <div class="col">
                <div class="card-body">
                  <div class="row gx-5">
                    <div class="col">
                      <div class="p-3 border bg-light">
                        <ul class="list-group list-group-flush border-success">
                          <h6>Theory modules:</h6>
                          <li class="list-group-item border">
                            The student must certify at least 30 ECTS of theory
                            modules (courses); among these:
                          </li>
                          <li class="list-group-item border">
                            • at least 9 ECTS must belong to the category
                            “fundamental theoretical principles” (FTP)
                          </li>
                          <li class="list-group-item border">
                            • at least 12 ECTS must belong to the category
                            “technical scientific modules” (TSM)
                          </li>
                          <li class="list-group-item border">
                            • at least 6 ECTS must belong to the category
                            "context modules" (CM).
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- technical modules -->
              <div class="col">
                <div class="card-body">
                  <div class="row gx-5">
                    <div class="col">
                      <div class="p-3 border bg-light">
                        <ul class="list-group list-group-flush border-success">
                          <h6>Technical specialization within an MRU:</h6>
                          <li class="list-group-item border">
                            The student must certify at least 60 ECTS of
                            specialization modules. Among these:
                          </li>
                          <li class="list-group-item border">
                            • at least 2 projects, minimum 9 ECTS each, maximum
                            15 ECTS each
                          </li>
                          <li class="list-group-item border">
                            • at least 1 supplementary module (supplementary
                            courses, seminars, laboratories…), minimum 3 ECTS
                            each
                          </li>
                          <li class="list-group-item border">
                            • the master thesis of 30 ECTS
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- external modules -->
              <div class="col">
                <div class="card-body">
                  <div class="row gx-5">
                    <div class="col">
                      <div class="p-3 border bg-light">
                        <ul class="list-group list-group-flush border-success">
                          <h6>External modules:</h6>
                          <li class="list-group-item border">
                            A maximum of 9 ECTS can be taken outside the
                            official MSE offer. In this case, the course will be
                            described in the present document (see section 3.4).
                            Moreover, the course must:
                          </li>
                          <li class="list-group-item border">
                            • be offered by an accredited institution
                            (university, polytechnic, research institute...),
                          </li>
                          <li class="list-group-item border">
                            • be a course with a master of science level; i.e.
                            it must be preferably part of a master of science
                            program,
                          </li>
                          <li class="list-group-item border">
                            • have a certification process, preferably a
                            written/oral examination; proof of the certification
                            must be sent to SUPSI MSE.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-3">
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="card-body">
                  <div class="row gx-5">
                    <div class="col">
                      <div class="p-3 border bg-light">
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
              </div>
              <div class="col">
                <div class="card-body">
                  <div class="row gx-5">
                    <div class="col">
                      <div class="p-3 border bg-light">
                        <ul class="list-group list-group-flush border-success">
                          <h6>
                            Goal of the study, competence to acquire, research
                            institute and research topics
                          </h6>
                          <li class="list-group-item border">
                            The master degree is awarded if the student
                            certifies at least 90 ECTS credits. Mr. Xxx will
                            study part time with the objective to complete his
                            studies in 6 semesters. He will take central modules
                            and prepare seminar presentations on topics he will
                            have to learn and run several projects, including
                            the master thesis.
                          </li>
                        </ul>
                        <ul class="list-group list-group-flush border-success">
                          <h6>
                            Goals of the master study and competences to obtain
                          </h6>
                          <li class="list-group-item border">
                            Obligatory part: insert text.
                          </li>
                        </ul>
                        <ul class="list-group list-group-flush border-success">
                          <h6>Research institute</h6>
                          <li class="list-group-item border">
                            Optional part: insert text if appropriate.
                          </li>
                        </ul>
                        <ul class="list-group list-group-flush border-success">
                          <h6>The research topics</h6>
                          <li class="list-group-item border">
                            Optional part: insert text if appropriate.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/sidebar/Sidebar'
import { sidebarWidth } from '../components/sidebar/state'

export default {
  name: 'AsiInfoView',
  setup() {
    return { sidebarWidth }
  },
  components: {
    Navbar,
    Sidebar
  }
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
.title {
  padding: 2%;
}
</style>
