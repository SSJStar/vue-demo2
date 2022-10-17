// import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import HomeView from "../views/HomeView.vue";
//
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "home",
//     component: HomeView,
//   },
//   {
//     path: "/about",
//     name: "about",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
//   },
// ];
//
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });
//
// export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import Home from '../views/HomeSSJ.vue'
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
    component: import("../views/LoginSSJ.vue"),
  },
  {
    path: "/homeView",
    name: "homeView",
    component: HomeView,
  },
  {
    path: "/myView",
    name: "我",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MySSJ.vue"),
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
