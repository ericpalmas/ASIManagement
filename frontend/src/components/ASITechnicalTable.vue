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
    //parametri: Array,
    //masterProps: Array,
    projectsProps: Array,
    supplementaryModulesProps: Array,
    supplementaryAsiModulesProps: Array
  },
  data() {
    return {
      // invoice_subtotal: 0,
      // invoice_total: 0,
      // invoice_tax: 5,
      //courses: this.parametri,
      projects: this.projectsProps,
      master: this.masterProps,
      supplementaryModules: this.supplementaryModulesProps,
      supplementaryAsiModules: this.supplementaryAsiModulesProps
    }
  },
  methods: {
    saveInvoice() {
      console.log(JSON.stringify(this.courses))
    },

    calculateTotal() {
      var subtotal, total
      subtotal = this.courses.reduce(function (sum, product) {
        var lineTotal = parseFloat(product.semester)
        if (!isNaN(lineTotal)) {
          return sum + lineTotal
        }
      }, 0)

      this.invoice_subtotal = subtotal.toFixed(2)

      total = subtotal * (this.invoice_tax / 100) + subtotal
      total = parseFloat(total)
      if (!isNaN(total)) {
        this.invoice_total = total.toFixed(2)
      } else {
        this.invoice_total = '0.00'
      }
    },
    calculateLineTotal(course) {
      var total = parseFloat(course.site) * parseFloat(course.ects)
      if (!isNaN(total)) {
        course.semester = total.toFixed(2)
      }
      this.calculateTotal()
    },

    // mettere controllo prima di cancellare una riga
    deleteRow(i, k) {
      console.log(this.courses[i].module_group)
      console.log('elemento da cancellare: ' + k)
      console.log(this.courses[i].modules[k])
      this.courses[i].modules.splice(k, 1)
    },

    addNewRow(i, course) {
      console.log(course)
      console.log(i)

      this.courses[i].modules.push({
        code: ' ',
        module_title: '',
        credits: '',
        semester: ''
      })
      console.log(this.courses)
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