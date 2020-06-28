<template>
  <div class="article">
    <v-snackbar
      id="message"
      v-model="snackbar"
      :color="'success'"
      :multi-line="'multi-line'"
      :timeout="timeout"
      :top="'top'"
    >
      {{ text }}
      <template>
        <v-btn dark text @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
        <v-btn block color="primary" dark @click="test">
          Show Snackbar
        </v-btn>
        <like></like>
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

import like from "../../components/like";
import comment from "../../components/comment";
import snackbar from "../../components/snackbar";
export default {
  data() {
    return {
      snackbar: this.$store.state.model,
      text: "1231231231",
      timeout: 7000,
      valid: true,
      title: {},
      model: {},
      commentList: [],
      id: ""
    };
  },

  methods: {
    test() {
      this.$store.commit("changeSteta");
      console.log(this.$store.state.model);
      if (this.$store.state.model) {
        this.snackbar = true;
      }
    },
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
  components: { comment, snackbar, like },
  mounted() {
    this.getArticle();
  }
};
</script>

<style scoped>
.articleBody {
  position: relative;
  z-index: 0;
}

.mavonEditor {
  z-index: 0;
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
  z-index: 0;
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
