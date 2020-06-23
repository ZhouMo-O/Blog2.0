<template>
  <div class="article">
    <v-card color="#F0F0F0" class="articleTopCard">
      <h2 class=" text-center">{{ model.title }}</h2>
    </v-card>
    <v-container id="articleContainer">
      <div class="articleMessage">
        <v-chip close-icon="mdi-calendar-month" small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-calendar-month</v-icon
          >{{ model.createTime }}</v-chip
        >
        <v-chip small color="#F0F0F0">
          <v-icon dense class="articleIcon">mdi-eye-outline</v-icon
          >{{ model.read }}</v-chip
        >
        <v-chip small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-comment-processing-outline</v-icon
          >{{ model.comment }}</v-chip
        >
        <v-chip small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-thumb-up-outline</v-icon
          >{{ model.like }}</v-chip
        >
      </div>
      <v-card class="articleBody">
        <div class="article">
          <div class="mavonEditor">
            <no-ssr>
              <mavon-editor
                codeStyle="ascetic"
                v-model="model.html"
                :subfield="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                :boxShadow="false"
                :ishljs="true"
              />
            </no-ssr>
          </div>
        </div>
        <comment :blogId="this.$route.params.id"></comment>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import {
  restGetAll,
  restGetOne,
  restUpdata,
  restPostData
} from "../../api/api";

import comment from "../../components/comment";
export default {
  data() {
    return {
      title: {},
      model: {},
      commentList: [],
      id: ""
    };
  },

  methods: {
    //更新阅读量
    async updateArticleInfo() {
      let readNum = { read: ++this.model.read };
      await restUpdata("article", this.$route.params.id, readNum);
    },

    async getArticle() {
      let article = await restGetOne("article", this.$route.params.id);
      this.model = article.data;
      this.updateArticleInfo();
    }
  },
  components: { comment },
  mounted() {
    this.getArticle();
    process.browser &&
      document
        .querySelectorAll("pre code")
        .forEach(block => Prism.highlightElement(block));
  }
};
</script>

<style scoped>
.articleBody {
  position: relative;
}

.articleTopCard {
  width: 100vw;
  height: 45vh;
  background: #4f7da4;
  background-size: cover;
}

h2 {
  text-align: center;
  padding-top: 15vh;
}

.articleBody {
  width: 80vw;
  min-height: 50vh;
  margin: 0 auto;
  padding: 30px;
  position: relative;
  top: -100px;
}

.articleMessage {
  width: 80vw;
  margin: 0 auto;
  position: relative;
  top: -105px;
  z-index: 2;
  /* border: 1px solid red; */
}

.articleIcon {
  font-size: 25px;
  margin-right: 2px;
}
</style>
