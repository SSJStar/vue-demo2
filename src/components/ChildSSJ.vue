<template>
  <div>
    <el-button @click="showSSJDialog">点我弹窗</el-button>
    <SSJDialog ref="dialogRef"></SSJDialog>
  </div>
</template>

<script setup>
import SSJDialog from "@/components/SSJDialog";
import { getCurrentInstance, ref } from "vue";
// const currentInstance = getCurrentInstance()

// let showDialog = ref(false)
let dialogRef = ref(null);
function showSSJDialog() {
  console.log("showSSJDialog~~");
  // showDialog.value = true
  dialogRef.value.show(true, "正在导出文件", "文件名");
  // currentInstance.proxy.$forceUpdate()
}
</script>
