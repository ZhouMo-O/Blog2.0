<template>
  <div class="createArtlce">
    <el-form
      ref="model"
      :model="model"
      label-width="80px"
      @submit.native.prevent="save('model')"
    >
      <el-form-item label="博客名称">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item>
        <div id="editor">
          <mavon-editor @save="saveDoc" style="height: 100%"></mavon-editor>
        </div>
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
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { restPostData } from "../../Api/api";
export default {
  data() {
    return { model: {} };
  },
  methods: {
    async saveDoc(markdown, html) {
      this.model.markdown = markdown;
      this.model.html = html;
      let data = await restPostData("blog", this.model);
      console.log(data);
    },
    async save(formName) {
      let res;
      if (this.id) {
        this.model.upDateTime = new Date().toLocaleString(); //输入更新时间
        res = await restUpdata("blog", this.id, this.model);
      } else {
        res = await restPostData("blog", this.model);
      }
      this.$router.push("/article/list");
      this.$notify({
        title: "成功",
        type: "success",
        message: "保存成功"
      });
    }
  },
  components: {
    mavonEditor
  }
};
</script>

<style>
#editor {
  margin: auto;
  width: 90%;
  height: 580px;
}
</style>
