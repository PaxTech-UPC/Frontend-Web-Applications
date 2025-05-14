<script>
import ServiceItemComponent from "./service-item.component.vue";
import workerItem from "../../../appoiments/components/worker/worker-item.component.vue";
export default {
  name: "services-list.component",
  components: {
    workerItem,
    ServiceItem: ServiceItemComponent
  },
  props: {
    services: {
      type: Array,
      required: true
    }
  },

}
</script>

<template>
  <pv-card>
    <template #content>
      <div class="services-container">
        <service-item
            v-for="(s, index) in services"
            :key="index"
            :service="s"
        />
      </div>
    </template>
  </pv-card>

</template>

<style scoped>

</style>