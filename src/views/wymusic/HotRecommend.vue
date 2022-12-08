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
    <div class="listDiv" v-for="rows in menuList" :key="rows.index">
      <!-- 这里的div表示每一个元素 -->
      <div
        class="itemDiv"
        :style="{ 'margin-left': marLeft(item.index) }"
        v-for="item in rows"
        :key="item.index"
        ref="itemDivRef"
      >
        <img style="width: 100%; height: 140px" :src="item.src" />
        <label>{{ item.title }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
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
      src: "http://p4.music.126.net/UYzz1g206izM63q65-bayQ==/109951164805247604.jpg?param=200y200",
    },
  ],
  [
    {
      index: 4,
      title: "国产纯音｜它们连名字都很美",
      src: "http://p4.music.126.net/JKiCDG-xfj203gcui2z6aA==/109951163139073602.jpg?param=200y200",
    },
    {
      index: 5,
      title: "《哪种疗法》什么是完美心理学？（上）",
      src: "http://p3.music.126.net/OQfrX2yq1QjvOWOTK3b_4g==/18936888765371604.jpg?param=200y200",
    },
    {
      index: 6,
      title: "【果然纯音赏】聆听国人华章",
      src: "http://p4.music.126.net/UYzz1g206izM63q65-bayQ==/109951164805247604.jpg?param=200y200",
    },
    {
      index: 7,
      title: "多远都要在一起（0.8x降调版）",
      src: "http://p4.music.126.net/JKiCDG-xfj203gcui2z6aA==/109951163139073602.jpg?param=200y200",
    },
  ],
];

const rowItemsCount = menuList[0].length;

const itemDivRef = ref(null);

function marLeft(index) {
  //calc((100% - 140px * 4) / (4 - 1))
  // console.log("55555");
  // console.log(`~~~~~~${itemDivRef.value.offsetWidth}`);
  // return (itemDivRef.value.offsetWidth - 140 * 4) / (4 - 1) + "px";
  return 10 + "px";
}

onMounted(() => {
  setTimeout(() => {
    console.log("6666");
    console.log(`~~~~~~${itemDivRef.value.offsetWidth}`);
  }, 100);
});

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
.listDiv {
  background-color: bisque;
  display: flex;
  flex-direction: row;
}
.itemDiv {
  /* 140表示图片宽度，rowItemsCount表示一行最多显示几个
    100% - 上面两个，得到间距之和
    以上计算结果，再除以 （rowItemsCount - 1）就是margin-left间距
   */
  width: 140px;
}
.listDiv label {
  font-size: 12px;
  background-color: #42b983;
  margin: 5px;
}
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
