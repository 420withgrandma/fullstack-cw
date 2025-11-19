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
  components: { LessonList, LessonCart, LessonCheckout },
  data() {
    return {
      lessons: [],
      cart: []
    };
  },
  created() {
    axios.get("http://localhost:5000/lessons")
      .then(res => { this.lessons = res.data; })
      .catch(err => { console.error("Failed to fetch lessons:", err); });
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        const existing = this.cart.find(item => item._id === lesson._id);
        if (existing) {
          existing.qty++;
        } else {
          this.cart.push({ ...lesson, qty: 1 });
        }
        lesson.spaces--;

        axios.put(`http://localhost:5000/lessons/${lesson._id}`, {
          spaces: lesson.spaces
        })
        .then(res => console.log("Lesson updated:", res.data))
        .catch(err => console.error("Failed to update lesson spaces:", err));
      } else {
        alert("No spaces left for this lesson!");
      }
    },
    removeFromCart(lesson) {
      const existing = this.cart.find(item => item._id === lesson._id);
      if (existing) {
        if (existing.qty > 1) {
          existing.qty--;
        } else {
          this.cart = this.cart.filter(item => item._id !== lesson._id);
        }
        lesson.spaces++;
      }
    },
    submitOrder(orderDetails) {
      axios.post("http://localhost:5000/orders", orderDetails)
        .then(() => {
          alert("Order placed successfully!");
          this.cart = [];
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