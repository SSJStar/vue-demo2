<template>
  {{ pro.titles }}<br />
  {{ pro.listData }}<br />
  <!--  {{ listData }}<br /><br />-->
  <el-table v-bind:data="pro.listData" border style="width: 100%">
    <!--    <el-table-column v-bind:prop="pro.titles[0]" label="姓名" width="180" />-->
    <div v-for="item in pro.titles" :key="item.key">
      item~:{{ item }}<br />
      <!--      <el-table-column prop="姓名" :label="item" width="180" />-->
    </div>
  </el-table>

  <!--  <div v-for="item in pro.titles" :key="item.key">item:{{ item }}</div>-->
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

interface Props {
  titles: Array<any>;
  listData: Array<object>;
}
const pro = defineProps<Props>();
// const pro = defineProps({
//   titles: Array,
//   listData: Array,
// });
// let titlesValue = ref(pro.titles);
// let listDataValue = ref(pro.listData);

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    time: "dd",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

onMounted(() => {
  console.log("onMounted~~~");
  console.log("titles:");
  console.log(pro.titles);
  console.log("listData:");
  console.log(pro.listData);
});

function myReload(an: any) {
  // this.reload();
  console.log("myReload~~~");
  console.log("titles:");
  console.log(pro.titles);
  console.log("listData:");
  console.log(pro.listData);
  console.log("an:");
  console.log(an);
}

defineExpose({ myReload });
</script>
<!--    <el-table-column prop="date" label="Date" width="180" />-->
<!--    <el-table-column prop="name" label="Name" width="180" />-->
<!--    <el-table-column prop="address" label="Address" />-->
<!--    <el-table-column prop="time" label="Time" width="180" />-->
