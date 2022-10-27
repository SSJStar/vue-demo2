<!--&lt;!&ndash;333&ndash;&gt;-->
<!--<template>-->
<!--&lt;!&ndash;  <el-button text @click="dialogTableVisible = true"&ndash;&gt;-->
<!--&lt;!&ndash;  >open a Table nested Dialog</el-button&ndash;&gt;-->
<!--&lt;!&ndash;  >&ndash;&gt;-->

<!--&lt;!&ndash;  <el-dialog v-model="dialogTableVisible" title="Shipping address">&ndash;&gt;-->
<!--&lt;!&ndash;    <el-table :data="gridData">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-table-column property="date" label="Date" width="150" />&ndash;&gt;-->
<!--&lt;!&ndash;      <el-table-column property="name" label="Name" width="200" />&ndash;&gt;-->
<!--&lt;!&ndash;      <el-table-column property="address" label="Address" />&ndash;&gt;-->
<!--&lt;!&ndash;    </el-table>&ndash;&gt;-->
<!--&lt;!&ndash;  </el-dialog>&ndash;&gt;-->

<!--  &lt;!&ndash; Form &ndash;&gt;-->
<!--  <el-button text @click="dialogFormVisible = true">-->
<!--    open a Form nested Dialog-->
<!--  </el-button>-->

<!--  <el-dialog v-model="dialogFormVisible" title="Shipping address">-->
<!--    <el-form :model="form">-->
<!--      <el-form-item label="Promotion name" :label-width="formLabelWidth">-->
<!--        <el-input v-model="form.name" autocomplete="off" />-->
<!--      </el-form-item>-->
<!--&lt;!&ndash;      <el-form-item label="Zones" :label-width="formLabelWidth">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-select v-model="form.region" placeholder="Please select a zone">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-option label="Zone No.1" value="shanghai" />&ndash;&gt;-->
<!--&lt;!&ndash;          <el-option label="Zone No.2" value="beijing" />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-form-item>&ndash;&gt;-->
<!--    </el-form>-->
<!--    <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">Cancel</el-button>-->
<!--&lt;!&ndash;        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button> &ndash;&gt;-->
<!--        <el-button type="primary" @click="emitA">Confirm</el-button>-->

<!--      </span>-->
<!--    </template>-->
<!--  </el-dialog>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {reactive, ref, watch} from 'vue'-->

<!--const dialogTableVisible = ref(false)-->
<!--const dialogFormVisible = ref(true)-->
<!--const formLabelWidth = '140px'-->

<!--const emitA = () => {-->
<!--  console.log('emitA&#45;&#45;'+ form.name + "   "+form.region)-->
<!--}-->

<!--const form = reactive({-->
<!--  name: '',-->
<!--  region: '',-->
<!--  date1: '',-->
<!--  date2: '',-->
<!--  delivery: false,-->
<!--  type: [],-->
<!--  resource: '',-->
<!--  desc: '',-->
<!--})-->

<!--</script>-->
<!--<style scoped>-->
<!--.el-button&#45;&#45;text {-->
<!--  margin-right: 15px;-->
<!--}-->
<!--.el-select {-->
<!--  width: 300px;-->
<!--}-->
<!--.el-input {-->
<!--  width: 300px;-->
<!--}-->
<!--.dialog-footer button:first-child {-->
<!--  margin-right: 10px;-->
<!--}-->
<!--</style>-->
