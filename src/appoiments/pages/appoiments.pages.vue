<script>
import WorkerList from "../components/worker/worker-list.component.vue";
import { Worker } from "../model/worker.entity.js";
import { WorkerApiServices } from "../services/worker-api.services.js";
import PaymentGateway from "../components/payment/payment-gateway.component.vue";
import Calendar from "../components/calendar/calendar.component.vue";
import ClientLayoutComponent from "../../public/components/client-layout/client-layout.component.vue";

export default {
  name: "appoiments.pages",
  components: {
    ClientLayoutComponent,
    Calendar,
    PaymentGateway,
    WorkerList
  },
  data() {
    return {
      workers: [],
      selectedWorker: null,
      selectedDate: null,
      selectedTime: null
    }
  },
  mounted() {
    const workerService = new WorkerApiServices();
    workerService.getUrlToWorker()
        .then(result => {
          this.workers = result.data.map(worker => {
            return new Worker(
                worker.workerId,
                worker.nombre,
                worker.especializacion,
                worker.fotoUrl,
                worker.id,
            );
          });
          console.log(result.data);
        })
        .catch(error => {
          console.error("Error al obtener los trabajadores:", error);
        });
  },
  methods: {
    handleWorkerSelection(worker) {
      this.selectedWorker = worker;
      console.log("Trabajador seleccionado:", worker);
    },
    handleDateChange(date) {
      this.selectedDate = date;
      console.log("Fecha seleccionada:", date);
    }
  }
};
</script>

<template>
  <main>
    <client-layout-component/>
    <div class="columnas">

      <section>
        <h2>Elige a tu estilista</h2>
        <worker-list
            :workers="workers"
            :selected-worker="selectedWorker"
            @select="handleWorkerSelection"
        />
      </section>

      <section>
        <calendar @date-selected="handleDateChange" />
      </section>

      <section>
        <payment-gateway />
      </section>

    </div>
  </main>
</template>

<style scoped>
.columnas {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.columnas > section {
  flex: 1 1 30%;
  min-width: 250px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
}

</style>