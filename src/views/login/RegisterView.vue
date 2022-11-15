<template>
  <div style="padding: 0px 20%">
    <h1>注 册</h1>
    <v-form-render
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      ref="vFormRef"
    >
    </v-form-render>
    <el-button type="primary" @click="submitForm">提 交</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
// import { validatorPhone } from "@/statics/ssj-validate-rule"; //校验输入类型
import { ElMessage } from "element-plus";
import router from "@/router";
import ssjTip from "@/components/servicedialog/ssj-dialog";
import { doRegister, getRegisterCode } from "@/api/api";
// import { zhCn } from "element-plus/es/locale"; //引入element-plus中文样式(针对日历)
// let localeValue = zhCn;
// :locale="localeValue"

const formJson = reactive({
  widgetList: [
    {
      key: 57304,
      type: "input",
      icon: "text-field",
      formItemFlag: true,
      options: {
        name: "input18546",
        label: "手机账号",
        labelAlign: "label-right-align",
        type: "text",
        defaultValue: "",
        placeholder: "",
        columnWidth: "200px",
        size: "",
        labelWidth: null,
        labelHidden: false,
        readonly: false,
        disabled: false,
        hidden: false,
        clearable: true,
        showPassword: false,
        required: true,
        requiredHint: "请输入手机号",
        validation: "mobilePhone",
        validationHint: "请输入正确的手机号码",
        customClass: [],
        labelIconClass: null,
        labelIconPosition: "rear",
        labelTooltip: null,
        minLength: null,
        maxLength: null,
        showWordLimit: false,
        prefixIcon: "",
        suffixIcon: "",
        appendButton: false,
        appendButtonDisabled: false,
        buttonIcon: "custom-search",
        onCreated: "",
        onMounted: "",
        onInput: "",
        onChange: "",
        onFocus: "",
        onBlur: "",
        onValidate: "",
      },
      id: "input18546",
    },
    {
      key: 57304,
      type: "input",
      icon: "text-field",
      formItemFlag: true,
      options: {
        name: "input90602",
        label: "账号密码",
        labelAlign: "",
        type: "password",
        defaultValue: "",
        placeholder: "",
        columnWidth: "200px",
        size: "",
        labelWidth: null,
        labelHidden: false,
        readonly: false,
        disabled: false,
        hidden: false,
        clearable: true,
        showPassword: false,
        required: true,
        requiredHint: "请输入密码",
        validation: "",
        validationHint: "",
        customClass: [],
        labelIconClass: null,
        labelIconPosition: "rear",
        labelTooltip: null,
        minLength: null,
        maxLength: null,
        showWordLimit: false,
        prefixIcon: "",
        suffixIcon: "",
        appendButton: false,
        appendButtonDisabled: false,
        buttonIcon: "custom-search",
        onCreated: "",
        onMounted: "",
        onInput: "",
        onChange: "",
        onFocus: "",
        onBlur: "",
        onValidate: "",
      },
      id: "input90602",
    },
    {
      key: 57304,
      type: "input",
      icon: "text-field",
      formItemFlag: true,
      options: {
        name: "input34654",
        label: "确认密码",
        labelAlign: "",
        type: "password",
        defaultValue: "",
        placeholder: "",
        columnWidth: "200px",
        size: "",
        labelWidth: null,
        labelHidden: false,
        readonly: false,
        disabled: false,
        hidden: false,
        clearable: true,
        showPassword: false,
        required: true,
        requiredHint: "再次输入密码",
        validation: "",
        validationHint: "",
        customClass: "",
        labelIconClass: null,
        labelIconPosition: "rear",
        labelTooltip: null,
        minLength: null,
        maxLength: null,
        showWordLimit: false,
        prefixIcon: "",
        suffixIcon: "",
        appendButton: false,
        appendButtonDisabled: false,
        buttonIcon: "custom-search",
        onCreated: "",
        onMounted: "",
        onInput: "",
        onChange: "",
        onFocus: "",
        onBlur: "",
        onValidate: "",
      },
      id: "input34654",
    },
    {
      key: 24888,
      type: "divider",
      icon: "divider",
      formItemFlag: false,
      options: {
        name: "divider97249",
        label: "",
        columnWidth: "200px",
        direction: "horizontal",
        contentPosition: "left",
        hidden: false,
        customClass: [],
        onCreated: "",
        onMounted: "",
      },
      id: "divider97249",
    },
    {
      key: 33591,
      type: "radio",
      icon: "radio-field",
      formItemFlag: true,
      options: {
        name: "radio74205",
        label: "选择性别",
        labelAlign: "label-right-align",
        defaultValue: "",
        columnWidth: "200px",
        size: "",
        displayStyle: "inline",
        buttonStyle: false,
        border: false,
        labelWidth: null,
        labelHidden: false,
        disabled: false,
        hidden: false,
        optionItems: [
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ],
        required: false,
        requiredHint: "",
        validation: "",
        validationHint: "",
        customClass: [],
        labelIconClass: null,
        labelIconPosition: "rear",
        labelTooltip: null,
        onCreated: "",
        onMounted: "",
        onChange: "",
        onValidate: "",
      },
      id: "radio74205",
    },
    {
      key: 66618,
      type: "date",
      icon: "date-field",
      formItemFlag: true,
      options: {
        name: "date54020",
        label: "出生日期",
        labelAlign: "",
        type: "date",
        defaultValue: null,
        placeholder: "",
        columnWidth: "200px",
        size: "",
        autoFullWidth: true,
        labelWidth: null,
        labelHidden: false,
        readonly: false,
        disabled: false,
        hidden: false,
        clearable: true,
        editable: false,
        format: "YYYY-MM-DD",
        valueFormat: "YYYY-MM-DD",
        required: false,
        requiredHint: "",
        validation: "",
        validationHint: "",
        customClass: "",
        labelIconClass: null,
        labelIconPosition: "rear",
        labelTooltip: null,
        onCreated: "",
        onMounted: "",
        onChange: "",
        onFocus: "",
        onBlur: "",
        onValidate: "",
      },
      id: "date54020",
    },
  ],
  formConfig: {
    modelName: "formData",
    refName: "vForm",
    rulesName: "rules",
    labelWidth: 150,
    labelPosition: "left",
    size: "large",
    labelAlign: "label-right-align",
    cssCode: "",
    customClass: [],
    functions: "",
    layoutType: "PC",
    jsonVersion: 3,
    onFormCreated: "",
    onFormMounted: "",
    onFormDataChange: "",
  },
});
const formData = reactive({});
const optionData = reactive({});
const vFormRef = ref(null);

