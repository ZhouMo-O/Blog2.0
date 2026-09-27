<template>
  <div class="article">
    <v-snackbar
      id="message"
      v-model="snackbar"
      :color="color"
      :multi-line="'multi-line'"
      :timeout="timeout"
      :top="'top'"
    >
      {{ text }}
      <template>
        <v-btn dark text @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card color="#F0F0F0" class="articleTopCard">
      <h1 class="text-center articleTitle">{{ model.title }}</h1>
    </v-card>
    <v-container id="articleContainer">
      <div class="articleMessage">
        <v-chip close-icon="mdi-calendar-month" small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-calendar-month</v-icon>
          {{ model.createTime }}
        </v-chip>
        <v-chip small color="#F0F0F0">
          <v-icon dense class="articleIcon">mdi-eye-outline</v-icon>
          {{ model.read }}
        </v-chip>
        <v-chip small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-comment-processing-outline</v-icon>
          {{ model.comment }}
        </v-chip>
        <v-chip small color="#F0F0F0">
          <v-icon class="articleIcon">mdi-thumb-up-outline</v-icon>
          {{ model.like }}
        </v-chip>
      </div>
      <v-card class="articleBody">
        <div class="article">
          <div class="mavonEditor">
            <!-- 正文改为服务端渲染好的 HTML：
                 首屏无需等待 JS，搜索引擎也能直接抓取到全文 -->
            <div class="markdown-body ssr-article-body" v-html="renderedHtml"></div>
          </div>
        </div>
        <like @showMessage="showMsg" :blogId="this.$route.params.id"></like>
        <comment
          @showMessage="showMsg"
          :blogId="this.$route.params.id"
        ></comment>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { counter } from "../../api/api";
import like from "../../components/like";
import comment from "../../components/comment";
import snackbar from "../../components/snackbar";
import { pageHead, articleJsonLd, toDateString } from "../../utils/seo";

//同一标签页内同一次访问只计一次，防止刷阅读量；
//跨会话/重新打开仍会正常 +1
const READ_ONCE_KEY = "starry_read_once";

export default {
  // 服务端一次性拿到文章数据 + 渲染好的正文
  async asyncData({ params, $axios }) {
    const origin = process.server
      ? process.env.SELF_URL || "http://127.0.0.1:3000"
      : window.location.origin;
    try {
      const res = await $axios.$get(
        origin + "/article-html/" + encodeURIComponent(params.id)
      );
      if (res && res.ok && res.article) {
        return { model: res.article, renderedHtml: res.html || "" };
      }
    } catch (err) {
      console.log(err);
    }
    return { model: {}, renderedHtml: "" };
  },
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 7000,
      color: "info",
      valid: true,
      title: {},
      model: {},
      renderedHtml: "",
      commentList: [],
      id: ""
    };
  },
  props: {
    blogId: { type: String }
  },
  methods: {
    showMsg(data) {
      this.snackbar = true;
      this.text = data.msg;
      this.color = data.type;
    },
    //更新阅读量。
    //原先前端直接 PUT 整个文章对象 —— 在第一阶段给写操作加上登录鉴权后该请求会 401，
    //阅读量不再增长；而且回传整个对象本身存在被篡改字段的风险。
    //现在改为调用只接受白名单字段、仅允许 +/-1 的计数接口，且只在浏览器端记，避免爬虫刷量。
    async updateArticleInfo() {
      try {
        let seen = [];
        try {
          seen = JSON.parse(sessionStorage.getItem(READ_ONCE_KEY) || "[]");
        } catch (e) {
          seen = [];
        }
        if (seen.indexOf(this.$route.params.id) !== -1) return;
        seen.push(this.$route.params.id);
        sessionStorage.setItem(READ_ONCE_KEY, JSON.stringify(seen));
      } catch (e) {
        // sessionStorage 不可用时忽略去重，继续计数
      }
      try {
        const res = await counter("read", this.$route.params.id, 1);
        if (res && res.data && typeof res.data.read === "number") {
          this.$set(this.model, "read", res.data.read);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  components: { comment, snackbar, like },
  mounted() {
    this.updateArticleInfo();
  },
  head() {
    const a = this.model || {};
    const id = a._id || this.$route.params.id;
    return pageHead({
      title: a.title || "文章",
      description: a.Intro || (a.title ? "Starry-周末的个人博客文章：" + a.title : ""),
      path: "/article/" + id,
      type: "article",
      image: a.cover,
      publishedTime: toDateString(a.createTime),
      modifiedTime: toDateString(a.upDateTime),
      jsonld: articleJsonLd(a)
    });
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

.articleTitle {
  text-align: center;
  padding-top: 15vh;
  color: white;
}

.articleBody {
  min-height: 50vh;
  margin: 0 auto;

  position: relative;
  top: -100px;
  z-index: 0;
}

.articleMessage {
  width: 95vw;
  margin: 0 auto;
  position: relative;
  top: -105px;
  z-index: 2;
}

.articleIcon {
  font-size: 23px;
}
</style>

<!-- v-html 注入的内容不会被 scoped 样式命中，因此正文排版规则写成全局样式 -->
<style>
.ssr-article-body {
  background: #ffffff !important;
  min-width: 0 !important;
  border: 0;
  padding: 16px;
  line-height: 1.75;
  word-wrap: break-word;
  overflow-x: auto;
}

.ssr-article-body img {
  max-width: 100%;
  height: auto;
}

.ssr-article-body h1,
.ssr-article-body h2,
.ssr-article-body h3,
.ssr-article-body h4 {
  margin: 20px 0 12px;
  font-weight: 600;
  line-height: 1.35;
}

.ssr-article-body pre {
  padding: 12px !important;
  background: #23241f !important;
  overflow: auto;
  border-radius: 4px;
}

.ssr-article-body pre code {
  min-width: 0 !important;
  background: transparent !important;
  color: #cccccc !important;
  box-shadow: none !important;
}

.ssr-article-body table {
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
  width: 100%;
}

.ssr-article-body table th,
.ssr-article-body table td {
  border: 1px solid #dfe2e5;
  padding: 6px 10px;
}

.ssr-article-body blockquote {
  border-left: 4px solid #dfe2e5;
  padding-left: 12px;
  color: #6a737d;
  margin-left: 0;
}

.ssr-article-body a {
  color: #1976d2;
}
</style>
