<template>
  <div id="editor">
    <mavon-editor @save="saveDoc" style="height: 100%"></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {};
  },
  methods: {
    saveDoc(markdown, html) {
      console.log(markdown, html);
    },
  },
  components: {
    mavonEditor,
  },
};
</script>

<style>
#editor {
  margin: auto;
  width: 90%;
  height: 580px;
}
</style>
