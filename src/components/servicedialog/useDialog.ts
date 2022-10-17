// useDialog.ts
import {
  createApp,
  createVNode,
  defineComponent,
  h,
  ref,
  onUnmounted,
} from "vue";

import { ElDialog } from "element-plus";

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

  private createdOverlay() {
    const vm = defineComponent(() => {
      return () =>
        h(
          ElDialog,
          {
            //默认在弹窗关闭时销毁子组件
            destroyOnClose: true,
            ...this.options,
            modelValue: this.show.value,
            onClose: this.close.bind(this),
          },
          {
            default: () =>
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
    }
  }
  //打开弹窗的方法 返回promsie
  public open(overlay: OverlayType) {
    const { component, params, options } = overlay;
    this.childrenComponent = component;

    //改成
    // const { params, options } = overlay;

    this.params = params;
    if (options) {
      ``;
      this.options = options;
    }
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
      //判断是否有overlay 实例
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
      console.log("111:" + msg);
    } else {
      this._resolve();
      console.log("222:" + msg);
    }
  }
}

//创建一个hooks 好在setup中使用
export const useDialog = () => {
  const overlayService = new OverlayService();
  return {
    open: overlayService.open.bind(overlayService),
    close: overlayService.close.bind(overlayService),
  };
};
