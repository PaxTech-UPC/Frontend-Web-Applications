<script>
import AppointmentComponent from "../components/reservation/appointment.component.vue";
 import ReviewComponent from "../components/reviews/review.component.vue";

import { AppointmentApiService } from "../services/Appointment-api.service.js";
import { AppointmentAssembler } from "../services/Appointment.assembler.js";

import {ReviewApiService} from "../services/Review-api.service.js";

export default {
  name: "appointment-page-component",
  components: {
    AppointmentComponent,
    ReviewComponent,
  },
  data() {
    return {
      appointments: [],
      reviews: [],
    };
  },
  async mounted() {
    try {
      const [appointmentsResponse, reviewsResponse] = await Promise.all([
        AppointmentApiService.getAll(),
        ReviewApiService.getAll()
      ]);

      this.appointments = AppointmentAssembler.toEntitiesFromResponse(appointmentsResponse);
      this.reviews = reviewsResponse.data;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>

<template>
  <div>
    <h2>Appointments</h2>
    <AppointmentComponent
        v-for="appointment in appointments"
        :key="'appointment-' + appointment.reservationId"
        :appointment="appointment"
    />

    <h2>Last visited:</h2>
    <ReviewComponent
        v-for="review in reviews"
        :key="'review-' + review.id"
        :review="review"
    />
  </div>
</template>

<style scoped>
h2 {
  margin-top: 24px;
  color: #333;
}
</style>
