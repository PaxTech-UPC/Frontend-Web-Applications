<script>
import { Salon } from "../model/salon/salon.entity.js";
import { SalonApiServices } from "../services/salon/salon-api.services.js";
import { ReservationApiService } from "../services/salon/reservation-api.services.js";
import SalonList from "../components/salon/salon-list.component.vue";
import SidebarClientComponent from "../../public/components/sidebar-client/sidebar-client.component.vue";

export default {
  name: "dashboard-main.page",
  components: {
    SidebarClientComponent,
    SalonList,
  },
  data() {
    return {
      salons: [],
      upcomingAppointments: [], // Aquí guardamos las próximas citas
    };
  },
  async mounted() {
    const salonService = new SalonApiServices();
    const reservationService = new ReservationApiService();
    const userId = localStorage.getItem("user_id");

    // ✅ Traer salones
    salonService.getAllProviders()
        .then(result => {
          this.salons = result.data.map(salon => new Salon(
              salon.id,
              salon.companyName,
              salon.userId
          ));
        })
        .catch(error => {
          console.error("Error al obtener los salones:", error);
        });

    try {
      // ✅ Traer el clientId
      const clientsResponse = await reservationService.getAllClients();
      const client = clientsResponse.data.find(c => c.userId === parseInt(userId));
      if (!client) throw new Error("No client found for this user.");
      const clientId = client.id;

      // ✅ Traer todas las reservas
      const reservationsResponse = await reservationService.getAllReservations();

      const clientReservations = reservationsResponse.data
          .filter(r => r.clientId === clientId);

      console.log("📅 Todas las reservas del cliente:", clientReservations);

      // 🔥 Traer detalles adicionales en paralelo
      const detailedReservations = await Promise.all(
          clientReservations.map(async (res) => {
            // TimeSlot
            const timeSlotRes = await reservationService.getTimeSlotById(res.timeSlotId);
            const timeSlot = timeSlotRes.data;

            // Worker
            const workerRes = await reservationService.getWorkerById(res.workerId);
            const worker = workerRes.data;

            // Provider
            const providerRes = await reservationService.getProviderById(res.providerId);
            const provider = providerRes.data;

            return {
              date: new Date(timeSlot.startTime),
              description: `${worker.firstName} ${worker.lastName} - ${provider.companyName}`,
            };
          })
      );

      // ✅ Ordenar y tomar los 2 próximos
      this.upcomingAppointments = detailedReservations
          .sort((a, b) => a.date - b.date)
          .slice(0, 2);

      console.log("✅ Próximas citas:", this.upcomingAppointments);
    } catch (error) {
      console.error("❌ Error cargando citas:", error.response?.data || error);
    }
  }
};
</script>


<template>
  <div class="main-layout">
    <aside class="sidebar">
      <sidebar-client-component />
    </aside>

    <main class="main-content">
      <div class="section-container">
        <!-- 🔥 Subtítulo arriba de la tarjeta -->
        <h2 class="section-title">Upcoming Appointments</h2>

        <!-- Card: Próximas Citas -->
        <div class="card-container">
          <pv-card class="custom-card">
            <template #content>
              <div class="appointment-content">
                <div class="date-section" v-if="upcomingAppointments.length">
                  <div class="day">{{ $t('title.upcomming') }}</div>
                  <div class="date-number">
                    {{ upcomingAppointments[0].date.getDate() }}
                  </div>
                </div>
                <div class="divider"></div>
                <div class="appointments-section" v-if="upcomingAppointments.length">
                  <div
                      v-for="(appointment, index) in upcomingAppointments"
                      :key="index"
                      :class="['appointment-item', index === 0 ? 'grey' : 'pink']"
                  >
                    <div class="appointment-label">
                      {{ index === 0 ? $t('appointments.upcoming.tomorrow') : $t('appointments.upcoming.next') }}
                    </div>
                    <div class="appointment-description">
                      {{ appointment.description }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p class="appointment-contentxd">No upcoming appointments.</p>
                </div>
              </div>
            </template>
          </pv-card>
        </div>
      </div>

      <!-- 📌 Lista de salones -->
      <div class="section-container">
        <h2 class="section-title">{{ $t('appointments.upcoming.popular') }}</h2>
        <SalonList v-if="salons.length" :salones="salons" />
      </div>
    </main>
  </div>
</template>

<style scoped>

.main-layout {
  display: grid;
  grid-template-columns: 260px 1fr; /* 📌 Sidebar fijo + main flexible */
  gap: 2rem;
  padding: 0 2rem;
  box-sizing: border-box;
  min-height: 100vh;
}


.main-content {
  flex: 1;
  max-width: 100%;
  display: flex;
  flex-direction: column; /* 👉 Ahora secciones apiladas */
  gap: 3rem; /* Espacio entre secciones */
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.section-container {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Espacio entre título y contenido */
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin: 0; /* Elimina márgenes extra */
}

.card-container {
  display: flex;
  justify-content: center; /* Centra la tarjeta horizontalmente */
}

.custom-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  max-width: 700px;
  border-left: 6px solid #731c9f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}


.custom-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 2rem;
  border-left: 6px solid #731c9f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.appointment-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

.date-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #731c9f;
  font-weight: bold;
  min-width: 70px;
}

.date-number {
  font-size: 24px;
  line-height: 1;
}

.day {
  color: #4b2995 !important;
  font-size: 16px;
}

.divider {
  width: 1px;
  background-color: #ddd;
  height: 60px;
}

.appointments-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.appointment-item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
}

.appointment-item.grey {
  background-color: #f5f5f5;
}

.appointment-item.pink {
  background-color: #fce4ec;
}

.appointment-label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #1e1e1e;
}

.appointment-description {
  color: #333;
}

/* === Global Overflow Fix === */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.appointment-contentxd {
  color: #1e1e1e !important;
}
</style>
