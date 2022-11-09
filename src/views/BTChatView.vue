<template>
  <div id="main" style="width: 600px; height: 400px">
    <SSJHistogramView
      ref="doubleHistogramRef"
      :config="histogram_config"
    ></SSJHistogramView>
  </div>
</template>

<script setup>
// import声明
import { ref } from "vue";
import transformSheets from "./read_xlsx";
import SSJHistogramView from "@/components/chats/SSJHistogramView.vue";
import SSJEchatConfig from "@/components/chats/ssjChatClass";
// import axios from "axios";

// 拿到SSJHistogramView组件实例
// const doubleHistogramRef = ref <InstanceType<typeof SSJHistogramView>> ();
const doubleHistogramRef = ref(null);

// 定义一些变量
let xAxis_data_value = ref(["正在初始化数据"]); //x轴数据  数据加载中，请等待
let yAxis_data_left_value = ref([0]); //y轴数据 - 左边
let yAxis_data_right_value = ref([0]); //y轴数据 - 右边

// 定义配置数据，用于页面初始化SSJHistogramView传参数、updateChat刷新传参数
let conf = new SSJEchatConfig(
  "数据加载中",
  xAxis_data_value.value,
  [yAxis_data_left_value.value, yAxis_data_right_value.value],
  props.yFieldNames,
  ["ml", "斤"]
);
let histogram_config = ref(conf);

/** 定义属性 */
const props = defineProps({
  xFieldName: { type: String }, //x轴 xAxis_value
  yFieldNames: { type: Array }, //y轴 yAxisArray_value
  yFieldUnits: { type: Array }, //y轴单位 yAxisArray_value
});

// 读取xlsx文件
const XLSX = require("xlsx");
/**
 * 根据data参数生成柱状图（此由外部调用）
 *
 * 作者: 小青龙
 * 时间：2022/11/08 16:49:44
 * @param 参数名 {参数类型}  描述信息
 * @return {返回类型}
 */
