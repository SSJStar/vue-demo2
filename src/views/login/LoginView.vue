<template>
  <div id="login">
    <div id="background-div">
      <img src="@/assets/keji_bg.png" />
    </div>

    <div id="login-module-div">
      <h1 class="lmd-title">欢迎登录</h1>
      <h2 class="lmd-subtitle">现在使用的框架是:vue3 + element-plus</h2>

      <!-- 账号 -->
      <div class="el-input-div" style="margin-top: 40px">
        <el-input
          v-model="loginInput.nameValue"
          placeholder="请输入账号"
          :prefix-icon="Avatar"
          @input="changeHandle($event)"
        ></el-input>
      </div>

      <!-- 密码 -->
      <div class="el-input-div" style="margin-top: 20px">
        <el-input
          v-model="loginInput.pwdValue"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          @input="pwdChangeHandle($event)"
          show-password
        ></el-input>
      </div>

      <!--忘记密码-->
      <div class="forget-button-div">
        <label @click="forgetPwdFunc">忘记密码</label>
      </div>

      <!-- 图片验证码 -->
      <div class="el-input-div" style="margin-top: 20px">
        <!-- 输入框 -->
        <div class="imgCode-input">
          <el-input
            v-model="loginInput.codeInputValue"
            placeholder="请输入验证码"
            :prefix-icon="Check"
            @input="codeChangeHandle($event)"
          ></el-input>
        </div>

        <!-- 图形 -->
        <div class="imgCode-imageValidate-div" @click="refreshCode">
          <imageValidate
            :contentWidth="100"
            :contentHeight="40"
            :identifyCode="identifyCode"
          ></imageValidate>
        </div>
      </div>

      <!--登录按钮-->
      <div class="login-button-div">
        <el-button class="login-button" type="primary" @click="loginActionFunc"
          >登 录
        </el-button>
      </div>

      <!-- 注册按钮-->
      <div>
        <button class="lmd-register-button" @click="registerActionFunc">
          注 册
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Avatar, Lock, Check } from "@element-plus/icons-vue";
import imageValidate from "@/components/ssj-image-validate.vue"; //图形验证码组件
import { getRegisterCode, loginWithUNameAndPwd } from "@/api/api";
import { getCurrentInstance, ref } from "vue";
import router from "../../router";
import { ssjAlert } from "@/components/servicedialog/ssj-dialog";
import Tip from "@/components/servicedialog/ssj-dialog-child.vue";
import UpdatePasswordView from "@/views/login/UpdatePasswordView.vue";

// 定义一个对象，用来存放输入的账号、密码、验证码
let loginInput = {
  nameValue: "",
  pwdValue: "",
  codeInputValue: "",
};

// 图形验证码
let identifyCodes = "1234567890abcdefghijklmnopqrstuvwxyz"; //随机数-数据源
let identifyCode = ref("3212"); //当前随机数，初始值为3212，identifyCode用于存放随机数值
//获取上下文
const proxy = getCurrentInstance().appContext;

/**
 * 登录事件
 *
 * 作者: 小青龙
 * 时间：2022/11/17 17:17:53
 * @return {void}
 */
function loginActionFunc() {
  // proxy.config.globalProperties.$loginState = true; //修改全局变量-登录状态
  // let n = "汤姆森.金";
  // router.push(`/layoutView?title=${n}`); //跳转布局页
  // return;

  // const  e = ref(uName)
  // console.log("点击了按钮:"+e.value)
  // //     let  uName = ref(null)
  // console.log("账号:"+nameValue)
  // console.log("密码:"+pwdValue.valueOf())

  // eslint-disable-next-line no-unreachable
  console.log("输入的验证码:" + loginInput.codeInputValue);

  if (loginInput.codeInputValue.toString() === identifyCode.value.toString()) {
    //开始请求
    loginWithUNameAndPwd({
      username: loginInput.nameValue,
      password: loginInput.pwdValue,
    })
      .then((res) => {
        console.log("请求结束了\\n");
        console.log(res);
        if (res["code"] && res["code"] === "0") {
          // 登录成功
          alert("登录成功，即将跳转首页");
          // json字符串 -> map
          let userJson = JSON.parse(res["body"]);
          // 取出用户名
          let nickName = userJson["nickName"]; //"汤姆森.金";
          console.log("打印nickName~~~");
          console.log(userJson["nickName"]);
          console.log("打印userId~~~");
          console.log(userJson["userId"]);
          if (nickName.length == 0) {
            nickName = "未设置昵称";
          }
          router.push(`/layoutView?title=${nickName}`); //跳转布局页
        } else if (res["code"] && res["code"] === "-1") {
          // 登录失败
          alert("登录失败：" + res["desc"]);
        }
      })
      .catch((err) => {
        if (err.message.includes("code 500")) {
          alert("500错误，请联系管理员");
        } else {
          alert("其它错误：" + err.message);
        }
      });
    // eslint-disable-next-line no-unreachable
  } else {
    alert(
      "您输入的验证码不对：" +
        loginInput.codeInputValue +
        "\t 应该是:" +
        identifyCode.value
    );
  }
}

