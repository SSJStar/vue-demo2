<!--新碟上架-->
<template>
  <div class="NewDiscDiv">
    <!-- 菜单栏 -->
    <WYMusicNavgation :icon="iconRef" :title="titleRef"></WYMusicNavgation>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WYMusicNavgation from "@/views/wymusic/WYMusicNavgation";
// 菜单 - 数组
const titleRef = ref("新碟上架");
const iconRef = require("@/assets/wymusic/wymusic_remen.png");
</script>

<style scoped>
.NewDiscDiv {
  display: flex;
  flex-direction: column;
}
</style>
