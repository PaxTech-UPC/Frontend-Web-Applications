<script>
import {Appointment} from "../../model/Appointment.entity.js";
import {AppointmentApiService} from "../../services/Appointment-api.service.js";
import {ReviewApiService} from "../../services/Review-api.service.js";
import {AppointmentAssembler} from "../../services/Appointment.assembler.js";
import UpcomingAppointmentsClient from "../upcoming-client/upcoming-client.component.vue";
import ReviewComponent from "../reviews/review.component.vue";

export default {
  name: "appointment-component",
  props: {
    appointment: Object
  },
  methods: {
    formatTime(date) {
      const d = new Date(date);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  },
  components: {
    UpcomingAppointmentsClient,
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
        AppointmentApiService.getAppointments(),
        ReviewApiService.getAll()
      ]);
      this.appointments = AppointmentAssembler.toEntitiesFromResponse(appointmentsResponse);
      this.reviews = reviewsResponse.data;
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }
}
</script>

<template>
  <div class="appointment-block">
    <h4>{{ appointment.tipo }}</h4>
    <p><strong>Cliente:</strong> {{ appointment.clientName }}</p>
    <p><strong>Salón:</strong> {{ appointment.salonName }}</p>
    <p><strong>Horario:</strong> {{ formatTime(appointment.timeSlotStart) }} - {{ formatTime(appointment.timeSlotEnd) }}</p>
    <p>
      <strong>Estado de pago:</strong>
      <span :style="{ color: appointment.payment === 'paid' ? 'green' : 'red' }">
        {{ appointment.payment === 'paid' ? 'Pagado' : 'Pendiente' }}
      </span>
    </p>
    <div class="appointment-actions">
      <button class="action-button"><i class="pi pi-pencil"></i></button>
      <button class="action-button"><i class="pi pi-calendar"></i></button>
      <button class="action-button"><i class="pi pi-times"></i></button>
    </div>
  </div>
</template>

<style scoped>
.appointment-block {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 1rem auto;
  max-width: 600px;
  border-radius: 8px;
  background-color: #f9f9ff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
</style>
