<script>
import ReservationComponent from "../reservation/reservation.component.vue";
import { fetchReservations } from '../../services/reservation-api.service.js';


export default {


  name: "calendar-component",
  components: { ReservationComponent },
  data() {
    return {
      reservations: [],
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: Array.from({ length: 17 }, (_, i) => i + 7) // 7 a 23
    };
  },
  async mounted() {
    this.reservations = await fetchReservations();
  },
  methods: {
    reservationsForDayAndHour(day, hour) {
      return this.reservations.filter(res => {
        const resDate = new Date(res.start);
        const resDay = resDate.toLocaleDateString('en-US', { weekday: 'long' });
        const dayMatch = resDay === day.toLowerCase();
        const hourMatch = resDate.getHours() === hour;
        return dayMatch && hourMatch;
      });
    }
  }
};

</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="hour-slot"></div>
      <div v-for="day in daysOfWeek" :key="day" class="day-header">{{ day }}</div>
    </div>

    <div class="calendar-body">
      <div v-for="hour in hours" :key="hour" class="hour-row">
        <div class="hour-label">{{ hour }}:00</div>
        <div v-for="day in daysOfWeek" :key="day" class="day-cell">
          <reservation-component
              v-for="res in reservationsForDayAndHour(day, hour)"
              :key="res.id"
              :reservation="res"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.calendar {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: auto;
}

.calendar-header {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  background-color: #f5f5f5;
  font-weight: bold;
}

.hour-slot {
  background: #fff;
}

.day-header {
  padding: 10px;
  text-align: center;
}

.calendar-body {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
}

.hour-row {
  display: contents;
}

.hour-label {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: right;
  font-size: 12px;
}

.day-cell {
  border: 1px solid #eee;
  position: relative;
  min-height: 60px;
  padding: 2px;
}

</style>