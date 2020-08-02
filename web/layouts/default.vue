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
<style>
.v-application .hljs {
  background: initial;
  color: initial;
  font-family: initial;
}

.v-application code {
  background: initial;
  color: initial;
}

.v-application code .hljs-keyword {
  background: initial;
  color: initial;
  font-family: initial;
}
.v-application code .hljs-built_in {
  background: initial;
  color: initial;
  font-family: initial;
}

.v-application code .hljs-comment {
  background: initial;
  color: initial;
  font-family: initial;
}
</style>
