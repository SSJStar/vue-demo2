<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts"; //  按需引入 echarts
import SSJEchatConfig from "@/components/chats/ssjChatClass"; //引入自定义类SSJEchatConfig

let myChart = null; //图表对象

const emit = defineEmits(["click"]); //声明接口

const props = defineProps({
  //暴露属性
  config: SSJEchatConfig,
});

//有点类似于iOS里的viewDidload方法
onMounted(() => {
  // 初始化myChart表
  initChart();
});

/**
 * 这个方法，会读取config的值，并再次绘制图表
 * -> 暴露给外界调用
 *
 * 作者: 小青龙
 * 时间：2022/09/16 14:06:45
 * @param config {SSJEchatConfig}  配置信息，包含横、纵坐标的数据、标题，纵坐标的单位
 * @return {返回类型}
 */
function updateChat(config) {
  console.log("updateChat~~~~~~~~");
  let yAxis_arr = []; //用于存放yAxis配置，从for循环读取的
  let series_arr = []; //用于存放series配置，从for循环读取的

  // 根据config，更新 yAxis_arr、series_arr数据
  for (let i = 0; i < config.yAxis_datas.length; i++) {
    let yAxis_json = {
      type: "value",
      name: "", //config.legend_datas[i], //这个用于在每个Y轴上方显示标题，如果不希望显示就赋值"空字符串"
      splitLine: { show: true },
      // nameLocation:"middle",
      // nameGap:170,
      axisLabel: {
        formatter: "{value} " + config.unit_datas[i], //'{value} ml'
      },
    };
    yAxis_arr.push(yAxis_json);

    //只有yAxis_datas和legend_datas个数相等，图例才会显示，否则就没必要执行if代码块
    if (config.yAxis_datas.length === config.legend_datas.length) {
      let series_json = {
        name: config.legend_datas[i],
        type: "bar",
        yAxisIndex: i,
        data: config.yAxis_datas[i],
      };
      series_arr.push(series_json);
    }
  }

  // 指定图表的配置项和数据
  // tooltip作用：鼠标移动到上面会显示对应的数据信息
  let option = {
    title: {
      text: config.valueOf().title, //'高中二班女子身高体重'
      position: "middle",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    legend: {
      data: config.valueOf().legend_datas, //图例
    },
    xAxis: {
      data: config.valueOf().xAxis_data, //x_data,//props.xAxis_data,
      // axisLine:{
      //   symbol:"arrow",
      //   lineStyle:{
      //     type:"dash" //箭头
      //   }
      // }
    },

    yAxis: yAxis_arr,
    series: series_arr,
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

/**
 * 图表初始化方法
 *
 *  （包含->点击事件的实现）
 * 作者: 小青龙
 * 时间：2022/09/16 15:40:44
 */
function initChart() {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(document.getElementById("main"));

  // 指定图表的配置项和数据,并显示图表。
  let conf = new SSJEchatConfig(
    props.config.title,
    props.config.xAxis_data,
    props.config.yAxis_datas,
    props.config.legend_datas,
    props.config.unit_datas
  );
  updateChat(conf);

  // 点击事件
  myChart.on("click", function (params) {
    console.log("value----" + params["value"]);
    // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
  });
}

// 暴露给外界调用
defineExpose({ updateChat });
</script>

<!--<template>-->
<!--  &lt;!&ndash;  <div ref="main" style="width: 100%; height: 400px"></div>&ndash;&gt;-->
<!--  &lt;!&ndash;  <div style="background-color: cadetblue">&ndash;&gt;-->
<!--  &lt;!&ndash;&lt;!&ndash;    <h1>sssss</h1>&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;  </div>&ndash;&gt;-->
<!--</template>-->

<!-- // yAxis: [-->
<!--    //   {-->
<!--    //     type:"value",-->
<!--    //     name: config.legend_datas[0],//legend_left,//props.legend_left,-->
<!--    //     splitLine:{show:true},-->
<!--    //     // nameLocation:"middle",-->
<!--    //     // nameGap:170,-->
<!--    //     axisLabel: {-->
<!--    //       formatter: '{value} '+config.unit_datas[0]//'{value} ml'-->
<!--    //     }-->
<!--    //   },-->
<!--    //   {-->
<!--    //     type:"value",-->
<!--    //     name: config.legend_datas[1],//legend_right,//props.legend_right,-->
<!--    //     splitLine:{show:true},-->
<!--    //     // nameLocation:"right",-->
<!--    //     // nameGap:150,-->
<!--    //     axisLabel: {-->
<!--    //       formatter: '{value} '+config.unit_datas[1]//'{value} ml'-->
<!--    //     }-->
<!--    //   }-->
<!--    // ],-->

<!--    // series: [-->
<!--    //   {-->
<!--    //     name: config.legend_datas[0],//legend_left,//props.legend_left,-->
<!--    //     type: 'bar',-->
<!--    //     yAxisIndex: 0,-->
<!--    //     data: config.yAxis_datas[0],//y_data_left,//props.yAxis_data_left-->
<!--    //   },-->
<!--    //   {-->
<!--    //     name: config.legend_datas[1],//legend_right,//props.legend_right,-->
<!--    //     type: 'bar',-->
<!--    //     yAxisIndex: 1,-->
<!--    //     data: config.yAxis_datas[1],//y_data_right,//props.yAxis_data_right-->
<!--    //   }-->
<!--    // ]-->
