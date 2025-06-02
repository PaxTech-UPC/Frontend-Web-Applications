<script>
import { Appointment } from "../../model/Appointment.entity.js";
import { AppointmentApiService } from "../../services/Appointment-api.service.js";
import { ReviewApiService } from "../../services/Review-api.service.js";
import { AppointmentAssembler } from "../../services/Appointment.assembler.js";
import UpcomingAppointmentsClient from "../upcoming-client/upcoming-client.component.vue";
import ReviewComponent from "../reviews/review.component.vue";

export default {
  name: "appointment-component",
  props: {
    appointment: Object,
    view: {
      type: String,
      default: "detailed",
    }
  },
  methods: {
    formatTime(date) {
      const d = new Date(date);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    },
    handleEdit() {
      this.$emit('edit', this.appointment);
    },
    handleReschedule() {
      this.$emit('reschedule', this.appointment);
    },
    handleCancel() {
      this.$emit('cancel', this.appointment);
    }
  },
  components: {
    UpcomingAppointmentsClient,
    ReviewComponent,
  },
  data() {
    return {
      appointments: [],
      reviews: [],
      isLoading: true
    };
  },
  computed: {
    paymentStatusColor() {
      const payment = this.appointment?.payment || 'pending';
      return payment === 'paid' ? 'green' : 'red';
    },
    paymentStatusText() {
      const payment = this.appointment?.payment || 'pending';
      return payment === 'paid' ? 'Pagado' : 'Pendiente';
    }
  },
  async mounted() {
    try {
      const [appointmentsResponse, reviewsResponse] = await Promise.all([
        AppointmentApiService.getAppointments(),
        ReviewApiService.getAll()
      ]);
      this.appointments = AppointmentAssembler.toEntitiesFromResponse(appointmentsResponse);
      this.reviews = reviewsResponse.data;
      this.isLoading = false;
    } catch (error) {
      console.error("Error al cargar datos:", error);
      this.isLoading = false;
    }
  }
}
</script>

<template>
  <div v-if="isLoading" class="appointment-loading">
    <p>Cargando...</p>
  </div>
  <div v-else>
    <!-- Detailed View (like in Image 1) -->
    <div v-if="view === 'detailed'" class="appointment-block">
      <h4>{{ appointment.tipo }}</h4>
      <p><strong>{{ $t('appointments.reservation.client') }}:</strong> {{ appointment.clientName }}</p>
      <p><strong>{{ $t('appointments.reservation.salon') }}:</strong> {{ appointment.salonName }}</p>
      <p><strong>{{ $t('appointments.reservation.schedule') }}:</strong> {{ formatTime(appointment.timeSlotStart) }} - {{ formatTime(appointment.timeSlotEnd) }}</p>
      <p>
        <strong>{{ $t('appointments.reservation.paymentStatus') }}:</strong>
        <span :style="{ color: paymentStatusColor }">
          {{ paymentStatusText }}
        </span>
      </p>
      <div class="appointment-actions">
        <button class="action-button" @click="handleEdit"><i class="pi pi-pencil"></i></button>
        <button class="action-button" @click="handleReschedule"><i class="pi pi-calendar"></i></button>
        <button class="action-button" @click="handleCancel"><i class="pi pi-times"></i></button>
      </div>
    </div>

    <!-- Compact View (like in Image 2) -->
    <div v-else-if="view === 'compact'" class="appointment-compact">
      <div class="appointment-image">
        <!-- Placeholder for image -->
      </div>
      <div class="appointment-content">
        <div class="appointment-header">
          <h4>{{ appointment.tipo }} {{ formatDate(appointment.timeSlotStart) }}</h4>
        </div>
        <div class="appointment-details">
          <p><i class="pi pi-map-marker"></i> {{ appointment.salonName }}</p>
          <p><i class="pi pi-clock"></i> {{ formatTime(appointment.timeSlotStart) }} - {{ formatTime(appointment.timeSlotEnd) }}</p>
          <p><i class="pi pi-user"></i> {{ appointment.stylistName }}</p>
        </div>
        <div class="appointment-buttons">
          <button class="icon-button"><i class="pi pi-calendar"></i></button>
          <button class="icon-button"><i class="pi pi-clock"></i></button>
          <button class="icon-button"><i class="pi pi-share-alt"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointment-loading {
  text-align: center;
  padding: 20px;
}

/* Detailed view styling */
.appointment-block {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 1rem auto;
  max-width: 300px;
  margin-right: 100px;
  border-radius: 8px;
  background-color: #f9f9ff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.appointment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.action-button {
  background: none;
  border: none;
  font-size: 16px;
  margin-left: 12px;
  cursor: pointer;
  color: #333;
  padding: 5px;
}

.action-button:hover {
  color: #0056b3;
}

/* Compact view styling */
.appointment-compact {
  display: flex;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: white;
}

.appointment-image {
  width: 80px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eee;
}

.appointment-content {
  flex: 1;
  padding: 12px;
}

.appointment-header {
  margin-bottom: 5px;
}

.appointment-header h4 {
  margin: 0;
  font-size: 16px;
}

.appointment-details p {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}

.appointment-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.icon-button {
  background: none;
  border: none;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
  color: #666;
}

.icon-button:hover {
  color: #0056b3;
}
</style>