<script>
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ReservationApiService } from "../services/salon/reservation-api.services.js";

export default {
  name: "reservation-page",
  components: {
    FullCalendar,
  },
  data() {
    return {
      workers: [],
      selectedWorker: null,
      selectedTimeSlot: null,
      calendarOptions: {
        plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
        initialView: "timeGridWeek",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        },
        slotMinTime: "08:00:00",
        slotMaxTime: "20:00:00",
        allDaySlot: false,
        events: [],
        selectable: true,
        selectMirror: true,
        select: this.handleSlotSelect,
      },
    };
  },
  async mounted() {
    const api = new ReservationApiService();
    const providerId = this.$route.params.salonId;

    console.log("📌 salonId:", providerId);

    try {
      const response = await api.getWorkersByProvider(providerId);
      this.workers = response.data;

      // 🔥 Cargar todos los timeSlots ocupados desde el inicio
      this.loadOccupiedTimeSlots();
    } catch (error) {
      console.error("❌ Error al cargar trabajadores:", error.response?.data || error);
    }
  },
  methods: {
    selectWorker(worker) {
      this.selectedWorker = worker;
      this.selectedTimeSlot = null; // Limpiar selección de slot
    },

    async loadOccupiedTimeSlots() {
      const api = new ReservationApiService();
      try {
        const response = await api.getAllTimeSlots();

        // 🔥 Filtrar los timeSlots que ya están ocupados (status: false)
        const occupiedSlots = response.data.filter(slot => slot.status === false);

        this.calendarOptions.events = occupiedSlots.map(slot => ({
          start: slot.startTime,
          end: slot.endTime,
          backgroundColor: "#d9534f", // 🔴 Rojo = ocupado
          borderColor: "#d43f3a",
          textColor: "#fff",
        }));
      } catch (error) {
        console.error("❌ Error al cargar time slots ocupados:", error.response?.data || error);
      }
    },

    handleSlotSelect(selection) {
      if (!this.selectedWorker) {
        alert("Please select a worker first!");
        return;
      }
      this.selectedTimeSlot = {
        start: selection.startStr,
        end: selection.endStr,
      };
      console.log("🕐 Slot elegido:", this.selectedTimeSlot);
    },

    async confirmReservation() {
      if (!this.selectedWorker || !this.selectedTimeSlot) {
        alert("Please select a worker and a time slot!");
        return;
      }

      const api = new ReservationApiService();
      const userId = localStorage.getItem("user_id");

      try {
        // 1️⃣ Buscar al cliente que tenga este userId
        const clientsResponse = await api.getAllClients();
        const client = clientsResponse.data.find(c => c.userId === parseInt(userId));

        if (!client) {
          throw new Error("No client found for this user.");
        }
        const clientId = client.id;
        console.log("👤 Client ID encontrado:", clientId);

        // 2️⃣ Crear el Payment
        const paymentPayload = {
          amount: 50, // 💲 Ajusta según lógica real
          currency: "USD",
          status: true,
        };
        const paymentResponse = await api.createPayment(paymentPayload);
        const paymentId = paymentResponse.data.id;
        console.log("💳 Payment creado con ID:", paymentId);

        // 3️⃣ Crear el TimeSlot
        const timeSlotPayload = {
          startTime: this.selectedTimeSlot.start,
          endTime: this.selectedTimeSlot.end,
          status: false, // 🔴 Marcar como ocupado
          type: "reservation",
          workerId: this.selectedWorker.id,
        };
        const timeSlotResponse = await api.createTimeSlot(timeSlotPayload);
        const timeSlotId = timeSlotResponse.data.id;
        console.log("📅 TimeSlot creado con ID:", timeSlotId);

        // 4️⃣ Crear la Reservation
        const reservationPayload = {
          salonId: this.$route.params.salonId,
          clientId: clientId,
          paymentId: paymentId,
          timeSlotId: timeSlotId,
          workerId: this.selectedWorker.id,
        };
        await api.createReservation(reservationPayload);

        console.log("✅ Reservation created successfully!");

        // 🔥 Recargar todos los timeSlots ocupados
        this.loadOccupiedTimeSlots();

        alert("✅ Reservation created successfully!");
        this.$router.push("/client/homeClient");
      } catch (error) {
        console.error("❌ Error creando la reserva:", error.response?.data || error);
        alert("❌ Failed to create reservation");
      }
    },

    goBack() {
      this.$router.back();
    },
  },
};
</script>


