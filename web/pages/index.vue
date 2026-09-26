<template>
  <div>
    <!-- <v-card>111 <v-overlay :absolute="absolute"> </v-overlay></v-card> -->
    <v-card>
      <v-img
        class="indexCard"
        src="https://xiaowublog1.oss-cn-shanghai.aliyuncs.com/starry.jpg"
        aspect-ratio="1.7"
      >
        <!-- 标题改为始终渲染（原先 v-if 为 false，导致 SSR 输出里既没有 h1 也没有正文） -->
        <div class="greet">
          <h1>周末的个人博客</h1>
          <h5 class="">脚踏实地，仰望星空</h5>
        </div>
      </v-img>
    </v-card>
    <articleCard :articles="articles"></articleCard>
  </div>
</template>

<script>
import articleCard from "~/components/articleCard.vue";
import { restGetAll } from "~/api/api";
import { pageHead, websiteJsonLd, DEFAULT_DESC } from "~/utils/seo";

export default {
  components: {
    articleCard
  },
  // 服务端预取文章列表：首屏直接带内容渲染，爬虫也能直接抓到
  async asyncData() {
    try {
      const res = await restGetAll("article", { privacy: false });
      return { articles: res.data || [] };
    } catch (err) {
      return { articles: [] };
    }
  },
  data() {
    return {
      articles: []
    };
  },
  head() {
    return pageHead({
      title: "Starry-周末的个人博客",
      description: DEFAULT_DESC,
      path: "/",
      type: "website",
      jsonld: websiteJsonLd()
    });
  }
};
</script>

<style lang="scss" scoped>
.indexCard {
  $border-color: #f90;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  color: white;
  .greet {
    margin: 0 auto;
    text-align: center;
    padding: 35vh 0;
    animation: greetFade 1.5s ease both;
  }
}
@keyframes greetFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