// console.log(staticVars.LEFTMENU_FOLDONW);
const submitForm = () => {
  // 第一步、获取注册验证码
  getRegisterCode({ username: "13396551780" })
    .then((res) => {
      console.log("获取注册验证码请求结束了\\n");
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

  // 第二步、弹窗提示用户输入注册验证码
  let vars = {
    title: "验证码",
    subTitle: "请输入验证码",
  };
  ssjTip(vars).then((msg) => {
    console.log("ssjTip.then打印吧-----" + msg);
    vFormRef.value
      .getFormData()
      .then((formData) => {
        // Form Validation OK
        alert("表单数据已经获取：" + JSON.stringify(formData));

        // console.log("手机号：" + JSON.stringify(formData["input18546"]));
        // console.log("密码：" + JSON.stringify(formData["input90602"]));
        // console.log("确认密码：" + JSON.stringify(formData["input34654"]));
        // validatorPhone(formData["input18546"]).then((value) => {
        //   if (value) {
        //     console.log("手机号校验通过   " + value);
        //   } else {
        //     console.log("手机号校验失败   " + value);
        //   }
        // });
        let params = {
          code: msg,
          username: JSON.stringify(formData["input18546"]),
        };

        doRegister(params)
          .then((res) => {
            console.log("注册请求结束了\\n");
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

        // let n = "Tom";
        // router.push(`/layoutView?title=${n}`);
      })
      .catch((error) => {
        // Form Validation failed
        ElMessage.error(error);
      });
  });
  return;

  // vFormRef.value
  //   .getFormData()
  //   .then((formData) => {
  //     // Form Validation OK
  //     alert("表单数据已经获取：" + JSON.stringify(formData));
  //
  //     // console.log("手机号：" + JSON.stringify(formData["input18546"]));
  //     // console.log("密码：" + JSON.stringify(formData["input90602"]));
  //     // console.log("确认密码：" + JSON.stringify(formData["input34654"]));
  //     // validatorPhone(formData["input18546"]).then((value) => {
  //     //   if (value) {
  //     //     console.log("手机号校验通过   " + value);
  //     //   } else {
  //     //     console.log("手机号校验失败   " + value);
  //     //   }
  //     // });
  //     let n = "Tom";
  //     router.push(`/layoutView?title=${n}`);
  //   })
  //   .catch((error) => {
  //     // Form Validation failed
  //     ElMessage.error(error);
  //   });
};
</script>
