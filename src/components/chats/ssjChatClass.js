class SSJEchatConfig {
  /**
   * 参数说明
   *
   * 作者: 小青龙
   * 时间：2022/09/20 14:22:48
   *
   * @param title {String}  标题
   * @param xAxis_data {Array}  X轴数据
   * @param yAxis_datas {Array<Array>>}  Y轴数据,二维数组（可能包含多条数据，比如双柱状图）
   * @param legend_datas {Array}  图例信息，数组类型，数组元素代表一种柱状图的说明
   * @param unit_datas {Array}  y轴单位，比如有左右两条y轴坐标，左边这条代表'身高'，右边这条代表'体重'
   *
   * @return {void}
   */
  constructor(title, xAxis_data, yAxis_datas, legend_datas, unit_datas) {
    this.title = title;
    this.xAxis_data = xAxis_data;
    this.yAxis_datas = yAxis_datas;
    this.legend_datas = legend_datas;
    this.unit_datas = unit_datas;
  }

  /**  关于yAxis_datas二维数组，举个例子：
   *
   *      [
   *         [160,168,178,182,177],//这个代表左边Y轴的数据（身高）
   *         [100,110,125,130,115],//这个代表右边Y轴的数据（体重）
   *      ]
   * */
}

export default SSJEchatConfig;
