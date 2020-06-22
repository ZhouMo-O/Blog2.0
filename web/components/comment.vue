<template>
  <v-card>
    <v-card :tile="false" class="mx-auto" :flat="true" max-width="100%">
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-row align="center mr-1" justify="end">
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-card-text class="text-h3">
        "Turns out semicolon-less style is easier and safer in TS because most
        gotcha edge cases are type invalid as well."
      </v-card-text>
    </v-card>
    <v-divider class="mt-4 mb-4"></v-divider>
    <v-card :tile="false" class="mx-auto" :flat="true" max-width="100%">
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-row align="center mr-1" justify="end">
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-card-text class="text-h3">
        "Turns out semicolon-less style is easier and safer in TS because most
        gotcha edge cases are type invalid as well."
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import { restGetAll } from "../api/api";
export default {
  data() {
    return {
      comment: []
    };
  },
  props: {
    blogId: { type: String }
  },
  methods: {
    async getArticleComment() {
      let comment = await restGetAll("comment", { blogId: this.blogId });
      this.comment = comment.data;
      console.log(this.comment);
    }
  },
  mounted() {
    this.getArticleComment();
  }
};
</script>

<style></style>
