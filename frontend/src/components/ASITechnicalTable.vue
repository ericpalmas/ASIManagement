<template>
  <table class="table table-light">
    <thead>
      <tr>
        <td>Code</td>
        <td>Module title</td>
        <td>ECTS</td>
        <td>Semester</td>
        <td colspan="2"></td>
      </tr>
    </thead>
    <!-- projects -->
    <tbody>
      <tr>
        <td colspan="5" class="table-active">
          <label for="exampleColorInput" class="form-label">Projects</label>
        </td>
        <td class="table-active">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="addNewRow(0)"
          >
            <i class="fas fa-plus-circle"></i>
          </button>
        </td>
      </tr>
      <tr v-for="(project, i) in projects" :key="i" style="width: 100%">
        <td scope="row flex" class="block">
          {{ project.code }}
        </td>
        <td class="block">
          {{ project.module_name }}
        </td>
        <td class="block">
          {{ project.ects }}
        </td>
        <td class="block">
          {{ project.semester }}
        </td>
        <td>
          <button type="button" class="btn btn-outline-secondary">
            <i class="fas fa-edit"></i>
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="deleteRow(0, i)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
    <!-- Supplementary modules -->
    <tbody>
      <tr>
        <td colspan="5" class="table-active">
          <label for="exampleColorInput" class="form-label">
            Supplementary modules
          </label>
        </td>
        <td class="table-active">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="addNewRow(1)"
          >
            <i class="fas fa-plus-circle"></i>
          </button>
        </td>
      </tr>
      <tr
        v-for="(module, i) in supplementaryAsiModules"
        :key="module.id_module"
        style="width: 100%"
      >
        <td colspan="5">
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
          >
            <option
              v-for="course in supplementaryModules"
              :key="course.id_module"
              :selected="course.id_module === module.id_module ? true : false"
            >
              <b>Code:</b>
              &nbsp;&nbsp; {{ course.code }}, Name:&nbsp;&nbsp;
              {{ course.module_name }}, Site:&nbsp;&nbsp;
              {{ course.site_initials }}, Credits:&nbsp;&nbsp;
              {{ course.ects }}
            </option>
          </select>
        </td>

        <td>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="deleteRow(1, i)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
    <!-- Master -->
    <tbody>
      <tr>
        <td colspan="5" class="table-active">
          <label for="exampleColorInput" class="form-label">Master</label>
        </td>
        <td class="table-active">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="addNewRow(2)"
          >
            <i class="fas fa-plus-circle"></i>
          </button>
        </td>
      </tr>
      <tr v-for="(project, i) in asiMasterProject" :key="i" style="width: 100%">
        <td scope="row flex" class="block">
          {{ project.code }}
        </td>
        <td class="block">
          {{ project.module_name }}
        </td>
        <td class="block">
          {{ project.ects }}
        </td>
        <td class="block">
          {{ project.semester }}
        </td>
        <td>
          <button type="button" class="btn btn-outline-secondary">
            <i class="fas fa-edit"></i>
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="deleteRow(2, i)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>

      <!-- <tr
        v-for="(course, i) in courses[2].modules"
        :key="i"
        style="width: 100%"
      >
        <td scope="row flex" class="block">
          {{ course.code }}
        </td>
        <td class="block">
          {{ course.module_title }}
        </td>
        <td class="block">
          {{ course.credits }}
        </td>
        <td class="block">
          {{ course.semester }}
        </td>
        <td>
          <button type="button" class="btn btn-outline-secondary">
            <i class="fas fa-edit"></i>
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="deleteRow(2, i)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr> -->
    </tbody>
  </table>
</template>



<script>
export default {
  name: 'ASITechnicalTable',
  props: {
    projectsProps: Array,
    supplementaryModulesProps: Array,
    supplementaryAsiModulesProps: Array,
    asiMasterProjectProps: Array
  },
  data() {
    return {
      projects: this.projectsProps,
      master: this.masterProps,
      supplementaryModules: this.supplementaryModulesProps,
      supplementaryAsiModules: this.supplementaryAsiModulesProps,
      asiMasterProject: this.asiMasterProjectProps
    }
  },
  methods: {
    // mettere controllo prima di cancellare una riga
    deleteRow(i, k) {
      if (i === 0) {
        this.projects.splice(k, 1)
      } else if (i === 1) {
        this.supplementaryAsiModules.splice(k, 1)
      } else if (i === 2) {
        this.asiMasterProject.splice(k, 1)
      }
    },

    addNewRow(i) {
      if (i === 0) {
        this.projects.push({
          id_module: '',
          code: ' ',
          module_name: '',
          ects: '',
          semester: 1
        })
      } else if (i === 1) {
        this.supplementaryAsiModules.push({
          id_module: this.supplementaryModules[0].id_module,
          code: this.supplementaryModules[0].code,
          module_name: this.supplementaryModules[0].module_name,
          ects: this.supplementaryModules[0].ects,
          semester: 1,
          module_group_initials:
            this.supplementaryModules[0].module_group_initials,
          responsible_name: this.supplementaryModules[0].responsible_name,
          responsible_surname: this.supplementaryModules[0].responsible_surname,
          site: this.supplementaryModules[0].site,
          site_initials: this.supplementaryModules[0].site_initials
        })
      } else if (i === 2) {
        this.asiMasterProject.push({
          id_module: '',
          code: ' ',
          module_name: '',
          ects: '',
          semester: 1
        })
      }
    }
  }
}
</script>

<style scoped>
.course-table {
  padding: 2%;
  text-align: center;
}

td {
  /* border: 1px solid #000; */
  text-align: left;
}

tr td:last-child {
  width: 1%;
  white-space: nowrap;
}

tbody {
  border: none;
}

tbody {
  border-collapse: collapse !important;
}
</style>