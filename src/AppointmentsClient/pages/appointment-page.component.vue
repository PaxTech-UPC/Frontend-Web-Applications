<script>
import AppointmentComponent from "../components/reservation/appointment.component.vue";
import { fetchReservations } from "../services/Appointment-api.service.js";

export default {
  name: "appointment-page-component",
  components: {
    AppointmentComponent
  },
  data() {
    return {
      appointments: []
    };
  },
  async mounted() {
    try {
      this.appointments = await fetchReservations();
    } catch (error) {
      console.error("Error al cargar citas:", error);
    }
  }
};
</script>

<template>
  <div>
    <AppointmentComponent
        v-for="appointment in appointments"
        :key="appointment.reservationId"
        :appointment="appointment"
    />
  </div>
</template>

<style scoped>
</style>
