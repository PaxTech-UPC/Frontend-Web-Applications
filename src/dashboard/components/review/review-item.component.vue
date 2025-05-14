<script>
import { Review } from "../../model/review/review.entity.js";
export default {
  name: "review-item.component",
  props: {
    review: {
      type: Review,
      required: true
    }
  },
}
</script>

<template>
  <pv-card class="review-card">
    <template #content>
      <div class="info-review">
        <h3>{{ review.author }}</h3>
        <div class="rating-container">
          <pv-rating :modelValue="review.rating" readonly :cancel="false" />
        </div>
        <p class="description">{{ review.text }}</p>
      </div>
    </template>
  </pv-card>

</template>

<style scoped>

.review-card {
  width: 400px;
  height: 220px;
  background-color: #F5F5F5 !important;
  color: black !important;
}
.rating-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.description {
  margin: 20px;
}



</style>