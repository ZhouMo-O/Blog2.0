<template>
  <div>
    <el-dialog title="回复评论" :visible.sync="dialogFormVisible">
      <el-form :model="writeBackProps">
        <el-form-item label="回复内容：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="writeBackProps.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="sendComment" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="items" stripe style="width: 100%">
      <el-table-column prop="createTime" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="blogId" label="博客标题" width="180">
      </el-table-column>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="site" label="网站"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>

      <el-table-column fixed="right" label="操作" width="300">
        <template slot="header" slot-scope="scope">
          <el-input
            @input="SearchTable"
            v-model="search"
            size="mini"
            :key="scope._id"
            placeholder="输入版本号搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/comment/view/${scope.row._id}`)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button @click="writeBack(scope.row)" type="text" size="small"
            >回复</el-button
          >
          <el-button @click="remove(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  restgetAll,
  restDeleteOne,
  deleteFile,
  filterBlog,
  postComment,
} from "../../Api/api";
export default {
  name: "softWareList",
  props: { id: {} },
  data() {
    return {
      items: [],
      search: "",
      dialogFormVisible: false,
      writeBackProps: {
        name: "周末",
        istopComment: false,
        isauthorsComment: true,
        domain: "https://www.blog5.net.cn",
        email: "1181649328@qq.com",
        content: "",
        blogId: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    async fetch() {
      const data = await restgetAll("comment");
      this.items = data.data;
    },
    SearchTable() {
      console.log("1");
    },
    async writeBack(row) {
      this.dialogFormVisible = true;
      this.writeBackProps.blogId = row.blogId;
      this.writeBackProps.replyId = row._id;
      this.writeBackProps.name = row.name;
    },
    async sendComment() {
      this.dialogFormVisible = false;
      this.writeBackProps.content =
        `回复 ${this.writeBackProps.name}:` + this.writeBackProps.content;
      this.writeBackProps.name = "周末";
      await postComment(this.writeBackProps);
      this.$message({
        type: "success",
        message: "回复成功",
      });
    },

    async remove(row) {
      this.$confirm(`确定删除 ${row.title} 吗？,该操作不可逆`, "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          await restDeleteOne("comment", row._id);
          this.fetch();
          this.$notify({
            title: "成功",
            type: "success",
            message: "删除成功",
          });
        })
        .catch((err) => {
          console.log(`删除错误`, err);
        });
    },
  },
  created() {
    this.id ? this.findcommentTag() : this.fetch();
  },
};
</script>

<style></style>
