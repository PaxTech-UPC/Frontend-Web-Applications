<script>
import FavoritesComponent from "../components/ClientFavorites/Favorites.component.vue";
import UpcomingClientComponent from "../../AppointmentsClient/components/upcoming-client/upcoming-client.component.vue";
export default {
  name: "FavoritesPageComponent",
  components: {
    UpcomingClientComponent,
    FavoritesComponent,
  },

};
</script>
<template>
  <upcoming-client-component class="upcoming-appo"></upcoming-client-component>
  <favorites-component></favorites-component>
</template>

<style scoped>
.upcoming-appo{
  width: 250px;
  background-color: #f0dff0; /* Soft purple */
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: fixed;
  top: 300px;
  left: 5px;
}

</style>
