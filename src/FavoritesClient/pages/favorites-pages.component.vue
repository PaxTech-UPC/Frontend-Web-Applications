<script>
import FavoritesComponent from "../components/ClientFavorites/Favorites.component.vue";
import {FavoritesApiService} from "../services/Favorite-api.service.js";
import {FavoriteAssembler} from "../services/Favorites.assembler.js";
import {Favorites} from "../model/Favorites.entity.js";

export default {
  name: "FavoritesPageComponent",
  components: {
    FavoritesComponent,
  },
  data() {
    return {
      favoriteList: [],
    };
  },
  mounted() {
    FavoritesApiService.getAll()
        .then((response) => {
          this.favoriteList = FavoriteAssembler.toEntitiesFromResponse(response);
        })
        .catch((error) => {
          console.error("Error al cargar favoritos:", error);
        });
  },
  methods: {
    getphotos(){
      console.log(this.favoriteList);
    }
  }
};
</script>
<template>
  <section class="appointments-section">
    <h2 class="title">My favorites</h2>

    <div class="appointments-left">
      <div class="group">
        <favorites-component
            v-for="favorite in favoriteList"
            :key="favorite.id"
            :id="favorite.id"
            :nombre="favorite.nombre"
            :especializacion="favorite.especializacion"
            :foto-url="favorite.fotoUrl"
        />
      </div>
    </div>
    <button @click="getphotos()">Get photos
    </button>
  </section>
</template>

<style scoped>

</style>
