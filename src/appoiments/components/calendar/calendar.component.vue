<script>
export default {
  name: "calendar.component",
  data() {
    return {
      fecha: null,
      horaSeleccionada: null,
      horarios: [
        "10:30 AM", "12:00 PM", "2:00 PM",
        "3:30 PM", "5:00 PM", "7:30 PM"
      ],
      mensaje: '',
    }
  },
  watch: {
    horaSeleccionada(newHora) {
      if (this.fecha && newHora) {
        const fechaFormateada = this.fecha.toLocaleDateString("es-PE", {
          weekday: "long", // Día de la semana en formato largo
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        this.mensaje = `📅 ${fechaFormateada} a las 🕒 ${newHora}`;
      }
    }
  }
}
</script>

<template>
  <section>
    <h2>Elige la fecha</h2>
    <pv-calendar v-model="fecha" inline dateFormat="dd/mm/yy" />

    <div class="leyenda">
      <span class="pi pi-circle-fill no-disponible">No Disponible</span>
      <span class="pi pi-circle disponible">Disponible</span>
      <span class="pi pi-circle-fill seleccionado">Seleccionado</span>
    </div>

    <span class="select-horarios">
      <pv-select-button :options="horarios" v-model="horaSeleccionada" />
    </span>

    <div v-if="mensaje" class="resultado">
      {{ mensaje }}
    </div>
  </section>
</template>

<style scoped>
.leyenda {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.no-disponible {
  color: #1e1e1e;
}

.disponible {
  color: #00a8e8;
}

.seleccionado {
  color: #10b981;
}

.select-horarios ::v-deep(.p-selectbutton) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
}

.select-horarios ::v-deep(.p-button) {
  width: 100%;
  max-width: 120px;
  height: 60px;
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 500;
  border-radius: 10px;
  text-align: center;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-horarios ::v-deep(.p-button.p-highlight) {
  background-color: #7e3ff2;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 0 0 2px rgba(126, 63, 242, 0.4);
}

.select-horarios ::v-deep(.p-button:hover) {
  background-color: #e5e7eb;
}

.resultado {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #4b5563;
}
</style>