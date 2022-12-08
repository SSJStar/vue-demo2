<!--热门推荐-->
<template>
  <div class="HotRecommend">
    <!-- 菜单栏 -->
    <div style="display: flow">
      <div class="leftView">
        <img
          src="@/assets/wymusic/wymusic_remen.png"
          style="width: 20px; height: 20px"
          alt=""
        />
        <label class="titleLabel">热门推荐</label>
        <!-- 其它菜单 -->
        <label class="subtitleLabel" v-for="item in items" :key="item.index">
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
    <div style="width: 100%; height: 2px; background-color: #a90c0c"></div>

    <!-- 列表 -->
    <div v-for="rows in menuList" :key="rows.index">
      <span
        style="background-color: #42b983; margin: 5px"
        v-for="item in rows"
        :key="item.index"
      >
        <label style="font-size: 12px">{{ item.title }}</label>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 菜单 - 数组
const items = ref([
  { index: "0", message: "华语  ｜", selected: false },
  { index: "1", message: "流行  ｜", selected: false },
  { index: "2", message: "摇滚  ｜", selected: false },
  { index: "3", message: "民谣  ｜", selected: false },
  { index: "4", message: "电子", selected: false },
]);

const menuList = [
  [
    {
      index: 0,
      title: "【节奏控】一听就上瘾的惊艳女声",
      src: "",
    },
    {
      index: 1,
      title: "温柔英文歌-睡觉专用",
      src: "",
    },
    {
      index: 2,
      title: "【纯音乐】轻旋淡律，也可以抓住你的耳朵",
      src: "",
    },
    {
      index: 3,
      title: "每一次告别，都请更用力一些",
      src: "",
    },
  ],
  [
    {
      index: 4,
      title: "国产纯音｜它们连名字都很美",
      src: "",
    },
    {
      index: 5,
      title: "《哪种疗法》什么是完美心理学？（上）",
      src: "",
    },
    {
      index: 6,
      title: "【果然纯音赏】聆听国人华章",
      src: "",
    },
    {
      index: 7,
      title: "多远都要在一起（0.8x降调版）",
      src: "",
    },
  ],
];
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
.HotRecommend {
  display: flex;
  flex-direction: column;
}
.leftView {
  padding-top: 20px;
  float: left;
  /*background-color: #42b983;*/
}

.rightView {
  float: right;
  /*background-color: blanchedalmond;*/
}

/* 大标题 */
.titleLabel {
  font-size: 18px;
  color: #393939;
}
/* 小标题 */
.subtitleLabel {
  padding-left: 15px;
  padding-right: 5px;
  font-size: 12px;
  color: #666666;
}
</style>
