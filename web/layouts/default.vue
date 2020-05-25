<template>
  <v-app>
    <v-app-bar elevate-on-scroll hide-on-scroll app>
      <v-toolbar-title v-text="title" />
      <v-col>
        <v-btn-toggle v-model="text" tile color="deep-purple accent-3" group>
          <v-btn value="left">
            Left
          </v-btn>

          <v-btn value="center">
            Center
          </v-btn>

          <v-btn value="right">
            Right
          </v-btn>

          <v-btn value="justify">
            Justify
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-spacer />
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "Vuetify.js"
    };
  },
  methods: {}
};
</script>