/**
 * 忘记密码事件
 *
 * 作者: 小青龙
 * 时间：2022/11/17 17:17:20
 * @return {void}
 */
const forgetPwdFunc = () => {
  let vars = {
    component: UpdatePasswordView,
    params: { phone: loginInput.nameValue },
  };
  ssjAlert(vars).then((msg) => {
    if (msg.length == 0) {
      //点击了"取消"
      return;
    } else {
      console.log("msg----:");
      console.log(msg);
      console.log(`验证码----${msg.codeValue} 密码----${msg.pwdValue}`);
    }
  });
  // vFormRef.value.getFormData().then((formData) => {
  //   if (formData["input90602"] !== formData["input34654"]) {
  //     alert("两次密码不一致");
  //     return;
  //   }
  //   // 第一步、获取注册验证码
  //   getRegisterCode({ username: formData["input18546"] })
  //     .then((res) => {
  //       console.log("获取注册验证码 - 请求结束了\\n");
  //       console.log(res);
  //       if (res["code"] && (res["code"] === 1 || res["code"] === "1")) {
  //         // 第二步、弹窗提示用户输入注册验证码
  //         let vars = {
  //           title: "验证码已发送",
  //           subTitle: "请输入验证码",
  //         };
  //         ssjTip(vars).then((msg) => {
  //           if (msg.length == 0) {
  //             //点击了"取消"
  //             return;
  //           }
  //           console.log("ssjTip.then打印吧-----" + msg);
  //           // Form Validation OK
  //           alert("表单数据已经获取：" + JSON.stringify(formData));
  //           console.log("手机号：" + typeof formData["input18546"]);
  //           // console.log("手机号：" + JSON.stringify(formData["input18546"]));
  //           // console.log("密码：" + JSON.stringify(formData["input90602"]));
  //           // console.log("确认密码：" + JSON.stringify(formData["input34654"]));
  //           // validatorPhone(formData["input18546"]).then((value) => {
  //           //   if (value) {
  //           //     console.log("手机号校验通过   " + value);
  //           //   } else {
  //           //     console.log("手机号校验失败   " + value);
  //           //   }
  //           // });
  //           // params是post请求form表单参数
  //           let params = {
  //             code: msg,
  //             username: formData["input18546"],
  //             pwd: formData["input90602"],
  //             confirmPwd: formData["input34654"],
  //             sex: formData["radio74205"],
  //             birthday: formData["date54020"],
  //           };
  //           console.log("打印注册参数:", params);
  //           // 第三步、开始注册 (code：0表示成功；-1表示失败)
  //           doRegister(params)
  //             .then((res) => {
  //               console.log("注册请求结束了\\n");
  //               console.log(res);
  //               if (res["code"] && (res["code"] === 0 || res["code"] === "0")) {
  //                 alert("注册成功");
  //                 history.go(-1); //返回 =》登录页
  //               } else {
  //                 alert("注册失败，" + res["desc"]);
  //               }
  //             })
  //             .catch((err) => {
  //               // console.log("请求错误信息："+ err
  //               if (err.message.includes("code 500")) {
  //                 alert("500错误，请联系管理员");
  //               } else {
  //                 alert("其它错误：" + err.message);
  //               }
  //             });
  //
  //           // let n = "Tom";
  //           // router.push(`/layoutView?title=${n}`);
  //         });
  //         // eslint-disable-next-line no-dupe-else-if
  //       } else if (res["code"] && res["code"] === "-1") {
  //         alert("该手机号已经注册");
  //         console.log("该手机号已经注册！");
  //       } else {
  //         alert("验证码发送失败");
  //         console.log("验证码发送失败！");
  //       }
  //     })
  //     .catch((err) => {
  //       // console.log("请求错误信息："+ err
  //       if (err.message.includes("code 500")) {
  //         alert("500错误，请联系管理员");
  //       } else {
  //         alert("其它错误：" + err.message);
  //       }
  //     });
  // });
};

