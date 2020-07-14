<template>
  <v-footer dark padless>
    <v-card
      width="100vw"
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <v-row>
          <v-col :xs="12" :sm="12" :md="4"> 热门文章</v-col>
          <v-col :xs="12" :sm="12" :md="4"><tagCloud /></v-col>
          <v-col :xs="12" :sm="12" :md="4">友情链接</v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong><br />
        <strong>
          <a href="http://www.miitbeian.gov.cn/">渝ICP备2008467</a>
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import tagCloud from "./tagCloud";
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
  }),
  components: {
    tagCloud
  }
};
</script>

<style></style>
