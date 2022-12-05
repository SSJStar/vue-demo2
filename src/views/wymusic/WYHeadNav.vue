<template>
  <div class="wyhead-nav">
    <!--    <div style="position: absolute; text-align: center">-->
    <!-- 网易云音乐 -->
    <div style="background-color: #42b983; display: flex; align-items: center">
      <img
        src="@/assets/wymusic/wymusic_logo.png"
        style="width: 40px; height: 40px"
        alt=""
      />
      <label>网易云音乐</label>
    </div>
    <!-- 其它菜单 -->
    <!--    <div style="background-color: aquamarine">-->
    <!--      <div v-for="{ item, index } in items" :key="index">-->
    <!--        {{ item.message }}-->
    <!--        &lt;!&ndash;        <label style="color: white"></label>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
// 菜单 - 数组
const navMenue = [
  "发现音乐",
  "我的音乐",
  "关注",
  "商城",
  "音乐人",
  "下载客户端",
];

// let navHidden = ref(true); //控制返回控件的显示或隐藏（根据navArray个数）
// let navArray = ref([]);
// let nickNameVal = ref(""); //昵称
// let boxShow = ref(true); //box显示与否,默认显示，目的是为了在onMounted里得到实际宽度
// let boxRef = ref(null);
// let userInfoDivRef = ref(null);
// let boxRight = ref("20px"); //box组件距离右边的值
// let mouthInBox = false; //当前光标是否在列表上

// 设置导航栏高度、背景颜色、字体大小、字体颜色
let navgation_height = "70px";
let navgation_bgColor = "#242424";
let navgation_fontSize = "18";
let navgation_titleColor = "#FFFFFF";

onMounted(function () {
  console.log("onMounted被执行");
  // 加延迟是因为，直接获取到的userInfoDiv宽度不对，可能是组件没有加载完全
  // setTimeout(() => {
  //
  // }, 0);
}, undefined);
</script>

<style>
.wyhead-nav {
  width: 100%;
  height: v-bind(navgation_height);
  overflow: hidden;
  background-color: v-bind(navgation_bgColor); /** cadetblue */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 标题 */
.wyhead-nav label {
  font-size: v-bind(navgation_fontSize);
  color: v-bind(navgation_titleColor);
}

/* 头像 + 昵称 */
/*.userInfoDiv {*/
/*  right: 20px;*/
/*  height: 40px;*/
/*  position: absolute;*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
/*.userInfoDiv img {*/
/*  width: 30px;*/
/*  height: 30px;*/
/*  border-radius: 50%;*/
/*}*/
/*.userInfoDiv label {*/
/*  float: right;*/
/*  margin-left: 10px;*/
/*  height: 30px;*/
/*}*/

/* 点击头像-列表 */
/*.boxDiv {*/
/*  display: flex;*/
/*  top: 51px;*/
/*  right: v-bind(boxRight);*/
/*  background-color: #333333;*/
/*  position: absolute;*/
/*  flex-direction: column;*/
/*  padding: 10px 8px;*/
/*  z-index: 999;*/
/*}*/
/*.boxDiv label {*/
/*  color: white;*/
/*}*/
</style>
