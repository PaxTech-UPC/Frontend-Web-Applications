<script>
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
      <span :style="{ color: appointment.paymentStatus === 'paid' ? 'green' : 'red' }">
        {{ appointment.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente' }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.appointment-block {
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f9f9ff;
}
</style>
