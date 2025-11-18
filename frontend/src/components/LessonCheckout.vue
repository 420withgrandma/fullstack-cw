<template>
  <div>
    <h2>Checkout</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input v-model="name" id="name" required />
      </div>

      <div>
        <label for="phone">Phone:</label>
        <input v-model="phone" id="phone" pattern="\\d{10}" required />
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
  methods: {
    handleSubmit() {
      const orderDetails = {
        name: this.name,
        phone: this.phone,
        cart: this.cart
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
</style>