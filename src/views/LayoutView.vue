<template>
  <div id="app">
    <div id="mainModule">
      <!--  HeadNav（导航组件）  -->
      <div>
        <HeadNav ref="headNavRef"></HeadNav>
      </div>

      <div style="width: 100%; height: 100%; display: flex">
        <!--  折叠菜单  -->
        <div class="left">
          <!--          <LeftMenu style="background-color: gray;  width: 200px;  height: 100%;" @change="childFoldAction" ref="leftmenuRef"></LeftMenu>-->
          <LeftMenu
            @change="childFoldAction"
            @selected="childSelectAction"
            ref="leftmenuRef"
            v-bind:foldOn_width="foldOnW"
            v-bind:foldOff_width="foldOffW"
            v-bind:listJson="listJson"
          ></LeftMenu>
        </div>

        <!--  router-view（路由）  -->
        <div class="router-div">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import LeftMenu from "@/components/LeftMenu";
import PersonInfoView from "@/views/PersonInfoView.vue";
import BodyView from "@/views/MenuBodyView.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    HeadNav,
    LeftMenu,
    // eslint-disable-next-line vue/no-unused-components
    BodyView,
  },
};
</script>

<script setup>
import { getCurrentInstance, onMounted, provide, ref } from "vue";
import staticVars from "@/statics/global";
import router from "@/router";
import Login from "@/views/login/LoginView";
import SSJDialog from "@/components/SSJDialog"; //弹窗
import Child from "@/components/ChildSSJ.vue";
import RegisterView from "@/views/login/RegisterView";

let dialogRef = ref(null);
let headNavRef = ref(null);

/**
 *  声明provide方法
 *
 * 作者: 小青龙
 * 时间：2022/10/26 11:09:30
 * @param title {string}  主标题
 * @param subTitle {string}  副标题
 * @return {void}
 */
function showSSJDialog(title, subTitle) {
  console.log("showSSJDialog~~");
  // dialogRef.value.show(true, "正在导出文件", "文件名")
  dialogRef.value.show(true, title, subTitle);
}

/**
 *  声明provide方法
 *
 * 作者: 小青龙
 * 时间：2022/10/26 11:08:30
 * @param showLogin {boolean}  是否展示登录页面，true：展示
 * @return {void}
 */
function showLoginVuew(showLogin) {
  console.log("showLoginVuew~~" + showLogin);
  router.go(-1); //后退、并刷新
  router.go(0); //刷新
  router.go(1); //前进
  router.back(); //后退、不刷新
}

//用provide声明这个方法，子组件可以通过inject来访问，哪怕这两个组件直接隔了n层，有点像iOS里的「通知」
provide("showSSJDialogKEY", showSSJDialog);

//用provide声明这个方法，子组件可以通过inject来访问，哪怕这两个组件直接隔了n层，有点像iOS里的「通知」
provide("showLoginVueKEY", showLoginVuew);

//菜单-展开宽度
let foldOnW = staticVars.LEFTMENU_FOLDONW;

//菜单-收起宽度
let foldOffW = staticVars.LEFTMENU_FOLDOFFW;

//我晕，样式里不能直接使用右边的，所以这里定义一个常量接收，然后再使用
// 更诡异的是，直接使用staticVars.BACKGROUNBD_COLOR虽然会报错误，但是浏览器可以正常运行。。。
const leftMenuBgColor = staticVars.BACKGROUNBD_COLOR;

//响应式变量，要这么写
let leftMenuWidth = ref("200px");

// 得到LeftMenu组件实例对象
const leftmenuRef = ref(null);

