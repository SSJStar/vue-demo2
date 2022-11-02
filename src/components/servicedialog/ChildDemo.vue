<!--ChildDemo.vue -->
<template>
  <div id="ChildDemo">
    <!--    {{params}}我搞定了-->
    <!--  <el-input placeholder="请输入" ></el-input>-->
    <!-- 账号 -->
    <div class="el-input-div" style="margin-top: 40px">
      <!--      <el-input v-model="form.name"  placeholder="请输入账号" :prefix-icon="Avatar"  ></el-input>-->
      <input placeholder="请输入" v-model="form.name" />
    </div>
    <!--    <input placeholder="请输入" v-model="form.name"/>-->
    <!--    <button @click="close('关闭了弹窗')">关闭弹窗</button>-->
    <button @click="close(form.name)">确定</button>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";

let formTitle = ref("弹窗标题"); //弹窗标题
let formSubTitle = ref("弹窗副标题"); //弹窗副标题

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const props = defineProps<{
  close: (msg?: any) => void;
  params: any;
}>();

onMounted(() => {
  formTitle.value = props.params["title"];
  formSubTitle.value = props.params["subTitle"];
  console.log("title --- " + formTitle.value);
  console.log("subTitle --- " + formSubTitle.value);
});
</script>

<style>
/*账号、密码div公共样式设置：*/
.el-input-div {
  width: 100%;
  height: 40px;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}
</style>

<!--ChildDemo.vue -->
<!--<template>-->
<!--  <div>-->
<!--    {{ params }}-->

<!--    <button @click="close('关闭了弹窗')">关闭弹窗</button>-->
<!--  </div>-->
<!--</template>-->
<!--<script lang="ts" setup>-->
<!--const props = defineProps<{-->
<!--  close: (msg?: any) => void;-->
<!--  params: any;-->
<!--}>();-->
<!--</script>-->
