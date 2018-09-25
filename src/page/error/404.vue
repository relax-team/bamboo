<template lang="pug">
  .m-error
    .pic
    .title 404 ERROR
    .button
      el-button(type="primary", round, plain, @click="goHome") 返回首页
</template>

<script>
  export default {
    name: 'error',
    methods: {
      goHome(){
        this.$router.push({path: '/'});
      }
    }
  }
</script>

<style scoped lang="less">
  .m-error{ position: absolute; left: 50%; top: 15%; width: 500px; margin-left: -250px; text-align: center;}
  .m-error .pic{ width: 300px; height: 300px; background: url(../../assets/images/error.png) no-repeat; background-size: cover; margin: 0 auto;}
  .m-error .title{ font-size: 50px; color: #111; padding: 40px 0; line-height: 1;}
  .m-error .el-button{ font-size: 20px; width: 200px; background-color: #fff;}
  .m-error .el-button:hover{ background-color: #409EFF;}
</style>
