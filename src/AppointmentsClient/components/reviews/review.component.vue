<script>
export default {
  name: "review-component",
  props: {
    review: Object
  },
  computed: {
    formattedRating() {
      return `${this.review.rating}/5`;
    }
  },
  methods: {
    getReadStatus() {
      return this.review.read ? 'Leído' : 'No leído';
    },
    getReadColor() {
      return this.review.read ? 'green' : 'gray';
    }
  }
};
</script>

<template>
  <div class="review-block">
    <h4>Reseña #{{ review.id }}</h4>
    <p><strong>Autor:</strong> {{ review.author }}</p>
    <p><strong>Calificación:</strong> {{ formattedRating }}</p>
    <p><strong>Comentario:</strong> {{ review.text }}</p>
    <p>
      <strong>Estado:</strong>
      <span :style="{ color: getReadColor() }">
        {{ getReadStatus() }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.review-block {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #f0f4ff;
}
</style>
