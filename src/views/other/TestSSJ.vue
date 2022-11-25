<template>
  <h1 v-bg="'pink'">hh</h1>
  <button @click="clickMe" v-preventReClick="3000">hh22</button>
  <br />
  {{ fo.grade > 90 ? "优秀" : "一般" }}
  <br />
  {{ show() }}
  <button @click="changeDatav">点击改变数据</button>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
// import testVars from "@/statics/Test.js";
// import { eat, ssjTest } from "@/statics/Test.js";

let fo = {
  fname: "",
  sex: "男",
  grade: 80,
};
const show = () => {
  if (fo.grade > 90) {
    return "优秀";
  } else {
    return "一般";
  }
};
const changeData = () => {
  fo.grade = 95;
};
/** 枚举类型 */
enum ErrorCode {
  Up = 0,
  Down = 2,
  Left = 3,
  Right = 4,
}

/** 定义ZoonA类 */
class ZoonA {
  name: string;
  age: number;

  // 构造函数
  constructor(name: string, age: number) {
    this.name = "";
    this.age = 0;
  }
  // 其它函数
  menthodFather() {
    console.log("这是父类方法");
  }
}
/** 定义ZoonB类，继承ZoonA类 */
class ZoonB extends ZoonA {
  nickName: string;
  runSpeed: number;

  // 构造函数
  constructor(name: string, age: number, nickName: string, runSpeed: number) {
    super(name, age);
    this.nickName = nickName;
    this.runSpeed = runSpeed;
  }

  // 其它函数
  mySingSong = (name: string) => {
    console.log(`The song is ${name}`);
  };
}

let cnt = 0;
const clickMe = () => {
  console.log("clickMe~" + cnt++);
};

onMounted(() => {
  let zoonB = new ZoonB("李太白", 30, "李白", 100);
  zoonB.menthodFather();
  zoonB.mySingSong("《青花瓷》");
});

//TODO: ---------- 函数相关 ----------

//TODO: 有哪几种函数

//有名函数，又名"普通函数"
function nameFunc(): boolean {
  console.log("有名函数打印～～");
  return true;
}

//匿名函数
const anonymousFunc = function (p1: string, p2: number) {
  console.log("匿名函数～～");
};

//箭头函数
const arrowFunc = () => {
  console.log("箭头函数～～");
};

//TODO：关于函数返回值

//无返回值
const noBack = (bookName: any) => {
  console.log("没有返回值的函数");
};

//有返回值
function havaBack(bookName: any): string {
  console.log("有返回值的函数");
  return `《${bookName}》`;
}

//TODO: 关于函数的参数

//可选参数 ｜ 默认参数 ｜ 必须按参数
//
// name是必须按参数，age是可选参数，可选参数必须在"必须参数"和"默认参数"之后，
// 比如function myFun(age?: number, sex = "男", name: string) {} 这样就是错误的
function myFun(name: string, sex = "男", age?: number) {
  console.log("name~~" + name);
  console.log("sex~~" + sex);
  console.log("age~~" + age);
}

//剩余参数
// 剩余参数...parameters只能是最后一个参数
function shengyu(name: string, ...parameters: any[]) {
  parameters.forEach((item, index) => {
    console.log(`forEach item--${item}  index--${index}`);
  });
}

//TODO: ---------- 数组相关 ----------

// for循环
function showFor() {
  const nameArray = ["张三", "李四", "王五", "张龙", "赵虎"]; // 数据源

  console.log("方式1打印-----常规for------->");
  for (let i = 0; i < 5; i++) {
    if (i < nameArray.length) {
      console.log("value = " + nameArray[i]);
    }
  }

  console.log("方式2打印-----array.forEach------->");
  nameArray.forEach((value, index) => {
    console.log("index = " + index + " value = " + value);
    // console.log(`方式2打印index = ${index} value = ${value}`); //这样写也可以
  });

  console.log("方式3打印-----for...in------->");
  for (let index in nameArray) {
    console.log(`value = ${nameArray[index]}`);
  }

  console.log("方式4打印------for...of------>");
  for (let value of nameArray) {
    console.log(`value = ${value}`);
  }
}

//元祖
function showArray() {
  let a1: [string, number];
  let a2: [string, number] = ["哈哈", 1]; //正确
  // let a3: [string, number] = ["哈哈", 1, "嘎嘎"]; //编译报错
  a1 = ["哈哈", 1];
  a1.push("嘿嘿"); //虽然越界，但是控制台不会报错，且自动把越界部分的数据，自动匹配已经设定好的类型（string或number）
  a1.push("呼呼");
  console.log("a1~" + a1);
  console.log("~" + typeof "hh");
}
</script>
