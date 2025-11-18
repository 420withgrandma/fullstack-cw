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
      lessons: [
        { id: 1, subject: "Math", location: "London", price: 30, spaces: 5 },
        { id: 2, subject: "Science", location: "Manchester", price: 25, spaces: 3 },
        { id: 3, subject: "History", location: "Birmingham", price: 20, spaces: 2 }
      ],
      cart: []
    };
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
      console.log("Order submitted:", orderDetails);
      console.log("Cart contents:", this.cart);
      alert("Order placed successfully!");
      this.cart = []; // clear cart after order
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