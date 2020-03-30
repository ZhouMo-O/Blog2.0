<template>
  <div>
    <h1>首页</h1>
    <el-card shadow="always" class="home box-card">
      <el-card shadow="hover" class="box-card user">
        <div>用户信息展示</div>
      </el-card>
      <el-card shadow="hover" class="box-card quicklyDownLoad">
        <div>文章数据统计</div>
      </el-card>
      <el-card shadow="hover" class="box-card echarts">
        <div>访客统计，热门文章，最近评论</div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  height: 85vh;
  min-height: 75vh;
  min-width: 75vw;
}
.user {
  height: 37vh;
  width: 20vw;
  margin-right: 10px;
  float: left;
}

.quicklyDownLoad {
  height: 37vh;

  margin-left: 15px;
}
.echarts {
  height: 40vh;
  margin-top: 10px;
}
</style>
