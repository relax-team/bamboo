<template lang="pug">
  .g-header
    .logo
      img(src="../../assets/images/logo.svg")
      span 后台管理系统

    .userInfo
      //- http://q.qlogo.cn/g?b=qq&nk=644569226&s=100
      img.avatar(src='@/assets/images/avatar_default.png')
      .options
        el-button(type='warning', @click='logout', round) 退出

</template>

<style>
  .g-header{height: 70px;display: flex;align-items: center;justify-content: space-between;background: #13191E;}
  .logo{display: flex;align-items: center;flex: 1;}
  .logo img{height: 40px;margin: 0 20px;}

  .userInfo{display: flex;align-items: center;}
  .options{margin: 0 20px;}
  .avatar{width: 40px;height: 40px;border-radius: 50%;}
</style>

<script>
  export default {
    name: 'u-header',
    data(){
      return {
        form: {
          keywords: ''
        }
      }
    },
    methods: {
      onSearch(){

      },
      async logout(){
        await this.$store.dispatch('user/logout');
        this.$router.push({path: '/login'});
      }
    }
  }
</script>
