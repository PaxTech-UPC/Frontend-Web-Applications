<template>
  <div class="service-table">
    <DataTable class="p-datatable-sm" v-model:editing-rows="editingRows" :value="services" editMode="row" dataKey="id"
               @row-edit-save="onRowEditSave"
               :pt="{ table: { style: 'min-width: 50rem' } }">
      <Column field="name" :header="$t('services.service')">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>

      <Column field="duration" :header="$t('services.duration')">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" type="number" />
        </template>
      </Column>

      <Column field="price" :header="$t('services.price')">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" type="number" />
        </template>
        <template #body="{ data }">
          PEN {{ data.price.toFixed(2) }}
        </template>
      </Column>

      <Column field="status" :header="$t('services.status')">
        <template #editor="{ data, field }">
          <Dropdown v-model="data[field]" :options="['Active', 'Paused']" />
        </template>
      </Column>

      <Column :rowEditor="true" style="width: 6rem" bodyStyle="text-align:center" />

      <Column>
        <template #body="{ data }">
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="deleteService(data.id)" />
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
import { ProviderApiService } from '../../services/provider-api.services.js'; // ✅ AÑADIDO
import ServiceDialog from '../service-dialog/service-dialog.component.vue';
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
    async loadServices() {
      try {
        const userId = parseInt(localStorage.getItem("user_id"));
        console.log("👤 userId actual:", userId);

        // ✅ 1. Traer todos los providers
        const providers = await ProviderApiService.getAllProviders();
        console.log("🏢 Todos los providers:", providers);

        // ✅ 2. Buscar el provider asociado al userId
        const provider = providers.find((p) => p.userId === userId);

        if (!provider) {
          console.error("❌ No se encontró provider para este userId");
          return;
        }

        console.log("✅ Provider encontrado:", provider);

        // ✅ 3. Cargar todos los servicios
        const allServices = await ServiceApiService.getAll();
        console.log("📦 Todos los servicios del backend:", allServices);

        // ✅ 4. Filtrar solo los servicios de este provider
        this.services = allServices.filter(
            (s) => s.salonId === provider.id
        );
        console.log("📌 Servicios filtrados para este provider:", this.services);
      } catch (error) {
        console.error("❌ Error cargando servicios:", error);
      }
    },

    async deleteService(id) {
      try {
        await ServiceApiService.delete(id);
        this.services = this.services.filter(s => s.id !== id);
      } catch (error) {
        console.error('❌ Error deleting service:', error);
      }
    },

    async onRowEditSave(event) {
      const updatedService = event.newData;
      try {
        await ServiceApiService.update(updatedService.id, updatedService);
        this.loadServices();
      } catch (error) {
        console.error('❌ Error updating service:', error);
      }
    },
  }
};
</script>
<style scoped>
.service-table {
  margin-top: 1.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

:deep(.p-datatable-sm) {
  background-color: #ffffff !important; /* 🔥 Fondo blanco */
  color: #333333 !important;           /* 🔥 Texto gris oscuro */
  font-size: 0.95rem;
  border-radius: 10px;
}

:deep(.p-datatable-sm .p-datatable-thead > tr > th) {
  background-color: #f2f2f2 !important; /* 🔥 Encabezado gris claro */
  color: #333333 !important;            /* 🔥 Letras negras */
  font-weight: 600;
  border: 1px solid #e0e0e0;
  text-align: center;
  padding: 12px;
}

:deep(.p-datatable-sm .p-datatable-tbody > tr) {
  background-color: #ffffff !important; /* 🔥 Filas blancas */
  border-bottom: 1px solid #eaeaea;
}

:deep(.p-datatable-sm .p-datatable-tbody > tr:hover) {
  background-color: #fafafa !important; /* 🔥 Hover muy suave */
}

:deep(.p-datatable-sm .p-datatable-tbody > tr > td) {
  text-align: center;
  border: none;
  color: #333333 !important;
}

:deep(.p-button-text.p-button-danger) {
  color: #e74c3c !important;
}

:deep(.p-button-text.p-button-danger:hover) {
  background-color: rgba(231, 76, 60, 0.1) !important;
  color: #c0392b !important;
}

:deep(.p-row-editor) {
  color: #3498db !important; /* 🔵 Azul suave para editar */
}

:deep(.p-row-editor:hover) {
  background-color: rgba(52, 152, 219, 0.1) !important;
}

.new-service {
  margin-top: 1rem;
  text-align: right;
}

:deep(.new-service .p-button) {
  background-color: #27ae60 !important; /* 🔥 Verde moderno */
  color: #fff !important;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s ease;
}

:deep(.new-service .p-button:hover) {
  background-color: #219150 !important;
  transform: scale(1.03);
}
</style>
