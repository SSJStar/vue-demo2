<!--热门推荐-->
<template>
  <!-- 音乐列表 -->
  <div>
    <div style="display: flow">
      <div class="leftView" style="float: left; background-color: #42b983">
        <img
          src="@/assets/wymusic/wymusic_remen.png"
          style="width: 20px; height: 20px"
          alt=""
        />
        <span style="width: 10px" />
        <label style="font-size: 18px">热门推荐</label>

        <!-- 其它菜单 -->
        <span style="width: 10px" />
        <label
          style="padding-left: 5px; padding-right: 5px"
          v-for="item in items"
          :key="item.index"
        >
          {{ item.message }}</label
        >
      </div>

      <!-- 更多 -->
      <div
        class="rightView"
        style="float: right; background-color: blanchedalmond"
      >
        <label style="font-size: 14px">更多</label>
        <img
          src="@/assets/wymusic/wymusic_more.png"
          style="width: 12px; height: 12px"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 菜单 - 数组
const items = ref([
  { index: "0", message: "华语", selected: false },
  { index: "1", message: "流行", selected: false },
  { index: "2", message: "摇滚", selected: false },
  { index: "3", message: "民谣", selected: false },
  { index: "4", message: "电子", selected: false },
]);

// 菜单 - 点击
function otherMenueClick(indexParamter) {
  console.log(`indexParamter--${indexParamter}`);
  items.value.forEach((item, index) => {
    console.log(`index--${index}`);
    // let obj = item;
    if (index.toString() === indexParamter.toString()) {
      item.selected = true;
      console.log(`找到了${index}`);
    } else {
      item.selected = false;
    }
  });
}
</script>

<style scoped>
/* 标题 */
.fmenuClass label {
  font-size: v-bind(navgation_fontSize);
  color: v-bind(navgation_titleColor);
}
</style>
