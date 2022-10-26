import { createRouter, createWebHashHistory } from "vue-router";
// import LoginView from "@/views/Login";

const routes = [
  {
    path: "/",
    name: "homeView",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/loginView",
    name: "loginView",
    component: import("../views/login/LoginView.vue"),
  },
  {
    path: "/layoutView",
    name: "layoutView",
    component: import("../views/LayoutView.vue"),
  },
  {
    path: "/myView",
    name: "我",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MySSJ.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TestSSJ.vue"),
  },
  {
    path: "/test2",
    name: "test2",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test2SSJ.vue"),
  },
  {
    path: "/personInfo",
    name: "personInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PersonInfoView.vue"),
  },
  {
    path: "/father",
    name: "father",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FatherView.vue"),
  },
  {
    path: "/mainView",
    name: "mainView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainView.vue"),
  },
  {
    //xlsx文件的读取和导出
    path: "/xlsxView",
    name: "xlsxView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/XlsxView.vue"),
  },
  {
    //直方图
    path: "/btChatView",
    name: "btChatView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BTChatView.vue"),
  },
  {
    //登录
    path: "/loginView",
    name: "loginView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
