<template>
  <div class="createArtlce">
    <el-form
      ref="model"
      :model="model"
      label-width="80px"
      @submit.native.prevent="save('model')"
    >
      <el-form-item label="友链名称">
        <el-input v-model="model.tagName"></el-input>
      </el-form-item>
      <el-form-item label="友链名称">
        <div v-html="model.html"></div>
      </el-form-item>
      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" class="save" native-type="subumit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { restPostData, restgetOne, restUpdata } from "../../Api/api";
export default {
  name: "tagList",
  props: { id: {} },
  data() {
    return { model: {} };
  },
  methods: {
    //根据ID获取要编辑的友链
    async fetchTag() {
      let res = await restgetOne("article", "5f23cd58f20af766594597bd");
      this.model = res.data;
      console.log(this.model);
    },

    async save(formName) {
      let res;
      if (this.id) {
        this.model.upDateTime = new Date().toLocaleString(); //输入更新时间
        res = await restUpdata("tag", this.id, this.model);
      } else {
        res = await restPostData("tag", this.model);
      }
      this.$router.push("/tag/list");
      this.$notify({
        title: "成功",
        type: "success",
        message: "保存成功",
      });
      console.log(this.model);
    },
  },
  created() {
    this.fetchTag();
  },
};
</script>

<style></style>
