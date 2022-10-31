<template>
  <div>
    <h1 @click="created">读取文件《高中二班女子800米成绩统计.xlsx》1</h1>
    <br />
    <h1 @click="ExportXlsx">导出数据到xlsx文件</h1>
    <TableView ref="tbViewRef" :titles="titles" :list-data="listData" />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require("xlsx");
import transformSheets from "@/views/read_xlsx.js";

// import {inject, reactive} from "vue";    //导入转制函数

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const transformSheets: any = require("./read_xlsx");

// 弹窗需要用到useDialog跟自定义组件ChildDemo
import ChildDemo from "@/components/servicedialog/ChildDemo.vue";
import { useDialog } from "@/components/servicedialog/useDialog";
import TableView from "@/views/List/TableView.vue";
import { onMounted, ref } from "vue";

let tbViewRef: any = ref(null); //定义列表ref标记
let titles: any = ref([]); //定义列表头部标题
let listData = ref([]); //定义列表数据
// let emit = defineEmits("showSSJDialog")

// let contentValue = {};
onMounted(() => {
  console.log("content:1212121");
  // let arr: Array<string> = ["姓名", "身高", "体重", "外貌", "800跑步", "性别"];
  // titles.value = arr;
});

function created() {
  let url = "/高中二班女子800米成绩统计.xlsx"; //放在public目录下可以直接访问
  //读取二进制excel文件,参考https://github.com/SheetJS/js-xlsx#utility-functions
  console.log("content123456:");
  axios
    .get(url, { responseType: "arraybuffer" })
    .then((res) => {
      let data = new Uint8Array(res.data);
      let wb = XLSX.read(data, { type: "array" });
      let sheets = wb.Sheets;
      let content = transformSheets(sheets); // 整理xlsx返回的数据
      // contentValue = content; //  复制给contentValue
      console.log("content:");
      console.log(content);

      titles.value = content[1]; //因为content第一个元素是[Sheet1]，使用要取索引1的元素
      let listDataValue: any = []; //用来存放列表元素数组，每个元素都是一个Obj对象
      let list = [];
      let arr = content.slice(1);

      interface Obj {
        [key: string]: string | number;
      }

      for (let i = 0; i < arr.length; i++) {
        let obj: Obj = {};
        let obj2: Obj = {};
        arr[i].forEach((item: any, index: number) => {
          // let key:keyof Obj = ""
          let key = String("data") + String(index + 1);
          // type fromkey = key
          obj[key] = item;
          if (index + 1 == 9) {
            // obj['data'+(index+1)] = this.formatExcelDate(item);
            obj["data" + (index + 1)] = formatExcelDate(item);
          }
          // if (index > 0) {
          //key 要从titles里取
          obj2[titles.value[index]] = item;
          // }
        });
        list.push(obj);
        listDataValue.push(obj2);
      }
      console.log("list:" + list);
      console.log(list);
      console.log("titles:" + titles.value);
      console.log("listDataValue:");
      console.log(listDataValue);
      listDataValue.splice(0, 1);
      console.log("listDataValue删除第一个元素后:");
      console.log(listDataValue);
      listData.value = listDataValue; //复制给响应式变量listData
      if (tbViewRef.value) {
        tbViewRef.value.myReload("123");
      }
    })
    .catch((err) => {
      // this.err = err;
      console.log("err is:" + err);
    });
}

// 处理表格中的日期时间
function formatExcelDate(numb: number, format = "-") {
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
      (Number(month) < 10 ? "0" + month : month) +
      format +
      (date < 10 ? "0" + date : date)
    );
  }
  return (
    year +
    (Number(month) < 10 ? "0" + month : month) +
    (date < 10 ? "0" + date : date)
  );
}

const { open } = useDialog();
//将contentValue这个json变量，写入xlsx文件
const ExportXlsx = () => {
  open({
    component: ChildDemo,
    options: { title: "正在导出" },
    params: { title: "导出中", subTitle: "文件名" },
  }).then((msg: any) => {
    console.log("关闭后得到值：", msg);
  });

  return;

  // // 创建工作表
  // // const data = XLSX.utils.json_to_sheet(tableData)
  // const data = XLSX.utils.json_to_sheet(contentValue);
  // // 创建工作簿
  // const wb = XLSX.utils.book_new();
  // // 将工作表放入工作簿中
  // XLSX.utils.book_append_sheet(wb, data, "data");
  // // 生成文件并下载
  // XLSX.writeFile(wb, "新生成的文件.xlsx");
};
</script>
