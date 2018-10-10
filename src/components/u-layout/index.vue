<template lang="pug">
  .g-container
    u-header
    u-menu
    .g-main
      router-view(:key="$route.fullPath")
</template>

<style>
  .g-main{position: absolute;left: 210px;right: 0;top: 70px;bottom: 0;background-color: #CEE4EF;padding: 15px;}
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
