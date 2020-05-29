<template>
  <v-app dark>
    <navComponent />
    <v-content>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import navComponent from "~/components/nav.vue";
export default {
  data() {
    return {
      fixed: true
    };
  },
  components: {
    navComponent
  },
  methods: {}
};
</script>
