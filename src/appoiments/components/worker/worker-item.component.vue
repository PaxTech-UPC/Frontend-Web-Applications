<script>
import { Worker } from "../../model/worker.entity.js";
export default {
  name: "worker-item.component",
  props: {
    worker: {
      type: Worker,
      required: true
    },
    selected: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    selectWorker() {
      this.$emit('select', this.worker);
    }
  }
}
</script>

<template>
  <pv-card :class="['card', { 'selected': selected }]" >
    <template #content>
      <div class="card-content">
        <img :src="worker.fotoUrl" alt="Foto del trabajador" class="foto-trabajador" />
        <div class="info-trabajador">
          <h3>{{ worker.nombre }}</h3>
          <p>{{ worker.especializacion }}</p>
          <button @click.stop="selectWorker" class="btn-seleccionar">
            Seleccionar
          </button>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s, background-color 0.3s;
}

.card.selected {
  border: 2px solid #10b981;
  background-color: #e6fef1;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.foto-trabajador {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.info-trabajador {
  flex: 1;
}

.btn-seleccionar {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-seleccionar:hover {
  background-color: #0f766e;
}
</style>