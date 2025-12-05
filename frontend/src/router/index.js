// import vue router functions, import page components for routes
import { createRouter, createWebHistory } from "vue-router";
import LessonListPage from "../views/LessonListPage.vue";
import CartCheckoutPage from "../views/CartCheckoutPage.vue";

const routes = [
  {
    path: "/", //url path for homepage
    name: "Lessons",
    component: LessonListPage //component to render for this route
  },
  {
    path: "/cart", //url path for cart/checkout page
    name: "CartCheckout",
    component: CartCheckoutPage //cpmponent to render for this route
  }
];

// create and export the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || "/"),
  routes
});

export default router;