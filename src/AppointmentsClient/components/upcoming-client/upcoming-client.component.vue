<template>
  <div>
    <div
        class="appointment-card"
        v-for="appointment in upcomingAppointments"
        :key="appointment.reservationId"
        :class="{ past: !appointment.paymentStatus }"
    >
      <div class="day">
        <strong>{{ formatDay(appointment.timeSlotStart) }}</strong>
      </div>
      <div class="details">
        <div class="time">
          <span v-if="isToday(appointment.timeSlotStart)">Today </span>
          {{ formatTime(appointment.timeSlotStart) }}
        </div>
        <div class="type">
          {{ appointment.tipo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { AppointmentApiService } from '../../services/Appointment-api.service.js';

export default {
  name: 'UpcomingAppointmentsClient',
  setup() {
    const upcomingAppointments = ref([]);

    const formatTime = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    const formatDay = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric' });
    };

    const isToday = (dateStr) => {
      const today = new Date();
      const date = new Date(dateStr);
      return today.toDateString() === date.toDateString();
    };

    onMounted(async () => {
      try {
        const response = await AppointmentApiService.getAll();
        const appointments = response.data;
        console.log('Citas obtenidas:', appointments); // <-- VERIFICACIÓN
        const now = new Date();
        upcomingAppointments.value = appointments
            .filter(a => new Date(a.timeSlotStart) > now)
            .sort((a, b) => new Date(a.timeSlotStart) - new Date(b.timeSlotStart))
            .slice(0, 5);
        console.log('Citas futuras:', upcomingAppointments.value); // <-- VERIFICACIÓN
      } catch (e) {
        console.error("Error cargando citas:", e);
      }
    });

    return { upcomingAppointments, formatTime, formatDay, isToday };
  }
}
</script>
