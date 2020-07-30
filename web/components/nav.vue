<template>
  <div v-resize="ifSmallScreen">
    <v-navigation-drawer v-model="drawer" :disable-resize-watcher="true" app>
      <v-avatar color="indigo" size="36">
        <span class="white--text headline">36</span>
      </v-avatar>
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
    </v-navigation-drawer>
    <v-app-bar id="nav" flat :absolute="absolute">
      <v-expand-transition>
        <v-app-bar-nav-icon
          v-if="isSmallScreen"
          @click.stop="drawer = !drawer"
        />
      </v-expand-transition>

      <v-toolbar-title class="pl-4 mr-4" v-text="title" />
      <v-expand-transition>
        <v-btn-toggle v-if="!isSmallScreen" tile group>
          <v-btn to="/" value="首页">
            首页
          </v-btn>
          <v-btn value="归档">
            归档
          </v-btn>
          <v-btn to="/blogroll/blogroll" value="友链">
            友链
          </v-btn>
          <v-btn value="留言板">
            留言板
          </v-btn>
          <v-btn value="关于我">
            关于我
          </v-btn>
        </v-btn-toggle>
      </v-expand-transition>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
export default {
  data() {
    return {
      absolute: true,
      isSmallScreen: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "首页",
          to: "/"
        },
        {
          icon: "mdi-book-open-outline",
          title: "博客",
          to: "/article/article"
        },
        {
          icon: "mdi-book-open-outline",
          title: "友情链接",
          to: "/blogroll/blogroll"
        }
      ],
      title: "Starry"
    };
  },
  components: {
    Logo
  },
  methods: {
    ifSmallScreen() {
      const w =
        document.documentElement.clientWidth || document.body.clientWidth;
      if (w < 600) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
        this.drawer = false;
      }
    }
  },
  mounted() {
    this.ifSmallScreen();
  }
};
</script>

<style scoped>
#nav {
  background: rgba(255, 255, 255, 0.5);
}
</style>
