import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";
import home from "../views/home.vue";
import articleCreate from "../views/article/articleCreate";
import articleList from "../views/article/articleList";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "main",
      component: main,
      children: [
        {
          path: "/home",
          name: home,
          component: home,
        },
        {
          path: "/article/create",
          name: articleCreate,
          component: articleCreate,
        },
        {
          path: "/article/list",
          name: articleList,
          component: articleList,
        },
      ],
    },
  ],
});

export default router;
