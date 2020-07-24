<template>
  <div>
    <v-card color="white" height="300px">
      <h1 class="pt-12 text-center">{{ tagData.tagName }}</h1></v-card
    >
    <articleCard :articleId="this.tagId" />
  </div>
</template>

<script>
import { restGetAll, restGetOne } from "../../api/api";
import articleCard from "../../components/articleCard";
export default {
  data() {
    return { tagData: {}, tagId: this.$route.params.id };
  },
  methods: {
    async getTagName() {
      let res = await restGetOne("tag", this.tagId);
      this.tagData = res.data;
    },
    async getAllRelatedTagArticle() {
      let query = { relatedTag: this.tagId };
      let res = await restGetAll("article", query);
      console.log(res);
    }
  },
  components: {
    articleCard
  },
  mounted() {
    this.getAllRelatedTagArticle();
    this.getTagName();
  }
};
</script>

<style scoped></style>
