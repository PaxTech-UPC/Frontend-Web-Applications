<template>
  <div class="service-tab">
    <h1>{{ $t('dashboard.services') }}</h1>

    <ServiceTableComponent :services="services" @refresh="fetchServices" />
  </div>
</template>

<script>
import ServiceTableComponent from '../components/service-table/service-table.component.vue';
import { ServiceApiService } from '../services/service-api.service.js';

export default {
  name: 'ServiceTabComponent',
  components: {
    ServiceTableComponent
  },
  data() {
    return {
      services: []
    };
  },
  methods: {
    async fetchServices() {
      try {
        const response = await ServiceApiService.getAll();
        this.services = response.data;
      } catch (error) {
        console.error('❌ Error al cargar servicios:', error);
      }
    }
  },
  mounted() {
    this.fetchServices();
  }
};
</script>

<style scoped>
.service-tab {
  padding: 1rem;
}
</style>
