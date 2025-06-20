<script>
import { Salon } from "../model/salon/salon.entity.js";
import { SalonApiServices } from "../services/salon/salon-api.services.js";
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
      salons: []
    };
  },
  mounted() {
    const salonService = new SalonApiServices();
    salonService.getUrlToSalon()
        .then(result => {
          this.salons = result.data.map(salon => new Salon(
              salon.salonId,
              salon.salonName,
              salon.location,
              salon.phone,
              salon.coverImage,
              salon.rating
          ));
        })
        .catch(error => {
          console.error("Error al obtener los salones:", error);
        });
  }
};
</script>

<template>
  <div class="main-layout">
    <aside class="sidebar">
      <sidebar-client-component />
    </aside>

    <main class="main-content">
      <!-- Card: Próximas Citas -->
      <pv-card class="custom-card">
        <template #content>
          <div class="appointment-content">
            <div class="date-section">
              <div class="day">{{ $t('title.upcomming') }}</div>
              <div class="date-number">10</div>
            </div>
            <div class="divider"></div>
            <div class="appointments-section">
              <div class="appointment-item grey">
                <div class="appointment-label">{{ $t('appointments.upcoming.tomorrow') }}</div>
                <div class="appointment-description">Ketarin treatment appointment</div>
              </div>
              <div class="appointment-item pink">
                <div class="appointment-label">{{ $t('appointments.upcoming.next') }}</div>
                <div class="appointment-description">Hair coloring appointment</div>
              </div>
            </div>
          </div>
        </template>
      </pv-card>

      <!-- Lista de salones -->
      <section class="dashboard">
        <h2 class="section-title">{{ $t('appointments.upcoming.popular') }}</h2>
        <SalonList v-if="salons.length" :salones="salons" />
      </section>
    </main>
  </div>
</template>

<style scoped>
/* === Layout === */
.main-layout {
  display: flex;
  flex-direction: row;
  padding: 0 2rem;
  gap: 2rem;
  box-sizing: border-box;
}

/* === Sidebar === */
.sidebar {
  position: fixed;
  flex: 0 0 260px;
}

/* === Main Content === */
.main-content {
  flex: 1;
  max-width: 100%;
  overflow-x: hidden;
  margin-left: 260px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* === Card citas === */

.appointment-item {
  border-radius: 8px;
  padding: 12px;
}

.grey {
  background-color: #c6c6c6;
}

.pink {
  background-color: #d4bdbd;
}

/* === Salones === */
.dashboard {
  max-width: 100%;
  overflow-x: hidden;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #222;
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
</style>
