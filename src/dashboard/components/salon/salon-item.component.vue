<script>
import { Salon } from "../../model/salon/salon.entity.js";
import { useRouter } from 'vue-router';
export default {
  name: "salon-item.component",
  props: {
    salon: {
      type: Salon,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const seleccionarSalon = () => {
      console.log(props.salon.id);
      router.push({ name: 'salon-profile', params: { salonId: props.salon.id } });

    };
    console.log("salon recibido:", props.salon);
    return {
      seleccionarSalon
    };
  }
}
</script>

<template>
  <div class="salon-item">
    <img :src="salon.coverImage" alt="Foto del salón" class="salon-image" />
    <h3 class="salon-name">{{ salon.salonName }}</h3>
    <p class="salon-location">
      <i class="pi pi-map-marker"></i> {{ salon.location }}
    </p>
    <div class="rating-container">
      <pv-rating :modelValue="salon.rating" readonly :cancel="false" />
    </div>
    <button class="select-button" @click="seleccionarSalon">
      {{ $t('appointments.home.selector') }}
    </button>
  </div>
</template>

<style scoped>

.salon-item {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  margin: 2rem;
  box-shadow: 0 4px 12px rgba(115, 28, 159, 0.1); /* sombra morada sutil */
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 2px solid #f3e8f9;
}

.salon-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(115, 28, 159, 0.15);
}

.salon-image {
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.salon-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e1e1e;
  margin-bottom: 0.2rem;
}

.salon-location {
  color: #6b6b6b;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.rating-container {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}

.select-button {
  background-color: #731c9f;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.select-button:hover {
  background-color: #5a167d;
}



</style>