<script>
import AppointmentComponent from "../components/reservation/appointment.component.vue";
import ReviewComponent from "../components/reviews/review.component.vue";
import UpcomingAppointmentsClient from "../components/upcoming-client/upcoming-client.component.vue";
import { AppointmentApiService } from "../services/Appointment-api.service.js";
import { ReviewApiService } from "../services/Review-api.service.js";
import { AppointmentAssembler } from "../services/Appointment.assembler.js";

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
      reviews: [],
    };
  },
  async mounted() {
    try {
      const [appointmentsResponse, reviewsResponse] = await Promise.all([
        AppointmentApiService.getAppointments(),
        ReviewApiService.getAll()
      ]);
      this.appointments = AppointmentAssembler.toEntitiesFromResponse(appointmentsResponse);
      this.reviews = reviewsResponse.data;
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
},
  computed: {
    tomorrowAppointments() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return this.appointments.filter(app => {
        const appDate = new Date(app.date);
        return (
            appDate.getDate() === tomorrow.getDate() &&
            appDate.getMonth() === tomorrow.getMonth()
        );
      });
    },
    nextWeekAppointments() {
      const today = new Date();
      const nextWeekStart = new Date(today);
      nextWeekStart.setDate(today.getDate() + 2);
      const nextWeekEnd = new Date(today);
      nextWeekEnd.setDate(today.getDate() + 7);

      return this.appointments.filter(app => {
        const appDate = new Date(app.date);
        return appDate >= nextWeekStart && appDate <= nextWeekEnd;
      });
    },
    lastVisited() {
      return this.reviews[0] || null;
    }
  }
};
</script>
<template>
  <div class="container">
    <!-- Columna izquierda: Appointments -->
    <div class="appointments-section">
      <h1>Tomorrow</h1>
      <AppointmentComponent
          v-for="appointment in tomorrowAppointments"
          :key="appointment.reservationId"
          :appointment="appointment"
      />

      <h1>Next Week</h1>
      <AppointmentComponent
          v-for="appointment in nextWeekAppointments"
          :key="appointment.reservationId"
          :appointment="appointment"
      />

      <h1>All Appointments</h1>
      <AppointmentComponent
          v-for="appointment in appointments"
          :key="appointment.reservationId"
          :appointment="appointment"
      />
    </div>

    <!-- Línea divisoria vertical -->
    <hr class="vertical-line" />

    <!-- Columna derecha: Reviews -->
    <div class="reviews-section">
      <h1>Last Visited</h1>
      <ReviewComponent
          v-if="lastVisited"
          :key="lastVisited.id"
          :review="lastVisited"
      />

      <h1>All Reviews</h1>
      <ReviewComponent
          v-for="review in reviews"
          :key="review.id"
          :review="review"
      />
    </div>
  </div>
</template>
<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
}

.appointments-section,
.reviews-section {
  flex: 1;
  overflow-y: auto;
}

.vertical-line {
  width: 2px;
  background-color: #ccc;
  height: auto;
  align-self: stretch;
  border: none;
}

</style>
