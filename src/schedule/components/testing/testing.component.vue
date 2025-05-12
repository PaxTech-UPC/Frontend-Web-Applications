<script>
import { ReservationApiService } from "../../services/reservation-api.service.js";
import { ReservationAssembler } from "../../services/reservation.assembler.js";
import { Reservation } from "../../model/reservation.entity.js"

export default {
  name: "reservation-details-component",
  data() {
    return {
      reservations:  []
    };
  },
  methods: {
    async test() {
      let response = await ReservationApiService.getAll();
      console.log(response)
      this.reservations = ReservationAssembler.toEntitiesFromResponse(response);
    }
  },
  created() {
    this.test()
  },
};
</script>

<template>

  <div v-for="reservation in reservations"
  :key="reservation.id">

    <h1>Reserva de :{{ reservation.reservationId }}</h1>
    <h1>Reserva de: {{ reservation.tipo }}</h1>
    <h1>Rholi: {{ reservation.client.user.name }}</h1>
    <h1>asd: {{ reservation.worker.name }}</h1>
    <h1>123: {{ reservation.timeSlot.start }}</h1>
    <h1>123: {{ reservation.timeSlot.end }}</h1>
  </div>



  <button @click="this.test()"></button>

</template>
