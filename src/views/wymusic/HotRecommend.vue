<!--热门推荐-->
<template>
  <div class="HotRecommend">
    <!--    <div class="navgation">-->
    <!--      <div class="leftView">-->
    <!--        <img-->
    <!--          src="@/assets/wymusic/wymusic_remen.png"-->
    <!--          style="width: 20px; height: 20px"-->
    <!--          alt=""-->
    <!--        />-->
    <!--        <label class="titleLabel">热门推荐</label>-->
    <!--        &lt;!&ndash; 其它菜单 &ndash;&gt;-->
    <!--        <label class="subtitleLabel" v-for="item in items" :key="item.index">-->
    <!--          {{ item.message }}</label-->
    <!--        >-->
    <!--      </div>-->

    <!--      &lt;!&ndash; 更多 &ndash;&gt;-->
    <!--      <div class="rightView">-->
    <!--        <label class="subtitleLabel">更多</label>-->
    <!--        <img-->
    <!--          src="@/assets/wymusic/wymusic_more.png"-->
    <!--          style="width: 12px; height: 12px"-->
    <!--          alt=""-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->
    <!-- 菜单栏 -->
    <WYMusicNavgation
      :icon="iconRef"
      :title="titleRef"
      :menus="itemsRef"
    ></WYMusicNavgation>

    <!-- 列表 -->
    <div class="listDiv" v-for="rows in menuList" :key="rows.index">
      <!-- 这里的div表示每一个元素 -->
      <div
        class="itemDiv"
        :style="{ 'margin-left': marLeft(item.index) }"
        v-for="item in rows"
        :key="item.index"
      >
        <img class="itemDiv-img" :src="item.src" />
        <label class="itemDiv-label">{{ item.title }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import WYMusicNavgation from "@/views/wymusic/WYMusicNavgation";
let corls = [
  "#ffffff",
  "#3c3c3c",
  "#fcdcdf",
  "#bcbcbc",
  "#674ea7",
  "#7f6000",
  "#6aa84f",
];
// 菜单 - 数组
const titleRef = ref("热门推荐");
const iconRef = require("@/assets/wymusic/wymusic_remen.png");
const itemsRef = ref([
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
      src: "http://p4.music.126.net/UYzz1g206izM63q65-bayQ==/109951164805247604.jpg?param=200y200",
    },
    {
      index: 1,
      title: "温柔英文歌-睡觉专用",
      src: "http://p4.music.126.net/JKiCDG-xfj203gcui2z6aA==/109951163139073602.jpg?param=200y200",
    },
    {
      index: 2,
      title: "【纯音乐】轻旋淡律，也可以抓住你的耳朵",
      src: "http://p3.music.126.net/OQfrX2yq1QjvOWOTK3b_4g==/18936888765371604.jpg?param=200y200",
    },
    {
      index: 3,
      title: "每一次告别，都请更用力一些",
      src: "http://p2.music.126.net/-4Ygb5Z9XfLOQFeldQlY2A==/1389782698058443.jpg?param=140y140",
    },
  ],
  [
    {
      index: 4,
      title: "多远都要在一起（0.8x降调版）",
      src: "http://p2.music.126.net/iw9IaO5psFXslCe5o4junA==/109951164212186734.jpg?param=140y140",
    },
    {
      index: 5,
      title: "《哪种疗法》什么是完美心理学？（上）",
      src: "http://p1.music.126.net/gZWQbChzhCbGFXtpin2MXw==/109951167592864239.jpg?param=140y140",
    },
    {
      index: 6,
      title: "【果然纯音赏】聆听国人华章",
      src: "http://p1.music.126.net/cckF7R9edLEiRmUADaOMYg==/109951168125334361.jpg?param=140y140",
    },
    {
      index: 7,
      title: "听首老歌 回味永不褪色的华语经典",
      src: "http://p2.music.126.net/FoF5_ROj-jU37263LhInsw==/109951163203287436.jpg?param=140y140",
    },
  ],
];

const rowItemsCount = menuList[0].length;

// const itemDivRef = ref(null);

/**
 * 获取item 的 margin-left间距
 *
 * 作者: 小青龙
 * 时间：2022/12/09 11:04:19
 * @param index {number}  item的下标索引
 * @return {string}
 */
function marLeft(index) {
  return index === 0 || index % 4 === 0 ? 0 : 50 + "px";
}

onMounted(() => {
  // setTimeout(() => {
  //   console.log("6666");
  //   console.log(itemDivRef.value[0]);
  //   console.log(`~~~~~~${itemDivRef.value[0].offsetWidth}`);
  // }, 100);
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
.HotRecommend {
  display: flex;
  flex-direction: column;
}
/*.navgation {*/
/*  display: flow;*/
/*}*/
/*.navgation .leftView {*/
/*  padding-top: 20px;*/
/*  float: left;*/
/*  !*background-color: #42b983;*!*/
/*}*/
/*.navgation .rightView {*/
/*  padding-top: 20px;*/
/*  float: right;*/
/*  !*background-color: blanchedalmond;*!*/
/*}*/
/*!* 大标题 *!*/
/*.navgation .titleLabel {*/
/*  font-size: 20px;*/
/*  color: #393939;*/
/*}*/
/*!* 小标题 *!*/
/*.navgation .subtitleLabel {*/
/*  padding-left: 15px;*/
/*  padding-right: 5px;*/
/*  font-size: 12px;*/
/*  color: #666666;*/
/*}*/

/**** 列表 ****/
.listDiv {
  /*background-color: bisque;*/
  display: flex;
  flex-direction: row;
  padding-top: 20px;
}
/* item模块 */
.itemDiv {
  /* 140表示图片宽度，rowItemsCount表示一行最多显示几个
    100% - 上面两个，得到间距之和
    以上计算结果，再除以 （rowItemsCount - 1）就是margin-left间距
   */
  width: 140px;
}
/* item模块 - 图片 */
.itemDiv-img {
  width: 100%;
  height: 140px;
}
/* item模块 - 文字 */
.itemDiv-label {
  font-size: 12px;
  /*background-color: #42b983;*/
}
</style>
