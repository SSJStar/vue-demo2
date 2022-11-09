import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  //根目录 暂时没用到
  {
    path: "/",
    name: "homeView",
    component: () => import("../views/MenuBodyView.vue"),
  },
  //注册
  {
    path: "/registerView",
    name: "registerView",
    component: () => import("../views/login/RegisterView.vue"),
  },
  //登录
  {
    path: "/loginView",
    name: "loginView",
    component: () => import("../views/login/LoginView.vue"),
  },
  //主页，又名"布局组件"，包含组件：HeadNav、LeftMenu、router-view
  {
    path: "/layoutView",
    component: () => import("../views/LayoutView.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/FirstView.vue"),
      },
      // 子路由
      {
        path: "bodyView",
        name: "childBodyView",
        component: () => import("../views/MenuBodyView.vue"),
      },
      {
        //xlsx文件的读取和导出
        path: "xlsxView",
        name: "xlsxView",
        component: () => import("../views/XlsxView.vue"),
      },
      {
        //直方图
        path: "btChatView",
        name: "btChatView",
        component: () => import("../views/BTChatView.vue"),
      },
      {
        path: "myView",
        name: "mine",
        component: () => import("../views/other/MyView.vue"),
      },
      {
        //原来的柱状图
        path: "bTChatViewOld",
        name: "bTChatViewOld",
        component: () => import("../views/other/BTChatViewOld.vue"),
      },
    ],
  },
  {
    path: "/personInfo",
    name: "personInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PersonInfoView.vue"),
  },
  {
    path: "/testSSJ",
    name: "testSSJ",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/other/TestSSJ.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
