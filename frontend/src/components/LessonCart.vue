<template>
  <div>
    <h2>Cart</h2>
    <ul v-if="cart.length">
      <li v-for="(lesson, index) in cart" :key="index">
        {{ lesson.subject }} - £{{ lesson.price }}
        <button @click="removeLesson(lesson)">Remove</button>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>

    <p v-if="cart.length">Total: £{{ totalPrice }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LessonCart",
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, lesson) => sum + lesson.price, 0);
    }
  },
  methods: {
    async removeLesson(lesson) {
      // Emit event so App.vue updates cart locally
      this.$emit("remove-from-cart", lesson);

      // Sync with backend (increment spaces back)
      try {
        await axios.put(`http://localhost:5000/lessons/${lesson._id}`, {
          spaces: lesson.spaces + 1
        });
        console.log("Lesson spaces updated in backend");
      } catch (err) {
        console.error("Failed to update lesson spaces:", err);
      }
    }
  }
};
</script>

<style scoped>
h2 {
  color: darkred;
}
button {
  margin-left: 10px;
}
</style>