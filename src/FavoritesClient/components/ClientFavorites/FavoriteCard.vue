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
    <img :src="fotoUrl" alt="Salon Image" class="img-fluid" />
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
    <button class="book-btn">{{ $t('favorites.bookNow') }}</button>
  </div>
</template>

<style scoped>
.favorite-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-left: 70px;
  margin-bottom: 1rem;
  max-width: 300px;
  width: 100%;
}


@media (max-width: 768px) {
  .favorite-card {
    margin-left: 20px;
    max-width: 100%;
  }
}
.favorite-card img {
  width: 100%;
  max-width: 170px;
  height: auto;
  object-fit: cover;
  margin: 0 auto;
  display: block;
}


.favorite-name {
  font-size: 1rem;
  margin: 0.3rem 0;
  font-weight: bold;
}

.favorite-phone {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.favorite-stars {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

</style>