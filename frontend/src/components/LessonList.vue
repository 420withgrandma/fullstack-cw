<template>
  <div>
    <h2>Available Lessons</h2>
    
    <div style="margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
      <label for="sortBy" style="font-weight: bold; margin-right: 10px;">Sort by:</label>
      <select v-model="sortBy" id="sortBy" style="padding: 5px; margin-right: 15px;"> //creates a model/form for sort function
        <option value="subject">Subject</option>
        <option value="price">Price</option>
        <option value="location">Location</option>
        <option value="spaces">Spaces Available</option>
      </select>

      <label for="sortOrder" style="font-weight: bold; margin-right: 10px;">Order:</label>
      <select v-model="sortOrder" id="sortOrder" style="padding: 5px;"> //creates a model/form of sort function
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <div v-if="lessons.length === 0" style="color: gray; font-style: italic;">
      Loading lessons...
    </div>
    <ul v-else>
      <li v-for="lesson in sortedLessons" :key="lesson._id">
        <strong>{{ lesson.subject }}</strong> - {{ lesson.location }}
        <br>
        Price: £{{ lesson.price }} | Spaces: {{ lesson.spaces }}
        <br>
        <button 
          v-on:click="$emit('add-to-cart', lesson)" 
          :disabled="lesson.spaces === 0"
        >
          {{ lesson.spaces === 0 ? "Full" : "Add to Cart" }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LessonList",
  data() {
    return {
      lessons: [],
      sortBy: "subject",
      sortOrder: "asc"
    };
  },
  computed: {
    sortedLessons() {
      const sorted = [...this.lessons].sort((a, b) => {
        let aValue = a[this.sortBy];
        let bValue = b[this.sortBy];

        
        if (typeof aValue === "number" && typeof bValue === "number") {
          return this.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }

        
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
        
        if (this.sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });

      return sorted;
    }
  },
  mounted() {
    this.fetchLessons();
  },
  methods: {
    async fetchLessons() {
      try {
        const res = await axios.get("http://localhost:5000/lessons");
        this.lessons = res.data;
      } catch (err) {
        console.error("Failed to fetch lessons:", err.message);
      }
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