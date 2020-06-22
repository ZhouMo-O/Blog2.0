import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";
import home from "../views/home.vue";
import articleCreate from "../views/article/articleCreate";
import articleList from "../views/article/articleList";
import commentList from "../views/comment/commentList";

import tagCreate from "../views/tag/tagCreate";
import tagList from "../views/tag/tagList";

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
        {
          path: "/article/edit/:id",
          props: true,
          name: articleCreate,
          component: articleCreate,
        },
        {
          path: "/tag/create",
          name: tagCreate,
          component: tagCreate,
        },
        {
          path: "/comment/list",
          name: commentList,
          component: commentList,
        },
        {
          path: "/tag/list",
          name: tagList,
          component: tagList,
        },
        {
          path: "/tag/edit/:id",
          props: true,
          name: tagCreate,
          component: tagCreate,
        },
      ],
    },
  ],
});

export default router;
