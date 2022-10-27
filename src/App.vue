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
// import staticVars from "@/statics/global";
// import router from "@/router";
// import Login from "@/views/login/LoginView";
// import SSJDialog from "@/components/SSJDialog"; //弹窗
// import Child from "@/components/ChildSSJ.vue";
// import LoginView from "@/views/login/LoginView";
import router from "@/router";

let dialogRef = ref(null);
let headNavRef = ref(null);

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

/**
 *  声明provide方法
 *
 * 作者: 小青龙
 * 时间：2022/10/26 11:08:30
 * @param showLogin {boolean}  是否展示登录页面，true：展示
 * @return {void}
 */
function showLoginVuew(showLogin) {
  console.log("showLoginVuew~~" + showLogin);
  loginPageHidden.value = !showLogin;
}

//用provide声明这个方法，子组件可以通过inject来访问，哪怕这两个组件直接隔了n层，有点像iOS里的「通知」
provide("showSSJDialogKEY", showSSJDialog);

//用provide声明这个方法，子组件可以通过inject来访问，哪怕这两个组件直接隔了n层，有点像iOS里的「通知」
provide("showLoginVueKEY", showLoginVuew);

let loginPageHidden = ref(true); //默认隐藏

//页面加载完执行
onMounted(() => {
  const loginState =
    getCurrentInstance().appContext.config.globalProperties.$loginState;
  loginPageHidden.value = loginState;

  // console.log("请先登录---" + loginState);
  // headNavRef.value.changeLoginName("王小健");
  if (loginState === false) {
    console.log("请先登录---" + loginState);
    router.push("/loginView");
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

let pageContext = getCurrentInstance().appContext;
//定义方法，并暴露给外界调用
// 调用此方法来隐藏登录界面
function closeLogin() {
  const loginState = pageContext.config.globalProperties.$loginState;
  loginPageHidden.value = loginState;
  console.log("登录关闭:" + loginState);
}
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
