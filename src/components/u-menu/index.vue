<template lang="pug">
  el-menu.g-menu(:default-active='currPath', @open='handleOpen', @select='handleSelect', background-color='#13191E', text-color='#fff', active-text-color='#1890FF', :router="true", :unique-opened="true")
    template(v-for="item, index in menu")
      el-submenu(:index='item.path', v-if="item.children")
        template(slot='title')
          i(:class="item.meta.class")
          span {{item.meta.title}}
        el-menu-item(v-for="child in item.children", :key="child.path", :index= "child.path") {{child.meta.title}}

      el-menu-item(v-else, :index='item.path')
        i(:class="item.meta.class")
        span(slot='title') {{item.meta.title}}

</template>

<style>
  .g-menu{position: absolute;left: 0;top: 70px;bottom: 0;width: 210px;}
</style>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'u-menu',
    computed: {
      ...mapGetters(['routers'])
    },
    data() {
      return {
        menu: [],
        currPath: this.$route.path
      }
    },
    created() {
      this.menu = this.generateMenu(this.routers);
    },
    methods: {
      handleOpen(url) {
        //this.$router.push({ path: url });
      },
      handleSelect(index, indexPath) {
        console.log(index, indexPath)
      },
      /*
      * 递归返回侧边栏要显示的菜单
      * @param routerMap
      * */
      generateMenu(routerMap, parent = {}, menu = []) {
        routerMap.concat().map(item => {
          //根据meta过滤，不返回hidden的菜单
          if (item.meta) {
            if (item.meta.hidden) return;
            return menu.push(this.returnItem(item, parent));
          }

          if (item.children && item.children[0]) {
            return this.generateMenu(item.children, {path: item.path}, menu);
          }
        }).filter(v => v);

        return menu;
      },
      //每一项menu的数据结构
      returnItem(item, parent = {}) {
        let res = {
          path: [parent.path, item.path].filter(v => v).join('/'),
          meta: item.meta
        };
        if (item.children && item.children[0]) {
          res.children = item.children.map(v => {
            return this.returnItem(v, res);
          });
        }
        return res;
      }
    }
  }
</script>
