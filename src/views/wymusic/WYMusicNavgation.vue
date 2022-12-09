<!--热门推荐-->
<template>
  <div class="WYMusicNav">
    <!-- 菜单栏 -->
    <div class="navgation">
      <div class="leftView">
        <img :src="iconUrlRef" style="width: 20px; height: 20px" alt="" />
        <label class="titleLabel">{{ titleRef }}</label>
        <!-- 其它菜单 -->
        <label class="subtitleLabel" v-for="item in itemsRef" :key="item.index">
          {{ item.message }}</label
        >
      </div>

      <!-- 更多 -->
      <div class="rightView">
        <label class="subtitleLabel">更多</label>
        <img
          src="@/assets/wymusic/wymusic_more.png"
          style="width: 12px; height: 12px"
          alt=""
        />
      </div>
    </div>

    <!-- 分割线 -->
    <!--    <div style="width: 100%; height: 2px; background-color: #a90c0c"></div>-->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  icon: String, //图标地址
  title: String, //大标题，20px字体
  menus: [], //副标题数组，12px字体
});
// 菜单 - 数组
let iconUrlRef = ref("");
let titleRef = ref("");
let itemsRef = ref([]);

/**
 * 组件加载完了。。。
 */
onMounted(() => {
  console.log("~~~~~~~~~~~~~~");
  console.log(`props.icon~~${props.icon}`);
  console.log(`props.title~~${props.title}`);
  console.log(`props.menus~~${props.menus}`);
  iconUrlRef.value = props.icon; // @/assets/wymusic/wymusic_remen.png
  titleRef.value = props.title;
  itemsRef.value = props.menus;
});

// 菜单 - 点击
function otherMenueClick(indexParamter) {
  console.log(`indexParamter--${indexParamter}`);
  itemsRef.value.forEach((item, index) => {
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
.WYMusicNav {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #c10d0c;
}
.navgation {
  display: flow;
}
.navgation .leftView {
  padding-top: 20px;
  float: left;
  /*background-color: #42b983;*/
}
.navgation .rightView {
  padding-top: 20px;
  float: right;
  /*background-color: blanchedalmond;*/
}
/* 大标题 */
.navgation .titleLabel {
  font-size: 20px;
  color: #393939;
}
/* 小标题 */
.navgation .subtitleLabel {
  padding-left: 15px;
  padding-right: 5px;
  font-size: 12px;
  color: #666666;
}
</style>
