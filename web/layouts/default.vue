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
pre {
  background: initial !important;
  padding-left: 15px !important;
  margin-top: 10px !important;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2) !important;
  border-radius: 4px !important;
}

.v-application code {
  background-color: inherit !important;
  color: inherit !important;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace !important;
  font-size: 16px !important;
  font-weight: normal !important;
}

code {
  box-shadow: none !important ;
}
.hljs {
  color: #cccccc !important;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace !important;
  background: #23241f !important;
  overflow: auto !important;
}
.hljs-keyword {
  color: #cc99cd !important;
}
.hljs-string {
  color: #7ec699 !important;
}
.hljs-comment {
  color: #999999 !important;
}
.hljs-title {
  color: #f8c555 !important;
}
.hljs-built_in {
  color: #f08d49 !important;
}
</style>
