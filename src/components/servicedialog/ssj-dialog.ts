// import { createVNode, render } from "vue";
// import Notice from "./src/index.vue";
// interface IOptions {
//   message: string;
//   toast_type?: "success" | "alert" | "warning" | "error";
//   duration: number;
// }
// let mountNode: any = null;
// export default (options: IOptions) => {
//   const duration = options.duration | 2000;
//   //确保只存在一个弹框，如果前一个弹窗还在，就移除
//   if (mountNode) {
//     document.body.removeChild(mountNode);
//     mountNode = null;
//   }
//   //将options参数传入，并将Notice组件转换成虚拟DOM，并赋值给app
//   const app = createVNode(Notice, {
//     ...options,
//     duration,
//     show_toast: true,
//   });
//   //创建定时器，duration时间后将mountNode移除
//   const timer = setTimeout(() => {
//     document.body.removeChild(mountNode);
//     mountNode = null;
//     clearTimeout(timer);
//   }, duration);
//   //创建一个空的div
//   mountNode = document.createElement("div");
//   //render函数的作用就是将Notice组件的虚拟DOM转换成真实DOM并插入到mountNode元素里
//   render(app, mountNode);
//   //然后把转换成真实DOM的Notice组件插入到body里
//   document.body.appendChild(mountNode);
// };

import { App, createVNode, render, VNode } from "vue";
import Tip from "./ssj-dialog-child.vue";

/*
对象：Vue会自动注入到install 方法
function： 就直接在页面使用
*/
// 全局注册
export default {
  install(app: App) {
    // 创建虚拟dom
    const tipVnode: VNode = createVNode(Tip);
    // render函数生成真实DOM，
    render(tipVnode, document.body);
    console.log(tipVnode);

    // Vue 全局配置
    app.config.globalProperties.$loadingTip = {
      show: () => tipVnode.component?.exposed?.show(),
      hide: () => tipVnode.component?.exposed?.hide(),
    };
  },
};

//弹窗的关闭方法,可以传参触发open的promise下一步
// function close(msg?: any) {
//   // if (!this.overlayElement) return;
//   // this.show.value = false;
//   // if (msg) {
//   //   this._resolve(msg);
//   // } else {
//   //   this._resolve();
//   // }
//   console.log("close function ~~" + msg);
// }

// // 页面中引入---函数式返回
// export function tip() {
//   const tipInstance: VNode = createVNode(Tip);
//   render(tipInstance, document.body);
//   console.log(tipInstance);
//   tipInstance.component?.exposed?.show();
// }

// 页面中引入---函数式返回
export function ssjTip(vars: any) {
  return new Promise((resolve, reject) => {
    const tipInstance: VNode = createVNode(Tip, {
      close: (msg?: any) => {
        console.log("close self function ~~" + msg);
        //调用resolve 告诉外层
        resolve(msg);
      },
      params: vars,
    });
    render(tipInstance, document.body);
    console.log(tipInstance);
    tipInstance.component?.exposed?.show();
  });
}

// // 页面中引入---函数式返回
// export function hideTip() {
//   const tipInstance: VNode = createVNode(Tip);
//   render(tipInstance, document.body);
//   console.log(tipInstance);
//   tipInstance.component?.exposed?.hide();
// }
