<script>
import SalonListComponent from "../../../dashboard/components/salon/salon-list.component.vue";
import ClientLayoutComponent from "../../../public/components/client-layout/client-layout.component.vue";
export default {
  name: "upcoming-client-component",
  components: {
    SalonListComponent: SalonListComponent,
    ClientLayout: ClientLayoutComponent,
  },
  data() {
    return {
      salons: []
    };
  },
  mounted() {
    this.salons = [];
  }
}
</script>

<template>


</template>

<style scoped>
.custom-card {
  background-color: #e6e6e6;
  border-radius: 16px;
  padding: 16px;
  max-width: 700px;
  margin: 0 auto;
}

.appointment-content {
  display: flex;
  align-items: center;
}

.date-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
}

.day {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.date-number {
  font-size: 40px;
  font-weight: 800;
  line-height: 1;
  margin-top: 4px;
  color: #000;
}

.divider {
  width: 2px;
  height: 80px;
  background-color: #999;
  margin: 0 16px;
  border-radius: 1px;
}

.appointments-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.appointment-item {
  border-radius: 8px;
  padding: 12px;
}

.grey {
  background-color: #c6c6c6;
}

.pink {
  background-color: #d4bdbd;
}

.appointment-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.appointment-description {
  font-size: 14px;
  font-weight: 600;
  color: #111;
}


.custom-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 2rem;
  border-left: 6px solid #731c9f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.appointment-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
}

.date-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #731c9f;
  font-weight: bold;
  min-width: 70px;
}

.date-number {
  font-size: 24px;
  line-height: 1;
}

.day {
  font-size: 16px;
}

.divider {
  width: 1px;
  background-color: #ddd;
  height: 60px;
}

.appointments-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.appointment-item {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
}

.appointment-item.grey {
  background-color: #f5f5f5;
}

.appointment-item.pink {
  background-color: #fce4ec;
}

.appointment-label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #1e1e1e;
}

.appointment-description {
  color: #333;
}
</style>