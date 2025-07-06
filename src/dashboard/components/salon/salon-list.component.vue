<script>
import SalonItemComponent from "./salon-item.component.vue";
import { SalonApiServices } from "../../services/salon/salon-api.services.js";
import { Salon } from "../../model/salon/salon.entity.js";

export default {
  name: "salon-list.component",
  components: {
    salonItem: SalonItemComponent,
  },
  data() {
    return {
      salones: [], // ahora es dinámico
      responsiveOptions: [
        { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
        { breakpoint: '768px', numVisible: 2, numScroll: 2 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 }
      ],
      isLoading: true
    }
  },
  async mounted() {
    const providerService = new SalonApiServices();
    try {
      const result = await providerService.getAllProviders();
      this.salones = result.data.map(p => new Salon(p.id, p.companyName, p.userId));
      this.isLoading = false;
    } catch (error) {
      console.error("Error al traer proveedores:", error);
      this.isLoading = false;
    }
  }
}
</script>

<template>
  <div v-if="!isLoading">
    <pv-carousel
        :value="salones"
        :numVisible="3"
        :numScroll="3"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="4000"
    >
      <template #item="{ data }">
        <salon-item :salon="data" />
      </template>
    </pv-carousel>
  </div>
  <div v-else>Cargando proveedores...</div>
</template>

<style scoped>
</style>