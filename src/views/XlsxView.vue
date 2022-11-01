<template>
  <div>
    <!--  读取xlsx文件内容，并以列表展示 -->
    <h1 @click="readFileFunc">读取文件《高中二班女子800米成绩统计.xlsx》</h1>
    <br />
    <!--  导出到电脑  -->
    <h1 v-show="isShpwExport" @click="ExportXlsx">
      导出数据到电脑（xlsx格式）
    </h1>
    <!--  列表  -->
    <TableView
      style="width: 100%; height: 250px"
      ref="tbViewRef"
      :titles="titles"
      :list-data="listData"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
const XLSX = require("xlsx");
import transformSheets from "@/views/read_xlsx.js";
// 弹窗需要用到useDialog跟自定义组件ChildDemo
import ChildDemo from "@/components/servicedialog/ChildDemo.vue";
import { useDialog } from "@/components/servicedialog/useDialog";
// 表格组件
import TableView from "@/views/List/TableView.vue";
import { ref } from "vue";

let tbViewRef: any = ref(null); //定义列表ref标记
let titles: any = ref([]); //定义列表头标题
let listData = ref([]); //定义列表数据
/**
 * contentValue数据格式：[["姓名","身高","体重"],["张三","172","110"],["李四","182","135"]]
 * */
let contentValue: any = null; //用于接收xlsx文件内容，后面导出的时候要用到这个变量
let isShpwExport = ref(false); //是否展示"导出按钮"

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
      //展示或隐藏 导出按钮
      if (listData.value.length > 0) {
        isShpwExport.value = true;
      } else {
        isShpwExport.value = false;
      }
    })
    .catch((err) => {
      console.log("err is:" + err);
    });
}

// 处理表格中的日期时间
// function formatExcelDate(numb: number, format = "-") {
//   // 如果numb为空则返回空字符串
//   if (!numb) {
//     return "";
//   }
//   let time = new Date(
//     new Date("1900-1-1").getTime() + (numb - 1) * 3600 * 24 * 1000
//   );
//   const year = time.getFullYear() + "";
//   const month = time.getMonth() + 1 + "";
//   const date = time.getDate();
//   if (format && format.length === 1) {
//     return (
//       year +
//       format +
//       (Number(month) < 10 ? "0" + month : month) +
//       format +
//       (date < 10 ? "0" + date : date)
//     );
//   }
//   return (
//     year +
//     (Number(month) < 10 ? "0" + month : month) +
//     (date < 10 ? "0" + date : date)
//   );
// }

const { open } = useDialog();
//将contentValue这个json变量，写入xlsx文件
const ExportXlsx = () => {
  if (contentValue === null) {
    alert("文件内容为空，导出失败");
    return;
  }
  open({
    component: ChildDemo,
    options: { title: "正在导出" },
    params: { title: "导出中", subTitle: "文件名" },
  }).then((msg: any) => {
    console.log("关闭后得到值：", msg); //msg就是输入的新文件名字
    // 创建工作表
    const data = XLSX.utils.json_to_sheet(contentValue);
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    // 将工作表放入工作簿中
    XLSX.utils.book_append_sheet(wb, data, "data");
    // 生成文件并下载
    XLSX.writeFile(wb, msg + ".xlsx");
  });
};
</script>
