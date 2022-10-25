<template>
  <div class="head-nav">
    <label style="position: absolute; text-align: center">
      <h1>瞎搞搞系统</h1>
    </label>

    <!--  头像 + 昵称  -->
    <div class="userInfoDiv" id="head-div" ref="userInfoDivRef">
      <!--  头像  -->
      <img
        src="@/assets/nav/people.png"
        alt=""
        :onmouseenter="mouthInto"
        :onmouseleave="mouthLeave"
      />
      <!--  昵称  -->
      <label>
        {{ nickNameVal }}
      </label>
    </div>

    <!-- box列表    flex-shrink: 0-->
    <div class="boxDiv" v-show="boxShow" ref="boxRef">
      <!--   个人信息   -->
      <label @click="userInfoClick"> 个人信息 </label>

      <!--   退出登录   -->
      <label @click="unLoginClick" style="margin-top: 10px"> 退出登录 </label>
    </div>
    <!--    <el-page-header @back="goBack" content="xxx" style="margin-left: 20px;">-->
    <!--      &lt;!&ndash; Line 1 &ndash;&gt;-->
    <!--&lt;!&ndash;      <template #breadcrumb />&ndash;&gt;-->
    <!--      &lt;!&ndash; Line 2 &ndash;&gt;-->
    <!--&lt;!&ndash;      <template #icon />&ndash;&gt;-->
    <!--&lt;!&ndash;      <template #title />&ndash;&gt;-->
    <!--&lt;!&ndash;      <template #content />&ndash;&gt;-->
    <!--&lt;!&ndash;      <template #extra />&ndash;&gt;-->
    <!--&lt;!&ndash;      &lt;!&ndash; Lines after 2 &ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;      <template #default />&ndash;&gt;-->
    <!--    </el-page-header>-->

    <!--    <el-pagination background layout="pre,pager,next" hide-on-single-page>-->
    <!--    </el-pagination>-->

    <el-breadcrumb separator="/" :hidden="navHidden">
      <!-- 自定义返回函数 -->
      <el-breadcrumb-item @click="goback"> ← 返回</el-breadcrumb-item>
      <!--item.meta.title  显示的还是路由里面的名字 -->
      <el-breadcrumb-item v-for="item in navArray" :key="item.key">{{
        // item.meta.title
        //v-for="(item, index) in navArray
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import router from "@/router";
import { onMounted, ref, watch } from "vue";

let navHidden = ref(true); //控制返回控件的显示或隐藏（根据navArray个数）
let navArray = ref([]);
let nickNameVal = ref(""); //昵称
let boxShow = ref(true); //box显示与否
let boxRef = ref(null);
let userInfoDivRef = ref(null);
let boxRight = ref("20px"); //box组件距离右边的值
const route = useRoute();

// 监听函数监听路径的变化
watch(
  () => route.path,
  (newValue, oldValue) => {
    // route.matched 目前匹配的是哪个 获得的值赋给  navArray.valu 上面用 v-for遍历值
    navArray.value = route.matched;
    console.log("newPath: " + newValue + " oldPath: " + oldValue);
    // if(navArray.value.length <= 1) {
    //   navHidden = true
    //   console.log("navHidden: true  "+navArray.value.length)
    // }else{
    //   navHidden = false
    //   console.log("navHidden: false   "+navArray.value.length)
    // }
  }
);

watch(
  () => route.name,
  (newValue, oldValue) => {
    // route.matched 目前匹配的是哪个 获得的值赋给  navArray.valu 上面用 v-for遍历值
    navArray.value = route.matched;
    console.log("newValue: " + newValue + " oldValue: " + oldValue);
  }
);

// function goBack() {
//   console.log("后退->"+ history.length+" "+ router.all.length)
//   // history.go(-1)
//   router.back()
// }

// 返回上一页，调用的组件 router.back();
const goback = () => {
  //点击了返回按钮
  router.back();
  console.log("后退后navArray个数->" + navArray.value.length);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function,no-redeclare
onMounted(function () {
  console.log("onMounted被执行");
  boxRight.value =
    (
      userInfoDivRef.value.offsetWidth +
      20 -
      boxRef.value.offsetWidth * 0.5 -
      30 * 0.5
    ).toString() + "px";
  console.log(
    "userInfoDiv宽度 -- " +
      boxRef.value.offsetWidth +
      "  box宽度---" +
      boxRef.value.offsetWidth +
      "  boxRight---" +
      boxRight.value
  );
}, undefined);

// 鼠标移动到头像 ，显示展示列表
function mouthInto(val) {
  console.log("鼠标 in");
  boxShow.value = true;
  // let h = boxRef.value.offsetHeight;
  // 计算box组件的right值
  // box.right = userInfoDiv 的宽度 + userInfoDiv.right - box.width * 0.5 - 头像宽度 * 0.5
  console.log(
    "userInfoDiv宽度 -- " +
      boxRef.value.offsetWidth +
      "  box宽度---" +
      boxRef.value.offsetWidth +
      "  box宽度---" +
      boxRight.value
  );
}

// 鼠标移除到头像 ，隐藏展示列表
function mouthLeave() {
  console.log("鼠标 out");
  boxShow.value = false;
}

function userInfoClick() {
  console.log("点击了 个人信息");
}

function unLoginClick() {
  console.log("点击了 退出登录");
}

//修改的登录账户的昵称
function changeLoginName(nickName) {
  console.log("接收外界nickName:" + nickName);
  nickNameVal.value = nickName;
}
// eslint-disable-next-line no-undef
defineExpose({ changeLoginName });
</script>

<style>
.head-nav {
  width: 100%;
  height: 71px;
  overflow: hidden;
  background-color: cadetblue;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 头像 + 昵称 */
.userInfoDiv {
  right: 20px;
  height: 40px;
  position: absolute;
  display: flex;
  align-items: center;
}
.userInfoDiv img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.userInfoDiv label {
  float: right;
  margin-left: 10px;
  height: 30px;
}

/* 列表 */
.boxDiv {
  display: flex;
  top: 71px;
  right: v-bind(boxRight);
  background-color: #333333;
  position: absolute;
  flex-direction: column;
  padding: 10px 8px;
}
.boxDiv label {
  color: white;
}
</style>
