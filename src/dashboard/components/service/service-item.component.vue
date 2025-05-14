<script>
import { Service } from "../../model/service/service.entity.js";
import { useRouter } from 'vue-router';


export default {
  name: "services.component",
  props: {
    service: {
      type: Service,
      required: true
    }
  },
  setup() {
    const router = useRouter();

    const handleBookClick = () => {
      router.push({ name: 'appointments' });
    };

    return {
      handleBookClick
    };
  }
}
</script>

<template>


    <div class="service-item">
      <div class="column name">
        <h3>{{ service.name }}</h3>
      </div>

      <div class="column price-duration">
        <p class="price">S/. {{ service.price }}</p>
        <p class="duration">{{ service.duration }} mins</p>
      </div>

      <div class="column button">
        <pv-button @click="handleBookClick">Book</pv-button>
      </div>
    </div>

</template>
<style scoped>
.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  gap: 16px;
}

.column {
  display: flex;
  flex-direction: column;
}

.name h3 {
  margin: 0;
  font-size: 18px;
}

.price {
  font-weight: bold;
  margin-bottom: 4px;
}

.duration {
  color: #666;
  font-size: 14px;
}

.button {
  justify-content: center;
}

button {
  background-color: #f472b6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #ec4899;
}

</style>