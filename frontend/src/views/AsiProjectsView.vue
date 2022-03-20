<template>
  <div class="project">
    <div id="cardsContainers" class="container pt-3">
      <div class="card">
        <div class="card-body">
          <h1>AsiProjectView</h1>

          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
              <div class="card">
                <h5 class="card-title pt-2">Project 1</h5>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <!-- general informations -->
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="general-info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#general-info"
                      type="button"
                      role="tab"
                      aria-controls="general-info"
                      aria-selected="true"
                    >
                      Informations
                    </button>
                  </li>
                  <!-- goals -->
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="goals-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#goals"
                      type="button"
                      role="tab"
                      aria-controls="goals"
                      aria-selected="false"
                    >
                      Goals
                    </button>
                  </li>
                  <!-- duties -->
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="duties-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#duties"
                      type="button"
                      role="tab"
                      aria-controls="duties"
                      aria-selected="false"
                    >
                      Duties
                    </button>
                  </li>
                  <!-- Prerequisite -->
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="prerequisite-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#prerequisite"
                      type="button"
                      role="tab"
                      aria-controls="prerequisite"
                      aria-selected="false"
                    >
                      Prerequisite
                    </button>
                  </li>
                  <!-- Work method -->
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="work-method-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#work-method"
                      type="button"
                      role="tab"
                      aria-controls="work-method"
                      aria-selected="false"
                    >
                      Methods
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="evaluation-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#evaluation"
                      type="button"
                      role="tab"
                      aria-controls="evaluation"
                      aria-selected="false"
                    >
                      Timeline
                    </button>
                  </li>
                </ul>

                <!-- tab content -->
                <div class="tab-content" id="myTabContent">
                  <!-- General info content -->
                  <div
                    class="tab-pane fade show active"
                    id="general-info"
                    role="tabpanel"
                    aria-labelledby="general-info-tab"
                  >
                    <div class="card-body">
                      <div class="row gx-5">
                        <div class="col">
                          <div class="p-3 border bg-light">
                            <ul
                              class="list-group list-group-flush border-success"
                            >
                              <h6>General informations:</h6>
                              <li class="list-group-item border">
                                Project title: Telemedicine platform for remote
                                monitoring applications
                              </li>
                              <div class="row gy-5 pt-2">
                                <div class="col-6">
                                  <!-- <div class="p-3 border bg-light"> -->
                                  <ul
                                    class="
                                      list-group list-group-flush
                                      border-success
                                    "
                                  >
                                    <li class="list-group-item border">
                                      Kind: applied research project
                                    </li>
                                  </ul>
                                  <!-- </div> -->
                                </div>
                                <div class="col-6">
                                  <!-- <div class="p-3 border bg-light"> -->
                                  <ul
                                    class="
                                      list-group list-group-flush
                                      border-success
                                    "
                                  >
                                    <li class="list-group-item border">
                                      ECTS credits awarded: 9
                                    </li>
                                  </ul>
                                  <!-- </div> -->
                                </div>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Duties content -->
                  <div
                    class="tab-pane fade"
                    id="duties"
                    role="tabpanel"
                    aria-labelledby="duties-tab"
                  >
                    <div class="card-body">
                      <div class="row gx-5">
                        <div class="col">
                          <div class="p-3 border bg-light">
                            <ul
                              class="list-group list-group-flush border-success"
                            >
                              <h6>Duties:</h6>
                              <li class="list-group-item border">
                                • Understanding the problem and define the data
                                workflow specifications
                              </li>
                              <li class="list-group-item border">
                                • Study the state of the art on telemedicine
                                systems
                              </li>
                              <li class="list-group-item border">
                                • Implement a framework for easily designing
                                mobile applications on the fly for health remote
                                monitoring application.
                              </li>
                              <li class="list-group-item border">
                                • Implement a first module of the framework for
                                the sleep diary.
                              </li>
                              <li class="list-group-item border">
                                • Develop a back-end with a graphical user
                                interface for the physician.
                              </li>
                              <li class="list-group-item border">
                                • Write a technical report and a research paper.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Learning goals content -->
                  <div
                    class="tab-pane fade"
                    id="goals"
                    role="tabpanel"
                    aria-labelledby="goals-tab"
                  >
                    <div class="card-body">
                      <div class="row gx-5">
                        <div class="col">
                          <div class="p-3 border bg-light">
                            <ul
                              class="list-group list-group-flush border-success"
                            >
                              <h6>Learning goals:</h6>
                              <li class="list-group-item border">
                                • Learn how to implement a general framework for
                                generating mobile applications.
                              </li>
                              <li class="list-group-item border">
                                • Learn how to generate dynamically mobile
                                application contents.
                              </li>
                              <li class="list-group-item border">
                                • Learn how to integrate wearable sensors with
                                the mobile app.
                              </li>
                              <li class="list-group-item border">
                                • Learn how to develop a complete telemedicine
                                platform.
                              </li>
                              <li class="list-group-item border">
                                • Learn how to present the performed work and
                                achieved results to experts in the field.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Prerequisite content -->
                  <div
                    class="tab-pane fade"
                    id="prerequisite"
                    role="tabpanel"
                    aria-labelledby="prerequisite-tab"
                  >
                    <div class="card-body">
                      <div class="row gx-5">
                        <div class="col">
                          <div class="p-3 border bg-light">
                            <ul
                              class="list-group list-group-flush border-success"
                            >
                              <h6>Prerequisite knowledge:</h6>
                              <li class="list-group-item border">
                                • Bachelor SUPSI on Computer Science
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Work method content -->
                  <div
                    class="tab-pane fade"
                    id="work-method"
                    role="tabpanel"
                    aria-labelledby="work-method-tab"
                  >
                    <div class="card-body">
                      <div class="row gx-5">
                        <div class="col">
                          <div class="p-3 border bg-light">
                            <ul
                              class="list-group list-group-flush border-success"
                            >
                              <h6>Work method:</h6>
                              <li class="list-group-item border">
                                • The project is planned in a highly skilled
                                technical environment.
                              </li>
                              <li class="list-group-item border">
                                • The work is individual but in collaboration
                                with other researchers and engineers
                              </li>
                              <li class="list-group-item border">
                                • The student has access to relevant literature
                                and to experts in the field.
                              </li>
                              <li class="list-group-item border">
                                • Regular meetings with tutor.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Timeline and evaluation content -->
                  <div
                    class="tab-pane fade"
                    id="evaluation"
                    role="tabpanel"
                    aria-labelledby="evaluation-tab"
                  >
                    <div class="card-body">
                      <div class="row gx-5">
                        <div class="col">
                          <div class="p-3 border bg-light">
                            <ul
                              class="list-group list-group-flush border-success"
                            >
                              <h6>Timeline, evaluation criteria</h6>
                              <li class="list-group-item border">
                                Start date: 22.02.2021
                              </li>
                              <li class="list-group-item border">
                                End date: XX.08.2021
                              </li>
                              <li class="list-group-item border">
                                Requested documentation: Technical report,
                                software source tree, other
                              </li>
                              <li class="list-group-item border">
                                complementary docs
                              </li>
                              <li class="list-group-item border">
                                Date of examination:
                              </li>
                              <li class="list-group-item border">
                                Duration of examination: 1 hour
                              </li>
                              <li class="list-group-item border">
                                Evaluation criteria: See table in annex 2
                              </li>
                              <li class="list-group-item border">
                                Project tutor: Alessandro Puiatti
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
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Project 2</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Project 3</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Master thesis</h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
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
  name: 'AsiProjectScreen'
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

.project {
  text-align: center;
}
</style>

