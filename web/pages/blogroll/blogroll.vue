<template>
  <div>
    <v-card color="#F0F0F0" class="articleTopCard">
      <h2 class="text-center">友情链接 , 链接友情</h2>
    </v-card>
    <div>
      <v-container>
        <v-row>
          <v-col :sm="3" :md="3" :lg="2" v-for="item in model" :key="item._id">
            <v-hover>
              <template v-slot="{ hover }">
                <a v-bind:href="item.blogRollAddr" rel="noopener">
                  <v-card
                    hover
                    :elevation="hover ? 10 : 4"
                    class="mx-auto "
                    max-width="200"
                    max-height="400"
                  >
                    <v-img
                      class="white--text align-end"
                      height="150px"
                      v-bind:src="item.blogRollIcon"
                    >
                    </v-img>

                    <v-card-text class="display-1 text--primary">
                      <v-list-item-title class="headline text-center">{{
                        item.blogRollName
                      }}</v-list-item-title>
                    </v-card-text>
                  </v-card>
                </a>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { restGetAll } from "../../api/api";
import { pageHead } from "../../utils/seo";

// 缺图标时的本地占位图。
// 原先用的是 http://api.btstu.cn 的随机图接口，在 https 页面下会被浏览器按混合内容拦截。
const PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150">' +
      '<rect width="100%" height="100%" fill="#e0e0e0"/>' +
      '<text x="50%" y="54%" font-size="30" text-anchor="middle" fill="#90a4ae" font-family="sans-serif">友链</text>' +
      "</svg>"
  );

export default {
  // 服务端预取友链，首屏即可见
  async asyncData() {
    try {
      const res = await restGetAll("blogroll");
      const model = (res.data || []).map(item => ({
        ...item,
        blogRollIcon: item.blogRollIcon || PLACEHOLDER
      }));
      return { model };
    } catch (err) {
      return { model: [] };
    }
  },
  data() {
    return {
      model: []
    };
  },
  head() {
    return pageHead({
      title: "友情链接",
      description: "Starry-周末的个人博客友情链接页面，收录长期交流的优质个人博客。",
      path: "/blogroll/blogroll",
      type: "website"
    });
  }
};
</script>

<style>
.articleTopCard {
  width: 100vw;
  height: 35vh;
  background: #4f7da4;
  /* border: 1px solid red !important; */
  background-size: cover;
}

h2 {
  text-align: center;
  padding-top: 15vh;
}
</style>
