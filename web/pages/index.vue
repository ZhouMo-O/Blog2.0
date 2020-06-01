<template>
  <div>
    <!-- <v-card>111 <v-overlay :absolute="absolute"> </v-overlay></v-card> -->
    <v-card class="indexCard"> </v-card>
    <articleCard></articleCard>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import articleCard from "~/components/articleCard.vue";
export default {
  data() {
    return {};
  },
  mmethods: {},
  components: {
    Logo,
    articleCard
  }
};
</script>

<style scoped>
.indexCard {
  background: url("http://www.blog5.net.cn/img/zaoshang.5a507c1e.jpg");
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
