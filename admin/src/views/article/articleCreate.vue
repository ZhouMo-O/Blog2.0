<template>
  <div id="editor">
    <mavon-editor @save="saveDoc" style="height: 100%"></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { restPostData } from "../../Api/api";
export default {
  data() {
    return { model: {} };
  },
  methods: {
    async saveDoc(markdown, html) {
      this.model.markdown = markdown;
      this.model.html = html;
      let data = await restPostData("blog", this.model);
      console.log(data);
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
