<template lang="pug">
  .m-login
    .content
      .title
        .logo VUE SPA MS
      el-form.form(ref="form", :model="form", :rules="rules")
        el-form-item(prop="username")
          el-input(type="text", v-model="form.username", placeholder="请输入账户名", prefix-icon="iconfont icon-login-user", size="medium", @keyup.enter.native="login")
        el-form-item(prop="password")
          el-input(type="password", v-model="form.password", placeholder="请输入密码", prefix-icon="iconfont icon-login-pwd", size="medium", @keyup.enter.native="login")
        el-form-item(v-if="query.host")
          el-select(v-model="form.host")
            el-option(v-for="host, index in hostList", :label="host.label", :value="host.value", :key="index")
        el-form-item
          el-button(type="primary", @click="login", size="medium") 登录

    .copy &copy; madaomall.com All Rights Reserved
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        go: this.$route.query.go,
        query: this.$route.query,
        hostList: [{
          "label": "本机环境 localhost:9001",
          "value": "http://localhost:9001"
        },{
          "label": "淘宝mock rap2",
          "value": "http://rap2api.taobao.org/app/mock/86011"
        }],
        form: {
          username: "123456",
          password: "123456",
          host: "http://rap2api.taobao.org/app/mock/86011",
        },
        rules:{
          username: [
            { required: true, message: '请输入账户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    async created(){

    },
    methods: {
      login() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const {username, password, host} = this.form;
            if (this.query.host && host) {
              localStorage.setItem('ms_mock_api', host); // 使用非默认环境
            } else {
              localStorage.removeItem('ms_mock_api'); // 使用默认环境
            }
            const res = (await this.fetch({
              url: `/login.do`,
              method: 'POST',
              data: {
                username,
                password
              }
            })).data[0];

            console.log(res);
            await this.$store.dispatch('user/login', {username, password});
            this.$router.push({path: this.go || '/'});
          }
        });

      }
    }
  };
</script>

<style scoped>
  .m-login{ position: absolute; width: 100%; height: 100%; background: #CEE4EF;}
  .m-login .content{ position: absolute; width: 400px; left: 50%; margin-left: -200px; top: 15%;}
  .m-login .title{ padding-bottom: 60px;}
  .m-login .title .logo{ width: 370px; height: 150px; margin: 0 auto; background: #3bbc9c; overflow: hidden; text-indent: -88em;}
  .m-login .form{ background: rgba(255,255,255,.6); border-radius: 10px;  padding: 50px; box-shadow: 0 0 20px rgba(39,107,184,.5);}
  .m-login .form:last-child{ margin-bottom: 0;}
  .m-login .form .iconfont{ font-size: 20px; color: #606266;}
  .m-login .form .el-input__prefix{ left: 10px;}
  .m-login .form .el-input .el-input__inner{ height: 40px; line-height: 40px; border-color: #C0C4CC;}
  .m-login .form .el-input--prefix .el-input__inner{ padding-left: 40px;}
  .m-login .form .el-select,
  .m-login .form .el-button{ width: 100%; font-size: 16px;}
  .m-login .copy{ position: absolute; right: 50px; bottom: 50px; color: #fff; font-size: 12px;}
</style>
