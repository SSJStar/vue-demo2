<template>
  <div class="XlsxViewClass">
    <!--  导入文件  -->
    <el-upload
      class="upload-demo"
      action=""
      drag
      :auto-upload="false"
      accept=".xlsx, .xls"
      :on-change="uploadChange"
      :show-file-list="true"
      :limit="1"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

    <!--  列表  -->
    <TableView
      style="width: 100%; height: 250px"
      ref="tbViewRef"
      :titles="titles"
      :list-data="listData"
    />

    <!--  导出到电脑  -->
    <div class="toolsView" v-show="isShowExport">
      <el-button class="ExportView" @click="ExportXlsx">导出文件</el-button>

      <!--  选择X轴  -->
      <div style="display: inline-block; width: 180px">
        <el-select
          v-model="xFieldNameSelected"
          class="m-2"
          size="large"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="请选择X轴字段"
        >
          <el-option
            v-for="item in x_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <!--  选择Y轴  -->
      <div style="display: inline-block; margin-left: 10px; width: 180px">
        <el-select
          v-model="yFieldNameSelected"
          class="m-3"
          size="large"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="请选择Y轴字段"
        >
          <el-option
            v-for="item in y_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <!--  选择Y轴字段的单位  -->
      <div style="display: inline-block; margin-left: 10px; width: 180px">
        <el-select
          v-model="yFieldUnitSelected"
          class="m-3"
          size="large"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="请选择Y轴字段单位（按顺序）"
        >
          <el-option
            v-for="item in yUnit_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>

      <!--  图标类型  -->
      <div style="display: inline-block; margin-left: 10px; width: 180px">
        <el-select
          v-model="yChartTypeSelected"
          class="m-3"
          size="large"
          placeholder="请选择图表类型"
        >
          <el-option
            v-for="item in yChartType_options"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </div>

      <el-button class="ChatView" @click="showChart">生成柱状图</el-button>
    </div>

    <!--  柱状图  -->
    <BTChatView
      class="btChartView"
      v-show="isShowChart"
      :title="fileNameSelected"
      :xFieldNames="xFieldNameSelected"
      :yFieldNames="yFieldNameSelected"
      :yFieldUnits="yFieldUnitSelected"
      ref="btChatRef"
    ></BTChatView>

    <div id="sSJPieView">
      <SSJPieView mountViewID="sSJPieView" ref="pieViewRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import transformSheets from "@/views/read_xlsx.js";
// 弹窗需要用到useDialog跟自定义组件ChildDemo
import ChildDemo from "@/components/servicedialog/demo/ChildDemo.vue";
import { useDialog } from "@/components/servicedialog/demo/useDialog";
// 表格组件
import TableView from "@/views/List/TableView.vue";
import { ref } from "vue";
import BTChatView from "@/views/BTChatView.vue";
import SSJPieView from "@/components/chats/SSJPieView.vue";
import ssjDialog from "@/components/servicedialog/ssj-dialog";

const XLSX = require("xlsx");

let tbViewRef: any = ref(null); //定义列表ref标记
let titles: any = ref([]); //定义列表头标题
let listData = ref([]); //定义列表数据
let dataPublic: any = null; //全局变量 - data
/**
 * contentValue数据格式：[["姓名","身高","体重"],["张三","172","110"],["李四","182","135"]]
 * */
let contentValue: any = null; //用于接收xlsx文件内容，后面导出的时候要用到这个变量
let isShowRead = ref(true); //是否展示"读取文件xxx"，默认true
let isShowExport = ref(false); //是否展示"导出按钮",默认false
let isShowChart = ref(false); //是否展示"图标",默认false

const fileNameSelected = ref(""); //从电脑上选择的文件名，file["name"]
const xFieldNameSelected = ref([]); //x轴选择展示哪个字段
const yFieldNameSelected = ref([]); //y轴选择展示哪几个字段
const yFieldUnitSelected = ref([]); //y轴选择展示的几个字段的单位
const yChartTypeSelected = ref(); //选中的图表类型，line、scatter、bar、pie、radar

let pieViewRef: any = ref(null);

