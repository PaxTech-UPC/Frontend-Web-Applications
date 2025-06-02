<script>
import FavoritesComponent from "../components/ClientFavorites/Favorites.component.vue";
import UpcomingClientComponent from "../../AppointmentsClient/components/upcoming-client/upcoming-client.component.vue";
import SidebarClientComponent from "../../public/components/sidebar-client/sidebar-client.component.vue";

export default {
  name: "FavoritesPageComponent",
  components: {
    SidebarClientComponent,
    UpcomingClientComponent,
    FavoritesComponent,
  },
};
</script>

<template>
  <div class="main-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <sidebar-client-component />
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <upcoming-client-component class="upcoming-appo" />
      <favorites-component />
    </main>
  </div>
</template>

<style scoped>
/* Layout container */
.main-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 0 2rem;
  box-sizing: border-box;
}

/* Sidebar layout */
.sidebar {
  position: fixed;
  left: 1.5rem;
  width: 260px;
  z-index: 100;
}

/* Main content */
.main-content {
  flex: 1;
  margin-left: 300px; /* Compensa ancho del sidebar + margen */
  overflow-x: hidden;
}

/* Upcoming appointments box */
.upcoming-appo {
  width: 250px;
  background-color: #f0dff0;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: fixed;
  top: 440px;
  left: 1.5rem;
}
</style>
