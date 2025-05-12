<script>



export default {
  name: "reservation-component",
  props: {
    reservation: Object
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
  <div class="reservation-block">
    <h4>{{ reservation.tipo }}</h4>
    <p><strong>Cliente:</strong> {{ reservation.clientName }}</p>
    <p><strong>Trabajador:</strong> {{ reservation.workerName }}</p>
    <p><strong>Horario:</strong> {{ formatTime(reservation.start) }} - {{ formatTime(reservation.end) }}</p>
    <p><strong>Ubicación:</strong> {{ reservation.location }} ({{ reservation.salonPhone }})</p>
    <p><strong>Pago:</strong> {{ reservation.amount }} USD -
      <span :style="{ color: reservation.paid ? 'green' : 'red' }">
        {{ reservation.paid ? 'Pagado' : 'Pendiente' }}
      </span>
    </p>
  </div>
</template>

<style scoped>

.reservation-block {
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f0f8ff;
}

</style>