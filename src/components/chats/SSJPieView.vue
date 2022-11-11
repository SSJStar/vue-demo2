<template>
  <div id="myPie" style="width: 300px; height: 200px"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue"; //  按需引入 echarts

const props = defineProps({
  //暴露属性
  mountViewID: String, //挂载在哪个视图下（id）
});

onMounted(() => {
  getmain1();
});

let option = {
  backgroundColor: "#2c343c", //背景色
  title: {
    //标题配置
    text: "Customized Pie",
    left: "center",
    top: 20,
    textStyle: {
      color: "#f00",
    },
  },

  tooltip: {
    //提示框显示
    trigger: "item", //当trigger为’item’时只会显示该点的数据，为’axis’时显示该列下所有坐标轴所对应的数据。
    formatter: "{a} <br/>{b} : {c} ({d}%)", //系列名  数据项变量名  数据值   百分比
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1],
    },
  },
  legend: {
    //图例
    orient: "vertical", //纵向显示
    x: "left",
    textStyle: {
      color: "#f00",
    },
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
  },
  series: [
    //数据
    {
      name: "访问来源",
      type: "pie", //饼图
      radius: "55%",
      center: ["50%", "50%"],
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 274, name: "联盟广告" },
        { value: 235, name: "视频广告" },
        { value: 400, name: "搜索引擎" },
      ].sort(function (a, b) {
        return a.value - b.value;
      }), //按照value值从小到大排序
      roseType: "radius",
      label: {
        color: "rgba(255, 255, 255, 0.3)",
      },
      labelLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        smooth: 0.2,
        length: 10,
        length2: 20,
      },
      itemStyle: {
        color: "#c23531",
        shadowBlur: 200,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },

      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function (idx) {
        return Math.random() * 200;
      },
    },
  ],
};

let option1 = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "测试标题",
      type: "pie",
      radius: ["40%", "70%"], //分别是内半径、外半径
      avoidLabelOverlap: false, //是否启用防止标签重叠策略，默认开启
      label: {
        show: true, //如果为true,则显示data里的第一条数据的name值
        position: "top", //当鼠标移动到某个部分，标题展示的位置，center则显示在中间
      },
      emphasis: {
        //选中模块的高亮状态
        label: {
          //标题文字
          show: true,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

function getmain1() {
  // let myChart = echarts.init(document.getElementById(props.mountViewID));
  // setInterval(function () {
  //   let data0 = option.series[0].data.sort(function (a, b) {
  //     return a.value - b.value;
  //   });
  //   // { value: 335, name: "直接访问" }
  //   let name = data0.shift();
  //   data0.push({
  //     value: Math.round(Math.random() * 400 + 1),
  //     name: name.name,
  //   });
  //   option.series[0].data = data0.sort(function (a, b) {
  //     return a.value - b.value;
  //   });
  //   myChart.setOption(option);
  // }, 2000);

  test1();
}

function test1() {
  let myChart = echarts.init(document.getElementById(props.mountViewID));
  myChart.setOption(option1);
}

defineExpose({ getmain1 });
</script>
