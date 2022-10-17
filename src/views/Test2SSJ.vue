<template>
  <button @click="openDemo">打开弹窗</button>
</template>

<script lang="ts" setup>
import ChildDemo from "@/components/servicedialog/ChildDemo.vue";
import { useDialog } from "@/components/servicedialog/useDialog";

const { open } = useDialog();

const openDemo = () => {
  open({
    component: ChildDemo,
    options: { title: "弹窗demo" },
    params: { abc: "1" },
  }).then((msg: any) => {
    console.log("关闭后得到值：", msg);
  });
};
</script>
