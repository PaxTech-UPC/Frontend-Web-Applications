<script>
import SidebarProviderComponent from "../sidebar-provider/sidebar-provider.component.vue";
import ToolbarProviderComponent from "../toolbar-provider/toolbar-provider.component.vue";

export default {
  name: "provider-layout-component",
  components: {ToolbarProviderComponent, SidebarProviderComponent}
}
</script>

<template>

  <toolbar-provider-component/>
  <sidebar-provider-component/>

</template>

<style scoped>

</style>