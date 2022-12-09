<template>
  <div class="WYMusicView">
    <!-- 导航 -->
    <WYHeadNav></WYHeadNav>
    <!-- div1 跑马灯 -->
    <PaoMaDeng style="width: 100%"></PaoMaDeng>
    <div class="Row">
      <!-- 左边这一列 -->
      <div class="ColumnLeft">
        <!-- 热门推荐 -->
        <HotRecommend></HotRecommend>
        <!-- 新碟上架 -->
        <NewDisc></NewDisc>
        <!-- 榜单 -->
        <SongList></SongList>
      </div>
      <!-- 右边这一列 -->
      <div class="ColumnRight">
        <!-- 入驻歌手 -->
        <SettledSinger></SettledSinger>
        <!-- 热门主播 -->
        <hotAnchor></hotAnchor>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>

<script setup lang="ts">
import WYHeadNav from "@/views/wymusic/WYHeadNav.vue";
import { onMounted } from "vue";
import HotRecommend from "@/views/wymusic/HotRecommend.vue";
import PaoMaDeng from "@/views/wymusic/PaoMaDeng.vue";
import SettledSinger from "@/views/wymusic/SettledSinger.vue";
import NewDisc from "@/views/wymusic/NewDisc.vue";
import SongList from "@/views/wymusic/SongList.vue";
import HotAnchor from "@/views/wymusic/HotAnchor.vue";
onMounted(() => {
  console.log("wy music");
});
</script>

<style scoped>
.Row {
  display: flex;
  background-color: #ffffff;
  width: 980px;
  margin-left: calc((100% - 980px) * 0.5);
  margin-right: calc((100% - 980px) * 0.5);
}
.Row .ColumnLeft {
  width: calc(100% - 250px - 40px);
  display: flex;
  flex-direction: column;
  /*background-color: darkgrey;*/
  padding: 0 20px 0 20px;
  border-left: 1px solid #ccc;
}
.Row .ColumnRight {
  display: flex;
  flex-direction: column;
  width: calc(250px - 20px * 2);
  padding-left: 20px;
  padding-right: 20px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  /*background-color: indianred;*/
}
.WYMusicView {
  width: 100%;
  height: 100%;
  overflow-y: scroll; /** 超出屏幕，可以滚动 */
  /*overflow: hidden;*/
  position: absolute; /*不加这句，高度不能铺满*/
  background-color: #f5f5f5;
}

/*.el-dropdown-link {*/
/*  cursor: pointer;*/
/*  color: var(--el-color-primary);*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
</style>
