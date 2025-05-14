<script>
export default {
  name: "FavoriteCard",
  props: {
    id: String,
    nombre: String,
    phone: String,
    fotoUrl: String,
  },
  data() {
    return {
      rating:0,
      n:'',
    };
  },
    methods:{
    getStart(index){
      this.rating=index+1;
      this.n = String(index+1);
    }
    }

};

</script>
<template>
  <div class="favorite-card">
    <img :src="fotoUrl" alt="Salon Image" />
    <h3 class="favorite-name">{{ nombre }}</h3>
    <p class="favorite-phone">{{ phone }}</p>
    <div class="favorite-stars">
      <p
          v-for="(star, index) in 5"
          :key="index"
          :class="['pi', index < rating && n ? 'pi-star-fill' : 'pi-star']"
          @click="getStart(index)"
          style="cursor: pointer; margin-right: 5px;"
      ></p>
      <span v-if="n" style="margin-left: 10px;">
  {{ n }} / 5
</span>
      <span v-else style="margin-left: 10px;">
  0 / 5
</span>
    </div>
  </div>
</template>

<style scoped>
.favorite-card {
  display: grid;
  flex-direction: row;
  border: 1px solid #ccc;
  flex: 1;
  padding: 3rem;
  overflow-x: auto;
  grid-template-columns: repeat(3, 1fr);
}
.favorite-stars{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>