/**
 * 注册事件
 *
 * 作者: 小青龙
 * 时间：2022/11/17 17:18:23
 * @param 参数名 {参数类型}  描述信息
 * @return {返回类型}
 */
function registerActionFunc() {
  router.push("registerView");
  return;

  // eslint-disable-next-line no-unreachable
  getRegisterCode({ username: "13396551780" })
    .then((res) => {
      console.log("请求结束了\\n");
      console.log(res);
    })
    .catch((err) => {
      // console.log("请求错误信息："+ err
      if (err.message.includes("code 500")) {
        alert("500错误，请联系管理员");
      } else {
        alert("其它错误：" + err.message);
      }
    });
}

//定义在方法外面，才有效
const currentInstance = getCurrentInstance();

//账号-内容变化
function changeHandle(e) {
  // input事件
  // console.log("changeHandle1:"+ document.getElementById('inputUname').value)
  console.log("changeHandle->nameValue:" + loginInput.nameValue + "\t e:" + e);
  currentInstance.proxy.$forceUpdate();
  loginInput.nameValue = e;
}

//密码-内容变化
function pwdChangeHandle(e) {
  // input事件
  // console.log("changeHandle1:"+ document.getElementById('inputUname').value)
  console.log("pwdChangeHandle->pwdValue:" + loginInput.pwdValue + "\t e:" + e);
  currentInstance.proxy.$forceUpdate();
  loginInput.pwdValue = e;
}

//验证码-内容变化
function codeChangeHandle(e) {
  console.log(
    "codeChangeHandle->pwdValue:" + loginInput.codeInputValue + "\t e:" + e
  );
  currentInstance.proxy.$forceUpdate();
  loginInput.codeInputValue = e;
}

//点击事件 - 刷新验证码
const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
};
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)];
  }
  console.log("刷新后验证码是:" + identifyCode.value);
};
</script>

<style>
/* 背景div */
#background-div {
  background-color: bisque;
  width: 100%;
  height: 100%;
  position: absolute;
}

/* 背景图片 */
#background-div img {
  width: 100%;
  height: 100%;
}

/* 登录模块 */
#login-module-div {
  /*! autoprefixer: ignore next */
  background: -webkit-gradient(
    linear,
    100% 0,
    0 0,
    from(rgb(58 96 199)),
    to(rgb(57 63 187))
  );

  width: 35%;
  height: 540px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px; /*设置四分之一圆角*/
  border: 0 solid rgb(255, 255, 255); /* border-radius要配合这句使用，否则输入框会出现内阴影*/
}

/* 主标题 */
#login-module-div .lmd-title {
  color: rgba(255, 255, 255, 0.9);
  padding: 0;
  margin: 40px 0 0 0;
}

/* 副标题 */
#login-module-div .lmd-subtitle {
  color: rgba(255, 255, 255, 0.9);
  padding: 0;
  margin: 30px 0 0 0;
}

/*账号、密码div公共样式设置：*/
.el-input-div {
  width: 100%;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
}

/*忘记密码*/
.forget-button-div {
  width: 100%;
  height: 20px;
  padding: 5px 20px 0 20px;
  box-sizing: border-box;
}
.forget-button-div label {
  float: right;
  color: #dcdcdc; /*忘记密码 - 文字颜色*/
  font-size: 14px;
}

/*el-input内部实际上也用到了input组件，所以这里的设置，对账号和密码这两个el-input也有效果*/
#login-module-div input {
  height: 40px;
  border-radius: 10px; /*设置四分之一圆角*/
  border: 0 solid rgb(255, 255, 255); /* border-radius要配合这句使用，否则输入框会出现内阴影*/
}

/*图片验证码 - 输入框样式*/
#login-module-div .imgCode-input {
  width: calc(100% - 110px);
  vertical-align: middle;
  float: left;
}

/*图片验证码 - 图片样式*/
.imgCode-imageValidate-div {
  float: right;
}

/* 登录按钮 */
#login-module-div .login-button-div {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}

#login-module-div .login-button-div .login-button {
  margin-top: 48px;
  width: 45%;
  height: 47px;
}

/* 注册按钮 */
#login-module-div .lmd-register-button {
  margin-top: 27px;
  /*按钮设置透明：background-color + border-width */
  background-color: rgba(0, 0, 0, 0);
  border-width: 0;
  color: rgba(57 157 189);
  font-weight: bold;
  font-size: 14px;
}
</style>
