<script>

export default {
  name: "reservation-component",
  props: {
    reservation: {
      type: Object,
      required: true
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

<template>
  <div class="reservation-mini">
    <div><strong>{{ reservation.tipo }}</strong></div>
    <div>{{ formatTime(reservation.start) }} - {{ formatTime(reservation.end) }}</div>
    <div>{{ reservation.clientName }}</div>
  </div>
</template>

<style scoped>

.reservation-mini {
  background-color: #d0f0ff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  font-size: 12px;
  margin-bottom: 2px;
}

</style>