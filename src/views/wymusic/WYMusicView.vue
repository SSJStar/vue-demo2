<template>
  <div class="WYMusicView">
    <!-- 导航 -->
    <WYHeadNav></WYHeadNav>
    <!-- div1 跑马灯 -->
    <PaoMaDeng style="width: 100%"></PaoMaDeng>
    <div
      style="
        display: flex;
        padding-left: 10%;
        padding-rigt: 10%;
        width: 100%;
        height: auto;
      "
    >
      <div class="Row">
        <!-- 左边这一列 -->
        <div class="ColumnLeft">
          <!-- 热门推荐 -->
          <HotRecommend></HotRecommend>
        </div>
        <!-- 右边这一列 -->
        <div class="ColumnRight"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WYHeadNav from "@/views/wymusic/WYHeadNav.vue";
import { onMounted } from "vue";
import HotRecommend from "@/views/wymusic/HotRecommend.vue";
import PaoMaDeng from "@/views/wymusic/PaoMaDeng.vue";
onMounted(() => {
  console.log("wy music");
});
</script>

<style scoped>
.Row {
  display: flex;
  flex-direction: row;
}
.Row .ColumnLeft {
  width: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  background-color: #42b983;
}
.Row .ColumnRight {
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: indianred;
}
.WYMusicView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute; /*不加这句，高度不能铺满*/
  background-color: #999999;
}

/*.el-dropdown-link {*/
/*  cursor: pointer;*/
/*  color: var(--el-color-primary);*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
</style>
