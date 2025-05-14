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
      console.log(props.salon.salonId);
      router.push({ name: 'salon-profile', params: { salonId: props.salon.salonId } });
    };
    console.log("salon recibido:", props.salon);
    return {
      seleccionarSalon
    };
  }
}
</script>

<template>
<div class="salon-item p-3 border rounded shadow-md text-center">
  <img :src="salon.coverImage" alt="Foto del salón" class="w-full h-40 object-cover rounded mb-2" />
  <h3 class="font-bold">{{ salon.salonName }}</h3>
  <p>
    <i class="pi pi-map-marker"></i> {{ salon.location }}
  </p>
  <div class="rating-container">
    <pv-rating :modelValue="salon.rating" readonly :cancel="false" />
  </div>
  <button
      class="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      @click="seleccionarSalon">
    Seleccionar
  </button>
</div>
</template>

<style scoped>
.salon-item img {
  max-height: 200px;
  object-fit: cover;
}
.rating-container {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}
</style>