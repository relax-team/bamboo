<template lang="pug">
  .g-header
    .logo
      img(src="../../assets/images/logo.svg")
      span 后台管理系统

    .userInfo
      span 欢迎您，bamboo
      el-dropdown(@command="handleCommand")
        .el-dropdown-link
          //- @/assets/images/avatar_default.png
          img.avatar(src='http://q.qlogo.cn/g?b=qq&nk=644569226&s=100')
        el-dropdown-menu(slot='dropdown')
          el-dropdown-item(command="changePassword") 修改密码
          el-dropdown-item(command='logout') 退出

</template>

<style>
  .g-header{height: 70px;border-bottom: 1px solid #f2f2f2;display: flex;align-items: center;justify-content: space-between;background: linear-gradient(to right, #338BF8 , #4D98F7);color: #fff;}
  .logo{display: flex;align-items: center;flex: 1}
  .logo img{height: 40px;margin: 0 20px;}

  .userInfo{display: flex;align-items: center;}
  .avatar{width: 40px;height: 40px;border-radius: 50%;margin: 0 20px;}
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
      async handleCommand(command){
        switch (command) {
          case 'changePassword':
            this.$router.push({path: '/setting/user/changePassword'});
            break;
          case 'logout':
            await this.$store.dispatch('user/logout');
            this.$router.push({path: '/login'});
            break;
        }
      }
    }
  }
</script>
