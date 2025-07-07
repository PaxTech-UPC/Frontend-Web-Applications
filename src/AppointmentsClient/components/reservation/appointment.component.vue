<script>
export default {
  name: "appointment-component",
  props: {
    appointment: Object,
    view: {
      type: String,
      default: "detailed",
    },
  },
  methods: {
    formatTime(date) {
      const d = new Date(date);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
    },
    handleEdit() {
      this.$emit("edit", this.appointment);
    },
    handleReschedule() {
      this.$emit("reschedule", this.appointment);
    },
    handleCancel() {
      this.$emit("cancel", this.appointment);
    },
  },
  computed: {
    paymentStatusColor() {
      return this.appointment.paymentStatus === "Pagado" ? "#28a745" : "#dc3545"; // ✅ verde/rojo bonitos
    },
    paymentBadge() {
      return this.appointment.paymentStatus === "Pagado" ? "Paid ✅" : "Pending ⏳";
    },
  },
};
</script>

<template>
  <div>
    <div v-if="view === 'detailed'" class="appointment-card">
      <!-- Header con título -->
      <div class="appointment-header">
        <h3>{{ appointment.serviceName }}</h3>
        <span
            class="payment-badge"
            :style="{ backgroundColor: paymentStatusColor }"
        >
          {{ paymentBadge }}
        </span>
      </div>

      <!-- Body con información -->
      <div class="appointment-body">
        <p><i class="pi pi-building"></i> <strong>Provider:</strong> {{ appointment.providerName }}</p>
        <p><i class="pi pi-user"></i> <strong>Worker:</strong> {{ appointment.workerName }}</p>
        <p><i class="pi pi-clock"></i> <strong>Schedule:</strong> {{ formatTime(appointment.startTime) }} - {{ formatTime(appointment.endTime) }}</p>
      </div>

      <!-- Footer con acciones -->
      <div class="appointment-footer">
        <button class="action-button edit" @click="handleEdit">
          <i class="pi pi-pencil"></i> Edit
        </button>
        <button class="action-button reschedule" @click="handleReschedule">
          <i class="pi pi-calendar"></i> Reschedule
        </button>
        <button class="action-button cancel" @click="handleCancel">
          <i class="pi pi-times"></i> Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointment-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 1.8rem; /* 🆙 más espacio interno */
  max-width: 420px; /* un pelín más ancho */
  margin: 1.5rem auto; /* 🆙 más separación entre tarjetas */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 220px; /* 🆙 altura mínima mayor */
}

.appointment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem; /* 🆙 más separación con el contenido */
}

.appointment-header h3 {
  margin: 0;
  font-size: 1.4rem;
  color: #731c9f;
}

.payment-badge {
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
}

.appointment-body {
  margin-bottom: 1.2rem; /* 🆙 espacio antes de los botones */
  line-height: 3; /* 🆙 mayor separación de texto */
}

.appointment-body p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

.appointment-footer {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
}

.action-button {
  flex: 1;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.2s ease;
}

.action-button.edit {
  background-color: #6f42c1;
}

.action-button.reschedule {
  background-color: #b99dc7;
}

.action-button.cancel {
  background-color: #dc3545;
}

.action-button:hover {
  opacity: 0.9;
}
</style>
