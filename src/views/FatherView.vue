<template>
  <div
    style="
      background-color: cadetblue;
      width: 100%;
      height: 100%;
      position: absolute;
    "
  >
    <button
      @click="useChildMethod"
      style="margin-top: 20px; margin-bottom: 30px"
    >
      点击调用子组件方法
    </button>
    <div>
      <!--      定义ref是用来在js里获取ChildView组件对象；
          定义@fold是为了方便响应ChildView组件发出的fold信号-->
      <ChildView
        ref="childViewRef"
        @fold="responseFold"
        foo="你好啊，子组件！"
        style="
          width: 200px;
          height: 100px;
          background-color: burlywood;
          align-items: center;
          display: inline-block;
        "
      ></ChildView>
    </div>
  </div>
</template>

<script setup>
import ChildView from "@/components/ChildView";
import { ref } from "vue";

function responseFold(value) {
  console.log("我是父组件方法 -> responseFold，接收参数：" + value);
}

// 定义与 ref 同名变量 (不要写在方法里面，否则会报错找不到)
const childViewRef = ref(null);

const useChildMethod = () => {
  // 调用子组件的方法
  childViewRef.value.childViewMethod1("111");
};
</script>
