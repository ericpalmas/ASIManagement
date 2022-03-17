<template>
  <div class="course-table">
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
        <!-- <input class="form-control" type="text" v-model="course[0]" /> -->
      </td>
      <td>
        <input class="form-control" type="text" v-model="course.module_title" />
        <!-- <input class="form-control" type="text" v-model="course[1]" /> -->
      </td>
      <!-- <td>
        <input
          class="form-control text-right"
          type="number"
          min="0"
          step="1"
          v-model="course.site"
          @change="calculateLineTotal(course)"
        />
      </td> -->
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
    <tr></tr>
    <!-- <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>ects</td>
      <td></td>
    </tr>

    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>9</td>
      <td></td>
    </tr> -->
  </div>
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
      //   courses: [
      //     {
      //       code: "",
      //       module_title: "",
      //       site: "",
      //       ects: "",
      //       semester: 0,
      //     },
      //   ],
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
    deleteRow(index, course) {
      var idx = this.courses.indexOf(course)
      console.log(idx, index)
      if (idx > -1) {
        this.courses.splice(idx, 1)
      }
      this.calculateTotal()
    },
    addNewRow() {
      this.courses.push({
        code: '',
        module_title: '',
        site: '',
        ects: '',
        semester: ''
      })
    }
  }
}
</script>

<style scoped>
.course-table {
  padding: 2%;
}
</style>