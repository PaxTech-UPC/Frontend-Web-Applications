<script>
import ReviewItemComponent from "./review-item.component.vue";
import workerItem from "../../../appoiments/components/worker/worker-item.component.vue";
export default {
  name: "review-list.component",
  components: {
    workerItem,
    ReviewItem: ReviewItemComponent
  },
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
}
</script>

<template>
  <div class="reviews-row">

    <review-item
        v-for="review in reviews"
        :key="review.id"
        :review="review"
    />
  </div>
</template>

<style scoped>

.reviews-row {
  display: flex;
  flex-direction: column;
  gap: 16PX;
  justify-content: flex-start;
  margin-left: 50px;
}


</style>