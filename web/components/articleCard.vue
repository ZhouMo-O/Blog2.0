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
      >
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 2 : 10"
              class="mx-auto"
              max-width="350"
              max-height="380"
              :to="`/article/${item._id}`"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>{{ item.title }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>

              <v-card-actions class="articleMessage">
                <!-- time -->
                <p class="overline">
                  {{ item.createTime.slice(0, 8) }}
                </p>
                <div class="likeAndRead">
                  <!-- read -->
                  <p class="read overline">
                    <v-icon class="articleIcon">mdi-eye-outline</v-icon>
                    {{ item.read }}
                  </p>

                  <!-- comment -->
                  <p class="comment overline">
                    <v-icon class="articleIcon"
                      >mdi-comment-processing-outline</v-icon
                    >
                    10
                  </p>
                  <!-- like -->
                  <p class="like overline">
                    <v-icon class="articleIcon">mdi-thumb-up-outline</v-icon>
                    {{ item.like }}
                  </p>
                </div>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
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
.articleMessage {
  position: relative;
}

.likeAndRead {
  position: absolute;
  right: 10px;
}
.likeAndRead p {
  float: left;
  margin-left: 4px;
}

.articleIcon {
  font-size: 20px;
}
@media screen and (min-width: 1500px) {
  #cardIndex {
    max-width: 1450px;
  }
}
</style>
