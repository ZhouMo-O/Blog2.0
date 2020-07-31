<template>
  <el-container>
    <el-header style>
      <h1 id="title">{{ title }}</h1>
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px;color:#FFFFFF"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item command="logOut">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>欢迎您 {{ this.userName }}</span>
    </el-header>

    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu open="[1]" router :default-active="$router.path">
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-order"></i>文章管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/article/create">发布文章</el-menu-item>
              <el-menu-item index="/article/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>评论管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/comment/list">评论列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>标签管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/tag/create">添加标签</el-menu-item>
              <el-menu-item index="/tag/list">标签列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>用户管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/user/create">添加用户</el-menu-item>
              <el-menu-item index="/user/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-order"></i>友链管理
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="/blogroll/create">添加友链</el-menu-item>
              <el-menu-item index="/blogroll/list">友链列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "McCreate",
  data() {
    return {
      userName: "",
      title: "Starry",
    };
  },
  methods: {
    getUser() {
      this.userName = localStorage.userName;
    },
    handleCommand(cmd) {
      if (cmd == "logOut") {
        localStorage.clear();
        console.log(localStorage.token);
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出登录成功",
        });
      }
    },
  },
  created() {
    this.getUser();
  },
};
</script>
<style>
.el-header {
  background: #125158;
  text-align: right;
  font-size: 12px;
  color: #ffffff;
  line-height: 60px;
  box-shadow: 1px -5px 15px #1e1e1e;
  z-index: 999;
}

#title {
  position: absolute;
  left: 30px;
  font-size: 17px;
  line-height: 30px;
}

.el-aside {
  color: #333;
}
</style>
