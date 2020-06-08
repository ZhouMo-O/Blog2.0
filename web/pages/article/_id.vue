<template>
  <div class="article">
    <v-card color="#F0F0F0" class="articleTopCard">
      <h2 class=" text-center">一个测试标题稍微长一点</h2>
    </v-card>
    <v-container id="articleContainer">
      <div class="articleMessage">
        <v-chip close-icon="mdi-calendar-month" small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-calendar-month</v-icon
          >2020-6-3</v-chip
        >
        <v-chip small color="#F0F0F0">
          <v-icon dense class="articleIcon">mdi-eye-outline</v-icon
          >50000</v-chip
        >
        <v-chip small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-comment-processing-outline</v-icon
          >10</v-chip
        >
        <v-chip small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-thumb-up-outline</v-icon>15</v-chip
        >
      </div>
      <v-card class="articleBody">
        <div class="article">
          <span v-for="n in 100" :key="n"
            >这是一段测试内容，循环一百次，模拟字数较多时候的时候的整体观感</span
          >
        </div>
        <v-divider class="mt-4 mb-4"></v-divider>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="model.name"
                :rules="nameRules"
                :counter="10"
                label="昵称"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="model.email"
                :rules="emailRules"
                label="E-mail(收到回复会以邮件通知你)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="model.domain"
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
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { restGetAll } from "../../api/api";

export default {
  data() {
    return {
      valid: true,
      model: { name: "", domain: "", email: "" },

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
    async getAllArticle() {
      let article = await restGetAll("article");
      console.log(article);
    },

    submit() {
      this.$refs.form.validate();
    }
  },
  components: {},
  created() {
    this.getAllArticle();
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
