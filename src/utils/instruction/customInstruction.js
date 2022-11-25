// const directives = [
//   Comment("preventReClick"),
//   Comment("bg"),
//   // 其他引入指令
// ];
// 进行循环注册指令
// export function registerDirective(app) {
//   Object.keys(directives).forEach((key) => {
//     app.directive(key, directives[key]);
//   });
// }
// const registerDirective = (app) => {
//   Object.keys(directives).forEach((key) => {
//     app.directive(key, directives[key]);
//   });
//   // Object.keys(directives).forEach((key) => {
//   //   app.use("preventReClick");
//   // });
// };
// export default registerDirective;

export default {
  install(Vue) {
    // 防止重复点击
    Vue.directive("preventReClick", {
      mounted(el, binding) {
        //el指当前组件对象，binding指传进来的值
        el.addEventListener("click", () => {
          if (!el.disabled) {
            el.disabled = true;
            setTimeout(() => {
              console.log("go~~");
              el.disabled = false;
            }, binding.value || 1000);
          }
        });
      },
    });

    //背景颜色
    Vue.directive("bg", {
      //修改css样式通常在beforeMount
      beforeMount(el, binding, vnode) {
        el.style.background = binding.value;
      },
    });
  },
};

// import { Directive, DirectiveBinding } from "vue";
// // import { useStore } from "vuex"
// // 使用了类型进行注册
// const permission: Directive = {
//   // mounted :Directive挂载生命周期
//   mounted: (el: HTMLElement, bind: DirectiveBinding) => {
//     // const store = useStore();
//     // roleData需要自己去引入
//     const roleData = ["Deleted"];
//     const { value } = bind;
//     // 判断是否为超级管理员
//     // const isAdmin = store.isAdmin??false;
//     // if (isAdmin) return;
//
//     //判空以及判断类型
//     if (value && value instanceof Array) {
//       if (value.length > 0) {
//         const permissionRoles = value;
//         // 判断是否存在权限
//         const hasPermission = roleData.some((role) => {
//           return permissionRoles.includes(role);
//         });
//         // 返回值为false 删除节点
//         if (!hasPermission){
//           return el.parentNode && el.parentNode.removeChild(el);
//         }
//       }
//     } else {
//       throw new Error("权限值为空或权限值类型错误");
//     }
//   },
// };
//
// export default permission;
