<template>
  <div>
    <h2>Available Lessons</h2>
    <ul>
      <li v-for="lesson in lessons" :key="lesson.id">
        <strong>{{ lesson.subject }}</strong> - {{ lesson.location }}  
        <br>
        Price: £{{ lesson.price }} | Spaces: {{ lesson.spaces }}
        <br>
        <button 
          @click="$emit('add-to-cart', lesson)" 
          :disabled="lesson.spaces === 0"
        >
          {{ lesson.spaces === 0 ? "Full" : "Add to Cart" }}
        </button>
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
button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>