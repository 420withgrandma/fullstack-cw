<template>
  <div>
    <h2>Checkout</h2>

    <!-- Cart Summary -->
    <ul v-if="cart.length > 0">
      <li v-for="item in cart" :key="item.id">
        {{ item.title }} x {{ item.qty }} = £{{ item.price * item.qty }}
      </li>
    </ul>
    <p v-if="cart.length > 0">Total: £{{ total }}</p>

    <!-- Checkout Form -->
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input v-model="name" id="name" required />
      </div>

      <div>
        <label for="phone">Phone:</label>
        <input
          v-model="phone"
          id="phone"
          pattern="\\d{10}"
          required
          title="Phone number must be exactly 10 digits"
        />
      </div>

      <button type="submit" :disabled="cart.length === 0">
        Place Order
      </button>
    </form>

    <p v-if="cart.length === 0">Add lessons to cart before checkout.</p>
  </div>
</template>

<script>
export default {
  name: "LessonCheckout",
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      name: "",
      phone: ""
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    }
  },
  methods: {
    handleSubmit() {
      const orderDetails = {
        name: this.name,
        phone: this.phone,
        cart: this.cart,
        total: this.total
      };
      this.$emit("submit-order", orderDetails);
      this.name = "";
      this.phone = "";
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 10px;
}
label {
  margin-right: 5px;
}
button {
  margin-top: 10px;
}
ul {
  margin: 10px 0;
  padding-left: 20px;
}
</style>

