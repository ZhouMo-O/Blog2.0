<template>
  <v-card class="pl-2 indigo  white--text text-center">
    <v-chip-group>
      <v-chip
        label
        :to="`/tagCloud/${tag._id}`"
        color="#30B8E3"
        v-for="tag in tags"
        :key="tag._id"
      >
        {{ tag.tagName }}
      </v-chip>
    </v-chip-group>
  </v-card>
</template>

<script>
import { restGetAll } from "../api/api";
export default {
  data() {
    return {
      tags: []
    };
  },
  methods: {
    async getAllTag() {
      let res = await restGetAll("tag");
      this.tags = res.data;
    }
  },
  mounted() {
    this.getAllTag();
  }
};
</script>

<style></style>