const x_options: any = ref([]); //x轴下拉框（数据源）
const y_options: any = ref([]); //y轴下拉框（数据源）
const yUnit_options: any = ref([]); //y轴下拉框（数据源）
const yChartType_options: any = [
  //图表类型
  {
    key: "line",
    value: "折线图",
  },
  {
    key: "scatter",
    value: "散点图",
  },
  {
    key: "bar",
    value: "柱状图",
  },
  {
    key: "pie",
    value: "饼图",
  },
  {
    key: "radar",
    value: "雷达图",
  },
];

// const btChatRef = ref(null);
const btChatRef = ref<InstanceType<typeof BTChatView>>(); //标记图表组件

const xFieldNamesValue = ref<string>("");
const yFieldNamesValue = ref<string[]>([]); //y坐标要展示的字段名，比如 ["身高","体重"]
//由于设置了:auto-upload="false"，导致beforeUpload和uploadChange方法冲突，所以beforeUpload不会被执行
// function beforeUpload(file: any) {
//   const isText = "application/vnd.ms-excel";
//   const isTextComputer =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
//   const isExcel = !(file.raw.type != isText && file.raw.type != isTextComputer);
//   if (!isExcel) {
//     alert("上传文件的格式不正确!");
//     console.log("格式不正确");
//   } else {
//     console.log("格式正确");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 20;
//   if (!isLt2M) {
//     alert("上传文件大小不能超过 20MB!");
//   }
//   return isExcel && isLt2M;
// }

function uploadChange(this: any, file: any, fileList: any) {
  console.log("file~~");
  console.log(file);
  console.log("fileList~~");
  console.log(fileList);
  console.log(this.uploadFiles);
  fileNameSelected.value = file["name"]; //文件名传给 -》fileNameSelected
  let isLt2M = file.size / 1024 / 1024 <= 20;
  if (!isLt2M) {
    alert(`上传文件大小不能超过20MB!`);
    this.fileList = [];
    return false;
  }
  const reader = new FileReader();
  reader.readAsArrayBuffer(file.raw);
  reader.onload = (e) => {
    let data = e.target?.result;
    afterGetContent(data);
  };
}

// 导入文件
// const ImportXlsx = (e: { target: { files: any[] } }) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.readAsArrayBuffer(file);
//   reader.onload = (e) => {
//     let data = e.target?.result;
//     const constworkbook = XLSX.read(data, { type: "binary", cellDates: true });
//     // eslint-disable-next-line no-undef
//     const wsname = workbook.SheetNames[0];
//     // eslint-disable-next-line no-undef
//     const outdata = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
//     console.log(outdata);
//   };
// };

/**
 * 获取data后的逻辑
 * 可以是本项目本身就存在的文件，也可以是由电脑上导入的文件，在获取data后就可以调用本方法
 *
 * 作者: 小青龙
 * 时间：2022/11/08 13:59:50
 * @param 参数名 {参数类型}  描述信息
 * @return {返回类型}
 */
function afterGetContent(data: any) {
  dataPublic = data; //赋值给全局变量dataPublic
  let wb = XLSX.read(data, { type: "array" });
  let sheets = wb.Sheets;
  let content = transformSheets(sheets); // 整理xlsx返回的数据
  contentValue = content.slice(1); // 删除第一行"sheet1"，然后复制给contentValue
  console.log("content:");
  console.log(content);

  titles.value = content[1]; //因为content第0个元素是[Sheet1]，使用要取索引1的元素
  let listDataValue: any = []; //用来存放列表元素数组，每个元素都是一个Obj对象
  let arr = content.slice(1);
  //定义类型 Obj
  interface Obj {
    [key: string]: string | number;
  }
  //获取字段名（比如：学号、姓名）赋值给x_options、y_options
  const menuArray: any[] = arr[0];
  x_options.value = menuArray;
  y_options.value = menuArray;
  //  单位
  yUnit_options.value = ["cm", "m", "kg", "g", "分", "秒"];

  // 添加列表数据给listDataValue
  for (let i = 0; i < arr.length; i++) {
    let listDataItem: Obj = {};
    arr[i].forEach((item: any, index: number) => {
      // let key:keyof Obj = ""
      // let key = String("data") + String(index + 1);
      // type fromkey = key
      // obj[key] = item;
      // if (index + 1 == 9) {
      //   // obj['data'+(index+1)] = this.formatExcelDate(item);
      //   obj["data" + (index + 1)] = formatExcelDate(item);
      // }
      //key 要从titles里取
      listDataItem[titles.value[index]] = item;
    });
    listDataValue.push(listDataItem);
  }
  //删除第一个元素（删除的内容是列表头，比"姓名"、"性别"）
  listDataValue.splice(0, 1); //从第0个位置可以删除，删除总个数为1
  listData.value = listDataValue; //listDataValue赋值给响应式变量listData

  // console.log("listDataValue:");
  // console.log(listDataValue);
  //
  // console.log("menuArray:");
  // console.log(menuArray);

  //展示或隐藏 导出按钮
  if (listData.value.length > 0) {
    isShowExport.value = true;
    isShowRead.value = false;
  } else {
    isShowExport.value = false;
    isShowRead.value = true;
  }
}

