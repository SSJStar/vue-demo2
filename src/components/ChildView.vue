<template>
  <div style="background-color: cadetblue">
    <button @click="userFatherMethod">点击调用父组件方法</button>
    <h5>{{ foo }}</h5>
  </div>
</template>

<script setup>
/* 在 <script setup> 中必须使用 defineProps 和 defineEmits API 来声明 props 和 emits ，
 * 它们具备完整的类型推断并且在 <script setup> 中是直接可用的：
 */
// 此处填写对外抛出的emit字符标识
// eslint-disable-next-line no-undef
const emit = defineEmits(["fold"]);

//此处声明属性，在父组件的表现形式为：<ChildView foo="你好啊，子组件！" />

// eslint-disable-next-line no-undef
const props = defineProps({
  foo: String,
});

// -> 调用父组件方法
function userFatherMethod() {
  // 此处的fold在父组件的表现形式为 <ChildView @flod="XXX"/>
  //  fold相当于一个标记，父组件的@flod可以理解为对ChildView组件的一种响应，响应的方法实现则是 XXX
  emit("fold", "参数ABC");
  /*  温馨提示：此处的fold要加入到上面defineEmits里，否则控制台会报警告：
   *     [Vue warn]: Component emitted event "fold" but it is neither declared in the emits option nor as an "onFold" prop.
   * */
}

function childViewMethod1(value) {
  console.log("我是子组件方法1 -> childViewMethod1，接收参数：" + value);
}

function childViewMethod2(value) {
  console.log("我是子组件方法2 -> childViewMethod2");
}

const doSth = (str) => {
  console.log("子组件的 doSth 方法执行了！" + str);
};

//暴露给外界3个方法
// eslint-disable-next-line no-undef
defineExpose({ childViewMethod1, childViewMethod2, doSth });
</script>

<!--
【子组件】调用【父组件】方法
「子组件」用emit来抛出信号，「父组件」响应信号且调用在「父组件」内调用实现的方法。
而让信号产生作用，「子组件」内部就需要通过defineEmits方法实例化emit，即：
const emit = defineEmits(['信号标识符a','信号标识符b'])

【父组件】调用【子组件】，
「子组件」需要先将实现的方法，通过defineExpose暴露给外界。即：
    defineExpose({childViewMethod1, childViewMethod2})
「父组件」通过 "ref实例.value.方法名" 调用「子组件」，其中ref实例可以获取到「子组件」对象


伪代码
假设父组件为Parent.vue，子组件为Child.vue

父组件调用子组件写法如下：

【父组件】
<template>
  <Child ref="childRef" />
</template>

<script setup>

const childRef = ref(null)

function clickMethod(){
  childRef.value.childViewMethod('参数XX')
}
</script>

【子组件】
<script setup>
  //定义方法
  function childViewMethod(value) {
    console.log("我是子组件方法,接收参数："+value)
  }

  //暴露给外界3个方法
  defineExpose({childViewMethod})
</script>




子组件调用父组件写法如下：
【父组件】
<template>
  <Child ref="childRef" @fold="foldMethod"/>
</template>
<script setup>
  function foldMethod(){
   console.log("我是父组件方法)
  }
</script>



【子组件】
<script setup>
  const emit = defineEmits(['fold'])

  function userFatherMethod() {
    emit("fold")
  }
</script>
-->
