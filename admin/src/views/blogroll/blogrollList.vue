<template>
  <el-table :data="items" stripe style="width: 100%">
    <el-table-column prop="createTime" label="日期" width="180">
    </el-table-column>
    <el-table-column prop="tagName" label="博客标题" width="180">
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="300">
      <template slot="header" slot-scope="scope">
        <el-input
          @input="SearchTable"
          v-model="search"
          size="mini"
          :key="scope._id"
          placeholder="输入标签搜索"
        />
      </template>
      <template slot-scope="scope">
        <el-button
          @click="$router.push(`/tag/view/${scope.row._id}`)"
          type="text"
          size="small"
          >查看</el-button
        >
        <el-button
          @click="$router.push(`/tag/edit/${scope.row._id}`)"
          type="text"
          size="small"
          >编辑</el-button
        >
        <el-button @click="remove(scope.row)" type="text" size="small"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {
  restgetAll,
  restDeleteOne,
  deleteFile,
  filterBlog,
} from "../../Api/api";
export default {
  name: "tagList",
  props: { id: {} },
  data() {
    return {
      items: [],
      search: "",
    };
  },
  methods: {
    async fetch() {
      const data = await restgetAll("tag");
      this.items = data.data;
    },
    SearchTable() {
      console.log("1");
    },

    async remove(row) {
      this.$confirm(`确定删除 ${row.title} 吗？,该操作不可逆`, "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          await restDeleteOne("tag", row._id);
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
    this.id ? this.findtagTag() : this.fetch();
  },
};
</script>

<style></style>
