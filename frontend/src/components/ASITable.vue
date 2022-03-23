<template>
  <table class="table table-light">
    <!-- <thead>
      <tr>
        <td>Code</td>
        <td>Module title</td>
        <td>Site</td>
        <td>ECTS</td>
        <td>Semester</td>
        <td colspan="2"></td>
      </tr>
    </thead> -->
    <tbody v-for="(course, i) in courses" :key="i">
      <tr>
        <td colspan="6" class="table-active">
          <label for="exampleColorInput" class="form-label">
            {{ course.module_group }}
          </label>
        </td>
        <td class="table-active">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="addNewRow(i, course)"
          >
            <i class="fas fa-plus-circle"></i>
          </button>
        </td>
      </tr>
      <tr v-for="(item, k) in course.modules" :key="k">
        <td colspan="6">
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
          >
            <!-- qua devo ciclare le option e selezionare quella scelta, in base ad item.code -->
            <option
              value="FTP_AdvAlgDS"
              selected="item.code === FTP_AdvAlgDS ? true : false"
            >
              FTP_AdvAlgDS
            </option>
            <option
              value="FTP_AppStat"
              selected="item.code === FTP_AppStat ? true : false"
            >
              FTP_AppStat
            </option>
            <option
              value="FTP_ApprAlg"
              selected="item.code === FTP_ApprAlg ? true : false"
            >
              FTP_ApprAlg
            </option>
            <option value="FTP_BioEng" selected="true">
              <b>Code:</b>
              &nbsp;&nbsp; FTP_BioEng, Name:&nbsp;&nbsp; Biology, physiology and
              anatomy for engineers, Site:&nbsp;&nbsp; LU, Credits:&nbsp;&nbsp;
              3, Semester:&nbsp;&nbsp; 3
            </option>
          </select>
        </td>

        <!-- <td>
          <button type="button" class="btn btn-outline-secondary">
            <i class="fas fa-edit"></i>
          </button>
        </td> -->
        <td>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="deleteRow(i, k, course)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>



<script>
export default {
  name: 'ASITable',
  props: {
    parametri: Array
  },
  data() {
    return {
      invoice_subtotal: 0,
      invoice_total: 0,
      invoice_tax: 5,
      courses: this.parametri
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
        code: '',
        module_title: '',
        site: '',
        ects: '',
        semester: ''
      })
      // console.log(this.courses[i].modules)
    }
  }
}
</script>

<style scoped>
.course-table {
  padding: 2%;
}
</style>