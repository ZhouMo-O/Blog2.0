<template>
  <div>
    <v-card color="#F0F0F0" class="articleTopCard">
      <h2 class="text-center">友情链接 , 链接友情</h2>
    </v-card>
    <div>
      <v-container>
        <v-row>
          <v-col :sm="3" :md="1" :lg="2" v-for="item in model" :key="item._id">
            <v-hover>
              <template v-slot="{ hover }">
                <a v-bind:href="item.blogRollAddr">
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
                      v-bind:src="
                        model.blogRollIcon ||
                          ` http://api.btstu.cn/sjtx/api.php?lx=c1&format=images`
                      "
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
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async getAllBlogRoll() {
      let res = await restGetAll("blogRoll");
      this.model = res.data;
    }
  },
  created() {
    this.getAllBlogRoll();
  }
};
</script>

<style>
.articleTopCard {
  width: 100vw;
  height: 45vh;
  background: #4f7da4;
  /* border: 1px solid red !important; */
  background-size: cover;
}

h2 {
  text-align: center;
  padding-top: 15vh;
}
</style>
