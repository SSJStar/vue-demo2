<template>
  <button id="ssjButton" @click="ssjButtonAction">{{ title }}</button>
</template>

<script>
export default {
  name: "SSJButton",
  //设置参数
  props: {
    title: String,
  },
  methods: {
    ssjButtonAction() {
      //调用父组件的方法，并返回一个参数
      this.$emit("btnClick", this.title);
    },
  },
};
</script>

<style>
#ssjButton {
  background-color: #42b983;
}
</style>
