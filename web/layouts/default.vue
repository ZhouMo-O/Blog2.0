<template>
  <v-app>
    <v-app-bar elevate-on-scroll app>
      <v-toolbar-title v-text="title" />
      <v-col>
        <v-btn-toggle v-model="text" tile color="deep-purple accent-3" group>
          <v-btn value="left" @click="$router.push(`/test`)">
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
      <v-container>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <nuxt />
      </v-container>
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
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      title: "Vuetify.js"
    };
  },
  methods: {
    test() {
      alert("1");
    }
  }
};
</script>
