// 静态变量
export const staticVars = {
  //定义属性
  title: "this is global title",
  LEFTMENU_FOLDONW: "200px", //菜单栏-展开-宽度
  LEFTMENU_FOLDOFFW: "64px", //菜单栏-收起-宽度
  BASE_URL: "http://vue.wclimb.site/images/",
  SOCKET_DOMAIN: "https://xx.xx.com/filesystem/upload/",
  BACKGROUNBD_COLOR: "#545c64",
  //导航栏配置
  NAVGATION_HEIGHT: "50px", //导航栏 - 高度
  NAVGATION_BGCOLOR: "#24291e", //导航栏 - 背景色
  NAVGATION_TITLEFONTSIZE: "16px", //导航栏字体 - 大小
  NAVGATION_TITLECOLOR: "#FFFFFF", //导航栏字 - 颜色
  run() {
    console.log("Are you ok? I'm fine,thank you.");
    console.log("run打印this--", this);
  },
  readFile(file) {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsBinaryString(file.raw);
      reader.onload = (ev) => {
        resolve(ev.target.result);
      };
    });
  },
};

//全局变量
export const globalObj = {
  loginState: false,
  userName: "",
  token: "",
};
// export default { staticVars, globalObj };
