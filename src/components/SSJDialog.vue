<!--<template>-->
<!--  <el-dialog v-model="dialogFormVisible" :title="formTitle">-->
<!--    <el-form :model="form">-->
<!--      &lt;!&ndash;  输入框  &ndash;&gt;-->
<!--      <el-form-item :label="formSubTitle" :label-width="formLabelWidth">-->
<!--        <el-input v-model="form.name" autocomplete="off" />-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    &lt;!&ndash; 弹窗尾部，确定/取消 &ndash;&gt;-->
<!--    <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="cancelAction">取消</el-button>-->
<!--        <el-button type="primary" @click="confirmAction">确定</el-button>-->
<!--      </span>-->
<!--    </template>-->
<!--  </el-dialog>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { reactive, ref } from "vue";-->
<!--/**-->
<!-- * 公开方法：调用此方法会直接展示弹出窗-->
<!-- *-->
<!-- * 作者: 小青龙-->
<!-- * 时间：2022/09/23 14:20:10-->
<!-- * @param show {boolean}      true表示显示弹窗，false表示不显示弹窗-->
<!-- * @param title {string}      标题-->
<!-- * @param subtitle {string}   副标题-->
<!-- * @return {void}-->
<!-- */-->
<!--function show(show: boolean, title: string, subtitle: string) {-->
<!--  dialogFormVisible.value = show;-->
<!--  formTitle.value = title;-->
<!--  formSubTitle.value = subtitle;-->
<!--}-->
<!--//对外抛出方法-->
<!--defineExpose({ show });-->

<!--let dialogFormVisible = ref(false); //是否显示弹窗-->
<!--let formTitle = ref(""); //弹窗标题-->
<!--let formSubTitle = ref(""); //弹窗副标题-->
<!--const formLabelWidth = "140px";-->

<!--const confirmAction = () => {-->
<!--  console.log("confirm&#45;&#45;" + form.name + "   " + form.region);-->
<!--};-->

<!--const cancelAction = () => {-->
<!--  dialogFormVisible.value = !dialogFormVisible.value;-->
<!--  console.log("cancelAction&#45;&#45;" + form.name + "   " + form.region);-->
<!--};-->

<!--const form = reactive({-->
<!--  name: "",-->
<!--  region: "",-->
<!--  date1: "",-->
<!--  date2: "",-->
<!--  delivery: false,-->
<!--  type: [],-->
<!--  resource: "",-->
<!--  desc: "",-->
<!--});-->

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
