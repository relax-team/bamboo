<template lang="pug">
  .g-container
    u-header
    .g-main
      u-menu
      .g-content
        router-view(:key="$route.fullPath")
</template>

<style>
  .g-main{position: fixed;left: 210px;right: 0;top: 70px;bottom: 0;background-color: #CEE4EF;}
  .g-content{padding: 15px;}
</style>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'u-layout',
    computed: {
      ...mapGetters([])
    },
    components: {},
    methods: {}
  }
</script>
