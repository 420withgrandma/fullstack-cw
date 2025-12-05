<template>
  <div id="app">
    <h1>Lesson Booking App</h1>

    <nav>
      <router-link to="/">Lessons</router-link> |
      <router-link to="/cart">Cart & Checkout</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      lessons: [],
      cart: []
    };
  },
  provide() {
    return {
      lessons: () => this.lessons,
      cart: () => this.cart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      submitOrder: this.submitOrder
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

        const targetLesson = this.lessons.find(l => l._id === lesson._id);
        if (targetLesson) {
          targetLesson.spaces++;
        }

        axios.put(`http://localhost:5000/lessons/${lesson._id}`, {
          spaces: targetLesson ? targetLesson.spaces : lesson.spaces
        })
        .then(res => console.log("Lesson spaces updated:", res.data))
        .catch(err => console.error("Failed to update lesson spaces:", err));
      }
    },

    submitOrder(orderDetails) {
      axios.post("http://localhost:5000/orders", orderDetails)
        .then(() => {
          alert("Order placed successfully!");
          this.cart = [];

          axios.get("http://localhost:5000/lessons")
            .then(res => { this.lessons = res.data; })
            .catch(err => console.error("Failed to refresh lessons:", err));
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

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>