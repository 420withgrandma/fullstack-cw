import { createRouter, createWebHistory } from "vue-router";
import LessonListPage from "../views/LessonListPage.vue";
import CartCheckoutPage from "../views/CartCheckoutPage.vue";

const routes = [
  {
    path: "/",
    name: "Lessons",
    component: LessonListPage
  },
  {
    path: "/cart",
    name: "CartCheckout",
    component: CartCheckoutPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || "/"),
  routes
});

export default router;