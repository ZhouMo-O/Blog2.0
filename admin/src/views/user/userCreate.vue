/* eslint-disable no-console */
<template>
  <div class="user">
    <h1 class="title">{{ id ? "编辑" : "创建" }}用户</h1>
    <el-form
      :model="model"
      ref="model"
      label-width="120px"
      @submit.native.prevent="save('model')"
      name="CreateProject"
    >
      <el-form-item label="用户名称" prop="userName">
        <el-input
          class="projectName"
          maxlength="10"
          v-model="model.userName"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="passWord">
        <el-input class="projectFeatures" v-model="model.passWord"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:1rem">
        <el-button class="sendProjectItem" type="primary" native-type="subumit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userRegister } from "../../Api/api";
export default {
  name: "createProject",
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      rules: {
        projectName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        projectFeatures: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async fetchItem() {
      const res = await this.$http.get(`/rest/user/${this.id}`);
      this.model = res.data;
    },
    async save(formName) {
      await this.$refs[formName].validate(); //校验表单上是否有错误
      if (this.id) {
        await this.$http.put(`rest/user/${this.id}`, this.model);
      } else {
        await userRegister(this.model);
        this.$notify({
          title: "成功",
          type: "success",
          message: "添加项目成功",
        });
      }
      this.$router.push("/user/list");
    },
  },
  created() {
    this.id && this.fetchItem();
  },
};
</script>

<style></style>
