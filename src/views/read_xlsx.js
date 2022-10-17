// declare function transformSheets(sheets?:any): void;
const XLSX = require("xlsx");

//将行,列转换
function transformSheets(sheets) {
  let content = [];
  let content1 = [];
  let tmplist = [];
  for (let key in sheets) {
    //读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
    tmplist.push(XLSX.utils.sheet_to_json(sheets[key]).length);
    content1.push(XLSX.utils.sheet_to_json(sheets[key]));
  }
  let maxLength = Math.max.apply(Math, tmplist);
  //进行行列转换
  for (let y in [...Array(maxLength)]) {
    content.push([]);
    for (let x in [...Array(tmplist.length)]) {
      try {
        for (let z in content1[x][y]) {
          content[y].push(content1[x][y][z]);
        }
      } catch (error) {
        content[y].push(" ");
      }
    }
  }
  content.unshift([]);
  for (let key in sheets) {
    content[0].push(key);
  }
  return content;
}

export { transformSheets as default };
