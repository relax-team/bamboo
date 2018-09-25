/*
* Vue.filters 过滤器
* */
import moment from 'moment';
import math from 'mathjs';
import Store from '../store/index'

const bigMath = math.create({
  number: 'BigNumber',  // 精度运算
});

export default {
  /**
   * 精度运算
   * 模板调用 {{`${val1}+${val2}*${val3}-${val4}` | calc}}
   * js调用 this.$options.filters.calc('0.1+0.2',1)
   * @param value string 算式字符串
   * @param precision number 小数精度 默认2位
   * @constructor
   */
  calc(value, precision = 2) {
    if (!value) return;
    return bigMath.format(bigMath.eval(value), {precision: precision});
  },
  formatDate(input, fmt) {
    fmt = fmt || 'YYYY-MM-DD HH:mm:ss';
    if (!input) return;
    let date = Number(input);
    if (!date) {
      date = +new Date(input);
    }
    return moment(date).format(fmt);
  },
  /**
   * 金额数字格式化 模板调用 {{val | formatNum(1)}}
   * 4位以上小数有问题
   * @param value
   * @param precision 小数点后位数,调用时传值 默认2位
   * @returns {string}
   */
  formatNum(value = 0, precision = 2) {
    const multiple = Math.pow(10, precision);
    return (Math.round(value * multiple) / multiple).toLocaleString();
  },
  // 格式化手机号展示3 4 4
  formatPhone(value){
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  },
  // 内容中遍历字典表应对数据处理逻辑
  dictionary(value, key) {
    const map = Store.getters.dictionary[key];
    if (map) {
      const res = map.filter(v => v.value == value);
      return res[0] ? res[0].comment : '';
    }
  },
  // 折扣格式化
  discount(value) {
    let val = Number(value);
    if(val > 1){ val = val / 10;}
    return val == 1 ? '无' : val * 10 + '折';
  }
}
