<script>
import ReservationComponent from "../reservation/reservation.component.vue";
import { fetchReservations } from '../../services/reservation-api.service.js';
import { assembleReservations } from '../../services/reservation.assembler.js';

export default {
  name: "calendar-component",
  components: {ReservationComponent: ReservationComponent},
  data() {
    return {
      reservations: []
    };
  },
  async mounted() {
    const raw = await fetchReservations();
    this.reservations = assembleReservations(raw);
  }
}
</script>

<template>
  <div class="calendar">
    <h2>Reservas</h2>
    <reservation-component
        v-for="reservation in reservations"
        :key="reservation.id"
        :reservation="reservation"
    />
  </div>
</template>

<style scoped>
.calendar {
  max-width: 800px;
  margin: auto;
}
</style>