/**
 * 读取xlsx文件，给响应式变量titles、listDataValue赋值，表格自动刷新数据
 *
 * 作者: 小青龙
 * 时间：2022/11/01 16:06:15
 * @return {void}
 */
function readFileFunc() {
  let url = "/高中二班女子800米成绩统计.xlsx"; //放在public目录下可以直接访问
  //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
  axios
    .get(url, { responseType: "arraybuffer" })
    .then((res) => {
      let data = new Uint8Array(res.data);
      afterGetContent(data);
    })
    .catch((err) => {
      console.log("err is:" + err);
    });
}

const { open } = useDialog();
//将contentValue这个json变量，写入xlsx文件
const ExportXlsx = () => {
  if (contentValue === null) {
    alert("文件内容为空，导出失败");
    return;
  }
  // open({
  //   component: ChildDemo,
  //   options: { title: "正在导出" },
  //   params: { title: "导出中", subTitle: "文件名" },
  // }).then((msg: any) => {
  //   console.log("关闭后得到值：", msg); //msg就是输入的新文件名字
  //   if (msg === undefined || msg === null || msg === "") {
  //     return;
  //   }
  //   // 创建工作表
  //   const data = XLSX.utils.json_to_sheet(contentValue);
  //   // 创建工作簿
  //   const wb = XLSX.utils.book_new();
  //   // 将工作表放入工作簿中
  //   XLSX.utils.book_append_sheet(wb, data, "data");
  //   // 生成文件并下载
  //   XLSX.writeFile(wb, msg + ".xlsx");
  // });

  //这里采用自定义弹窗
  let vars = {
    title: "温馨提示",
    subTitle: "请输入新的昵称",
  };
  ssjDialog.ssjTip(vars).then((msg) => {
    console.log("ssjTip.then打印吧-----" + msg);
  });
};

/**
 * 展示图表
 *
 * 作者: 小青龙
 * 时间：2022/11/01 17:24:56
 * @return {void}
 */
function showChart() {
  console.log("yChartTypeSelected~~");
  console.log(yChartTypeSelected.value);

  pieViewRef.value.getmain1();

  const validataResult = valiadataBeforeShowUIFromData(); //校验组件属性是否为空
  if (validataResult) {
    // xFieldNamesValue.value = "学号";
    // yFieldNamesValue.value = ["身高", "体重"];
    isShowChart.value = true;
    btChatRef.value.showUIFromData(dataPublic);
  }
}

/**
 * 校验组件属性是否为空
 *
 * 作者: 小青龙
 * 时间：2022/11/10 10:32:45
 * @return {void}
 */
function valiadataBeforeShowUIFromData() {
  if (xFieldNameSelected.value.length == 0) {
    alert("X轴字段不能为空，请选择");
    return false;
  }
  if (yFieldNameSelected.value.length == 0) {
    alert("Y轴字段不能为空，请选择");
    return false;
  }
  if (yFieldUnitSelected.value.length == 0) {
    alert("Y轴字段单位不能为空，请选择");
    return false;
  }
  if (yFieldUnitSelected.value.length > yFieldNameSelected.value.length) {
    alert("'Y轴字段单位个数'不能大于'Y轴字段个数'");
    return false;
  }
  return true;
}

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
/*希望页面在超出屏幕高度的时候，可以滚动。需要设置高度height和overflow-y模式*/
.XlsxViewClass {
  height: calc(100%);
  overflow-y: scroll;
}
/*柱状图*/
.btChartView {
  margin-top: 30px;
  width: 100%;
}

