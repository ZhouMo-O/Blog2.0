<template>
  <v-container id="cardIndex">
    <v-row>
      <v-col
        :sm="6"
        :md="4"
        :lg="3"
        v-for="item in model"
        :key="item._id"
        id="articleCard"
        ><nuxt-link :to="'/article/article'">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :elevation="hover ? 2 : 10"
                class="mx-auto"
                max-width="350"
                max-height="380"
              >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                  <v-card-title>Top 10 Australian beaches</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>Whitehaven Beach</div>

                  <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="orange" text>Share</v-btn>
                  <v-btn color="orange" text>Explore</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { restGetAll } from "../api/api";
export default {
  data: () => ({
    overlay: false,
    model: []
  }),
  methods: {
    async getAllarticle() {
      let article = await restGetAll("article", { privacy: false });
      this.model = article.data;
      console.log(article.data);
    }
  },
  created() {
    this.getAllarticle();
  }
};
</script>

<style scoped>
@media screen and (min-width: 1500px) {
  #cardIndex {
    max-width: 1450px;
  }
}
</style>
