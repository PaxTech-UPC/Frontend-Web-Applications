<template>
  <div class="card">
    <Button :label="$t('services.new')" icon="pi pi-plus" class="p-button-success" @click="visible = true" />

    <Dialog v-model:visible="visible" modal header="New Service" :style="{ width: '25rem' }">
      <span class="text-surface-500 block mb-6">
        {{ $t('services.addInfo') || 'Add the following information' }}
      </span>

      <div class="flex items-center gap-4 mb-4">
        <label for="service-name" class="font-semibold w-24">{{ $t('services.service') }}</label>
        <InputText id="service-name" v-model="service" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="duration" class="font-semibold w-24">{{ $t('services.duration') }}</label>
        <InputText id="duration" v-model="duration" type="number" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="price" class="font-semibold w-24">{{ $t('services.price') }}</label>
        <InputText id="price" v-model="price" type="number" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-6">
        <label for="status" class="font-semibold w-24">{{ $t('services.status') }}</label>
        <SelectButton id="status" class="flex-auto" v-model="status" :options="options" />
      </div>

      <div class="flex justify-center gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="closeDialog" />
        <Button type="button" label="Save" severity="success" @click="createService" />
      </div>
    </Dialog>
  </div>
</template>

<script>
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import { Dialog, InputText } from 'primevue';
import { ServiceApiService } from '../../services/service-api.service.js';
import { ProviderApiService } from '../../services/provider-api.services.js'; // ✅ Importa ProviderApiService

export default {
  name: 'ServiceDialog',
  components: { Button, SelectButton, Dialog, InputText },
  data() {
    return {
      visible: false,
      service: '',
      duration: '',
      price: '',
      status: '',
      options: ['Active', 'Paused'],
    };
  },
  methods: {
    async createService() {
      if (!this.service || !this.duration || !this.price || !this.status) {
        alert('Please complete all fields');
        return;
      }

      try {
        // ✅ Obtener el providerId a partir del userId
        const userId = parseInt(localStorage.getItem("user_id"));
        const providersResponse = await ProviderApiService.getAllProviders();
        const provider = providersResponse.find(p => p.userId === userId);

        if (!provider) {
          console.error("❌ No se encontró un provider para este userId:", userId);
          alert('Provider not found for this user');
          return;
        }

        const newService = {
          id: 0, // 🔥 Aunque lo genere el backend, lo mandamos por si acaso
          name: this.service,
          duration: parseInt(this.duration),
          price: parseFloat(this.price),
          status: this.status === 'Active',
          salonId: provider.id, // ✅ Asignar el providerId
          description: "Servicio sin descripción" // 🔥 Campo requerido por backend
        };

        console.log("📤 Creando nuevo servicio:", newService);

        await ServiceApiService.create(newService);
        this.$emit('service-created'); // ✅ Notifica al padre para recargar lista
        this.resetForm();
      } catch (error) {
        console.error('❌ Error creating service:', error);
        alert('Error creating service');
      }
    },
    resetForm() {
      this.visible = false;
      this.service = '';
      this.duration = '';
      this.price = '';
      this.status = '';
    },
    closeDialog() {
      this.resetForm();
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 1rem;
  text-align: right;
}
</style>
