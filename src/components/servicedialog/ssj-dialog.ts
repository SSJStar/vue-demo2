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

    // Vue 全局配置
    app.config.globalProperties.$loadingTip = {
      show: () => tipVnode.component?.exposed?.show(),
      hide: () => tipVnode.component?.exposed?.hide(),
    };
  },
};

// 页面中引入---函数式返回
export function ssjTip(vars: any) {
  return new Promise((resolve, reject) => {
    const tipInstance: VNode = createVNode(Tip, {
      close: (btnIndex: number, msg?: any) => {
        //调用resolve 告诉外层
        resolve(msg);
      },
      params: vars,
    });
    render(tipInstance, document.body);
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
