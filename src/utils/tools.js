/*
* 工具类方法
* */
import filters from './filters';

export default {
  ...filters,
  /*
  * 计算某一列每一行要合并的单元格行数
  * 示例:
  * this.rowSpan = this.getCellMergeArray(data, 'name');
  * objectSpanMethod({row, column, rowIndex, columnIndex}) {
  *   if (columnIndex === 0) {return [this.rowSpan[rowIndex], 1]};
  * }
  * */
  getCellMergeArray(data, key) {
    let spanArr = [], pos;
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        spanArr.push(1);
        pos = 0
      } else {
        // 判断当前元素与上一个元素是否相同
        if (data[i][key] === data[i - 1][key]) {
          spanArr[pos] += 1;
          spanArr.push(0);
        } else {
          spanArr.push(1);
          pos = i;
        }
      }
    }
    return spanArr;
  },
  // 日期范围选择器扩展
  Shortcuts(){
    /*
    * 增加一天，然后减1s
    * */
    function addDate(now, day) {
      now = new Date(now);
      return +now.setDate(now.getDate() + (day || 1)) - 1000;
    }

    return [{
      text: '今天',
      onClick(picker) {
        const today = +new Date(new Date().toDateString());
        const end = addDate(today);
        picker.$emit('pick', [today, end]);
      }
    }, {
      text: '最近一周',
      onClick(picker) {
        const today = +new Date(new Date().toDateString());
        const start = today - 3600 * 1000 * 24 * 7, end = addDate(today);
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const today = +new Date(new Date().toDateString());
        const start = today - 3600 * 1000 * 24 * 30, end = addDate(today);
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const today = +new Date(new Date().toDateString());
        const start = today - 3600 * 1000 * 24 * 90, end = addDate(today);
        picker.$emit('pick', [start, end])
      }
    }];
  },
  // 4舍5入
  toFixed(value = 0, precision = 2){
    const multiple = Math.pow(10, precision);
    return (Math.round(value * multiple) / multiple);
  }
}
