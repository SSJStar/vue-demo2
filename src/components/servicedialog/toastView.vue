<template>
  <div class="tip" v-if="isShow">
    <h1>loading...</h1>

    <el-button @click="hide" style="background-color: white; font-size: 18px"
      >隐藏</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
let isShow = ref(false);

const show = () => {
  isShow.value = true;
};
const hide = () => {
  isShow.value = false;
};

const props = defineProps<{
  close: (msg?: any) => void;
  params: any;
}>();

defineExpose({
  hide,
  show,
});
</script>

<style scoped>
.tip {
  position: fixed;
  display: flex;
  flex-direction: column;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(95, 157, 160, 0.8);
  /*background-color: rgba(0, 0, 0, 0.5);*/
  font-size: 48px;
  justify-content: center;
  align-items: center;
}
</style>
