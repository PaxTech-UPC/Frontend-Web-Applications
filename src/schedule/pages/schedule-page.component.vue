<script>
import CalendarComponent from "../components/calendar/calendar.component.vue";
import ReservationDetailsComponent from "../components/testing/testing.component.vue";

export default {
  name: "schedule-page-component",
  components: {ReservationDetailsComponent, CalendarComponent}
}
</script>

<template>

  <reservation-details-component/>

</template>

<style scoped>

</style>