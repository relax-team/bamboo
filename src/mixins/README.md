### 混合组件

使用方式：

```javascript
  import areaMap from '@/mixins/areaMap'          //区域选择组件
  import dictionary from '@/mixins/dictionary'    //字典表组件
  export default {
    mixins:[areaMap, dictionary('STAFF_STATUS')],
    data() {
        return {
          areaSelected: [330000, 330100, 330102]
        }
    },
    created(){
      
    }
  }
```

```html
<!--省市区级联组件-->
<el-cascader :options="areaMap" v-model="areaSelected" @change="handleAreaChange"></el-cascader>
```

```html
<el-select v-model="form.state">
  <el-option v-for="item in dictionary['STAFF_STATUS']" :key="item.value" :label="item.comment" :value="item.value"></el-option>
</el-select>
```
