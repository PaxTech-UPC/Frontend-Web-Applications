<script>
import ReservationComponent from "../reservation/reservation.component.vue";
import { ReservationApiService } from '../../services/reservation-api.service.js';
import { ReservationAssembler } from '../../services/reservation.assembler.js';

export default {
  name: "calendar-component",
  components: { ReservationComponent },
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: [
        '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ],
      workers: ['Todos'],
      currentWorkerIndex: 0,
      calendars: [],
      reservations: [],
    };
  },
  computed: {
    currentWorker() {
      return this.workers[this.currentWorkerIndex];
    },
  },
  async mounted() {
    const response = await ReservationApiService.getAll();
    let allReservations = ReservationAssembler.toEntitiesFromResponse(response);

    // ✅ Filtrar reservas inválidas (sin worker o sin nombre de worker)
    allReservations = allReservations.filter(r => r.worker && r.worker.name);

    this.reservations = allReservations;
    this.calendars = allReservations;

    const uniqueWorkers = [...new Set(allReservations.map(r => r.worker.name))];
    this.workers = ['Todos', ...uniqueWorkers];

  },
  methods: {
    swapWorker() {
      this.currentWorkerIndex = (this.currentWorkerIndex + 1) % this.workers.length;
    },
    formatTime(dateStr) {
      const date = new Date(dateStr);
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },


    formatDay(dateStr) {
      const date = new Date(dateStr);
      // Día en inglés, también en UTC
      return date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    },


    filteredAppointments(day, hour) {
      return this.calendars.filter(appointment => {
        const appointmentDay = this.formatDay(appointment.timeSlot.start);
        const appointmentTime = this.formatTime(appointment.timeSlot.start);
        const matchesWorker = this.currentWorker === 'Todos' || appointment.worker.name === this.currentWorker;
        return appointmentDay === day && appointmentTime === hour && matchesWorker;
      });
    }
  }
};

</script>

<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <button @click="swapWorker">&lt;</button>
      <div class="current-user">{{ currentWorker }}</div>
      <button @click="swapWorker">&gt;</button>
    </div>

    <div class="calendar-grid">
      <div class="calendar-days">
        <div class="time-label"></div>
        <div class="day-label" v-for="day in days" :key="day">{{ day }}</div>
      </div>

      <div class="calendar-body">
        <div class="hour-row" v-for="hour in hours" :key="hour">
          <div class="time-label">{{ hour }}</div>
          <div class="day-cell" v-for="day in days" :key="day">
            <reservation-component
                v-for="(appointment, index) in filteredAppointments(day, hour)"
                :key="index"
                :tipo="appointment.tipo"
                :start-time="formatTime(appointment.timeSlot.start)"
                :end-time="formatTime(appointment.timeSlot.end)"
                :client-name="appointment.client.user.name"
             reservation=""/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.calendar-container {
  width: 100%;
  font-family: Arial, sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f2f2f2;
  font-weight: bold;
}

.calendar-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.calendar-days {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  background-color: #eee;
}

.day-label, .time-label {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: center;
  background: #f9f9f9;
  font-weight: bold;
}

.calendar-body {
  display: grid;
  grid-template-rows: repeat(auto-fill, 1fr);
}

.hour-row {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  border-bottom: 1px solid #ddd;
  height: 60px;
}

.day-cell {
  border-left: 1px solid #ddd;
  position: relative;
}

</style>