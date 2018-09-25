<!--分页-->
<template>
  <div class="g-inquire-pagination">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size=pageSize
      layout="total, prev, pager, next"
      :total=totalCount>
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'u-pagination',
    components: {},
    props: {
      params: {
        type: Object,
        default: () => ({})
      },
      immediate: {
        type: Boolean,
        default: () => (true)
      }
    },
    data() {
      return {
        currentPage: 1,
        totalCount: 0,
        pageSize: 10
      }
    },
    async created() {

    },
    watch: {
      immediate: {
        async handler(val, oldVal) {
          if (val) {
            this.$emit('update:immediate', false);
            await this.fetchData();
          }
        },
        immediate: true
      }
    },
    methods: {
      async handleCurrentChange(page) {
        console.log(`当前页: ${page}`);
        this.fetchData(page);
      },
      async fetchData(page) {
        const params = this.params;
        Object.assign(params.data, {
          page: page || 1,      //当前页数
          size: this.pageSize   //条数
        });

        console.log('分页参数', JSON.stringify(params));
        const res = await this.fetch(params);
        this.currentPage = params.data.page;

        //接口返回的分页详细信息
        const pageInfo = res.pageInfo;
        if (pageInfo) {
          this.totalCount = pageInfo.recordCount;
        }

        this.$emit('paginated', res);
      }
    }
  }
</script>

