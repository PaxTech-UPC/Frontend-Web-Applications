<script>
import AppointmentComponent from "../components/reservation/appointment.component.vue";
import ReviewComponent from "../components/reviews/review.component.vue";
import UpcomingAppointmentsClient from "../components/upcoming-client/upcoming-client.component.vue";
import { AppointmentApiService } from "../services/Appointment-api.service.js";
import { ReviewApiService } from "../services/Review-api.service.js";
import { AppointmentAssembler } from "../services/Appointment.assembler.js";
import UpcomingClientComponent from "../components/upcoming-client/upcoming-client.component.vue";

export default {
  name: "AppointmentPageComponent",
  components: {
    UpcomingClientComponent,
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
      <upcoming-client-component class="upcoming-appo"></upcoming-client-component>
      <h3 class="h3-container">Tomorrow</h3>
      <AppointmentComponent
          v-for="appointment in tomorrowAppointments"
          :key="appointment.reservationId"
          :appointment="appointment"
      />

      <h3 class="h3-container">Next Week</h3>
      <AppointmentComponent
          v-for="appointment in nextWeekAppointments"
          :key="appointment.reservationId"
          :appointment="appointment"
      />

      <h3 class="h3-container">All Appointments</h3>
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
      <h3>Last Visited</h3>
      <ReviewComponent
          v-if="lastVisited"
          :key="lastVisited.id"
          :review="lastVisited"
      />

      <h3>All Reviews</h3>
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

.h3-container{
  margin-left: 400px;
}
.upcoming-appo{
  width: 250px;
  background-color: #f0dff0; /* Soft purple */
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: fixed;
  top: 300px;
  left: 5px;
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
