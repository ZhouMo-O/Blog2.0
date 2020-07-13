<template>
  <div>
    <v-card>tagName</v-card> <articleCard :articleId="this.$router.params.id" />
  </div>
</template>

<script>
import { restGetAll } from "../../api/api";
import articleCard from "../../components/articleCard";
export default {
  data() {
    return {};
  },
  methods: {
    async getAllRelatedTagArticle() {
      let query = { relatedTag: this.$route.params.id };
      let res = await restGetAll("article", query);
      console.log(res);
    }
  },
  components: {
    articleCard
  },
  mounted() {
    this.getAllRelatedTagArticle();
  }
};
</script>

<style></style>
