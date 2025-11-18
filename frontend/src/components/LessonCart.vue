<template>
  <div>
    <h2>Cart</h2>
    <ul v-if="cart.length">
      <li v-for="(lesson, index) in cart" :key="index">
        {{ lesson.subject }} - £{{ lesson.price }}
        <button @click="$emit('remove-from-cart', lesson)">Remove</button>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>

    <p v-if="cart.length">Total: £{{ totalPrice }}</p>
  </div>
</template>

<script>
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