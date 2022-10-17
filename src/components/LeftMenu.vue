<!--<template>-->
<!--  <el-row class="menu_page">-->
<!--    <el-col>-->
<!--      <el-menu-->
<!--          class="el-menu-vertical-demo"-->
<!--          background-color="#324057"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#409eff"-->
<!--      >-->
<!--        <router-link to="/home">-->
<!--          <el-menu-item index="0">-->
<!--            <i class="fa fa-margin fa-server"></i>-->
<!--            <span slot="title">首页</span>-->
<!--          </el-menu-item>-->

<!--          <template v-for="item in items">-->
<!--            <el-submenu v-if="item.children" :index="item.path" :key="item.path">-->
<!--              <template slot="title">-->
<!--                <i :class="'fa fa-margin'+item.icon"></i>-->
<!--                <span slot="title">{{item.name}}</span>-->
<!--              </template>-->
<!--              <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">-->
<!--                <el-menu-item :index="citem.path">-->
<!--                  <span slot="title">{{citem.name}}</span>-->
<!--                </el-menu-item>-->
<!--              </router-link>-->
<!--            </el-submenu>-->
<!--          </template>-->
<!--        </router-link>-->
<!--      </el-menu>-->
<!--    </el-col>-->
<!--  </el-row>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "left-menu",-->
<!--  data() {-->
<!--    return {-->
<!--      items: [-->
<!--        {-->
<!--          icon: "fa-money",-->
<!--          name: "资金管理",-->
<!--          path: "fund",-->
<!--          children: [{ path: "fundlist", name: "资金流水" }]-->
<!--        },-->
<!--        {-->
<!--          icon: "fa-asterisk",-->
<!--          name: "信息管理",-->
<!--          path: "info",-->
<!--          children: [{ path: "infoshow", name: "个人信息" }]-->
<!--        }-->
<!--      ]-->
<!--    };-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.menu_page{-->
<!--  position: fixed;-->
<!--  top: 71px;-->
<!--  left: 0;-->
<!--  min-height: 100%;-->
<!--  background-color: #324057;-->
<!--  z-index: 99;-->
<!--}-->
<!--.el-menu {-->
<!--  border: none;-->
<!--}-->
<!--.fa-margin {-->
<!--  margin-right: 5px;-->
<!--}-->
<!--.el-menu-vertical-demo:not(.el-menu&#45;&#45;collapse) {-->
<!--  width: 180px;-->
<!--  min-height: 400px;-->
<!--}-->

<!--.el-menu-vertical-demo {-->
<!--  width: 35px;-->
<!--}-->
<!--.el-submenu .el-menu-item {-->
<!--  min-width: 180px;-->
<!--}-->
<!--.hiddenDropdown,-->
<!--.hiddenDropname {-->
<!--  display: none;-->
<!--}-->
<!--a {-->
<!--  text-decoration: none;-->
<!--}-->
<!--</style>-->

<!--第2种-->

<!--<template>-->
<!--  <div>-->
<!--    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--      <el-radio-button :label="false">展开</el-radio-button>-->
<!--      <el-radio-button :label="true">收起</el-radio-button>-->
<!--    </el-radio-group>-->
<!--    <el-menu default-active="zhuye" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">-->
<!--      <el-menu-item index="zhuye">-->
<!--        <span slot="title">主页</span>-->
<!--      </el-menu-item>-->
<!--      <el-submenu :index="item.id" v-for="(item,index) in items" :key="index">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span slot="title">{{item.name}}</span>-->
<!--        </template>-->
<!--        <el-submenu :index="sub.id" v-for="(sub,index) in item.subitem" :key="index">-->
<!--          <span slot="title">{{sub.name}}</span>-->
<!--          <el-menu-item :index="sun.id" v-for="(sun,index) in sub.subitem" :key="index">-->
<!--            {{sun.name}}-->
<!--          </el-menu-item>-->
<!--        </el-submenu>-->
<!--      </el-submenu>-->
<!--    </el-menu>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name:'NavMenu',-->
<!--  data() {-->
<!--    return {-->
<!--      isCollapse: false,-->
<!--      items:[-->
<!--        {-->
<!--          name:"一级菜单A",-->
<!--          id:"1",-->
<!--          subitem:[-->
<!--            {-->
<!--              name:"二级菜单A",-->
<!--              id:"1-1",-->
<!--              subitem:[-->
<!--                {-->
<!--                  name:"三级菜单A",-->
<!--                  id:"1-1-1"-->
<!--                },-->
<!--                {-->
<!--                  name:"三级菜单B",-->
<!--                  id:"1-1-2"-->
<!--                }-->
<!--              ]-->
<!--            },-->
<!--            {-->
<!--              name:"二级菜单B",-->
<!--              id:"1-2",-->
<!--              subitem:[-->
<!--                {-->
<!--                  name:"三级菜单A",-->
<!--                  id:"1-2-1"-->
<!--                },-->
<!--                {-->
<!--                  name:"三级菜单B",-->
<!--                  id:"1-2-2"-->
<!--                }-->
<!--              ]-->
<!--            }-->
<!--          ]-->
<!--        },-->
<!--        {-->
<!--          name:"一级菜单B",-->
<!--          id:"2",-->
<!--          subitem:[-->
<!--            {-->
<!--              name:"二级菜单A",-->
<!--              id:"2-1",-->
<!--              subitem:[-->
<!--                {-->
<!--                  name:"三级菜单A",-->
<!--                  id:"2-1-1"-->
<!--                },-->
<!--                {-->
<!--                  name:"三级菜单B",-->
<!--                  id:"2-1-2"-->
<!--                }-->
<!--              ]-->
<!--            }-->
<!--          ]-->
<!--        },-->
<!--        {-->
<!--          name:"一级菜单C",-->
<!--          id:"3",-->
<!--          subitem:[-->
<!--            {-->
<!--              name:"二级菜单A",-->
<!--              id:"3-1",-->
<!--              subitem:[-->
<!--                {-->
<!--                  name:"三级菜单A",-->
<!--                  id:"3-1-1"-->
<!--                },-->
<!--                {-->
<!--                  name:"三级菜单B",-->
<!--                  id:"3-1-2"-->
<!--                }-->
<!--              ]-->
<!--            }-->
<!--          ]-->
<!--        },-->
<!--      ]-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    handleOpen(key, keyPath) {-->
<!--      console.log(key, keyPath);-->
<!--    },-->
<!--    handleClose(key, keyPath) {-->
<!--      console.log(key, keyPath);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--.el-menu-vertical-demo:not(.el-menu&#45;&#45;collapse) {-->
<!--  width: 280px;-->
<!--  min-height: 400px;-->
<!--}-->
<!--.el-submenu .el-menu-item {-->
<!--  padding: 0 15px;-->
<!--}-->
<!--</style>-->

<!--第三种-->
<!--<template>-->
<!--  -->
<!--    <el-col :span="12" class="menu-el-col">-->
<!--      <el-menu-->
<!--          active-text-color="#ffd04b"-->
<!--          background-color="#545c64"-->
<!--          class="el-menu-vertical-demo"-->
<!--          default-active="4"-->
<!--          text-color="#fff"-->
<!--          @open="handleOpen"-->
<!--          @close="handleClose"-->
<!--      >-->
<!--        &lt;!&ndash;   Navigator One     &ndash;&gt;-->
<!--        <el-sub-menu index="1">-->
<!--          <template #title>-->
<!--            <el-icon><location /></el-icon>-->
<!--            <span>Navigator One</span>-->
<!--          </template>-->
<!--          <el-menu-item-group title="Group One">-->
<!--            <el-menu-item index="1-1">item one</el-menu-item>-->
<!--            <el-menu-item index="1-2">item two</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-menu-item-group title="Group Two">-->
<!--            <el-menu-item index="1-3">item three</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-sub-menu index="1-4">-->
<!--            <template #title>item four</template>-->
<!--            <el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--          </el-sub-menu>-->
<!--        </el-sub-menu>-->

<!--      &lt;!&ndash;   Navigator Two    &ndash;&gt;-->
<!--        <el-menu-item index="2">-->
<!--          <el-icon><icon-menu /></el-icon>-->
<!--          <span>Navigator Two</span>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash;   Navigator Three    &ndash;&gt;-->
<!--        <el-menu-item index="3" disabled>-->
<!--          <el-icon><document /></el-icon>-->
<!--          <span>Navigator Three</span>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash;   Navigator Four    &ndash;&gt;-->
<!--        <el-menu-item index="4">-->
<!--          <el-icon><setting /></el-icon>-->
<!--          <span>Navigator Four</span>-->
<!--        </el-menu-item>-->

<!--        &lt;!&ndash;   Navigator Five     &ndash;&gt;-->
<!--        <el-sub-menu index="5">-->
<!--          <template #title>-->
<!--            <el-icon><location /></el-icon>-->
<!--            <span>地图</span>-->
<!--          </template>-->
<!--&lt;!&ndash;-->
<!--el-menu-item-group  组-->
<!--el-menu-item        组下面的成员-->
<!--&ndash;&gt;-->
<!--          <el-menu-item-group title="浙江">-->
<!--            <el-menu-item index="5-1">杭州</el-menu-item>-->
<!--            <el-menu-item index="5-2">台州</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-menu-item-group title="上海">-->
<!--            <el-menu-item index="5-3">青浦区</el-menu-item>-->
<!--          </el-menu-item-group>-->

<!--        </el-sub-menu>-->

<!--      </el-menu>-->

<!--    </el-col>-->
<!--  -->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {-->
<!--  Document,-->
<!--  Menu as IconMenu,-->
<!--  Location,-->
<!--  Setting,-->
<!--} from '@element-plus/icons-vue'-->
<!--const handleOpen = (key: string, keyPath: string[]) => {-->
<!--  console.log(key, keyPath)-->
<!--}-->
<!--const handleClose = (key: string, keyPath: string[]) => {-->
<!--  console.log(key, keyPath)-->
<!--}-->
<!--</script>-->

<!--第四种-->
<!--
数据源大概是要这样展示：
浙江
  杭州
    西湖区
    滨江区
    上城区
  绍兴
  宁波
  台州
上海
内蒙
  呼和浩特
  包头
  乌海
-->

<template>
  <div class="foldIcon">
    <img @click="zhedie" v-bind:src="foldImageName" />
  </div>
  <el-container>
    <el-aside :width="isCollapse ? foldOff_width : foldOn_width">
      <el-menu
        active-text-color="#ffd04b"
        v-bind:background-color="staticVars.BACKGROUNBD_COLOR"
        class="el-menu-vertical-demo"
        default-active="4"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <!--这是一个for循环，遍历第一级-->
        <!-- 针对每一个item、item2，要判断它下面有没有子菜单，如果有就用el-sub-menu创建它，如果没有就用el-menu-创建它 -->
        <!-- 注意：item3作为第三级菜单，不再往下拓展-->
        <div :index="item.index" v-for="item in listJson.list" :key="item.key">
          <!--能进入这个v-if，表示这个一级菜单下面还有子菜单（二级菜单）-->
          <div v-if="item.childrens.length > 0">
            <el-sub-menu :index="item.index" :key="item.id">
              <!--   这里的item表示第一级菜单   -->
              <template #title>
                <el-icon>
                  <!--  <icon-menu /> -->
                  <!--  上面这行使用的是element-plus自带图标库，下面这行使用的我们自己导入到项目的图片
                      利用v-bind将item.iconName的图片路径赋值给src，请注意：路径需要用require()包裹住
                -->
                  <img class="icon-style" v-bind:src="item.iconName" />
                </el-icon>
                <span v-show="!isCollapse" class="caidan-auth">{{
                  item.title
                }}</span>
              </template>

              <!-- 这里展示二级菜单，没有子菜单（三级菜单）就用el-menu-item-->
              <div v-for="item2 in item.childrens" :key="item2.key">
                <!--   此处v-if表示二级菜单下面，没有子菜单   -->
                <div v-if="item2.childrens.length === 0">
                  <el-menu-item
                    :index="item2.index"
                    :key="item2.id"
                    @click="goUrl(item2.parent_id, item2.title, item2.index)"
                  >
                    <el-icon><Setting /></el-icon>
                    <span class="caidan-auth">{{ item2.title }}</span>
                  </el-menu-item>
                </div>

                <!--   此处v-else表示二级菜单下面，还有子菜单   -->
                <div v-else>
                  <!--   这里的item2表示第二级菜单   -->
                  <el-sub-menu :index="item2.index" :key="item2.id">
                    <template #title>
                      <el-icon><Setting /></el-icon>
                      <span class="caidan-auth">{{ item2.title }}</span>
                    </template>
                    <!--  这里展示三级菜单，三级菜单为最后一层，不再往下拓展（所以用el-menu-item）-->
                    <el-menu-item
                      :index="item3.index"
                      v-for="item3 in item2.childrens"
                      :key="item3.id"
                      @click="goUrl(item3.parent_id, item3.title, item3.index)"
                    >
                      <el-icon><Location /></el-icon>
                      <span class="caidan-auth">{{ item3.title }}</span>
                    </el-menu-item>
                  </el-sub-menu>
                </div>
              </div>
            </el-sub-menu>
          </div>

          <!--能进入这个v-else，表示这个一级菜单下面没有子菜单-->
          <div v-else>
            <!-- 一级菜单下面没有子菜单，那一级菜单就用el-menu-item-->
            <el-menu-item
              :index="item.index"
              :key="item.id"
              @click="goUrl(item.parent_id, item.title, item.index)"
            >
              <el-icon>
                <img class="icon-style" v-bind:src="item.iconName" />
              </el-icon>
              <span v-show="!isCollapse" class="caidan-auth">{{
                item.title
              }}</span>
            </el-menu-item>
          </div>
        </div>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script setup>
import {
  HomeFilled,
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue"; //引入图标
import { onUnmounted, onUpdated, ref } from "vue";
import staticVars from "@/statics/global";

console.log(staticVars.LEFTMENU_FOLDONW);
// 折叠还是展开
let isCollapse = ref(false);

let displayValue = ref("block");

// （展开 ｜ 收起）图片路径
// eslint-disable-next-line @typescript-eslint/no-var-requires
let foldImageName = ref(require("/src/assets/menu/icon-menu-shouqi.png"));

let foldIconColor = staticVars.BACKGROUNBD_COLOR;

/* 在 <script setup> 中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits ，
 * 它们具备完整的类型推断并且在 <script setup> 中是直接可用的：
 */
// eslint-disable-next-line no-undef
const emit = defineEmits(["change", "selected"]);
// eslint-disable-next-line no-undef
const props = defineProps({
  foo: String,
  foldOn_width: String, //展开时的宽度
  foldOff_width: String, //收起时的宽度
  listJson: Object, //菜单数据源
});

/**
 * 点击了菜单
 *
 * 作者: 小青龙
 * 时间：2022/09/05 16:17:49
 * @param parent_id {string}  上一级的index
 * @param title     {string}      被点击菜单-》文字
 * @param parent_id {string}  被点击菜单-》index
 * @return void
 */
function goUrl(parent_id, title, index) {
  alert(title + "，id是" + index);
  //通知父视图，点击了哪个index
  emit("selected", index);
}

/**
 * 展开菜单
 *
 * 作者: 小青龙
 * 时间：2022/09/05 16:25:51
 * @example {说点什么}
 * @param key     {string}    index
 * @param keyPath {string[]}  描述信息
 * @return {void}
 */
const handleOpen = (key, keyPath) => {
  console.log("handleOpen--" + key, keyPath);
};

/**
 * 收起菜单
 *
 * 作者: 小青龙
 * 时间：2022/09/05 15:54:22
 * @param key     {string}    描述信息
 * @param keyPath {string[]}  描述信息
 */
const handleClose = (key, keyPath) => {
  console.log("handleClose--" + key, keyPath);
};

//折叠方法
function zhedie() {
  // console.log("执行zhedie方法")
  isCollapse.value = !isCollapse.value;
  //修改displayValue值，控制三角形的显示或隐藏
  if (isCollapse.value) {
    displayValue.value = "none";
    foldImageName.value = require("/src/assets/menu/icon-menu-zhankai.png");
  } else {
    displayValue.value = "block";
    foldImageName.value = require("/src/assets/menu/icon-menu-shouqi.png");
  }
  //告诉调用者，展开还是收起
  emit("change", !isCollapse.value);
}

//定义方法，并暴露给外界调用
function pubMethod(value) {
  console.log("接收外界value:" + value);
}
// 暴露给外界调用
// eslint-disable-next-line no-undef
defineExpose({ pubMethod });
</script>

<style>
/*设置 - 每一级别的菜单图标大小*/
.el-icon .icon-style {
  width: 13px;
  height: 13px;
}

/*折叠按钮*/
.foldIcon {
  height: 30px;
  background-color: v-bind(foldIconColor);
  /*设置子元素 - 水平垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
}

/*设置 - 折叠图标大小*/
.foldIcon img {
  width: 16px;
  height: 16px;
}

/*去掉el-menu右侧 - 白色边框线*/
.el-menu {
  border: 0 !important;
  height: 100%;
  text-align: center;
}

/*设置三角形显示还是隐藏，由响应式变量displayValue来控制*/
.el-menu .el-sub-menu__icon-arrow {
  display: v-bind(displayValue);
}
/*.el-menu .el-sub-menu__icon-arrow:deep(isCollapse){*/
/*  !*display: [isCollapse?none:block];*!*/
/*  display: none;*/
/*}*/
</style>
