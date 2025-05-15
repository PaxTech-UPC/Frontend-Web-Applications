<script>
  import AppoimentsPages from "./appoiments/pages/appoiments.pages.vue";
  export default {
    name: "App",
    components: {
      AppoimentsPages: AppoimentsPages,
    },
  }
</script>

<template>
  <!--
    <appoiments-pages />
  -->
  <router-view/>

</template>

<style scoped>

/* Esto elimina márgenes y paddings por defecto del navegador */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}


</style>
