import Vue from "vue";
import VueRouter from "vue-router";
import main from "../views/main.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: main
    }
  ]
});

export default router;
