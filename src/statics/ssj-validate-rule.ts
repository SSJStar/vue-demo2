// const validateInouts = {
//   //定义属性
//   title: "this is global title",
//   LEFTMENU_FOLDONW: "200px", //菜单栏-展开-宽度
//   LEFTMENU_FOLDOFFW: "64px", //菜单栏-收起-宽度
//   BASE_URL: "http://vue.wclimb.site/images/",
//   SOCKET_DOMAIN: "https://xx.xx.com/filesystem/upload/",
//   BACKGROUNBD_COLOR: "#545c64",
//   //定义方法
//   run() {
//     console.log("Are you ok? I'm fine,thank you.");
//   },
// };
//
// export default validateInouts;

// 校验密码规则
export const verifyPassword = (value: any) => {
  const regs = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z]).{6,20}$/;
  if (!regs.test(value)) {
    return true;
  }
  return false;
};

export const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback();
  }
  if (verifyPassword(value)) {
    return callback("密码必须包含大小写字母、数字或特殊字符，长度为6-20位");
  }
  return callback();
};

// 验证手机号
export const validatorPhone = (value: any) => {
  const regPhone = /^1[3-9]\d{9}$/;
  // 验证座机号码
  const regLandline = /^\d{7,8}$/;

  if (!value || regPhone.test(value) || regLandline.test(value)) {
    return Promise.resolve(true);
  }
  // return Promise.reject(new Error("请填写正确的联系号码"));
  //如果不想抛出错误，我们可以统一resolve返回，参数不同 -》即代表校验结果的不同
  return Promise.resolve(false);
};
// 验证生日
export const validatorBirth = (_: any, value: any) => {
  const regBirth = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
  if (!value || regBirth.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("请填写正确的出生日期"));
};
