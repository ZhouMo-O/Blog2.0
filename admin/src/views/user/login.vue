<template>
  <div class="loginPage">
    <div class="loginBg"></div>
    <div class="login">
      <el-card header="欢迎登陆Starry后端管理系统" class="box-card">
        <el-form @submit.native.prevent="login">
          <el-form-item class="userName">
            <el-input
              placeholder="请输入账号"
              v-model="model.userName"
            ></el-input>
          </el-form-item>
          <el-form-item class="passWord">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="model.passWord"
            ></el-input>
          </el-form-item>
          <el-form-item class="captcha">
            <el-input
              placeholder="请输入验证码"
              v-model="model.code"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div @click="getCodeSrc" v-html="codeSrc"></div>
          </el-form-item>
          <el-form-item>
            <el-button class="SubBtn" type="primary" native-type="submit"
              >登录</el-button
            >
          </el-form-item>
          <el-button class="ForgetPass" type="text">忘记密码?</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getCodeSrc, userLogin } from "../../Api/api";
export default {
  name: "login",
  data() {
    return {
      model: {},
      codeSrc: "",
    };
  },
  methods: {
    async login() {
      if (!this.model.userName && !this.model.passWord) {
        this.$message({
          type: "error",
          message: "账号或密码不能为空",
        });
        return;
      }
      let res = await userLogin(this.model);
      // sessionStorage.token = res.data.token; //浏览器关闭token失效
      localStorage.token = res.data; //浏览器关闭后token依然有效
      let user = JSON.parse(res.config.data); //获取用户名
      localStorage.userName = user.userName;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登录成功",
      });
      console.log(localStorage.token);
    },

    async getCodeSrc() {
      let res = await getCodeSrc();
      this.codeSrc = res.data;
    },
  },
  created() {
    this.getCodeSrc();
  },
};
</script>

<style scoped>
.loginPage {
  width: 100vw;
  height: 100vh;
}

.loginBg {
  float: left;
  position: absolute;
  background: url("../../assets/login.jpg") no-repeat fixed top;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(0px); /* 背景虚化 */
}

.login {
  width: 420px;
  float: right;
  position: relative;
  margin-top: 23vh;
  margin-right: 10vw;
}

.box-card {
  color: #34465c !important;
  background: rgba(250, 250, 250, 0.9);
  border: 1px solid #dad4cd;
}

.SubBtn {
  width: 100%;
}

.ForgetPass {
  float: right;
}
</style>
