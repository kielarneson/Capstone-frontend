import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import TailgatesIndex from "../views/TailgatesIndex";
import TailgatesNew from "../views/TailgatesNew";
import TailgateShow from "../views/TailgateShow";
import UserShow from "../views/UserShow";
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
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/login", name: "Login", component: Login },
  { path: "/logout", name: "Logout", component: Logout },
  { path: "/tailgates", name: "TailgatesIndex", component: TailgatesIndex },
  { path: "/tailgates/new", name: "TailgatesNew", component: TailgatesNew },
  { path: "/tailgates/:id", name: "TailgateShow", component: TailgateShow },
  { path: "/users/:id", name: "UserShow", component: UserShow },
  { path: "/games", name: "GameIndex", component: GameIndex },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
