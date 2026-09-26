const colors = require("vuetify/es5/util/colors").default;
require("@nuxtjs/dotenv").config;

const SITE_URL = process.env.SITE_URL || "https://blog5.net.cn";
const SITE_NAME = "Starry-周末的个人博客";

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: { lang: "zh-CN" },
    title: SITE_NAME,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Starry-周末的个人博客，记录前端开发、后端开发、服务端渲染与全栈工程实践。"
      },
      { hid: "og:site_name", property: "og:site_name", content: SITE_NAME },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:locale", property: "og:locale", content: "zh_CN" },
      { name: "theme-color", content: "#1976d2" },
      { name: "format-detection", content: "telephone=no" },
      { hid: "applicable-device", name: "applicable-device", content: "pc,mobile" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/starry.ico" },
      // 自托管子集字体：先把字体文件预热，避免图标闪烁
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/mdi/materialdesignicons-subset.woff2",
        crossorigin: "anonymous"
      },
      { rel: "stylesheet", href: "/fonts/googleFont.css" },
      { rel: "stylesheet", href: "/mdi/materialdesignicons.css" }
    ]
  },
  /*
   ** 动态 robots.txt / sitemap.xml，以及服务端渲染的文章正文接口
   */
  serverMiddleware: ["~/server/sitemap.js", "~/server/articleHtml.js"],
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
   ** 注：原先这里全局注册了 mavon-editor（约 65KB gzip 的 JS + 一大份 CSS），
   ** 导致首页等所有页面都要为文章页的编辑器买单。正文已改为服务端渲染，故移除。
   */
  plugins: [],
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
    // 把 CSS 抽成独立文件：不再把 ~300KB 的 Vuetify 样式内联进每个 HTML，
    // HTML 体积大幅减小，CSS 还能被浏览器长期缓存
    extractCSS: true,
    // 关闭体积告警噪音
    quiet: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
