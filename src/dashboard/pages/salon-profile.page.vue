<script>
import { useRoute, useRouter } from 'vue-router';
import SalonProfileApiService from "../services/salon/salon-profile-api.services.js";
import { SalonProfile } from "../model/salon/salonProfile.entity.js";

export default {
  name: "salon-profile-page",
  methods: {
    bookService(service) {
      console.log("Servicio seleccionado:", service);
      // Redirige a la página de selección de trabajador y calendario
      this.router.push({
        name: 'choose-worker',
        params: {
          salonId: this.salonProfile.id,
          serviceId: service.id
        }
      });
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    return { route, router };
  },
  data() {
    return {
      salonProfile: null,
      isLoading: true,
    };
  },
  async mounted() {
    const salonService = new SalonProfileApiService();
    const providerId = this.route.params.salonId;

    try {
      const [providerResponse, servicesResponse] = await Promise.all([
        salonService.getProviderById(providerId),
        salonService.getServices(),
      ]);

      const reviews = [
        { id: 1, rating: 5, content: "Excelente servicio!", providerId },
        { id: 2, rating: 4, content: "Muy bueno pero puede mejorar.", providerId },
      ];

      const services = servicesResponse.data.filter(
          s => s.salonId === parseInt(providerId)
      );

      this.salonProfile = new SalonProfile(
          providerResponse.data.id,
          providerResponse.data.companyName,
          services,
          reviews
      );
    } catch (error) {
      console.error("Error al cargar el perfil del salón:", error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<template>
  <div class="salon-profile" v-if="!isLoading && salonProfile">
    <!-- Back Button -->
    <div class="header">
      <button @click="router.back()" class="back-btn">⬅ Back</button>
    </div>

    <div class="main-layout">
      <!-- Left Column: Image + Reviews -->
      <div class="left-column">
        <!-- Image with overlay -->
        <div class="image-container">
          <img :src="salonProfile.coverImage" alt="Salon Image" class="salon-image" />
          <div class="image-overlay">
            <h1>{{ salonProfile.companyName }}</h1>
            <p class="location"><i class="pi pi-map-marker"></i> {{ salonProfile.location }}</p>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="reviews-section">
          <h2>🌟 Reviews</h2>
          <div
              v-for="review in salonProfile.reviews"
              :key="review.id"
              class="review-card"
          >
            <p class="review-rating">⭐ {{ review.rating }}</p>
            <p class="review-content">{{ review.content }}</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Services -->
      <div class="right-column">
        <h2>✨ Services</h2>
        <div
            v-for="service in salonProfile.services"
            :key="service.id"
            class="service-card"
        >
          <h3>{{ service.name }}</h3>
          <p><i class="pi pi-clock"></i> {{ service.duration }} minutes</p>
          <p><i class="pi pi-dollar"></i> ${{ service.price }}</p>
          <button
              class="book-btn"
              @click="router.push({
    name: 'choose-worker',
    params: {
      salonId: salonProfile.id,
      serviceId: service.id
    }
  })"
          >
            Book Now
          </button>


        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p class="loading">Loading salon profile...</p>
  </div>
</template>

<style scoped>
/* Main Layout Styling */
.salon-profile {
  padding: 2rem;
  background: linear-gradient(135deg, #f3f4f6, #e8ebf0);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Back Button */
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.back-btn {
  background: #7a36d4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #5b26a3;
}

/* Main layout: split columns */
.main-layout {
  display: flex;
  gap: 2rem;
}

/* Left Column */
.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.image-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.salon-image {
  width: 100%;
  display: block;
  border-radius: 16px;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  color: #fff;
  padding: 1rem;
  text-align: center;
}

.image-overlay h1 {
  margin: 0;
  font-size: 1.8rem;
}

.image-overlay .location {
  font-size: 0.95rem;
  margin-top: 0.4rem;
}

   /* Services Section */
 .right-column {
   flex: 1;
   background: #ffffff;
   border-radius: 16px;
   padding: 1.5rem;
   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
 }

.right-column h2 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #6d28d9;
  text-align: center;
}

.service-card {
  background: linear-gradient(135deg, #f5f7fa, #e4ebf5);
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.service-card h3 {
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 0.8rem;
}

.service-card p {
  margin: 0.4rem 0;
  font-size: 1.1rem;
  color: #555555;
}

.service-card i {
  color: #7a36d4; /* Icon color */
  margin-right: 6px;
}

/* Book Now Button */
.book-btn {
  display: inline-block;
  background: linear-gradient(90deg, #7a36d4, #9d4edd);
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 1rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.book-btn:hover {
  background: linear-gradient(90deg, #9d4edd, #7a36d4);
  box-shadow: 0 4px 15px rgba(125, 82, 255, 0.4);
  transform: scale(1.05);
}


@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }
  .left-column, .right-column {
    width: 100%;
  }
}

</style>
