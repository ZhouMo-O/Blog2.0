<template>
  <div class="pb-5 pl-6 pr-6">
    <v-divider class="mt-6 mb-4"></v-divider>
    <v-form v-model="valid" v-if="show">
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
            v-model="comment.site"
            :counter="30"
            label="域名(头像将会指向你的域名)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-textarea
        v-model="comment.content"
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
    <v-card class="commentList" v-for="com in commentList" :key="com._id">
      <v-card :flat="true" max-width="100%">
        <v-list-item class="grow">
          <a target="true" v-bind:href="com.site">
            <v-list-item-avatar
              :target="true"
              :href="com.site"
              color="grey darken-3"
            >
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img> </v-list-item-avatar
          ></a>

          <v-list-item-content>
            <v-list-item-title>{{ com.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
            <v-row class="center mr-1" justify="end">
              <v-icon class="articleIcon" @click="showComment(com)"
                >mdi-comment-processing-outline</v-icon
              >
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-card-text class="text-h3">
          {{ com.content }}
          <v-divider class="mt-4 mb-4"></v-divider>
          <v-form v-model="valid" v-if="com.isShow">
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
                  v-model="comment.site"
                  :counter="30"
                  label="域名(头像将会指向你的域名)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              v-model="comment.content"
              name="input-7-1"
              filled
              :label="label"
              auto-grow
              :rules="commentContent"
              required
            ></v-textarea>
            <v-btn :disabled="!valid" @click="writeBack(com)" clos="md-12"
              >submit</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { restGetAll, restPostData, restUpdata, postComment } from "../api/api";
export default {
  data() {
    return {
      valid: true,
      show: true,
      label: "输入评论",
      commentList: [],
      comment: {
        name: "",
        istopComment: true,
        domain: "",
        email: "",
        content: "",
        blogId: this.blogId
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
  props: {
    blogId: { type: String }
  },
  methods: {
    async submit() {
      await postComment(this.comment);
      this.$emit("showMessage", { msg: "评论成功!", type: "info" });
      // await restUpdata("article",{})
      this.getArticleComment();
    },
    async writeBack(com) {
      this.comment.content = `回复 ${com.name}：` + this.comment.content; //添加回复
      this.comment.replyId = com._id; //记录id
      this.comment.istopComment = false; //非顶级评论
      await postComment(this.comment); //请求api
      this.$emit("showMessage", { msg: "评论成功!", type: "info" }); //提示
      this.getArticleComment(); //刷新评论
      this.comment.content = ""; //清空输入框
      this.show = true; //重新展示默认输入框
    },
    showComment(com) {
      this.label = `回复 ${com.name}：`;
      const nowStatus = com.isShow;
      this.commentList.forEach(item => {
        item.isShow = false;
      });
      com.isShow = !nowStatus;
      this.show = nowStatus;
    },
    async getArticleComment() {
      let comment = await restGetAll("comment", { blogId: this.blogId });
      this.commentList = comment.data.map(item => {
        this.$set(item, "isShow", false); //隐藏当前评论组件
        return item;
      });
      console.log(this.commentList);
    }
  },
  mounted() {
    this.getArticleComment();
  }
};
</script>

<style scoped>
.commentList {
  margin-bottom: 10px;
}

#message {
  z-index: 999;
}

#message .v-snack__wrapper {
  z-index: 999;
}
</style>
