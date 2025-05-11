<script setup>

import LoginPageComponent from "./iam/pages/login-pages/login-page.component.vue";
</script>

<template>

  <login-page-component class="login-page"/>

</template>

<style scoped>

.login-page {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* Esto elimina márgenes y paddings por defecto del navegador */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}



</style>
