<template>
  <div id="app">
    <h1>Lesson Booking App</h1>

    <LessonList
      :lessons="lessons"
      @add-to-cart="addToCart"
    />

    <LessonCart
      :cart="cart"
      @remove-from-cart="removeFromCart"
    />

    <LessonCheckout
      :cart="cart"
      @submit-order="submitOrder"
    />
  </div>
</template>

<script>
import axios from "axios";
import LessonList from "./components/LessonList.vue";
import LessonCart from "./components/LessonCart.vue";
import LessonCheckout from "./components/LessonCheckout.vue";

export default {
  name: "App",
  components: {
    LessonList,
    LessonCart,
    LessonCheckout
  },
  data() {
    return {
      lessons: [],
      cart: []
    };
  },
  created() {
    // Fetch lessons from backend instead of hardcoding
    axios.get("http://localhost:5000/lessons")
      .then(res => {
        this.lessons = res.data;
      })
      .catch(err => {
        console.error("Failed to fetch lessons:", err);
      });
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        this.cart.push(lesson);
        lesson.spaces--;
        console.log("Cart:", this.cart);
      } else {
        alert("No spaces left for this lesson!");
      }
    },
    removeFromCart(lesson) {
      const index = this.cart.indexOf(lesson);
      if (index !== -1) {
        this.cart.splice(index, 1);
        lesson.spaces++;
        console.log("Cart:", this.cart);
      }
    },
    submitOrder(orderDetails) {
      // Send order to backend
      axios.post("http://localhost:5000/orders", orderDetails)
        .then(() => {
          alert("Order placed successfully!");
          this.cart = []; // clear cart after order
        })
        .catch(err => {
          alert("Failed to place order");
          console.error(err);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>