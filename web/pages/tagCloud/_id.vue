<template>
  <div>
    <v-card color="white" height="280px;">
      <h1 class="tagName text-center">{{ tagData.tagName }}</h1></v-card
    >
    <articleCard :articleId="tagId" :articles="articles" />
  </div>
</template>

<script>
import { restGetAll, restGetOne } from "../../api/api";
import articleCard from "../../components/articleCard";
import { pageHead } from "../../utils/seo";

export default {
  components: {
    articleCard
  },
  // 服务端预取标签名与关联文章
  async asyncData({ params }) {
    let tagData = {};
    let articles = [];
    try {
      const t = await restGetOne("tag", params.id);
      tagData = t.data || {};
    } catch (err) {}
    try {
      const a = await restGetAll("article", {
        privacy: false,
        relatedTag: params.id
      });
      articles = a.data || [];
    } catch (err) {}
    return { tagData, articles, tagId: params.id };
  },
  data() {
    return { tagData: {}, articles: [], tagId: "" };
  },
  head() {
    const name = (this.tagData && this.tagData.tagName) || "标签";
    return pageHead({
      title: `${name} - 标签文章`,
      description: `Starry-周末的个人博客中「${name}」标签下的全部文章列表。`,
      path: `/tagCloud/${this.tagId}`,
      type: "website"
    });
  }
};
</script>

<style scoped>
.tagName {
  padding: 100px;
}
</style>
