<template>
  <div class="createArtlce">
    <el-form ref="model" :model="model" label-width="80px" @submit.native.prevent="save('model')">
      <el-form-item label="博客名称">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item>
        <div id="editor">
          <mavon-editor
            codeStyle="monokai-sublime"
            v-model="model.markdown"
            @save="saveDoc"
            style="height: 100%"
            ref="md"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
          ></mavon-editor>
        </div>
      </el-form-item>
      <el-form-item label="添加标签" prop="relatedTag">
        <el-select class="select" v-model="model.relatedTag" multiple placeholder="请选择">
          <el-option
            v-for="item in tagList"
            :key="item._id"
            :label="item.tagName"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-switch v-model="model.privacy" inactive-text="私密文章"></el-switch>
      </el-form-item>

      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" class="save" native-type="subumit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import {
  restPostData,
  restgetOne,
  uploadFile,
  restUpdata,
  restgetAll,
} from "../../Api/api";
export default {
  name: "softWareList",
  props: { id: {} },
  data() {
    return { model: {}, tagList: [] };
  },
  methods: {
    async imgAdd(pos, file) {
      try {
        console.log(pos, file);
        let formdata = new FormData();
        formdata.append("file", file);
        let res = await uploadFile(formdata);
        console.log(res);
        this.$refs.md.$img2Url(pos, res.data.url);
      } catch (error) {
        console.log(`文件上传失败：${error}`);
      }
    },

    async imgDel(pos) {
      console.log(pos);
    },

    async getTag() {
      let tagData = await restgetAll("tag");
      this.tagList = tagData.data;
    },

    //根据ID获取要编辑的博客
    async fetchBlog() {
      let res = await restgetOne("article", this.id);
      this.model = res.data;
      console.log(this.model);
    },

    async saveDoc(markdown, html) {
      this.model.markdown = markdown;
      this.model.html = html;
      console.log(markdown, html);
      if (this.id) {
        this.model.upDateTime = new Date().toLocaleString(); //输入更新时间
        let data = await restUpdata(`article`, this.id, this.model);
      } else {
        let data = await restPostData("article", this.model);
      }
      this.$notify({
        title: "成功",
        type: "success",
        message: "保存成功",
      });
    },
    async save(formName) {
      let res;
      if (this.id) {
        this.model.upDateTime = new Date().toLocaleString(); //输入更新时间
        res = await restUpdata("article", this.id, this.model);
      } else {
        res = await restPostData("article", this.model);
      }
      this.$notify({
        title: "成功",
        type: "success",
        message: "保存成功",
      });
      this.$router.push("/article/list");
      console.log(this.model);
    },
  },
  components: {
    mavonEditor,
  },
  created() {
    this.id && this.fetchBlog();
    this.getTag();
  },
};
</script>

<style>
#editor {
  margin: auto;
  width: 100%;
  height: 580px;
}
</style>