<template>
  <div class="reservation-container">
    <!-- Header with back button -->
    <div class="header">
      <h1>📅 Make a Reservation</h1>
      <button class="back-btn" @click="goBack">⬅ Back</button>
    </div>

    <div class="reservation-layout">
      <!-- Left: Workers -->
      <div class="workers-list">
        <h2>Choose a Worker</h2>
        <div
            v-for="worker in workers"
            :key="worker.id"
            class="worker-card"
            @click="selectWorker(worker)"
            :class="{ active: selectedWorker && selectedWorker.id === worker.id }"
        >
          <img :src="worker.photoUrl" alt="Worker Photo" class="worker-photo" />
          <div class="worker-info">
            <h3>{{ worker.firstName }} {{ worker.lastName }}</h3>
            <p>{{ worker.specialization }}</p>
          </div>
        </div>
      </div>

      <!-- Right: Calendar -->
      <div class="calendar-container">
        <FullCalendar
            ref="calendar"
            :options="calendarOptions"
        />
      </div>
    </div>

    <div class="confirm-container" v-if="selectedTimeSlot && selectedWorker">
      <div class="selected-slot">
        <div class="slot-info">
          <i class="pi pi-clock"></i>
          <div>
            <p><strong>Date:</strong> {{ new Date(selectedTimeSlot.start).toLocaleDateString() }}</p>
            <p><strong>Time:</strong>
              {{ new Date(selectedTimeSlot.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
              -
              {{ new Date(selectedTimeSlot.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
            </p>
          </div>
        </div>
      </div>
      <button class="confirm-btn" @click="confirmReservation">
        ✅ Confirm Reservation
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Main container */
.reservation-container {
  padding: 2rem;
  background: #f5f5fc;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 1.8rem;
  color: #4b2995;
}

.back-btn {
  background: linear-gradient(90deg, #7a36d4, #9d4edd);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: linear-gradient(90deg, #9d4edd, #7a36d4);
}

/* Layout */
.reservation-layout {
  display: flex;
  gap: 2rem;
}

/* Workers list */
.workers-list {
  width: 30%;
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.workers-list h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #4b2995;
}

.worker-card {
  display: flex;
  align-items: center;
  background: #f7f7f9;
  border-radius: 10px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.worker-card:hover {
  background: #ece7ff;
}

.worker-card.active {
  background: #dcd1ff;
  border: 2px solid #7a36d4;
}

.worker-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.worker-info h3 {
  font-size: 1.1rem;
  margin: 0;
  color: #333;
}

.worker-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

/* Calendar */
.calendar-container {
  flex: 1;
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.confirm-container {
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ Centra horizontalmente */
  justify-content: center; /* ✅ Alinea vertical si sobra espacio */
}

.selected-slot {
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f4f0ff;
  border: 2px solid #7a36d4;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  justify-content: center; /* ✅ Centra el contenido dentro */
}

.slot-info {
  display: flex;
  align-items: center;
  flex-direction: column; /* ✅ Acomoda fecha y hora en vertical */
  gap: 1rem;
}

.slot-info i {
  font-size: 1.8rem;
  color: #7a36d4;
}

.slot-info p {
  margin: 0;
  color: #4b2995;
  font-size: 1rem;
}

.confirm-btn {
  margin-top: 1rem;
  background: linear-gradient(90deg, #7a36d4, #9d4edd);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.confirm-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(125, 82, 255, 0.3);
}

</style>
