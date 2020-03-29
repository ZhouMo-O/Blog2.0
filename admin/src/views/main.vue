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
              <i class="el-icon-s-order"></i>版本管理
            </template>
            <el-menu-item-group>
              <template slot="title">Mc</template>
              <el-menu-item index="/mc/create">上传MC</el-menu-item>
              <el-menu-item index="/mc/list">MC列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">An</template>
              <el-menu-item index="/an/create">上传AN</el-menu-item>
              <el-menu-item index="/an/list">AN列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">Ac</template>
              <el-menu-item index="/ac/create">上传AC</el-menu-item>
              <el-menu-item index="/ac/list">AC列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu class="projectMan" index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>项目管理
            </template>
            <el-menu-item-group>
              <template slot="title">项目</template>
              <el-menu-item class="projectCreate" index="/project/create"
                >创建项目</el-menu-item
              >
              <el-menu-item index="/project/list">项目列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-data"></i>用户管理
            </template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item class="userCreate" index="/user/create"
                >创建用户</el-menu-item
              >
              <el-menu-item index="/user/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-suitcase-1"></i>工具
            </template>
            <el-menu-item-group>
              <template slot="title">交换机</template>
              <el-menu-item class="excel2xml" index="/tool/excel2xml"
                >Excel2XML</el-menu-item
              >
              <el-menu-item class="xml2excel" index="/tool/xml2excel"
                >XML2Excel</el-menu-item
              >
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
export default {};
</script>

<style></style>
