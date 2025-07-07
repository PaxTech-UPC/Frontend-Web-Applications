<script>
import AppointmentComponent from "../components/reservation/appointment.component.vue";
import ReviewComponent from "../components/reviews/review.component.vue";
import SidebarClientComponent from "../../public/components/sidebar-client/sidebar-client.component.vue";
import { AppointmentApiService } from "../services/Appointment-api.service.js";
import { ReviewApiService } from "../services/Review-api.service.js";
import { AppointmentAssembler } from "../services/Appointment.assembler.js";

export default {
  name: "AppointmentPageComponent",
  components: {
    AppointmentComponent,
    ReviewComponent,
    SidebarClientComponent,
  },
  data() {
    return {
      appointments: [],
      reviews: [],
      isLoading: true,
    };
  },
  async mounted() {
    try {
      const userId = parseInt(localStorage.getItem("user_id"));
      console.log("👤 userId actual:", userId);

// 🔥 Traer todos los clientes
      const clientsResponse = await AppointmentApiService.getAllClients();
      console.log("📄 Todos los clientes:", clientsResponse.data);

// 👉 Buscar el cliente asociado al userId
      const client = clientsResponse.data.find(c => c.userId === userId);

      if (!client) {
        console.error("❌ No se encontró cliente para este userId");
        this.isLoading = false;
        return;
      }

      console.log("✅ Cliente encontrado:", client);

// 🔥 Traer todas las reservas
      const reservationsResponse = await AppointmentApiService.getAllReservations();
      console.log("📦 Todas las reservas:", reservationsResponse.data);

// 👇 Filtrar reservas solo de este cliente
      const clientReservations = reservationsResponse.data.filter(
          (res) => res.clientId === client.id
      );

      console.log("✅ Reservas filtradas del cliente:", clientReservations);

// Transformar reservas a entidades completas
      this.appointments = await AppointmentAssembler.toEntities(
          clientReservations,
          AppointmentApiService
      );


      // Reviews
      const reviewsResponse = await ReviewApiService.getAll();
      this.reviews = reviewsResponse.data;
      this.isLoading = false;
    } catch (error) {
      console.error("❌ Error al cargar datos:", error);
      this.isLoading = false;
    }
  },
  computed: {
    tomorrowAppointments() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return this.appointments.filter((app) => {
        const appDate = new Date(app.startTime);
        return (
            appDate.getDate() === tomorrow.getDate() &&
            appDate.getMonth() === tomorrow.getMonth()
        );
      });
    },
    nextWeekAppointments() {
      const today = new Date();
      const nextWeekStart = new Date(today);
      nextWeekStart.setDate(today.getDate() + 2);
      const nextWeekEnd = new Date(today);
      nextWeekEnd.setDate(today.getDate() + 7);
      return this.appointments.filter((app) => {
        const appDate = new Date(app.startTime);
        return appDate >= nextWeekStart && appDate <= nextWeekEnd;
      });
    },
    lastReview() {
      return this.reviews.length ? this.reviews[0] : null;
    },
  },
};
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <sidebar-client-component />
    </aside>

    <main class="main-content" v-if="!isLoading">
      <!-- Título para citas -->
      <section class="appointments-section">
        <h2 class="section-title">{{ $t('dtitles.appointment') }}</h2>
        <appointment-component
            v-for="appointment in appointments"
            :key="appointment.id"
            :appointment="appointment"
        />
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
    </main>

    <p v-else>Cargando citas y reseñas...</p>
  </div>
</template>


<style scoped>

.container {
  display: flex;
  flex-direction: row;
  gap: 2rem; /* espacio entre sidebar y contenido */
  padding: 2rem 4rem; /* margen lateral para respirar */
  box-sizing: border-box;
}

.sidebar {
  flex: 0 0 260px;
  margin-right: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.main-content {
  flex: 1;
  display: flex;
  gap: 3rem; /* espacio entre appointments y reviews */
}

.appointments-section {
  flex: 2;
  padding: 1rem 1.5rem;
  border-radius: 12px;
}

.reviews-section {
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 12px;
}

.review-card,
.appointment-block {
  margin-bottom: 1.5rem; /* separa cada tarjeta */
}



</style>
