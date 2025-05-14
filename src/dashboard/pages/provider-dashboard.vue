<script>

import { reviewApiServices } from "../services/review/review-api.services.js";
import { Review } from "../model/review/review.entity.js";
import reviewListComponent from "../components/review/review-list.component.vue";
import serviceList from "../components/service/service-list.component.vue";
import SalonProfile from "../components/salon/salon-profile.component.vue";

export default {
  name: "provider-dashboard",
  components: {
    SalonProfile, serviceList,
    reviewList: reviewListComponent,
  },
  data(){
    return {
      services: [],
      reviews: [],
      }
  },
  mounted() {
    const reviewService = new reviewApiServices();
    reviewService.getUrlToReview()
        .then(result => {
          this.reviews = result.data.map(review => {
            return new Review(
                review.id,
                review.author,
                review.rating,
                review.text,
            );
          });
          console.log(result.data);
        })
  },
  setup(){

  }
}
</script>

<template>

<h1>Hey, Let's Get to Work!</h1>


    <div class="services">

      <!-- Columna izquierda (puede estar vacía o tener algo luego) -->
      <div class="left">

        <h2 class="title-review">Upcoming appointments</h2>

        <pv-card class="custom-card">
          <template #content>
            <div class="appointment-content">

              <div class="date-section">
                <div class="day">Thursday</div>
                <div class="date-number">10</div>
              </div>

              <div class="divider"></div>

              <div class="appointments-section">
                <div class="appointment-item grey">
                  <div class="appointment-label">Tomorrow</div>
                  <div class="appointment-description">Ketarin treatment appointment</div>
                </div>
                <div class="appointment-item pink">
                  <div class="appointment-label">Next week</div>
                  <div class="appointment-description">Hair coloring appointment</div>
                </div>
              </div>
            </div>
          </template>
        </pv-card>

      </div>

      <div class="right">
        <div>
          <h2 class="title-review">Unread reviews</h2>
          <review-list class="review-list" :reviews="reviews" />
        </div>
      </div>

    </div>

</template>

<style scoped>

  .services {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
  }

  .title-review {
    text-align: center;
    margin-left: 50px;
  }

  .custom-card {
    background-color: #F5F5F5;
    border-radius: 16px;
    padding: 16px;
    max-width: 900px;
    margin: 0 auto;
    justify-content: center;
    margin-left: 50px;
  }

  .appointment-content {
    display: flex;
    align-items: center;
  }

  .date-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
  }

  .day {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .date-number {
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    margin-top: 4px;
    color: #000;
  }

  .divider {
    width: 2px;
    height: 80px;
    background-color: #999;
    margin: 0 16px;
    border-radius: 1px;
  }

  .appointments-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .appointment-item {
    border-radius: 8px;
    padding: 12px;
  }

  .grey {
    background-color: #c6c6c6;
  }

  .pink {
    background-color: #d4bdbd;
  }

  .appointment-label {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #333;
  }

  .appointment-description {
    font-size: 14px;
    font-weight: 600;
    color: #111;
  }

  .review-list {
    align-items: center;
  }

</style>