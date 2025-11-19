<template>
  <div>
    <h2>Your Cart</h2>
    <ul v-if="cart.length > 0">
      <li v-for="item in cart" :key="item._id">
        {{ item.subject }} - {{ item.location }}
        <br>
        £{{ item.price }} x {{ item.qty }} = £{{ item.price * item.qty }}
        <br>
        <button @click="$emit('remove-from-cart', item)">Remove One</button>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>

    <p v-if="cart.length > 0">Total: £{{ total }}</p>
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
    total() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    }
  }
};
</script>

<style scoped>
h2 {
  color: darkgreen;
  margin-bottom: 10px;
}
li {
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
button {
  margin-top: 5px;
}
</style>