function showUIFromData(data) {
  //模拟延迟加载 （setTimeout）
  setTimeout(function () {
    let wb = XLSX.read(data, { type: "array" });
    let sheets = wb.Sheets;
    let content = transformSheets(sheets); // 整理xlsx返回的数据
    console.log("props.xFieldName:");
    console.log(props.xFieldName);
    console.log("content:");
    console.log(content); //content内容是从表格，逐行读取
    let list = [];
    let arr = content.slice(1);
    let xAxis_data_array = [];
    let yAxis_data_one = []; //身高
    let yAxis_data_two = []; //体重
    let yAxis_data_three = []; //体重

    // 比如xFieldName值为"姓名"，"姓名"在整个xslx表格里处于第2列，那么xFieldName_index就等于2
    // yFieldName_index有些特殊，因为它展示左右两条数据（比如身高和体重），所以这是一个数组序号，比如[2,3]
    let xFieldName_index = -1; //通过xFieldName属性，找到对应的那一列序号
    let yFieldName_indexs = []; //通过yFieldName属性，找到对应的那一列序号

    // console.log("props.xFieldNames:");
    // console.log(props.xFieldNames);
    // console.log("props.yFieldNames:");
    // console.log(props.yFieldNames);
    // console.log("props.yFieldUnits:");
    // console.log(props.yFieldUnits);
    //
    // console.log("props.yFieldUnits.length:");
    // console.log(props.yFieldUnits.length);
    // console.log("props.yFieldNames.length:");
    // console.log(props.yFieldNames.length);

    //自动补全 - 缺少的单位
    //比如y轴需要显示三条数据，单位只给了2个，那么就自动追加第3个单位（补全的单位与前面一个单位相同）
    if (props.yFieldUnits.length < props.yFieldNames.length) {
      let count = props.yFieldNames.length - props.yFieldUnits.length;
      let arr = props.yFieldUnits;
      for (let i = 0; i < count; i++) {
        console.log("1111props.yFieldUnits:");
        console.log(props.yFieldUnits[props.yFieldUnits.length - 1]);
        arr.push(props.yFieldUnits[props.yFieldUnits.length - 1]);
      }
      // eslint-disable-next-line vue/no-mutating-props
      props.yFieldUnits.value = arr;
    }

    // console.log("arr:");
    // console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      let obj = {};
      arr[i].forEach((item, index) => {
        //i代表第几行，index代表第几列，item就是"i行，index列"对应的数据
        obj["data" + (index + 1)] = item;
        if (index + 1 == 9) {
          obj["data" + (index + 1)] = formatExcelDate(item);
        }
        //逐行遍历，i表示第几行，index表示第几列
        //第0行是标题 不需要遍历

        // xAxis_data_array存放的是x轴展示的数据，xFieldName存放的是要展示的字段名，
        // 我们需要通过xFieldName找到是哪一列数据（也就是哪个index）

        // i=0表示第一行，这一行数据展示的所有列的字段名
        if (i == 0) {
          //此处的item就是第0行，第index列对应的字段名，我们需要进行匹配，并且找到最终需要赋值给xAxis_data_array的那一列序号
          if (item.toString() === props.xFieldName.toString()) {
            //找到了，此时的index就是我们要传给X轴的那一列数据的列.序号
            xFieldName_index = index;
            console.log(
              `xFieldName_index找到了 ${index} ${item} ${props.xFieldName}`
            );
          }
          // yFieldNames数据模版 ["身高","体重"]
          props.yFieldNames.forEach((yFieldName, indexa) => {
            // indexa表示yFieldNames的index索引下标，yFieldName表示indexa下标对应的value值
            if (item.toString() === yFieldName) {
              //找到了，此时的index就是我们要传给X轴的那一列数据的列.序号
              yFieldName_indexs.push(index);
              console.log(
                `yFieldName_indexs找到了 ${index} ${item} ${yFieldName}`
              );
            }
          });
        }

        if (i > 0) {
          if (index == xFieldName_index) {
            xAxis_data_array.push(item);
          }

          // yFieldName_indexs数据模版 [2,3]
          yFieldName_indexs.forEach(
            (yFieldName_index, yFieldName_indexs_index) => {
              if (yFieldName_indexs_index === 0 && index === yFieldName_index) {
                //index表示外层循环的索引，即第几列
                //将数据塞入第1个y数组
                yAxis_data_one.push(item);
              }
              if (yFieldName_indexs_index === 1 && index === yFieldName_index) {
                ////将数据塞入第2个y数组
                yAxis_data_two.push(item);
              }
              if (yFieldName_indexs_index === 2 && index === yFieldName_index) {
                ////将数据塞入第3个y数组
                yAxis_data_three.push(item);
              }
            }
          );
        }
      });
      list.push(obj);
    }

    xAxis_data_value.value = xAxis_data_array; //x轴数据
    yAxis_data_left_value.value = yAxis_data_one; //y轴数据 - 左边
    yAxis_data_right_value.value = yAxis_data_two; //y轴数据 - 右边

    // console.log("readXlsxFile执行完了");
    // console.log("xmsl数据读取完成，开始刷新图标");
    // console.log(xAxis_data_array);
    // console.log(yAxis_data_one);
    // console.log(yAxis_data_two);
    // console.log(yAxis_data_three);
    // console.log(JSON.parse(JSON.stringify(props.yFieldUnits)));
    // 配置图表信息和展示数据，并调用updateChatCustom刷新图表
    conf = new SSJEchatConfig(
      "高中二班女子身高体重",
      xAxis_data_value.value,
      [yAxis_data_one, yAxis_data_two, yAxis_data_three],
      props.yFieldNames,
      props.yFieldUnits //["ml", "斤", "斤"]
    );
    // 更新图标
    doubleHistogramRef.value.updateChat(conf);
  }, 1);
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

//对外抛出方法，用于接收数据并刷新UI
defineExpose({ showUIFromData });
</script>
