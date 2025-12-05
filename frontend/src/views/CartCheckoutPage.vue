<template>
  <div class="cart-checkout">
    <h2>Your Cart & Checkouts</h2>

    <section class="cart-section">
      <LessonCart @remove-from-cart="removeFromCart" />
    </section>

    <section class="checkout-section">
      <LessonCheckout />
    </section>
  </div>
</template>

<script>
import { inject } from "vue";
import LessonCart from "../components/LessonCart.vue";
import LessonCheckout from "../components/LessonCheckout.vue";

export default {
  name: "CartCheckoutPage",
  components: { LessonCart, LessonCheckout },
  setup() {
    const removeFromCart = inject("removeFromCart", () => {});
    return { removeFromCart };
  }
};
</script>

<style scoped>
.cart-checkout {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 20px;
}

.cart-section, .checkout-section {
  width: 45%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f9f9f9;
}
</style>