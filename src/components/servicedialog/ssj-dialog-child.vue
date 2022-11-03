<template>
  <div class="tip" v-if="isShow">
    <div class="bgView">
      <h3>{{ titleValue }}</h3>
      <h3>{{ subTitleValue }}</h3>
      <el-button @click="hide" style="background-color: white; font-size: 18px"
        >隐藏</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
let isShow = ref(false);

// //定义类型 Obj
// export interface SSJDialogParams {
//   [key: string]: string | number;
// }
// const form = reactive({
//   title: "",
//   subTitle: "",
// });
const titleValue = ref("");
const subTitleValue = ref("");

const props = defineProps<{
  close: (msg?: any) => void;
  params: any;
}>();

const show = () => {
  isShow.value = true;
};
const hide = () => {
  isShow.value = false;
  props.close("关闭了自己");
};

defineExpose({
  hide,
  show,
});

onMounted(() => {
  titleValue.value = props.params["title"];
  subTitleValue.value = props.params["subTitle"];
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
  /*background-color: rgba(95, 157, 160, 0.8);*/
  background-color: rgba(0, 0, 0, 0.7); /*设置北京颜色*/
  font-size: 48px;
  justify-content: center;
  align-items: center;
}

.tip .bgView {
  background-color: white;
  width: 30%;
  height: 30%;
  display: flex;
  justify-content: center;
}
.tip .bgView h3 {
  display: inline-block;
  justify-content: center;
}
</style>
