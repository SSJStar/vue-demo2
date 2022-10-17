<template>
  <div class="head-nav">
    这是头部
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
import { ref, watch } from "vue";

let navHidden = ref(true); //控制返回控件的显示或隐藏（根据navArray个数）
let navArray = ref([]);
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
</style>
