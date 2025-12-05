<template>
  <div class="lesson-list-page">
    <LessonList @add-to-cart="addToCart" />
  </div>
</template>

<script>
import { inject } from "vue";
import LessonList from "../components/LessonList.vue"; //import lessonlist component 

export default {
  name: "LessonListPage",
  components: { LessonList }, //register lessonlist component
  setup() {
    const addToCart = inject("addToCart", () => {}); //inject addtocart function from app.vue
    return { addToCart };
  }
};
</script>

<style scoped>
.lesson-list-page {
  margin-top: 20px;
}
</style>