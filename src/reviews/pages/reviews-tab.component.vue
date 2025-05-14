<template>
  <h1>{{ $t('dashboard.reviews') }}</h1>

  <div class="main-column">
    <ReviewComponent
        v-for="review in reviews"
        :key="review.id"
        :review="review"
    />
  </div>
</template>

<script>
import ReviewComponent from "../../AppointmentsClient/components/reviews/review.component.vue";
import { ReviewApiService } from "../../AppointmentsClient/services/Review-api.service.js";
import {$t} from "@primeuix/styled";

export default {
  name: "ReviewsTabComponent",
  components: {
    ReviewComponent,
  },
  data() {
    return {
      reviews: []
    };
  },
  async mounted() {
    try {
      const [reviewsResponse] = await Promise.all([
        ReviewApiService.getAll()
      ]);
      this.reviews = reviewsResponse.data;
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }
};
</script>

<style scoped>

.main-column {
  margin-top: 1rem;
}
</style>
