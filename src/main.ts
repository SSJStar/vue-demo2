import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
// import store from "./store";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VForm3 from "vform3-builds"; //引入VForm3库
import "vform3-builds/dist/designer.style.css"; //引入VForm3样式
import ElementPlus from "element-plus"; //引入element-plus
import "element-plus/dist/index.css"; //引入element-plus样式
// import zhCn from "element-plus/es/locale"; //引入element-plus中文样式(针对日历)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ssjDialog from "@/components/SSJDialog.js";

const app = createApp(App);

app.use(VForm3); //全局注册VForm3(同时注册了v-form-designe、v-form-render等组件)
app.use(ElementPlus); //全局注册ElementPlus
app.use(ssjDialog); //全局注册弹窗
// app.use(ElementPlus, { locale: zhCn });
// app.use(SubDialog)

// app.config.globalProperties.$staticVars = staticVars//挂载全局静态变量对象$staticVars
// app.config.globalProperties.$hello=()=>{//全局挂载hello方法
//     console.log("This is hello method")
// }

app.config.globalProperties.$loginState = false; //挂载全局静态变量对象$staticVars

app.use(router).mount("#app");

// app.use(showSSJDialog)

//全局注册组件 - GlobalView
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GlobalView from "@/components/GlobalView";
app.component("GlobalView", GlobalView);
