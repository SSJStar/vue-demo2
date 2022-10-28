<template>
  <div id="main" style="width: 600px; height: 400px">
    <SSJHistogramView
      ref="doubleHistogram"
      :config="histogram_config"
    ></SSJHistogramView>
  </div>
</template>

<script setup>
// import声明
import { ref, onMounted } from "vue";
import transformSheets from "./read_xlsx";
import SSJHistogramView from "@/components/chats/SSJHistogramView";
import SSJEchatConfig from "@/components/chats/ssjChatClass";

// 拿到SSJHistogramView组件实例
const doubleHistogram = ref(null);

// 定义一些变量
let xAxis_data_value = ref(["正在初始化数据"]); //x轴数据  数据加载中，请等待
let yAxis_data_left_value = ref([0]); //y轴数据 - 左边
let yAxis_data_right_value = ref([0]); //y轴数据 - 右边
let legend_left_value = ref("身高"); //图例 - 左
let legend_right_value = ref("体重"); //图例 - 右

// 定义配置数据，用于页面初始化SSJHistogramView传参数、updateChat刷新传参数
let conf = new SSJEchatConfig(
  "数据加载中",
  xAxis_data_value.value,
  [yAxis_data_left_value.value, yAxis_data_right_value.value],
  [legend_left_value.value, legend_right_value.value],
  ["ml", "斤"]
);
let histogram_config = ref(conf);

//页面加载完执行
onMounted(() => {
  //readXlsxFile执行完，再执行then语句块
  Promise.all([readXlsxFile()]).then(() => {
    console.log("xmsl数据读取完成，开始刷新图标");
    // 配置图表信息和展示数据，并调用updateChatCustom刷新图表
    conf = new SSJEchatConfig(
      "高中二班女子身高体重",
      xAxis_data_value.value,
      [yAxis_data_left_value.value, yAxis_data_right_value.value],
      [legend_left_value.value, legend_right_value.value],
      ["ml", "斤"]
    );
    doubleHistogram.value.updateChat(conf);
  });
});

// 读取xlsx文件
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require("xlsx");

function readXlsxFile() {
  //模拟延迟加载 （setTimeout）
  // setTimeout(function (){

  return new Promise((resolve, reject) => {
    console.log("开始读取数据");
    let url = "/高中二班女子800米成绩统计.xlsx"; //放在public目录下可以直接访问
    //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
    // eslint-disable-next-line no-undef
    axios
      .get(url, { responseType: "arraybuffer" })
      .then((res) => {
        let data = new Uint8Array(res.data);
        let wb = XLSX.read(data, { type: "array" });
        let sheets = wb.Sheets;
        let content = transformSheets(sheets); // 整理xlsx返回的数据
        console.log("content:");
        console.log(content); //content内容是从表格，逐行读取
        let list = [];
        let arr = content.slice(1);
        let xAxis_data_array = [];
        let yAxis_data_h = []; //身高
        let yAxis_data_w = []; //体重
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          arr[i].forEach((item, index) => {
            obj["data" + (index + 1)] = item;
            if (index + 1 == 9) {
              obj["data" + (index + 1)] = formatExcelDate(item);
            }
            //第0行是标题 不需要遍历
            if (i > 0) {
              if (index == 0) {
                xAxis_data_array.push(item);
              }
              if (index == 1) {
                yAxis_data_h.push(item);
              }
              if (index == 2) {
                yAxis_data_w.push(item);
              }
            }
          });
          list.push(obj);
        }

        xAxis_data_value.value = xAxis_data_array; //x轴数据
        yAxis_data_left_value.value = yAxis_data_h; //y轴数据 - 左边
        yAxis_data_right_value.value = yAxis_data_w; //y轴数据 - 右边

        console.log("readXlsxFile执行完了");
        // console.log("开始二次渲染")
        resolve();
      })
      .catch((err) => {
        console.log("err is:" + err);

        reject();
      });
    // },2000)
  });
}

// 处理表格中的日期时间
function formatExcelDate(numb, format = "-") {
  // 如果numb为空则返回空字符串
  if (!numb) {
    return "";
  }
  let time = new Date(
    new Date("1900-1-1").getTime() + (numb - 1) * 3600 * 24 * 1000
  );
  const year = time.getFullYear() + "";
  const month = time.getMonth() + 1 + "";
  const date = time.getDate();
  if (format && format.length === 1) {
    return (
      year +
      format +
      (month < 10 ? "0" + month : month) +
      format +
      (date < 10 ? "0" + date : date)
    );
  }
  return (
    year + (month < 10 ? "0" + month : month) + (date < 10 ? "0" + date : date)
  );
}
</script>
