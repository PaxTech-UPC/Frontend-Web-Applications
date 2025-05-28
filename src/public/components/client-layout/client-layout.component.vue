<script>
import ToolbarClientComponent from "../toolbar-client/toolbar-client.component.vue";
import SidebarClientComponent from "../sidebar-client/sidebar-client.component.vue";


export default {
  name: "client-layout-component",
  components: {SidebarClientComponent, ToolbarClientComponent}
}
</script>

<template>
  <div class="layout-wrapper">
    <toolbar-client-component class="toolbar-client"/>

    <main class="content-area">
      <router-view />
    </main>
  </div>
</template>

<style scoped>

.layout-wrapper {
  display: flex;
  flex-direction: column;
}

.toolbar-client {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.content-area {
  margin-top: 120px; /* Ajusta este valor según la altura real del toolbar */
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>