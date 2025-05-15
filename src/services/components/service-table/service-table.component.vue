<template>
  <div class="service-table">

    <DataTable class="p-datatable-sm" v-model:editing-rows="editingRows" :value="services" editMode="row" datakey="id" @row-edit-save="onRowEditSave"
    :pt="{
      table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
                    })
                }
    }">
      <Column field="name" :header="$t('services.service')">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid />
        </template>
      </Column>

      <Column field="duration" :header="$t('services.duration')" />
      <Column field="price" :header="$t('services.price')">
        <template #body="{ data }">
          s/{{ data.price }}
        </template>
      </Column>

      <Column field="status" :header="$t('services.status')" />

      <Column :header="$t('services.actions')">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text p-button-sm" />
          <Button icon="pi pi-trash" class="p-button-text p-button-sm p-button-danger" @click="deleteService(data.id)" />
        </template>
      </Column>
    </DataTable>

    <div class="new-service">
      <Button label=" New Service" icon="pi pi-plus" class="p-button-raised" @click="createService" />
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { ServiceApiService } from '../../services/service-api.service.js';

export default {
  name: 'ServiceTableComponent',
  components: {
    DataTable,
    Column,
    Button,
  },
  data() {
    return {
      services: []
    };
  },
  mounted() {
    this.loadServices();
  },
  methods: {
    loadServices() {
      ServiceApiService.getAll().then(response => {
        this.services = response.data;
      }).catch(error => {
        console.error('❌ Error loading services:', error);
      });
    },
    createService() {
      const servicio = {
        id: 0,
        name: 'Servicio de prueba',
        description: 'tralalero tralalala!',
        duration: 10,
        price: 1000,
        status: 'Active'
      };
      ServiceApiService.create(null, servicio).then(() => {
        this.loadServices();
      }).catch(error => {
        console.error('❌ Error creating service:', error);
      });
    },
    deleteService(id) {
      ServiceApiService.delete(id).then(() => {
        this.services = this.services.filter(s => s.id !== id);
      }).catch(error => {
        console.error('❌ Error deleting service:', error);
      });
    }
  }
};
</script>

<style scoped>
.service-name {
  font-weight: bold;
}
.service-desc {
  color: #666;
  font-size: 0.85rem;
}
.new-service {
  margin-top: 1rem;
  text-align: right;
}
.p-datatable-sm {
  background-color: #eee;
}
</style>
