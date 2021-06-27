const colors = require("vuetify/es5/util/colors").default;
require("@nuxtjs/dotenv").config;
module.exports = {
  render: {
    csp: {
      hashArgorism: 'sha256',
      policies: {
        'script-src': [
          "'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI='" // this line resolves the violation
        ]
      }
    }
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Starry-周末的个人博客",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Nuxt博客，个人博客，前端开发，后端开发，服务端渲染"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "starry.ico" },
    { rel: "stylesheet", href: "./fonts/googleFont.css" },
    { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [{ src: "assets/main.css" }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "@/plugins/vue-mavon-editor", ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [["@nuxtjs/dotenv"], ["@nuxtjs/axios"]],
  axios: {
    proxyHeaders: false
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: false,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
};
