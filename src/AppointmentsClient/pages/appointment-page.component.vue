<script>
import AppointmentComponent from "../components/reservation/appointment.component.vue";
import ReviewComponent from "../components/reviews/review.component.vue";
import { AppointmentApiService } from "../services/Appointment-api.service.js";
import { AppointmentAssembler } from "../services/Appointment.assembler.js";
import { ReviewApiService } from "../services/Review-api.service.js";
import UpcomingAppointmentsClient from "../components/upcoming-client/upcoming-client.component.vue";

export default {
  name: "AppointmentPageComponent",
  components: {
    UpcomingAppointmentsClient,
    AppointmentComponent,
    ReviewComponent,
  },
  data() {
    return {
      appointments: [],
      reviews: []
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
      console.error("Error al cargar datos:", error);
    }
  }
};
</script>

<template>
  <div>
    <h1 class="page-title">Appointment</h1>
    <div class="main-layout">
      <div class="content-column-apo appointments-section">
        <h2 class="section-title">Tomorrow</h2>
        <UpcomingAppointmentsClient/>
        <AppointmentComponent
            v-for="appointment in appointments"
            :key="appointment.reservationId"
            :appointment="appointment"
        />
      </div>

      <hr class="hr-style"/>

      <div class="content-column reviews-section">
        <h2 class="section-title">Last visited:</h2>
        <ReviewComponent
            v-for="review in reviews"
            :key="review.id"
            :review="review"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

.page-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  margin-left: 220px;
  padding-top: 20px;
  color: #333;
}

.main-layout {
  display: flex;
  padding: 0 20px;
  margin-left: 220px;
  gap: 40px;
}

.hr-style {
  display: flex;
  flex-direction: column;
}

.content-column-apo {
  flex: 1;
  min-width: 500px;
  max-width: 600px;
  margin-left: 100px;
}

.reviews-section {
  width: 350px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
}
</style>
