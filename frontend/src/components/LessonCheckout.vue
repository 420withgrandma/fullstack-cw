<template>
  <div>
    <h2>Checkout</h2>

    <ul v-if="cart().length > 0"> <!--if the cart length is over 0-->
      <li v-for="item in cart()" :key="item._id"> <!--runs a for loop for every item in cart-->
        {{ item.subject }} x {{ item.qty }} = £{{ item.price * item.qty }}
      </li>
    </ul>
    <p v-if="cart().length > 0">Total: £{{ total }}</p> <!--displays total if cart length is over 0-->

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input v-model="name" id="name" required /> <!--v-model acts like a form for user to input details-->
      </div>
      <p v-if="nameError" style="color: red; margin-top: 6px;">{{ nameError }}</p> <!--if an incorrect name is entered an error message is displayed-->

      <div>
        <label for="phone">Phone:</label>
        <input
          v-model="phone"
          id="phone"
          pattern="[0-9]{10}"
          required
          title="Phone number must be exactly 10 digits"
        />
      </div>
      <p v-if="phoneError" style="color: red; margin-top: 6px;">{{ phoneError }}</p> <!--if incorrect phone number is entered error message will be displayed-->

      <button type="submit" :disabled="cart().length === 0">
        Place Order
      </button>
    </form>

    <p v-if="cart().length === 0">Add lessons to cart before checkout.</p> <!--if cart length is 0 then a message telling user to add items to cart is displayed-->
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "LessonCheckout",
  setup() {
    const cart = inject("cart", () => []);
    const submitOrder = inject("submitOrder", () => {});
    return { cart, submitOrder };
  },
  data() {
    return {
      name: "",
      phone: "",
      nameError: "",
      phoneError: ""
    };
  },
  computed: {
    total() {
      const cartArray = this.cart();
      return cartArray.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    }
  },
  methods: {
    handleSubmit() {
        this.nameError = "";
        this.phoneError = "";

        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^\d{10}$/;

      let hasError = false;
      if (!this.name || !nameRegex.test(this.name)) {
        this.nameError = "Name must contain letters and spaces only.";
        hasError = true;
      }

      if (!this.phone || !phoneRegex.test(this.phone)) {
        this.phoneError = "Phone must be exactly 10 digits.";
        hasError = true;
      }

      if (hasError) return;

      const orderDetails = {
        name: this.name,
        phone: this.phone,
        cart: this.cart(),
        total: this.total
      };
      this.submitOrder(orderDetails);
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

