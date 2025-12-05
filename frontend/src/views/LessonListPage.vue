<template>
  <div class="lesson-list-page">
    <LessonList @add-to-cart="addToCart" />
  </div>
</template>

<script>
import { inject } from "vue";
import LessonList from "../components/LessonList.vue";

export default {
  name: "LessonListPage",
  components: { LessonList },
  setup() {
    const addToCart = inject("addToCart", () => {});
    return { addToCart };
  }
};
</script>

<style scoped>
.lesson-list-page {
  margin-top: 20px;
}
</style>