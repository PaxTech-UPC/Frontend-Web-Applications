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

export default {
  name: "salon-profile.page",
  components: {
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
      router.push('/dashboard'); // lleva al dashboard
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
  <div v-if="isLoading">Cargando...</div>

  <div v-else>

    <div class="profile-and-services">
      <div class="left">
        <salon-profile :salonProfile="salonList" />
        <div>
          <h3>Review & Raiting</h3>
          <review-list :reviews="reviews" />
        </div>
      </div>

      <div class="right">
        <service-list :services="services" />
        <button @click="goBack" style="margin-bottom: 16px;">← Volver</button>
      </div>

    </div>
  </div>

</template>

<style scoped>
.profile-and-services {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.left {
  flex: 1;
}

.right {
  flex: 1;
}

</style>