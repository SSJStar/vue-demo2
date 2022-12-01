<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import HeadNav from "@/components/HeadNav";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {},
};
</script>

<script setup>
import { getCurrentInstance, onMounted, provide, ref } from "vue";
import sessionStorageManager from "@/statics/sessionStorageManager.js";

// import router from "@/router";
// import Login from "@/views/login/LoginView";
// import SSJDialog from "@/components/SSJDialog"; //弹窗
import router from "@/router";

let dialogRef = ref(null);

/**
 *  声明provide方法
 *
 * 作者: 小青龙
 * 时间：2022/10/26 11:09:30
 * @param title {string}  主标题
 * @param subTitle {string}  副标题
 * @return {void}
 */
function showSSJDialog(title, subTitle) {
  console.log("showSSJDialog~~");
  // dialogRef.value.show(true, "正在导出文件", "文件名")
  dialogRef.value.show(true, title, subTitle);
}

//用provide声明这个方法，子组件可以通过inject来访问，哪怕这两个组件直接隔了n层，有点像iOS里的「通知」
provide("showSSJDialogKEY", showSSJDialog);

//页面加载完执行
onMounted(() => {
  const loginState =
    getCurrentInstance().appContext.config.globalProperties.$global.globalObj
      .loginState;

  if (sessionStorageManager.getLoginState() === false) {
    console.log("请先登录---" + loginState);
    router.push("/loginView");
    // router.push("/testSSJ");
  }
});

/**
 * 点击父组件按钮，触发这个方法
 *
 * 作者: 小青龙
 * 时间：2022/09/05 16:39:58
 * @return {void}
 */
// function useChildMehtod() {
//   // 调用LeftMenu组件的pubMethod方法，并传入参数 "外部参数12"
//   leftmenuRef.value.pubMethod("外部参数123");
// }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*.router-div {*/
/*  flex: 1;*/
/*  height: 100%;*/
/*  background-color: white;*/
/*}*/

body {
  margin: 0px;
  padding: 0px;
}
</style>
