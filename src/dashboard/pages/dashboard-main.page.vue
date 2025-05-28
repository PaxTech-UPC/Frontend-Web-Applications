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
              <div class="day">Thursday</div>
              <div class="date-number">10</div>
            </div>
            <div class="divider"></div>
            <div class="appointments-section">
              <div class="appointment-item grey">
                <div class="appointment-label">Tomorrow</div>
                <div class="appointment-description">Ketarin treatment appointment</div>
              </div>
              <div class="appointment-item pink">
                <div class="appointment-label">Next week</div>
                <div class="appointment-description">Hair coloring appointment</div>
              </div>
            </div>
          </div>
        </template>
      </pv-card>

      <!-- Lista de salones -->
      <section class="dashboard">
        <h2 class="section-title">Más Popular</h2>
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
  flex: 0 0 260px;
}

/* === Main Content === */
.main-content {
  flex: 1;
  max-width: 100%;
  overflow-x: hidden;
}

/* === Card citas === */
.custom-card {
  background-color: #e6e6e6;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 2rem;
}

.appointment-content {
  display: flex;
  align-items: center;
}

.date-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}

.day {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.date-number {
  font-size: 40px;
  font-weight: 800;
  margin-top: 4px;
}

.divider {
  width: 2px;
  height: 80px;
  background-color: #999;
  margin: 0 16px;
}

.appointments-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

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

.appointment-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.appointment-description {
  font-size: 14px;
  font-weight: 600;
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

/* === Global Overflow Fix === */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
