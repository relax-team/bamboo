/*
* 尽可能的确保 JS 引擎的长效内存管理，对一个通用的全局对象进行了 Object.freeze() 冻结操作，不支持prototype对象扩展。
* by xqs
* */
import filters from './filters'
import fetch from './request'
import tools from './tools'

export default {
  methods: {
    fetch,
    ...tools
  },
  filters
}
