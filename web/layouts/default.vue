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
/* 重置vuetify对于code标签的css样式 ，并且自己应用代码高亮样式*/
pre {
  padding: 0px !important;
  background: initial !important;
  margin: 25px 0 9px 0px !important;
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
  min-width: 700px !important;
  box-shadow: none !important;
  overflow-x: hidden !important;
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
