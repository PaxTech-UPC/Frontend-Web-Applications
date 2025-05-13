<template>
  <div>
    <!-- Main header -->
    <h1 class="page-title">Appointment</h1>

    <div class="main-layout">
      <!-- Columna de citas -->
      <div class="content-column appointments-section">
        <h2 class="section-title">Tomorrow</h2>

        <div class="appointment-card" v-for="appointment in appointments" :key="'appointment-' + appointment.reservationId">
          <h3 class="appointment-title">{{ appointment.tipo }}</h3>

          <div class="appointment-detail">
            <span class="detail-label">Cliente:</span>
            <span class="detail-value">{{ appointment.clientName }}</span>
          </div>

          <div class="appointment-detail">
            <span class="detail-label">Salón:</span>
            <span class="detail-value">{{ appointment.salonName }}</span>
          </div>

          <div class="appointment-detail">
            <span class="detail-label">Horario:</span>
            <span class="detail-value">{{ formatTime(appointment.timeSlotStart) }} - {{ formatTime(appointment.timeSlotEnd) }}</span>
          </div>

          <div class="appointment-detail">
            <span class="detail-label">Estado de pago:</span>
            <span class="detail-value" :class="appointment.payment === 'paid' ? 'status-paid' : 'status-pending'">
              {{ appointment.payment === 'paid' ? 'Pagado' : 'Pendiente' }}
            </span>
          </div>

          <div class="appointment-actions">
            <button class="action-btn"><i class="pi pi-pencil"></i></button>
            <button class="action-btn"><i class="pi pi-calendar"></i></button>
            <button class="action-btn"><i class="pi pi-times"></i></button>
          </div>
        </div>
      </div>

      <hr class="hr-style"/>

      <!-- Columna de reseñas -->
      <div class="content-column reviews-section">
        <h2 class="section-title">Last visited:</h2>

        <div class="review-card" v-for="review in reviews" :key="'review-' + review.id">
          <h3 class="review-title">Reseña #{{ review.id }}</h3>

          <div class="review-detail">
            <span class="detail-label">Autor:</span>
            <span class="detail-value">{{ review.author }}</span>
          </div>

          <div class="review-detail">
            <span class="detail-label">Calificación:</span>
            <span class="detail-value">{{ review.rating }}/5</span>
          </div>

          <div class="review-detail">
            <span class="detail-label">Comentario:</span>
            <span class="detail-value">{{ review.text }}</span>
          </div>

          <div class="review-detail">
            <span class="detail-label">Estado:</span>
            <span class="detail-value" :class="review.read ? 'status-read' : 'status-unread'">
              {{ review.read ? 'Leído' : 'No leído' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppointmentApiService } from "../services/Appointment-api.service.js";
import { AppointmentAssembler } from "../services/Appointment.assembler.js";
import { ReviewApiService } from "../services/Review-api.service.js";

export default {
  name: "appointment-page-component",
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
  methods: {
    formatTime(date) {
      const d = new Date(date);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
/* Layout principal */
.page-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  margin-left: 220px; /* Match the same offset as main-layout */
  padding-top: 20px;
  color: #333;
}

.main-layout {
  display: flex;
  padding: 0 20px;
  margin-left: 220px; /* Ajustado para estar más a la izquierda */
  gap: 40px;
}

.hr-style {
  display: flex;
  flex-direction: column;
}

/* Estilos de columnas */
.content-column {
  padding: 20px 0;
}

.appointments-section {
  flex: 1;
  min-width: 500px;
  max-width: 600px;
}

.reviews-section {
  width: 350px;
}

/* Títulos de sección */
.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
}

/* Tarjetas de citas */
.appointment-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  position: relative;
}

.appointment-title {
  font-size: 18px;
  margin-bottom: 16px;
}

/* Tarjetas de reseñas */
.review-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.review-title {
  font-size: 16px;
  margin-bottom: 12px;
}

/* Detalles compartidos */
.appointment-detail, .review-detail {
  display: flex;
  margin-bottom: 8px;
  left: 100px;
}

.detail-label {
  font-weight: bold;
  min-width: 120px;
}

/* Estados */
.status-paid {
  color: green;
}

.status-pending {
  color: #ff7c00;
}

.status-read {
  color: green;
}

.status-unread {
  color: #888;
}

/* Acciones */
.appointment-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;
}

.action-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
  color: #666;
}

.action-btn:hover {
  color: #000;
}

/* Responsive */
@media (max-width: 1100px) {
  .main-layout {
    flex-direction: column;
  }

  .reviews-section {
    width: 100%;
    max-width: 600px;
  }

  .page-title {
    margin-left: 20px;
  }
}
</style>