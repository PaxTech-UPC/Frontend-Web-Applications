<script>
import SidebarProviderComponent from "../sidebar-provider/sidebar-provider.component.vue";
import ToolbarProviderComponent from "../toolbar-provider/toolbar-provider.component.vue";

export default {
  name: "provider-layout-component",
  components: {ToolbarProviderComponent, SidebarProviderComponent}
}
</script>

<template>
  <!-- provider-layout.component.html -->

  <toolbar-provider-component/> <!-- header fijo -->

  <div class="flex h-screen">
    <!-- Sidebar ocupa ancho fijo -->
    <div class="w-64 bg-purple-100">
      <sidebar-provider-component />
    </div>

    <!-- Contenido ocupa el resto del espacio -->
    <div class="flex-1 overflow-auto">
      <router-view />
    </div>
  </div>



</template>

<style scoped>
.layout {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 1rem;
  background: white;
}

</style>