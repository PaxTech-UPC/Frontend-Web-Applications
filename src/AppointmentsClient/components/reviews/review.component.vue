<script>
export default {
  name: "review-component",
  data() {
    return {
      reviews: [
        {
          id: 1,
          providerName: "rensoCompany",
          rating: 5,
          text: "An amazing experience! I left with the most gorgeous hair ever. Highly recommend!",
          likes: 12,
          dislikes: 1
        },
        {
          id: 2,
          providerName: "angieBeauty",
          rating: 4,
          text: "Great service and friendly staff. Will come back again!",
          likes: 8,
          dislikes: 0
        },
        {
          id: 3,
          providerName: "glamourStudio",
          rating: 3,
          text: "Good overall but the waiting time was too long.",
          likes: 5,
          dislikes: 3
        }
      ]
    };
  }
};
</script>

<template>
  <div class="reviews-container">
    <div v-for="review in reviews" :key="review.id" class="review-card">
      <!-- Header: Salon name and rating -->
      <div class="review-header">
        <div class="avatar">{{ review.providerName.charAt(0).toUpperCase() }}</div>
        <div>
          <h3 class="provider-name">{{ review.providerName }}</h3>
          <div class="stars">
            <span
                v-for="star in 5"
                :key="star"
                :class="{ active: star <= review.rating }"
                class="star"
            >★</span>
          </div>
        </div>
      </div>

      <!-- Review text -->
      <p class="review-text">“{{ review.text }}”</p>

      <!-- Likes and dislikes -->
      <div class="feedback">
        <div class="feedback-item">👍 {{ review.likes }}</div>
        <div class="feedback-item">👎 {{ review.dislikes }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-container {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
}

.section-title {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.review-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease;
}

.review-card:hover {
  transform: translateY(-3px);
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
}

.avatar {
  width: 48px;
  height: 48px;
  background-color: #9333ea;
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.provider-name {
  margin: 0;
  font-size: 1rem;
  color: #4b5563;
}

.stars {
  font-size: 0.9rem;
  color: #d1d5db;
}

.star.active {
  color: #facc15;
}

.review-text {
  font-size: 0.95rem;
  color: #374151;
  margin: 0.6rem 0;
}

.feedback {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
