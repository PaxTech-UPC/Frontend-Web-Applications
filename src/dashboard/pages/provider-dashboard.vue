<script>
import { ReservationApiService } from "../services/salon/reservation-api.services.js";
import { SalonApiServices } from "../services/salon/salon-api.services.js";
import ReviewComponent from "../../AppointmentsClient/components/reviews/review.component.vue";

const reservationService = new ReservationApiService();

export default {
  components: {ReviewComponent},
  data() {
    return {
      reservations: [],
      reviews: [],
    };
  },
  async mounted() {
    // 🔥 Traer reviews HARDCODEADO (por ahora)
    this.reviews = [
      { id: 1, author: "Sofia", rating: 5, text: "Amazing service!" },
      { id: 2, author: "Carlos", rating: 4, text: "Great, will come again." },
      { id: 3, author: "Ana", rating: 3, text: "It was okay." }
    ];

    try {
      const userId = parseInt(localStorage.getItem("user_id"));
      console.log("👤 userId actual:", userId);

      // ✅ 1. Buscar el provider de este usuario
      const salonService = new SalonApiServices();
      const providersResponse = await salonService.getAllProviders();

      const provider = providersResponse.data.find((p) => p.userId === userId);

      if (!provider) {
        console.error("❌ No se encontró provider para este userId");
        return;
      }

      console.log("✅ Provider encontrado:", provider);

      // ✅ 2. Traer TODAS las reservas
      const reservationsResponse = await reservationService.getAllReservations();
      const providerReservations = reservationsResponse.data
          .filter((r) => r.providerId === provider.id)
          .slice(0, 2); // Solo las 2 más recientes

      console.log("📦 Reservas de este provider:", providerReservations);

      // ✅ 3. Enriquecer las reservas con client, worker y timeslot
      const detailedReservations = await Promise.all(
          providerReservations.map(async (res) => {
            const [clientsResponse, workerResponse, timeSlotResponse] = await Promise.all([
              reservationService.getAllClients(),
              reservationService.getWorkerById(res.workerId),
              reservationService.getTimeSlotById(res.timeSlotId),
            ]);

            const client = clientsResponse.data.find((c) => c.id === res.clientId);

            return {
              ...res,
              clientName: client ? `${client.firstName} ${client.lastName}` : "N/A",
              workerName: `${workerResponse.data.firstName} ${workerResponse.data.lastName}`,
              // 🎯 Asignar un servicio aleatorio
              serviceType: this.getRandomService(),

              startTime: timeSlotResponse.data.startTime,
              endTime: timeSlotResponse.data.endTime,
            };
          })
      );

      console.log("📌 Reservas enriquecidas:", detailedReservations);
      this.reservations = detailedReservations;
    } catch (error) {
      console.error("❌ Error cargando datos:", error);
    }
  },
  methods: {
    formatDate(dateStr, options = {}) {
      const date = new Date(dateStr);
      return isNaN(date)
          ? "Invalid"
          : date.toLocaleDateString("en-US", options);
    },
    formatTime(dateStr) {
      const date = new Date(dateStr);
      return isNaN(date)
          ? "--:--"
          : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
    getRandomService() {
      const services = ["Manicure", "Haircut", "Massage", "Makeup", "Pedicure"];
      const randomIndex = Math.floor(Math.random() * services.length);
      return services[randomIndex];
    }
  },
};
</script>

<template>
  <h1 class="dashboard-title">{{ $t("dashboard.greeting") }}</h1>

  <div class="dashboard">
    <!-- 📅 Appointments -->
    <section class="appointments-section">
      <h2 class="section-title">{{ $t("dtitles.appointment") }}</h2>

      <div v-if="reservations.length" class="appointments-list">
        <div
            v-for="res in reservations"
            :key="res.id"
            class="appointment-card"
        >
          <div class="date-box">
            <span class="day">
              {{ formatDate(res.startTime, { weekday: "short" }) }}
            </span>
            <span class="date-number">
              {{ formatDate(res.startTime, { day: "2-digit", month: "short" }) }}
            </span>
          </div>

          <div class="details">
            <h3 class="service">{{ res.serviceType }}</h3>
            <p><strong>Client:</strong> {{ res.clientName }}</p>
            <p><strong>Worker:</strong> {{ res.workerName }}</p>
            <p>
              <strong>Time:</strong>
              {{ formatTime(res.startTime) }} - {{ formatTime(res.endTime) }}
            </p>
          </div>
        </div>
      </div>

      <div v-else class="no-appointments">
        No appointments found.
      </div>
    </section>

    <!-- Título para reseñas -->
    <section class="reviews-section">
      <h2 class="section-title">{{ $t('dtitles.review') }}</h2>
      <review-component
          v-for="review in reviews"
          :key="review.id"
          :review="review"
      />
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #731c9f;
  text-align: center;
}

.appointments-section {
  flex: 2;
}

.reviews-section {
  flex: 1;
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.appointment-card {
  display: flex;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.appointment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.date-box {
  background: #731c9f;
  color: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  text-align: center;
  margin-right: 1rem;
}

.day {
  display: block;
  font-size: 0.9rem;
}

.date-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.details {
  flex: 1;
}

.service {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.no-appointments {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>
