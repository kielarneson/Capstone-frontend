import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TailgateIndex from "../views/TailgateIndex";
import TailgateShow from "../views/TailgateShow";
import GameIndex from "../views/GameIndex";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/tailgates", name: "TailgateIndex", component: TailgateIndex },
  { path: "/tailgates/:id", name: "TailgateShow", component: TailgateShow },
  { path: "/games", name: "GameIndex", component: GameIndex },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
