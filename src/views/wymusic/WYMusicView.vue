<template>
  <div class="WYMusicView">
    <WYHeadNav></WYHeadNav>
    <!-- 跑马灯 -->
    <el-carousel height="150px" style="padding-left: 10%; padding-right: 10%">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <!-- 音乐列表 -->
    <div style="padding-left: 10%; padding-right: 10%">
      <div style="display: flow">
        <div class="leftView" style="float: left">
          <img
            src="@/assets/wymusic/wymusic_remen.png"
            style="width: 20px; height: 20px"
            alt=""
          />
          <span style="width: 10px" />
          <label style="font-size: 18px">热门推荐</label>
        </div>
        <!-- 更多 -->
        <div class="rightView" style="float: right">
          更多
          <img
            src="@/assets/wymusic/wymusic_more.png"
            style="width: 12px; height: 12px"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WYHeadNav from "@/views/wymusic/WYHeadNav.vue";
import { onMounted } from "vue";
onMounted(() => {
  console.log("wy music");
});
</script>

<style scoped>
.WYMusicView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute; /*不加这句，高度不能铺满*/
  background-color: #999999;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
