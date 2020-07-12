<template>
  <v-app dark>
    <navComponent />
    <v-content>
      <nuxt />
    </v-content>

    <footerComponent />
  </v-app>
</template>

<script>
import footerComponent from "../components/footer.vue";
import navComponent from "~/components/nav.vue";
export default {
  data() {
    return {
      fixed: true
    };
  },
  components: {
    navComponent,
    footerComponent
  },
  methods: {}
};
</script>
