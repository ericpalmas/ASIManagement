<template>
  <!-- <div class="course-table">
    <button type="button" class="btn btn-info" @click="addNewRow">
      <i class="fas fa-plus-circle"></i>
    </button>
    <tr>
      <td>Code</td>
      <td>Module title</td>
      <td>Site</td>
      <td>ECTS</td>
      <td>Semester</td>
    </tr>
    <tr v-for="(course, k) in courses" :key="k">

      <td>
        <input class="form-control" type="text" v-model="course.code" />
      </td>
      <td>
        <input class="form-control" type="text" v-model="course.module_title" />
      </td>
      <td>
        <input class="form-control" type="text" v-model="course.site" />
      </td>
      <td>
        <input class="form-control" type="text" v-model="course.credits" />
      </td>
      <td>
        <input class="form-control" type="text" v-model="course.semester" />
      </td>
      <td>
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteRow(k, course)"
        >
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  </div> -->

  <table class="table table-light">
    <!-- <thead>
      <tr>
        <td>Code</td>
        <td>Module title</td>
        <td>Site</td>
        <td>ECTS</td>
        <td>Semester</td>
        <td></td>
      </tr>
    </thead> -->
    <tbody v-for="(course, i) in courses" :key="i">
      <tr>
        <td colspan="5" class="table-active">
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
      <tr v-for="(item, k) in course.modules" :key="k">
        <td colspan="5">
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
        </td>
        <!-- <td>
          <input class="form-control" type="text" v-model="item.code" />
        </td>
        <td>
          <input class="form-control" type="text" v-model="item.module_title" />
        </td>
        <td>
          <input class="form-control" type="text" v-model="item.site" />
        </td>
        <td>
          <input class="form-control" type="text" v-model="item.credits" />
        </td>
        <td>
          <input class="form-control" type="text" v-model="item.semester" />
        </td> -->
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
}
</style>