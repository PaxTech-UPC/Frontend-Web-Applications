<template>
  <div class="card">
    <Button :label="$t('services.new')" icon="pi pi-plus" class="p-button-raised" @click="visible = true" />

    <Dialog v-model:visible="visible" modal header="New Service" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-6">
        {{ $t('services.addInfo') || 'Add the following information' }}
      </span>

      <div class="flex items-center gap-4 mb-4">
        <label for="service-name" class="font-semibold w-24">{{ $t('services.service') }}</label>
        <InputText id="service-name" v-model="service" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="duration" class="font-semibold w-24">{{ $t('services.duration') }}</label>
        <InputText id="duration" v-model="duration" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="price" class="font-semibold w-24">{{ $t('services.price') }}</label>
        <InputText id="price" v-model="price" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex items-center gap-4 mb-6">
        <label for="status" class="font-semibold w-24">{{ $t('services.status') }}</label>
        <SelectButton id="status" class="flex-auto" v-model="status" :options="options" />
      </div>

      <div class="flex justify-content-center gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="closeDialog" />
        <Button type="button" label="Save" @click="createService" />
      </div>
    </Dialog>
  </div>
</template>

<script>
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import { Dialog, InputText } from 'primevue';
import { ServiceApiService } from '../../services/service.service.js';

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
      // Validar campos
      if (!this.service || !this.duration || !this.price || !this.status) {
        alert('Please complete all fields');
        return;
      }

      const newService = {
        name: this.service,
        duration: this.duration,
        price: this.price,
        status: this.status,
      };

      try {
        await ServiceApiService.create(newService);
        this.$emit('service-created'); // Notifica al padre para recargar lista si es necesario
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
