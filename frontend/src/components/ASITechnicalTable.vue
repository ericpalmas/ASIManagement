<template>
  <table class="table table-light">
    <tbody v-for="(course, i) in courses" :key="i">
      <tr>
        <td colspan="4" class="table-active">
          <label for="exampleColorInput" class="form-label">
            {{ course.module_group }}
          </label>
        </td>
        <td class="table-active">
          <button
            type="button"
            class="btn btn-secondary"
            @click="addNewRow(i, course)"
          >
            <i class="fas fa-plus-circle"></i>
          </button>
        </td>
      </tr>
      <tr v-for="(item, k) in course.modules" :key="k" style="width: 100%">
        <!-- <td colspan="5">
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
          >
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
        </td> -->
        <td scope="row flex" class="block">
          <!-- <input class="form-control" type="text" v-model="item.code" /> -->

          {{ item.code }}
        </td>
        <td class="block">
          <!-- <input class="form-control" type="text" v-model="item.module_title" /> -->
          {{ item.module_title }}
        </td>
        <td class="block">
          <!-- <input class="form-control" type="text" v-model="item.credits" /> -->
          {{ item.credits }}
        </td>
        <td class="block">
          <!-- <input class="form-control" type="text" v-model="item.semester" /> -->
          {{ item.semester }}
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
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
  name: 'ASITechnicalTable',
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
      console.log(i)
      console.log(k)
      //var obj = this.courses[i]
      console.log(this.courses[i].modules[k])
      this.courses[i].modules.splice(this.courses[i].modules[k], 1)
      console.log(this.courses)
    },

    addNewRow(i, course) {
      console.log(course)
      console.log(i)
      // course.modules.push({
      //   code: '',
      //   module_title: '',
      //   site: '',
      //   ects: '',
      //   semester: ''
      // })
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
  text-align: center;
}

td {
  border: 1px solid #000;
  text-align: left;
}

tr td:last-child {
  width: 1%;
  white-space: nowrap;
}
</style>