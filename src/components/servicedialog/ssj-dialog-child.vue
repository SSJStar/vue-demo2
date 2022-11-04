<template>
  <div class="tip" v-if="isShow">
    <div class="bgView">
      <label>{{ titleValue }}</label>
      <!--      <h3>{{ subTitleValue }}</h3>-->
      <div class="actionView">
        <button class="leftButton" @click="cancel">取消</button>
        <button class="rightButton" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
let isShow = ref(false);

// //定义类型 Obj
// export interface SSJDialogParams {
//   // [key: string]: string | number;
//   [key: string]: string;
// }

// export type SSJDialogParams = {
//   title: string;
//   subTitle: string;
// };

// const form = reactive({
//   title: "",
//   subTitle: "",
// });
let titleValue = ref("");
let subTitleValue = ref("");

const props = defineProps<{
  close: (btnIndex: number, msg?: any) => void;
  params: any;
}>();

const show = () => {
  isShow.value = true;
  console.log("~~props.params --- ");
  console.log(props.params);
  titleValue.value = props.params["title"];
  subTitleValue.value = props.params["subTitle"];
};

/**
 * 隐藏当前弹窗组件
 *
 * 作者: 小青龙
 * 时间：2022/11/04 11:20:48
 * @param btnIndex {number}  btnIndex为0，表示点击了取消按钮；btnIndex为1，表示点击了确定按钮；
 * @return {void}
 */
const hide = (btnIndex: number) => {
  isShow.value = false;
  if (btnIndex === 0) {
    props.close(btnIndex, "点击取消");
  } else if (btnIndex === 1) {
    props.close(btnIndex, "点击确定");
  }
};

// 取消事件
const cancel = () => {
  hide(0);
};

//确定事件
const confirm = () => {
  hide(1);
};

defineExpose({
  hide,
  show,
});

onMounted(() => {
  // 此刻的props是没有值的，要在show()函数里进行操作
});
</script>

<style scoped>
.tip {
  position: fixed;
  display: flex;
  flex-direction: column;
  inset: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(95, 157, 160, 0.8);*/
  background-color: rgba(0, 0, 0, 0.7); /*设置北京颜色*/
  font-size: 32px;
  justify-content: center;
  align-items: center;
}

/* 中间背景 */
.tip .bgView {
  background-color: white;
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
}
/* 标题 */
.tip .bgView label {
  width: 100%;
  text-align: center;
  background-color: #42b983;
}

/* 取消、确定 - 父视图 */
.tip .bgView .actionView {
  width: 100%;
  height: auto;
  margin-top: 40px;
}

/* 左边按钮 */
.tip .bgView .leftButton {
  display: inline-block;
  float: left;
  background-color: cadetblue;
  font-size: 18px;
  width: 100px;
}

/* 右边按钮 */
.tip .bgView .rightButton {
  display: inline-block;
  float: right;
  background-color: cadetblue;
  font-size: 18px;
  width: 100px;
}
</style>
