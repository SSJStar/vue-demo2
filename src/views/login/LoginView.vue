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

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      //这里一定要记得返回v-model中绑定的值！-->
<!--      nameValue: '',-->
<!--      pwdValue:'',-->
<!--      codeInputValue:'',-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<script setup>
import { Avatar, Lock, Check } from "@element-plus/icons-vue";
import imageValidate from "@/components/ssj-image-validate.vue";
import { getRegisterCode, loginWithUNameAndPwd } from "@/api/api";
import { getCurrentInstance, onMounted, ref } from "vue";
import router from "../../router";

// 定义一个对象，用来存放输入的账号、密码、验证码
let loginInput = {
  nameValue: "",
  pwdValue: "",
  codeInputValue: "",
};

// eslint-disable-next-line no-undef
const emit = defineEmits(["closePage"]);

// 图形验证码
let identifyCodes = "1234567890abcdefghijklmnopqrstuvwxyz"; //随机数-数据源
let identifyCode = ref("3212"); //当前随机数，初始值为3212

// let codeInputRef = ref(null)

const proxy = getCurrentInstance().appContext;

//登录按钮 - 点击
function loginActionFunc() {
  proxy.config.globalProperties.$loginState = true;

  // router.replace("/home")
  //告诉调用者，可以关闭当前页面来
  // emit("closePage");
  router.push("/layoutView"); //跳转布局页
  return;
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
    }),
      ((res) => {
        console.log("请求结束了\\n");
        console.log(res);
        alert("登录成功，即将跳转首页");
        router.push("/home");
      }).catch((err) => {
        // console.log("请求错误信息："+ err.message)
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

//注册按钮-点击
function registerActionFunc() {
  return;

  // eslint-disable-next-line no-unreachable
  alert("注册模块，还没开始写");

  getRegisterCode({ username: loginInput.nameValue })
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

// return {
//   codeInput,
//   childRef,//记得要返回子组件的ref，不然访问不到
// };

onMounted(() => {
  console.log("onMounted---codeInputRef---", loginInput.codeInputValue.value);
});
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

/*>>> .el-input__inner{*/
/*  width: 190px;*/
/*  height: 500px;*/
/*}*/

/*#inputPwd{*/
/*  !*margin-top: 20px;*!*/
/*  !*width: 200px;*!*/
/*}*/

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
  /*transform: translate(-50%,-50%)*/
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

<!--<template>-->
<!--  <div id="test">-->
<!--    <SSJButton title="测试一下" @btnClick="doSome" />-->
<!--  </div>-->

<!--</template>-->
<!--<script>-->
<!--import SSJButton from "../components/SSJButton";-->
<!--export default {-->
<!--  components: {SSJButton},-->
<!--  methods: {-->
<!--    doSome(val){-->
<!--      alert("父组件打印："+val)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--&lt;!&ndash;    <p>&ndash;&gt;-->
<!--&lt;!&ndash;      <router-link to="home">进入首页</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;    </p>&ndash;&gt;-->

<!--&lt;!&ndash;    <el-row>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-button type="primary">主要num按钮</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-row>&ndash;&gt;-->

<!--&lt;!&ndash;    <SSJButton title="自定义按钮" @btnClick="customBtnAction"></SSJButton>&ndash;&gt;-->

<!--图形验证码-->
<!--        <div style="width: 120px;height: 40px;display: inline-block;position: relative;">-->
<!--          <img src="@/assets/keji_bg.png" @click="imgValidateFunc($event)" style="width: calc(100% - 20px);height:100%;position: relative;left: 10px"/>-->
<!--          <label style="color: rgba(255, 255, 255, 0.9) ;left: 42%;top: 30%;position:absolute;">A F C</label>-->
<!--        </div>-->

<!--function imgValidateFunc(e){-->
<!--//切换验证码图片-->
<!--console.log("切换验证码图片");-->
<!--}-->
