<script>
export default {
  name: "review-component",
  props: {
    review: Object
  },
  data() {
    return {
      newRating: 0,
      reviewText: ''
    }
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
    },
    setRating(value) {
      this.newRating = value;
    },
    submitReview() {
      // Aquí puedes implementar la lógica para enviar la reseña
      console.log('Enviando reseña:', this.newRating, this.reviewText);
    }
  }
};
</script>

<template>
  <div class="review-container">

    <div class="review-card">
      <div class="review-content">
        <!-- Image placeholder -->
        <div class="image-placeholder">
          <span class="placeholder-x">×</span>
        </div>

        <div class="stylist-info">
          <div class="stylist-name">{{ review.author }}</div>
          <div class="stylist-title">Reseña #{{ review.id }}</div>
          <div class="rating">
            <span class="star active-star">★</span>
            <span class="rating-value">{{ review.rating }}</span>
          </div>
        </div>
      </div>

      <div class="feedback-buttons">
        <button class="thumb-button">
          <div class="thumb-circle">
            <span class="thumb">👍</span>
          </div>
        </button>
        <button class="thumb-button">
          <div class="thumb-circle">
            <span class="thumb">👎</span>
          </div>
        </button>
      </div>

      <div class="review-text">
        {{ review.text }}
      </div>

      <div class="review-status">
        <strong>Estado:</strong>
        <span :style="{ color: getReadColor() }">
          {{ getReadStatus() }}
        </span>
      </div>

      <div class="review-prompt">
        <p>¿Quieres dejar una reseña?</p>
      </div>

      <div class="star-rating">
        <button
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            class="star-button"
        >
          <span class="star" :class="{ 'active-star': newRating >= star }">★</span>
        </button>
      </div>

      <div class="review-input">
        <textarea
            v-model="reviewText"
            placeholder="Escribe aquí"
            class="review-textarea"
        ></textarea>
      </div>

      <button @click="submitReview" class="submit-button">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.review-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.review-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.review-card {
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
}

.review-content {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.image-placeholder {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
}

.placeholder-x {
  font-size: 24px;
  color: #9ca3af;
}

.stylist-info {
  margin-left: 16px;
}

.stylist-name {
  font-weight: 500;
}

.stylist-title {
  font-size: 14px;
  color: #6b7280;
}

.rating {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.star {
  color: #d1d5db;
  font-size: 16px;
}

.active-star {
  color: #fbbf24;
}

.rating-value {
  margin-left: 4px;
  font-size: 14px;
}

.feedback-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.thumb-button {
  background: none;
  border: none;
  cursor: pointer;
}

.thumb-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb {
  font-size: 14px;
}

.review-text {
  margin-bottom: 12px;
  text-align: center;
  font-size: 14px;
}

.review-status {
  margin-bottom: 12px;
  text-align: center;
  font-size: 14px;
}

.review-prompt {
  text-align: center;
  margin-bottom: 12px;
  font-size: 14px;
}

.star-rating {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.star-button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 4px;
}

.review-input {
  margin-bottom: 12px;
}

.review-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  min-height: 80px;
  resize: vertical;
}

.submit-button {
  width: 100%;
  background-color: #d1d5db;
  color: #374151;
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #9ca3af;
}
</style>