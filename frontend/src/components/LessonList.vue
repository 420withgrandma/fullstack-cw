<template>
  <div>
    <h2>Available Lessons</h2>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id">
        <strong>{{ lesson.subject }}</strong> - {{ lesson.location }}  
        <br>
        Price: £{{ lesson.price }} | Spaces: {{ lesson.spaces }}
        <br>
        <button @click="$emit('add-to-cart', lesson)">Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LessonList",
  props: {
    lessons: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
h2 {
  color: darkblue;
}
button {
  margin-top: 5px;
}
</style>