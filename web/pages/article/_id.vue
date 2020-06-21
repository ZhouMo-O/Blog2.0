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
        <v-divider class="mt-4 mb-4"></v-divider>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="comment.name"
                :rules="nameRules"
                :counter="10"
                label="昵称"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="comment.email"
                :rules="emailRules"
                label="E-mail(收到回复会以邮件通知你)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="comment.domain"
                :counter="10"
                label="域名(头像将会指向你的域名)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            name="input-7-1"
            filled
            label="输入评论"
            auto-grow
            :rules="commentContent"
            required
          ></v-textarea>
          <v-btn :disabled="!valid" @click="submit" clos="md-12">submit</v-btn>
        </v-form>
        <v-divider class="mt-4 mb-4"></v-divider>
        <v-card
          v-for="com in commentList"
          :tile="false"
          class="mx-auto"
          color="#26c6da"
          max-width="100%"
        >
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Evan You</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
          <v-card-text class="text-h3">
            "Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well."
          </v-card-text>
        </v-card>
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

export default {
  data() {
    return {
      valid: true,
      title: {},
      model: {},
      commentList: [],
      id: "",
      comment: {
        name: "",
        domain: "",
        email: "",
        blogId: this.$route.params.id
      },
      nameRules: [
        v => !!v || "您贵姓？",
        v => (v && v.length <= 10) || "超“十”了"
      ],
      email: "",
      emailRules: [
        v => !!v || "邮件是必须的，收到了回复会以邮件形式通知你",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      commentContent: [v => !!v || "多少说一句"]
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
    },
    async getAllComment() {
      let commentList = await restGetAll("comment");
      this.commentList = commentList.data;
    },
    async submit() {
      // this.$refs.form.validate();
      await restPostData("comment", this.comment);
    }
  },
  components: {},
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
