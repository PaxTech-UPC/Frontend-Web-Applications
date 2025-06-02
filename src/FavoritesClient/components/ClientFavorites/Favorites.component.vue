<script>
import { FavoritesApiService } from "../../services/Favorite-api.service.js";
import { FavoriteAssembler } from "../../services/Favorites.assembler.js";
import FavoriteCard from "./FavoriteCard.vue";

export default {
  name: "favorites-component",
  components: { FavoriteCard },
  data() {
    return {
      favoriteList: [],
    };
  },
  async mounted() {
    const response = await FavoritesApiService.getSalons();
    this.favoriteList = FavoriteAssembler.toEntitiesFromResponse(response);
  },
};
</script>

<template>
  <section class="appointments-section">
    <h2 class="title">{{ $t('appointments.review.fav') }}</h2>
    <div class="appointments-left">
      <div class="group">
        <FavoriteCard
            v-for="favorite in favoriteList"
            :key="favorite.id"
            :id="favorite.id"
            :nombre="favorite.name"
            :phone="favorite.phone"
            :especializacion="favorite.location"
            :foto-url="favorite.imageURL"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.appointments-section {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;

}
</style>