// 菜单数据源
const listJson = {
  title: "列表数据",
  list: [
    {
      index: "1",
      parent_id: "0",
      iconName: require("/src/assets/home/icon-home.png"),
      title: "浙江",
      childrens: [
        {
          index: "1-1",
          parent_id: "1",
          iconName: "",
          title: "杭州",
          childrens: [
            {
              index: "1-1-1",
              parent_id: "1-1",
              iconName: "",
              title: "西湖区",
              page: "/layoutView/myView",
              childrens: [],
            },
            {
              index: "1-1-2",
              parent_id: "1-1",
              iconName: "",
              title: "滨江区",
              page: "/layoutView/bodyView",
              childrens: [],
            },
            {
              index: "1-1-3",
              parent_id: "1-1",
              iconName: "",
              title: "上城区",
              page: "/layoutView/bodyView",
              childrens: [],
            },
          ],
        },
        {
          index: "1-2",
          parent_id: "1",
          iconName: "",
          title: "绍兴",
          page: "/layoutView/bodyView",
          childrens: [],
        },
        {
          index: "1-3",
          parent_id: "1",
          iconName: "",
          title: "宁波",
          page: "/layoutView/bodyView",
          childrens: [],
        },
        {
          index: "1-4",
          parent_id: "1",
          iconName: "",
          title: "台州",
          childrens: [
            {
              index: "1-4-1",
              parent_id: "1-1",
              iconName: "",
              title: "温岭",
              page: "/layoutView/bodyView",
              childrens: [],
            },
            {
              index: "1-4-2",
              parent_id: "1-1",
              iconName: "",
              title: "临海",
              page: "/layoutView/bodyView",
              childrens: [],
            },
          ],
        },
      ],
    },
    {
      index: "2",
      parent_id: "0",
      iconName: require("/src/assets/home/icon-home.png"),
      title: "上海",
      page: "/layoutView/bodyView",
      childrens: [],
    },
    {
      index: "3",
      iconName: require("/src/assets/home/icon-home.png"),
      parent_id: "0",
      title: "内蒙",
      childrens: [
        {
          index: "3-1",
          parent_id: "3",
          iconName: "",
          title: "呼和浩特",
          page: "/layoutView/bodyView",
          childrens: [],
        },
        {
          index: "3-2",
          parent_id: "3",
          iconName: "",
          title: "包头",
          page: "/layoutView/bodyView",
          childrens: [],
        },
        {
          index: "3-3",
          parent_id: "3",
          iconName: "",
          title: "乌海",
          childrens: [
            {
              index: "3-3-1",
              parent_id: "3-3",
              iconName: "",
              title: "乌海市博物馆",
              page: "/layoutView/bodyView",
              childrens: [],
            },
            {
              index: "3-3-2",
              parent_id: "3-3",
              iconName: "",
              title: "黄河西行客栈",
              page: "/layoutView/bodyView",
              childrens: [],
            },
          ],
        },
      ],
    },
    {
      index: "4",
      iconName: require("/src/assets/home/icon-home.png"),
      parent_id: "0",
      title: "功能展示",
      childrens: [
        {
          index: "4-1",
          parent_id: "4",
          iconName: "",
          title: "xlsx解析和导出",
          page: "/layoutView/xlsxView",
          childrens: [],
        },
        {
          index: "4-2",
          parent_id: "4",
          iconName: "",
          title: "双重直方图",
          page: "/layoutView/btChatView",
          childrens: [],
        },
        {
          index: "4-3",
          parent_id: "4",
          iconName: "",
          title: "其它",
          childrens: [
            {
              index: "4-3-1",
              parent_id: "4-3",
              iconName: "",
              title: "弹窗",
              page: "/layoutView/test",
              childrens: [],
            },
          ],
        },
      ],
    },
  ],
};

//页面加载完执行
onMounted(() => {
  const loginState =
    getCurrentInstance().appContext.config.globalProperties.$loginState;

  console.log("请先登录---" + loginState);
  headNavRef.value.changeLoginName("王小健");
});

/**
 * LeftMenu组件折叠动作，会给当前组件发送change指令，最终会调用这个方法
 *
 * 作者: 小青龙
 * 时间：2022/09/05 16:41:10
 * @param value {boolean}  true表示展开，false表示收起
 * @return {void}
 */
function childFoldAction(value) {
  if (value) {
    console.log("这是响应子组件方法：展开");
    leftMenuWidth.value = foldOnW; //同步更新LeftMenu宽度
  } else {
    console.log("这是响应子组件方法： 收起");
    leftMenuWidth.value = foldOffW; //同步更新LeftMenu宽度
    // let b = currentInstance.appContext.config.globalProperties.$staticVars.leftMenu_foldOffW
  }
}

/**
 * 点击了某个菜单
 *  由LeftMenu组件发送seleted通知，最终会走到这里
 *
 * 作者: 小青龙
 * 时间：2022/09/08 14:21:47
 * @param index {String}  被点击菜单的index，比如'1-1-1'
 * @return {void}
 */
function childSelectAction(index) {
  let resultItem = listJson; //存放查询结果，得到
  const splitChar = "-"; //将index字符串（"1-1-1"）按照'-'拆分
  let arr = index.split(splitChar); //得到一个拆分后的数组
  console.log("拆分后的数组：" + arr);

  for (let i = 0; i < arr.length; i++) {
    //过滤掉字符splitChar，只处理数字（但是要确保arr第一个字符是数字字符串，否则可能会报错）
    if (arr[i] === splitChar) continue;
    //数据源listJson，第一层数组是被list包着，第二层开始才被childrens包着
    if (i == 0) {
      // 减去1是因为，index下标是从1开始排列，而for循环索引、数组下标排列索引都是从1开始
      resultItem = resultItem.list[arr[i] - 1];
    } else {
      // 减去1理由：同if
      resultItem = resultItem.childrens[arr[i] - 1];
    }
    console.log("第" + i + "遍查询结果title为：" + resultItem.title);
  }
  console.log(
    "查询结果的title、index、上一层index：",
    resultItem.title,
    resultItem.index,
    resultItem.parent_id
  );

  console.log("要跳转：" + resultItem.page);
  if (resultItem.page !== undefined) {
    // router.push(resultItem.page + `?title=${resultItem.title}`);
    router.push({
      name: "childBodyView",
      query: { title: "事实上" },
    });
  } else {
    console.log("page字段内容为空，跳转失败");
  }
}

/**
 * 点击父组件按钮，触发这个方法
 *
 * 作者: 小青龙
 * 时间：2022/09/05 16:39:58
 * @return {void}
 */
// function useChildMehtod() {
//   // 调用LeftMenu组件的pubMethod方法，并传入参数 "外部参数12"
//   leftmenuRef.value.pubMethod("外部参数123");
// }

let pageContext = getCurrentInstance().appContext;
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#mainModule {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute; /*不加这句，高度不能铺满*/
  /*display: flex;*/
}

/*width: var(--global:leftWid);*/
.left {
  background-color: white;
  width: v-bind(leftMenuWidth);
  background-color: v-bind(leftMenuBgColor);
  height: 100%;
}

.router-div {
  flex: 1;
  height: calc(100% - 71px);
  background-color: white;
}

body {
  margin: 0px;
  padding: 0px;
}
</style>
