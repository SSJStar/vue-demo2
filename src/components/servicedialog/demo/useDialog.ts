// useDialog.ts
import {
  createApp,
  createVNode,
  defineComponent,
  h,
  ref,
  onUnmounted,
} from "vue";

// import { ElDialog } from "element-plus";
import ToastView from "@/components/servicedialog/ssj-dialog-child.vue";

import type { App, Component, ComputedOptions, MethodOptions } from "vue";
//引入dialog的类型
import type { DialogProps } from "element-plus";

export type OverlayType = {
  component: Component<any, any, any, ComputedOptions, MethodOptions>;
  options?: Partial<DialogProps>;
  params?: any;
};

export class OverlayService {
  //overlay的vue实例
  private OverlayInstance!: App;

  // ui库的组件一般都带有动画效果，所以需要维护一个布尔值，来做展示隐藏
  public show = ref<boolean>(false);

  // 组件库的options
  private options: Partial<DialogProps> = {};

  //在open中传递给子组件的参数
  private params: any = {};

  //挂载的dom
  public overlayElement!: Element | null;

  //子组件
  // private childrenComponent!: Component<
  // any,
  // any,
  // any,
  // ComputedOptions,
  // MethodOptions
  // >;

  private childrenComponent!: Component;

  //close触发的resolve，先由open创建赋予
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _resolve: (value?: unknown) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _reject: (reason?: any) => void = () => {};

  constructor() {
    this.overlayElement = document.createElement("div");
    document.body.appendChild(this.overlayElement);
    onUnmounted(() => {
      //离开页面时卸载overlay vue实例
      this.OverlayInstance?.unmount();
      if (this.overlayElement?.parentNode) {
        this.overlayElement.parentNode.removeChild(this.overlayElement);
      }
      this.overlayElement = null;
    });
  }
  /**
   * 这个方法做了什么事情？
   *
   * 1: 创建OverlayInstance实例
   * 2:   创建节点 this.childrenComponent
   * 3:     h函数有3个参数，分别是要插入的标签（组件）、属性、插入的内容(可以是子组件)
   *        比如：const props = { style: { color: "red" } };
   *        h("h2", props, "123456789");
   */
  private createdOverlay() {
    // vue3中，新增了 defineComponent ，就是把接收的 Object 直接返回。
    const vm = defineComponent(() => {
      return () =>
        h(
          // ElDialog,
          ToastView,
          {
            //默认在弹窗关闭g时销毁子组件
            destroyOnClose: true,
            ...this.options,
            modelValue: this.show.value,
            onClose: this.close.bind(this),
          },
          {
            default: () =>
              //createVNode(标签, {属性},[可以继续嵌套createVNode()])
              //理论上，从用法来看congcreateVNode第二个参数后面可以无限写不会报错，因为编译阶段不会去匹配参数对不对
              //通过createVNode创建子组件，并且把this.close方法传递给close属性、this.params传递给params属性）
              createVNode(this.childrenComponent, {
                close: this.close.bind(this),
                params: this.params,
              }),
          }
        );
    });
    if (this.overlayElement) {
      this.OverlayInstance = createApp(vm);
      this.OverlayInstance.mount(this.overlayElement);
      //console.log("this.overlayElement is not null");
    } else {
      //console.log("this.overlayElement is null");
    }
  }
  //打开弹窗的方法 返回promsie
  // 当调用open方法的时候会传入overlay对象，overlay是一个结构体，包含component（子组件实例对象）、options、params
  public open(overlay: OverlayType) {
    const { component, params, options } = overlay; //将overlay对象的3个属性取出来
    this.childrenComponent = component; //将参数overlay里的component赋值给this.childrenComponent（全局变量）

    //改成
    // const { params, options } = overlay;

    this.params = params; //params赋值给this.params（全局变量）
    if (options) {
      ``;
      this.options = options; //options赋值给options（全局变量）
    }
    // 返回Promise，并且将resolve、reject赋值给两个全局变量this._resolve、this._reject
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      //判断是否有overlay 实例，没有就调用createdOverlay
      if (!this.OverlayInstance) {
        this.createdOverlay();
      }
      this.show.value = true;
    });
  }

  //弹窗的关闭方法,可以传参触发open的promise下一步
  public close(msg?: any) {
    if (!this.overlayElement) return;
    this.show.value = false;
    if (msg) {
      this._resolve(msg);
    } else {
      this._resolve();
    }
  }
}

//创建一个hooks 好在setup中使用
export const useDialog = () => {
  /**
   *  new OverlayService(); 这个会触发constructor()方法，初始化this.overlayElement对象
   *    并且将this.overlayElement添加到document.body，也就是当前正在显示的页面的上下文
   * */
  const overlayService = new OverlayService();
  return {
    open: overlayService.open.bind(overlayService),
    close: overlayService.close.bind(overlayService),
  };
};

/***  分析 useDialog.ts的流程及原理
 * 1、当调用这句代码：const { open } = useDialog();
 *    会进入export const useDialog = () => {}方法，
 *    useDialog会调用OverlayService（）方法实例化overlayService，进而触发constructor()方法
 *
 * 2、constructor()方法 =》初始化this.overlayElement，并将它添加到document.body，并且onUnmounted里写明会注销overlayElement，
 *    然后useDialog()返回open跟close两个方法。
 *
 * 3、其它页面调用open方法，会传入component, params, options，并将这三个赋值给3个this.XX全局变量；
 *    3.1 返回一个Promise,并将resolve、reject赋值给this._resolve、this._reject
 *    3.2 调用createdOverlay()方法初始化this.OverlayInstance
 *      3.2.1 createdOverlay()干了什么？
 *        调用createApp()方法初始化this.OverlayInstance并将它挂载到this.overlayElement。createApp()这个方法又调用了h函数；
 *      3.2.2 h函数干了啥？
 *        绑定this.options、this.show响应式变量、this.close方法到ElDialog组件，创建节点this.childrenComponent作为ElDialog的子组件
 *    3.3 将响应式变量this.show设置为true.
 *
 * 4、点击关闭，会触发OverlayService里面的close方法，
 *    close方法会将响应式变量this.show设置为false.
 *    然后调用this._resolve从而把值（由子组件带过来）传给Promise，在外面的表现形式就是.then{}代码块被触发
 */
