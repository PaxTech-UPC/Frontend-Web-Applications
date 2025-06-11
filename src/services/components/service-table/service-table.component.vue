<template>
  <div class="service-table">

    <DataTable class="p-datatable-sm" v-model:editing-rows="editingRows" :value="services" editMode="row" datakey="id"
               @row-edit-save="onRowEditSave"
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

      <Column field="duration" :header="$t('services.duration')">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid />
        </template>
      </Column>

      <Column field="price" :header="$t('services.price')">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" mode="currency" currency="PEN" locale="en-US" fluid />
        </template>
        <template #body="{ data, field }">
          {{ formatCurrency(data[field]) }}
        </template>
      </Column>

      <Column field="status" :header="$t('services.status')">
        <template #editor="{ data, field }">
          <Dropdown v-model="data[field]" :options="['Active', 'Paused']" />
        </template>
      </Column>

      <Column :rowEditor="true" style="width: 6rem" bodyStyle="text-align:center" />

      <Column> <!--:header="$t('services.actions')"-->
        <template #body="{ data }">
          <!--<Button icon="pi pi-pencil" class="p-button-text p-button-sm" @click="editRow(data)" />
          -->

          <Button icon="pi pi-trash" class="p-button-text p-button-sm p-button-danger" @click="deleteService(data.id)" />
        </template>
      </Column>

    </DataTable>

    <div class="new-service">
      <ServiceDialog @service-created="loadServices"></ServiceDialog>
    </div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { ServiceApiService } from '../../services/service-api.service.js';
import ServiceDialog from '../service-dialog/service-dialog.component.vue'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default {
  name: 'ServiceTableComponent',
  components: {
    DataTable,
    Column,
    Button,
    ServiceDialog,
    InputText,
    Dropdown,
  },
  data() {
    return {
      services: [],
      editingRows: []
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
    deleteService(id) {
      ServiceApiService.delete(id).then(() => {
        this.services = this.services.filter(s => s.id !== id);
        console.log(this.services + 'was deleted successfully.');
      }).catch(error => {
        console.error('❌ Error deleting service:', error);
      });
    },
    onRowEditSave(event) {
      const updatedService = event.newData;
      const id = updatedService.id;

      ServiceApiService.update(id, updatedService)
          .then(() => {
            // Opcional: mensaje de éxito
            console.log('✅ Service updated:', updatedService);
          })
          .catch(error => {
            console.error('❌ Error updating service:', error);
          });
      this.loadServices()
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PEN' }).format(value);
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
