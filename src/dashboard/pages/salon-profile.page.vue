<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Para acceder a los parámetros de la ruta

import {SalonProfileApiServices} from "../services/salon/salon-profile-api.services.js";
import salonProfileComponent from "../components/salon/salon-profile.component.vue";

import { ServicesApi } from "../services/service/service-api.services.js";
import { Service } from "../model/service/service.entity.js";
import serviceListComponent from "../components/service/service-list.component.vue";

import { reviewApiServices } from "../services/review/review-api.services.js";
import { Review } from "../model/review/review.entity.js";
import reviewListComponent from "../components/review/review-list.component.vue";
import ClientLayout from "../../public/components/client-layout/client-layout.component.vue";

export default {
  name: "salon-profile.page",
  components: {
    ClientLayout,
    SalonProfile: salonProfileComponent,
    serviceList: serviceListComponent,
    reviewList: reviewListComponent,
  },
  data() {
    return {
      services: [],
      reviews: [],
    }
  },
  mounted() {
    const serviceService = new ServicesApi()
    serviceService.getUrlToServices()
        .then(result => {
          this.services = result.data.map(service => {
            return new Service(
                service.id,
                service.name,
                service.price,
                service.duration,
                service.status,
            );
        });
          console.log(result.data);
        })
        .catch(error => {
          console.error("Error al obtener los servicios:", error);
        })

    const reviewService = new reviewApiServices();
    reviewService.getUrlToReview()
        .then(result => {
          this.reviews = result.data.map(review => {
            return new Review(
                review.id,
                review.author,
                review.rating,
                review.text,
            );
          });
          console.log(result.data);
        })
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const salonList = ref(null);
    const isLoading = ref(true);

    const goBack = () => {
      router.push('/client/dashboard'); // lleva al dashboard
    };

    const salonService = new SalonProfileApiServices();
    const salonId = route.params.salonId;

    onMounted(async () => {
      try {
        const result = await salonService.getSalonProfileById(salonId);
        salonList.value = result;
        isLoading.value = false;
      } catch (error) {
        console.error("Error al obtener los datos del salón:", error);
        isLoading.value = false;
      }
    });

    return {
      salonList,
      isLoading,
      goBack,
    };
  }
}
</script>

<template>
  <client-layout />
  <div v-if="isLoading" class="loading">Cargando...</div>

  <div v-else class="container">
    <div class="profile-and-services">
      <div class="left">
        <div class="section">
          <salon-profile :salonProfile="salonList" class="salon-profile-img"/>
        </div>

        <div class="section">
          <h3 class="section-title">Review & Rating</h3>
          <review-list :reviews="reviews" />
        </div>
      </div>

      <div class="right">
        <div class="section">
          <h3 class="section-title">Servicios</h3>
          <service-list :services="services" />
        </div>
        <button @click="goBack" class="go-back">← Volver</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  font-size: 18px;
  padding: 40px;
}

.profile-and-services {
  display: flex;
  gap: 48px;
  align-items: flex-start;
  flex-wrap: wrap; /* Se apilan si no hay espacio */
}

.left,
.right {
  flex: 1;
  min-width: 300px;
}

.section {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.go-back {
  background-color: #ccc;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.go-back:hover {
  background-color: #aaa;
}

</style>