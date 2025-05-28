<script>
import {Salon} from "../model/salon/salon.entity.js";
import {SalonApiServices} from "../services/salon/salon-api.services.js";
import SalonList from "../components/salon/salon-list.component.vue";
import ClientLayoutComponent from "../../public/components/client-layout/client-layout.component.vue";
export default {
  name: "dashboard-main.page",
  components: {
    SalonList,
    ClientLayout: ClientLayoutComponent,
  },
  data() {
    return {
      salons: [] // Aca se guardarán los salones
    };
  },
  mounted() {
    const salonService = new SalonApiServices();
    salonService.getUrlToSalon()

        .then(result => {
          console.log(result.data);

          this.salons = result.data.map(salon => {
            return new Salon(
                salon.salonId,
                salon.salonName,
                salon.location,
                salon.phone,
                salon.coverImage,
                salon.rating
            );
          });
          console.log(this.salons);
        })
        .catch(error => {
          console.error("Error al obtener los salones:", error);
        });
  }
}
</script>

<template>
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

  <div class="dashboard">
    <h2 class="text-xl font-bold mb-4">Más Popular</h2>
    <SalonList v-if="salons.length" :salones="salons" />
    <router-view />
  </div>
</template>

<style scoped>
.custom-card {
  background-color: #e6e6e6;
  border-radius: 16px;
  padding: 16px;
  max-width: 700px;
  margin: 0 auto;
}

.appointment-content {
  display: flex;
  align-items: center;
}

.date-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  line-height: 1;
  margin-top: 4px;
  color: #000;
}

.divider {
  width: 2px;
  height: 80px;
  background-color: #999;
  margin: 0 16px;
  border-radius: 1px;
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
  color: #111;
}
</style>