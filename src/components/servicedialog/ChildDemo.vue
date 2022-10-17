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
    <button @click="close('关闭了弹窗')">关闭弹窗</button>
  </div>

  <!--  <el-dialog :title="formTitle">-->
  <!--    <el-form :model="form">-->
  <!--      &lt;!&ndash;  输入框  &ndash;&gt;-->
  <!--      <el-form-item :label="formSubTitle" :label-width="formLabelWidth">-->
  <!--        <el-input v-model="form.name" autocomplete="off" />-->
  <!--      </el-form-item>-->

  <!--    </el-form>-->
  <!-- 弹窗尾部，确定/取消 -->
  <!--    <template #footer>-->
  <!--      <span class="dialog-footer">-->
  <!--        <el-button @click="close('关闭了弹窗')">取消</el-button>-->
  <!--        <el-button type="primary" @click="close('关闭了弹窗')">确定</el-button>-->
  <!--      </span>-->
  <!--    </template>-->
  <!--  </el-dialog>-->
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";

let formTitle = ref("111"); //弹窗标题
let formSubTitle = ref("222"); //弹窗副标题
const formLabelWidth = "140px";

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

// eslint-disable-next-line no-undef
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
