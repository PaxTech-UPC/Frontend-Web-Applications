<script>
import ToolbarClientComponent from "../toolbar-client/toolbar-client.component.vue";
import SidebarClientComponent from "../sidebar-client/sidebar-client.component.vue";


export default {
  name: "client-layout-component",
  components: {SidebarClientComponent, ToolbarClientComponent}
}
</script>

<template>

  <toolbar-client-component/>
  <sidebar-client-component/>
  <main>
    <router-view/>
  </main>

</template>

<style scoped>

</style>