<script>
import {number} from "@intlify/core-base";
import {Favorites} from "../../model/Favorites.entity.js";

export default {
  name: "FavoritesComponent",
  props: {
    id: number,
    nombre: String,
    especializacion: String,
    fotoUrl: String,
    worker:{type:Favorites},
  }
};
</script>

<template>
  <div class="staff-content">
    <img class="staff-image" :src="fotoUrl" alt="Staff photo" />
    <div class="staff-info">
      <div class="staff-name">{{ nombre }}</div>
      <div class="staff-role">{{ especializacion }}</div>
    </div>
    <div class="staff-action">
      <button>{{ $t('favorites.bookNow') }}</button>
    </div>
  </div>
</template>

