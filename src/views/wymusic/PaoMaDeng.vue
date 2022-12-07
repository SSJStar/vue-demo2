<!--榜单-->
<template>
  <div
    style="width: 100%; padding-left: 10%; padding-right: 10%; display: flex"
  >
    <!--  跑马灯  -->
    <el-carousel style="width: calc(80% - 100px)">
      <el-carousel-item v-for="item in 4" :key="item">
        <img :src="loadCarouselUrl(item)" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 下载 -->
    <div style="width: 100px; background-color: #42b983"></div>
  </div>
</template>

<script setup>
/**
 * 获取轮播图URL地址
 *
 * 作者: 小青龙
 * 时间：2022/12/07 09:44:30
 * @param index {number}  第几张图
 * @return {string}
 */
let loadCarouselUrl = (index) => {
  console.log("@/assets/wymusic/wymusic_carousel_0" + index + ".jpg");
  //这里加require是因为，img的src默认被作为静态资源使用，动态棒的是不生效的，用require修饰就可以显示了
  return require("@/assets/wymusic/wymusic_carousel_0" + index + ".jpg");
};
</script>

<style scoped></style>
