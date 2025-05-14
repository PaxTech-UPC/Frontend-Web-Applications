<script>
import WorkerItemComponent from "./worker-item.component.vue";

export default {
  name: "worker-list.component",
  components: {
    workerItem: WorkerItemComponent
  },
  props: {
    workers: {
      type: Array,
      required: true
    },
    selectedWorker: {
      type: Object,
      required: false
    }
  },
  emits: ['select'],
  methods: {
    emitSelection(worker) {
      this.$emit('select', worker);
    }
  }
}
</script>

<template>
  <div v-for="worker in workers" :key="worker.workerId" >
    <worker-item
        :worker="worker"
        :selected="worker.workerId === selectedWorker?.workerId"
        @select="emitSelection"
    />

    <div v-if="worker.workerId === selectedWorker?.workerId" class="mensaje">
      Has seleccionado a <strong>{{ worker.nombre }}</strong> como tu estilista.
    </div>
    <!--<worker-item :worker="worker"></worker-item>-->
    <br>
  </div>
</template>

<style scoped>
.mensaje {
  margin-top: 1rem;
  font-weight: bold;
  color: #333;
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
}
</style>