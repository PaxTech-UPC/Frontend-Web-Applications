<script>
import SalonItemComponent from "./salon-item.component.vue";

export default {
  name: "salon-list.component",
  components: {
    salonItem: SalonItemComponent,
  },
  props: {
    salones: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
        },
        {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
        },
        {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
        }
      ],
      isLoading: true
    }
  },
  methods: {
    seleccionarSalon(salon) {
      console.log('Salón seleccionado desde el padre:', salon);
    }
  }
}
</script>

<template>
  <div v-if="isLoading">
    <pv-carousel
        :value="salones"
        :numVisible="3"
        :numScroll="3"
        :responsiveOptions="responsiveOptions"
        circular
        :autoplayInterval="4000"
    >
      <template #item="{ data }">
        <salon-item :salon="data" @seleccionar="seleccionarSalon(data)" />
      </template>
    </pv-carousel>
  </div>
</template>

<style scoped>
</style>