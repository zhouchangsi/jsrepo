import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/TheHome";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: import("@/views/TheLogin"),
    },
  ],
});

export default router;
