<!--日程表-->
<template lang="pug">
  .calendar
    .tabs
      el-button(type='primary', icon="el-icon-arrow-left", circle, @click="prevPage")
      span.item(v-for="item, index in monthArr", :keys="'month' + index", :class="{active: index==tabIndex}", @click="changeTabIndex(index)") {{item.format}}
      el-button(type='primary', icon="el-icon-arrow-right", circle, @click="nextPage")

    .weeks
      .item(v-for="item, index in weeks", :keys="'week' + index") 周{{item}}

    .days
      .row(v-for="row, rowIndex in dayArrSlice")
        .item(v-for="item, index in row", :keys="'day' + item.index", :class="{active: item.index == dayIndex, disabled: !item.currMonth}", @click="changeDayIndex(item.index)") {{item.format}}

</template>

<style scoped>
  .tabs{display: flex;align-items: center;border: 1px solid #ebebeb;padding: 0 10px;}
  .tabs .item{padding: 20px 20px;cursor: pointer;flex: 1;text-align: center;font-size: 14px;}
  .tabs .item.active{color: #F56C6C;}

  .weeks{display: flex;}
  .weeks .item{flex: 1;text-align: center;padding: 20px 0;border-right: 1px solid #ebebeb;background-color: #EBF3FB;}

  .days{border-top: 1px solid #ebebeb;}
  .days .row{display: flex;overflow: hidden;border-left: 1px solid #ddd;color: #606266;border-bottom: 1px solid #ebebeb;}
  .days .item{padding: 30px 0;flex:1;text-align: center;font-size: 14px;border-right: 1px solid #ebebeb;cursor: pointer;}
  .days .item.disabled{color: #ebebeb;}
  .days .item.active{background: #409eff;color: #fff;}
</style>

<script>
  export default {
    name: 'u-calendar',
    components: {},
    props: {},
    data() {
      return {
        page: 1,
        tabIndex: 3,
        dayIndex: 0,
        monthArr: [],
        dayArr: [],
        weeks: ['日', '一', '二', '三', '四', '五', '六']
      }
    },
    async created() {

    },
    watch: {
      page: {
        handler() {
          this.updateMonthArr();
          this.updateDayArr();
        },
        immediate: true
      }
    },
    methods: {
      /*
      * 上一页
      * */
      prevPage() {
        this.page--;
      },
      /*
      * 下一页
      * */
      nextPage() {
        this.page++;
      },
      /*
      * 切换月份
      * */
      changeTabIndex(index) {
        this.tabIndex = index;
        this.updateDayArr();
      },
      /*
      * 点击某一天
      * */
      changeDayIndex(index) {
        if (this.dayArr[index].currMonth) {
          this.dayIndex = index;
        }
      },
      /*
      * 更新月份
      * */
      updateMonthArr(n) {
        n = n || 3;
        const arr = [], count = 2 * n + 1;
        for (let i = 0; i < count; i++) {
          const now = new Date();
          const item = new Date(now.setMonth(now.getMonth() + ((this.page - 1) * count) - 3 + i));
          arr.push({
            standard: this.formatDate(item, `YYYY-MM`),
            format: this.formatDate(item, `YYYY年MM月`)
          })
        }
        this.tabIndex = n;
        this.monthArr = arr;
      },
      /*
      * 更新天数
      * */
      updateDayArr() {
        const arr = [], cell = 42;
        const firstDay = new Date(this.monthArr[this.tabIndex].standard);
        const week = firstDay.getDay();
        const count = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate();

        for (let i = 0; i < cell; i++) {
          const now = new Date(this.monthArr[this.tabIndex].standard);
          const item = new Date(now.setDate(now.getDate() - week + i));
          arr.push({
            format: this.formatDate(item, `DD`),
            standard: this.formatDate(item, `YYYY-MM-DD`),
            currMonth: week <= i && i < count + week,
            index: i
          })
        }
        this.dayIndex = week;
        this.dayArr = arr;
        this.dayArrSlice = this.arrSlice(arr, 7);
        console.log(this.dayArrSlice)
      },
      /*
      * 数组二次分组
      * @arr 要分隔的数组
      * @n 每组的个数
      * */
      arrSlice(arr, n) {
        var res = [];
        for (let i = 0, len = arr.length; i < len; i += n) {
          res.push(arr.slice(i, i + n));
        }
        return res;
      }
    }
  }
</script>

