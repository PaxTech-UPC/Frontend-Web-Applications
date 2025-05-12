<script>
import AppointmentComponent from "../components/reservation/appointment.component.vue";
import { AppointmentApiService } from "../services/Appointment-api.service.js";
import { AppointmentAssembler } from "../services/Appointment.assembler.js";

export default {
  name: "appointment-page-component",
  components: {
    AppointmentComponent,
  },
  data() {
    return {
      appointments: [],
    };
  },
  async created() {
    try {
      const response = await AppointmentApiService.getAll();
      this.appointments = AppointmentAssembler.toEntitiesFromResponse(response);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  },
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
