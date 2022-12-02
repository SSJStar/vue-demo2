<template>
  <div class="updatePwd" v-if="isShow">
    <div class="bgView">
      <!--    关闭按钮    -->
      <div class="closeImgDiv">
        <img src="@/assets/public/closeView.png" @click="cancel" />
      </div>

      <!--    标题    -->
      <label class="title-label">正在修改密码</label>

      <span style="height: 20px" />

      <!--    验证码    -->
      <div class="inputDiv">
        <label>验 证 码</label>
        <span style="width: 10px" />
        <input v-model="formInput.codeValue" />
      </div>

      <span style="height: 20px" />

      <!--    新的密码    -->
      <div class="inputDiv">
        <label>新的密码</label>
        <span style="width: 10px" />
        <input v-model="formInput.pwdValue" />
      </div>

      <span style="height: 20px" />

      <!--    确认密码    -->
      <div class="inputDiv">
        <label>确认密码</label>
        <span style="width: 10px" />
        <input v-model="formInput.confirmPwdValue" />
      </div>

      <!--    输入错误提示    -->
      <label
        v-show="pwdError"
        style="padding-left: 75px; font-size: 14px; color: indianred"
      >
        {{ errMsg }}
      </label>

      <span style="height: 40px" />

      <div class="submitDiv">
        <button @click="confirm">提交</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
let isShow = ref(false); //是否显示弹窗
let pwdError = ref(false); //是否显示错误提示
let errMsg = ref(""); //错误提示文字
// //定义类型 Obj
// export interface SSJDialogParams {
//   // [key: string]: string | number;
//   [key: string]: string;
// }

// export type SSJDialogParams = {
//   title: string;
//   subTitle: string;
// };
// 定义一个对象，用来存放输入的验证码、密码、确认密码
let formInput = {
  codeValue: "",
  pwdValue: "",
  confirmPwdValue: "",
};
// let titleValue = ref("");
// let subTitleValue = ref("");

const props = defineProps<{
  close: (btnIndex: number, code?: any) => void;
  params: any;
}>();

onMounted(() => {
  // 此刻的props是没有值的，要在show()函数里进行操作
  //清空数据，防止旧数据保留
  formInput.codeValue = "";
  formInput.pwdValue = "";
  formInput.confirmPwdValue = "";
});

const show = () => {
  console.log("show方法被执行～～～～～～");
  isShow.value = true;
  // titleValue.value = props.params["title"];
  // subTitleValue.value = props.params["subTitle"];
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
    props.close(btnIndex, "");
  } else if (btnIndex === 1) {
    props.close(btnIndex, formInput);
  }
};

// 取消事件
const cancel = () => {
  hide(0);
};

//确定事件
const confirm = () => {
  if (
    formInput.pwdValue.length === 0 ||
    formInput.confirmPwdValue.length === 0
  ) {
    pwdError.value = true;
    errMsg.value = "密码不能为空";
  } else if (formInput.pwdValue === formInput.confirmPwdValue) {
    // 如果两次密码一致，且不为空
    pwdError.value = false;
    hide(1);
  } else {
    // 如果两次密码不一致，就显示 "密码不一致"这个label
    pwdError.value = true;
    errMsg.value = "密码不一致";
  }
};

defineExpose({
  hide,
  show,
});
</script>

<style scoped>
.updatePwd {
  position: fixed;
  display: flex;
  flex-direction: column;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /*设置颜色*/
  justify-content: center;
  align-items: center;
  z-index: 999; /** 设置层级最高 */
}

/* 中间背景 */
.updatePwd .bgView {
  background-color: white;
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 20px 10px;
  border-radius: 10px;
}

/* 输入框 */
.updatePwd .bgView .inputDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.updatePwd .bgView .inputDiv label {
  width: 70px;
  /*background-color: #42b983;*/
}
.updatePwd .bgView .inputDiv input {
  width: calc(100% - 70px);
  height: 25px;
}

/* 标题 */
.updatePwd .bgView .title-label {
  padding: 0;
  font-size: 24px;
  width: 100%;
  text-align: center;
  color: #333333;
}

.submitDiv {
  width: 100%;
  display: flex;
  justify-content: center;
}

.submitDiv button {
  width: 80%;
  height: 30px;
  justify-content: center;
}

.closeImgDiv {
  height: auto;
  position: relative;
  /*background-color: #42b983;*/
}
.closeImgDiv img {
  width: 20px;
  height: 20px;
  float: right;
}
/*!* 副标题 *!*/
/*.updatePwd .bgView .subTitle-label {*/
/*  font-size: 24px;*/
/*  width: 100%;*/
/*  text-align: center;*/
/*  color: #666666;*/
/*}*/

/*!* 输入区域 *!*/
/*.updatePwd .bgView .input-div {*/
/*  width: 100%;*/
/*  height: auto;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*}*/
/*.updatePwd .bgView .input-div input {*/
/*  font-size: 24px;*/
/*  width: 70%;*/
/*  height: 30px;*/
/*  margin-top: 20px;*/
/*  display: inline-block;*/
/*  justify-items: center;*/
/*  color: #666666;*/
/*}*/

/*!* 虚线 *!*/
/*.updatePwd .bgView .actionView .row-line {*/
/*  border: 1px dashed #999999;*/
/*  height: 0px;*/
/*  width: 100%;*/
/*}*/

/*!* 取消、确定 - 父视图 *!*/
/*.updatePwd .bgView .actionView {*/
/*  width: 100%;*/
/*  height: auto;*/
/*  margin-top: 40px;*/
/*  !*background-color: #42b983;*!*/
/*}*/

/*!* 左边按钮 *!*/
/*.updatePwd .bgView .leftButton {*/
/*  margin-top: 20px;*/
/*  margin-left: 10px;*/
/*  display: inline-block;*/
/*  float: left;*/
/*  background-color: cadetblue;*/
/*  font-size: 18px;*/
/*  width: 100px;*/
/*  border-radius: 10px;*/
/*  border-color: rgba(0, 0, 0, 0);*/
/*}*/

/*!* 右边按钮 *!*/
/*.updatePwd .bgView .rightButton {*/
/*  margin-top: 20px;*/
/*  margin-right: 10px;*/
/*  display: inline-block;*/
/*  float: right;*/
/*  background-color: cadetblue;*/
/*  font-size: 18px;*/
/*  width: 100px;*/
/*  border-radius: 10px;*/
/*  border-color: rgba(0, 0, 0, 0);*/
/*}*/
</style>
