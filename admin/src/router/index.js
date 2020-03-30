import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";
import home from "../views/home.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: main,
      children: [
        {
          path: "/home",
          name: home,
          component: home
        }
      ]
    }
  ]
});

export default router;
