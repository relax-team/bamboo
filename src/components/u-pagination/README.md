### 分页组件

#### template引用方式：

```html
//- pug格式
  u-pagination(@paginated="setTableData", :params="pagination", :immediate.sync="pagination_immediate")

```

```html 
<!--HTML格式-->
<u-pagination @paginated="setTableData" :params="pagination" :immediate.sync="pagination_immediate"></u-pagination>

```

#### script逻辑调用：

```javascript
  import { UPagination } from '@/components/index'
  export default {
    components: {
      UPagination
    },
    data(){
      return {
        form: {
          resourceName: ''
        },
        tableData: [],
        pagination_immediate: true    //是否请求分页首页数据，重置分页。查询表单数据时可能用到;
      }
    },
    computed: {
      pagination(){
        //分页请求需要的参数,主要包含url和data
        return {
          url: 'resourceList',
          data: this.form
        }
      }
    },
    async created(){
      /*
      * 默认不需要写，页面`data`配置`pagination`参数即可，会主动请求接口。
      * const res = await this.fetch(this.pagination);
      * this.setTableData(res);
      */
      
    },
    methods: {
      setTableData(res){
        console.info('[setTableData] ', JSON.stringify(res))
      },
      submitForm(){
        /*点击查询表单按钮，设置this.pagination_immediate=true;*/
        this.pagination_immediate = true;
      }
    }
  };

```

#### `u-pagination`组件参数说明：
+ :params: 类型：Object；分页请求时需要的参数，如url/data等，详细可见下方`pagination`参数说明；
+ :immediate.sync: 类型：Boolean；是否主动调用分页首屏数据，默认值：true；
+ @paginated: 类型：String；分页请求结束后的回调函数名称；


#### `pagination`参数说明：
+ url: 接口请求地址，/api/index.js中配置的接口地址的key;
+ data: 接口请求需要的参数，更加业务自定义;
+ loading: 是否显示loading，默认值：true
+ 其他参数：headers、method，具体可参考request.js逻辑调用方式；