.toolsView {
  margin-top: 40px;
  width: 100%;
  height: 50px;
  /*background-color: #2c3e50;*/
}
.toolsView .ExportView {
  display: inline-block;
  float: left;
  margin-left: 20px;
  /*background-color: #42b983;*/
}
.toolsView .ChatView {
  display: inline-block;
  float: right;
  margin-right: 20px;
  /*background-color: orange;*/
}

/* 饼图 */
#sSJPieView {
  margin-top: 30px;
  width: 800px;
  height: 600px;
}
/*.el-menu--collapse .el-menu .el-submenu,*/
/*.el-menu--popup {*/
/*  min-width: 120px !important;*/
/*}*/
</style>

<!--&lt;!&ndash;  二级下拉列表  &ndash;&gt;-->
<!--<el-dropdown trigger="click">-->
<!--<div>-->
<!--  <span>张三</span>-->
<!--  <el-avatar-->
<!--    :size="24"-->
<!--    :src="require('../assets/account_icon.png')"-->
<!--  ></el-avatar>-->
<!--</div>-->
<!--<template #dropdown>-->
<!--  <el-dropdown-menu>-->
<!--    <el-dropdown-item>-->
<!--      <el-popover placement="left-start" trigger="hover" :offset="15">-->
<!--        <template #reference>-->
<!--          <span>个人中心</span>-->
<!--        </template>-->
<!--        <el-menu-->
<!--          mode="vertical"-->
<!--          :default-active="$route.meta.route"-->
<!--          router-->
<!--        >-->
<!--          <el-menu-item index="/usercenter/users">用户</el-menu-item>-->
<!--          <el-menu-item index="/usercenter/nft">NFTs</el-menu-item>-->
<!--          <el-menu-item index="/usercenter/contract">合同</el-menu-item>-->
<!--        </el-menu>-->
<!--      </el-popover>-->
<!--    </el-dropdown-item>-->
<!--    <el-dropdown-item @click="go('/usercenter/reset')"-->
<!--    >修改密码</el-dropdown-item-->
<!--    >-->
<!--    <el-dropdown-item @click="go('/usercenter/info')"-->
<!--    >修改资料</el-dropdown-item-->
<!--    >-->
<!--    <el-dropdown-item @click="isLogout">退出登录</el-dropdown-item>-->
<!--  </el-dropdown-menu>-->
<!--</template>-->
<!--</el-dropdown>-->

<!--&lt;!&ndash; 官网 - 二级下拉列表  &ndash;&gt;-->
<!--<el-menu-->
<!--  :default-active="activeIndex2"-->
<!--  class="el-menu-demo"-->
<!--  mode="horizontal"-->
<!--  background-color="#545c64"-->
<!--  text-color="#fff"-->
<!--  active-text-color="#ffd04b"-->
<!--  @select="handleSelect"-->
<!--  style="width: 200px; height: 60px"-->
<!--&gt;-->
<!--<el-sub-menu index="1">-->
<!--  <template #title>Workspace</template>-->
<!--  <el-menu-item index="1-1">item one</el-menu-item>-->
<!--  <el-menu-item index="1-2">item two</el-menu-item>-->
<!--  <el-menu-item index="1-3">item three</el-menu-item>-->
<!--  <el-sub-menu index="1-4">-->
<!--    <template #title>item four</template>-->
<!--    <el-menu-item index="2-4-1">item one</el-menu-item>-->
<!--    <el-menu-item index="2-4-2">item two</el-menu-item>-->
<!--    <el-menu-item index="2-4-3">item three</el-menu-item>-->
<!--  </el-sub-menu>-->
<!--</el-sub-menu>-->
<!--</el-menu>-->

<!--const activeIndex = ref("1");-->
<!--const activeIndex2 = ref("1");-->
<!--const handleSelect = (key: string, keyPath: string[]) => {-->
<!--console.log(key, keyPath);-->
<!--};-->
