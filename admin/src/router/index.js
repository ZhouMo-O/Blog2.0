import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";
import home from "../views/home.vue";
import articleCreate from "../views/article/articleCreate";
import articleList from "../views/article/articleList";
import commentList from "../views/comment/commentList";

import tagCreate from "../views/tag/tagCreate";
import tagList from "../views/tag/tagList";

import userCreate from "../views/user/userCreate";
import userList from "../views/user/userList";

import login from "../views/user/login";
import { Message } from "element-ui";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        isPublic: true,
      },
      component: login,
    },
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
          path: "/comment/list",
          name: commentList,
          component: commentList,
        },
        {
          path: "/tag/create",
          name: tagCreate,
          component: tagCreate,
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
        {
          path: "/user/create",
          name: userCreate,
          component: userCreate,
        },
        {
          path: "/user/list",
          name: userList,
          component: userList,
        },
        {
          path: "/user/edit/:id",
          props: true,
          name: userCreate,
          component: userCreate,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    Message({
      type: "error",
      message: "请先登录",
    });
    next("/login");
  }
  next();
});

export default router;
