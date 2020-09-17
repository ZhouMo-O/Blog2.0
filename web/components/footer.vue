<template>
  <v-footer padless>
    <v-card
      width="100vw"
      flat
      tile
      class="indigo lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          target
          href="https://github.com/1181649328/Blog2.0"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <v-row>
          <v-col :xs="12" :sm="12" :md="4">
            <v-card
              flat
              min-width="300"
              min-height="40"
              class="indigo lighten-1 white--text text-center"
            >
              <tagCloud />
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>Starry</strong>
        <br />
        <strong>
          <a id="beian" href="http://www.beian.gov.cn/portal/index.do/"
            >渝ICP备2008467</a
          >
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import tagCloud from "./tagCloud";
export default {
  data: () => ({
    icons: ["mdi-github ", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
  }),
  components: {
    tagCloud
  }
};
</script>

<style scoped>
#beian {
  color: aliceblue;
}
</style>
