<!--<template>-->
<!--  &lt;!&ndash; 封装弹框 &ndash;&gt;-->
<!--  <div>-->
<!--    <el-dialog-->
<!--        custom-class="subDialog"-->
<!--        :title="dialogTitle"-->
<!--        v-model="dialogPopVisible"-->
<!--        :width="popupWidth"-->
<!--        :before-close="onBeforeClose"-->
<!--        :center="true"-->
<!--    >-->
<!--      <div>输入内容</div>-->
<!--      <template #footer class="dialog-footer">-->
<!--        footer-->
<!--      </template>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import { ref, computed, defineProps } from "vue";-->
<!--const props = defineProps({-->
<!--  title: {-->
<!--    type: String,-->
<!--    default: "",-->
<!--  },-->
<!--  width: {-->
<!--    type: String,-->
<!--    default: "550px",-->
<!--  },-->
<!--  option: {-->
<!--    type: Object,-->
<!--    default: {-->
<!--      //可传递其他值-->
<!--    },-->
<!--  },-->
<!--  cancelClick: {-->
<!--    type: Function,-->
<!--    default: () => {},-->
<!--  },-->
<!--  saveClick: {-->
<!--    type: Function,-->
<!--    default: () => {},-->
<!--  },-->
<!--});-->
<!--const dialogPopVisible = ref(true); // 窗体显示控制-->
<!--const popupWidth = computed(() => {-->
<!--  return props.width || "550px";-->
<!--});-->
<!--const dialogTitle = computed(() => {-->
<!--  return props.title || "标题";-->
<!--});-->
<!--const Cancel = () => {-->
<!--  dialogPopVisible.value = false;-->
<!--  props.cancelClick();-->
<!--};-->
<!--const Save = () => {-->
<!--  dialogPopVisible.value = false;-->
<!--  props.saveClick('传值');-->
<!--};-->
<!--const onBeforeClose = (done: () => void) => {-->
<!--  done();-->
<!--};-->
<!--</script>-->

<!--<style lang="scss">-->
<!--.subDialog {-->
<!--  &.el-dialog {-->
<!--    z-index: 99;-->
<!--    background-color: #ffffff;-->
<!--    margin-top: 20% !important;-->
<!--  }-->
<!--  .el-dialog__header {-->
<!--    width: 100%;-->
<!--    height: 50px;-->
<!--    line-height: 50px;-->
<!--    box-sizing: border-box;-->
<!--    padding: 0 25px;-->
<!--    text-align: left;-->
<!--    border-bottom: 1px solid rgba(0, 0, 0, 0.06);-->
<!--  }-->
<!--  .el-dialog__headerbtn {-->
<!--    font-size: 20px;-->
<!--    width: 40px;-->
<!--    height: 40px;-->
<!--  }-->
<!--  .el-dialog__title {-->
<!--    font-size: 18px;-->
<!--    font-family: PingFangSC-Medium, PingFang SC;-->
<!--    font-weight: 500;-->
<!--    color: rgba(0, 0, 0, 0.85);-->
<!--  }-->
<!--  .el-dialog__body {-->
<!--    box-sizing: border-box;-->
<!--    padding: 20px 25px;-->
<!--  }-->
<!--  .el-dialog__footer {-->
<!--    text-align: right;-->
<!--    height: 60px;-->
<!--    line-height: 60px;-->
<!--    padding: 0;-->
<!--    margin-right: 20px;-->
<!--    border-top: 1px solid rgba(0, 0, 0, 0.06);-->
<!--  }-->
<!--}-->
<!--</style>-->

<!--<template>-->
<!--  &lt;!&ndash; 封装弹框 &ndash;&gt;-->
<!--  <div>-->
<!--    <el-dialog-->
<!--        custom-class="subDialog"-->
<!--        :title="dialogTitle"-->
<!--        v-model="dialogPopVisible"-->
<!--        :width="popupWidth"-->
<!--        :before-close="onBeforeClose"-->
<!--        :center="true"-->
<!--    >-->
<!--      <div>输入内容</div>-->
<!--      <template #footer class="dialog-footer">-->
<!--        footer-->
<!--      </template>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import { ref, computed, defineProps } from "vue";-->
<!--const props = defineProps({-->
<!--  title: {-->
<!--    type: String,-->
<!--    default: "",-->
<!--  },-->
<!--  width: {-->
<!--    type: String,-->
<!--    default: "550px",-->
<!--  },-->
<!--  option: {-->
<!--    type: Object,-->
<!--    default: {-->
<!--      //可传递其他值-->
<!--    },-->
<!--  },-->
<!--  cancelClick: {-->
<!--    type: Function,-->
<!--    default: () => {},-->
<!--  },-->
<!--  saveClick: {-->
<!--    type: Function,-->
<!--    default: () => {},-->
<!--  },-->
<!--});-->
<!--const dialogPopVisible = ref(true); // 窗体显示控制-->
<!--const popupWidth = computed(() => {-->
<!--  return props.width || "550px";-->
<!--});-->
<!--const dialogTitle = computed(() => {-->
<!--  return props.title || "标题";-->
<!--});-->
<!--const Cancel = () => {-->
<!--  dialogPopVisible.value = false;-->
<!--  props.cancelClick();-->
<!--};-->
<!--const Save = () => {-->
<!--  dialogPopVisible.value = false;-->
<!--  props.saveClick('传值');-->
<!--};-->
<!--const onBeforeClose = (done: () => void) => {-->
<!--  done();-->
<!--};-->

<!--</script>-->

<!--<style lang="scss">-->
<!--.subDialog {-->
<!--  &.el-dialog {-->
<!--    z-index: 99;-->
<!--    background-color: #ffffff;-->
<!--    margin-top: 20% !important;-->
<!--  }-->
<!--  .el-dialog__header {-->
<!--    width: 100%;-->
<!--    height: 50px;-->
<!--    line-height: 50px;-->
<!--    box-sizing: border-box;-->
<!--    padding: 0 25px;-->
<!--    text-align: left;-->
<!--    border-bottom: 1px solid rgba(0, 0, 0, 0.06);-->
<!--  }-->
<!--  .el-dialog__headerbtn {-->
<!--    font-size: 20px;-->
<!--    width: 40px;-->
<!--    height: 40px;-->
<!--  }-->
<!--  .el-dialog__title {-->
<!--    font-size: 18px;-->
<!--    font-family: PingFangSC-Medium, PingFang SC;-->
<!--    font-weight: 500;-->
<!--    color: rgba(0, 0, 0, 0.85);-->
<!--  }-->
<!--  .el-dialog__body {-->
<!--    box-sizing: border-box;-->
<!--    padding: 20px 25px;-->
<!--  }-->
<!--  .el-dialog__footer {-->
<!--    text-align: right;-->
<!--    height: 60px;-->
<!--    line-height: 60px;-->
<!--    padding: 0;-->
<!--    margin-right: 20px;-->
<!--    border-top: 1px solid rgba(0, 0, 0, 0.06);-->
<!--  }-->
<!--}-->
<!--</style>-->
