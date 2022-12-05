<template>
  <div class="WYMusicView">
    <WYHeadNav></WYHeadNav>
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
</style>
