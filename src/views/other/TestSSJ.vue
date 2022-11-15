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

<template>
  <h1>hh</h1>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  setTimeout(() => {
    showFor(); //展示for循环

    showArray(); //展示元组

    let value = test("安徒生童话故事大全");
    console.log(value);
  }, 1);
});

// for循环
function showFor() {
  const nameArray = ["张三", "李四", "王五", "张龙", "赵虎"]; // 数据源

  console.log("方式1打印-----常规for------->");
  for (let i = 0; i < 5; i++) {
    if (i < nameArray.length) {
      console.log("value = " + nameArray[i]);
    }
  }

  console.log("方式2打印-----array.forEach------->");
  nameArray.forEach((value, index) => {
    console.log("index = " + index + " value = " + value);
    // console.log(`方式2打印index = ${index} value = ${value}`); //这样写也可以
  });

  console.log("方式3打印-----for...in------->");
  for (let index in nameArray) {
    console.log(`value = ${nameArray[index]}`);
  }

  console.log("方式4打印------for...of------>");
  for (let value of nameArray) {
    console.log(`value = ${value}`);
  }
}
//元祖
function showArray() {
  let a1: [string, number];
  let a2: [string, number] = ["哈哈", 1]; //正确
  // let a3: [string, number] = ["哈哈", 1, "嘎嘎"]; //编译报错
  a1 = ["哈哈", 1];
  a1.push("嘿嘿"); //虽然越界，但是控制台不会报错，且自动把越界部分的数据，自动匹配已经设定好的类型（string或number）
  a1.push("呼呼");
  console.log("a1~" + a1);
  console.log("~" + typeof "hh");
}

function test(bookName: any): string {
  console.log("bookName is " + bookName);
  return `《${bookName}》`;
}
</script>
