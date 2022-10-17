const { defineConfig } = require("@vue/cli-service");
const ElementPlus = require("unplugin-element-plus/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ElementPlus({
        useSource: true,
      }),
    ],
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.1.1:8081", //接口域名
        changeOrigin: true, //是否跨域
        ws: true, //是否代理 websockets
        secure: true, //是否https接口
        pathRewrite: {
          //路径重置
          "^/api": "",
        },
      },
    },
  },
});
