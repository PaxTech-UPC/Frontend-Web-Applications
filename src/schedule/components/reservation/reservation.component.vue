<script>
export default {
  name: "reservation-component",
  props: {
    tipo: String,
    startTime: String,
    endTime: String,
    clientName: String
  }
};
</script>

<template>
  <div class="reservation-block">
    <strong>{{ tipo }}</strong><br>
    <span>{{ clientName }}</span><br>
    <small>{{ startTime }} - {{ endTime }}</small>
  </div>
</template>

<style scoped>
.reservation-block {
  background-color: #7a22a6;
  color: white;
  padding: 4px;
  margin: 2px;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
}
</style>
