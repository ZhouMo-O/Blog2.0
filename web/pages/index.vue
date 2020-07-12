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
  background: url("https://images.unsplash.com/photo-1481988535861-271139e06469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1067&q=80");
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
