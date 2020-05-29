<template>
  <div>
    <!-- <v-card>111 <v-overlay :absolute="absolute"> </v-overlay></v-card> -->
    <v-card class="indexCard"> </v-card>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  data() {
    return {
      overlay: false,
      absolute: true
    };
  },
  mmethods: {},
  components: {
    Logo,
    VuetifyLogo
  }
};
</script>

<style scoped>
.indexCard {
  position: absolute;
  background: url("http://www.blog5.net.cn/img/zaoshang.5a507c1e.jpg");
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
