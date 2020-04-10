<template>
  <el-table :data="items" stripe style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>
<script>
import { restgetAll, restDeleteOne, deleteFile } from "../../api/api";
export default {
  name: "softWareList",
  props: { id: {} },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const data = await restgetAll("blog");
      this.items = data.data;
      console.log(data);
    },

    async remove(row) {
      this.$confirm(
        `确定删除 ${row.versionNumber} 吗？,该操作不可逆`,
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(async () => {
          await restDeleteOne("softWare", row._id);
          if (!row.fileName == " " || !row.fileName == undefined) {
            //如果根本上传文件，就不用去后台删除文件了。
            await deleteFile(row.fileName);
          }
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
    this.id ? this.findblogTag() : this.fetch();
  },
};
</script>

<style></style>
