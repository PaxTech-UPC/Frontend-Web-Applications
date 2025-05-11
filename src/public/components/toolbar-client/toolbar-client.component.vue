<script>
import Button from "primevue/button";
import LanguageSwitcherComponent from "../language-switcher/language-switcher.component.vue";

export default {
  name: "toolbar-client",
  components: {LanguageSwitcherComponent, Button}
}
</script>


<template>
  <header class="toolbar">
    <!-- Sección Izquierda -->
    <div class="left-section">
      <router-link to="/iam/login">
        <Button icon="pi pi-sign-out" class="icon-button logout" aria-label="Logout" />
      </router-link>
    </div>

    <!-- Sección Central -->
    <div class="center-section">
      <img
          src="https://raw.githubusercontent.com/UPC-PaxTech/uTime/refs/heads/develop/img/logoutime.png"
          alt="uTime Logo"
          class="logo-img"
      />
    </div>


    <div class="right-section">
      <router-link to="/client/notifications">
        <Button icon="pi-bell" class="icon-button" aria-label="Notifications" />
      </router-link>
    </div>

    <!-- Sección Derecha -->
    <div class="right-section">
      <!-- Componente de cambio de idioma -->
      <language-switcher-component/>
      <router-link to="/provider/profile">
        <Button icon="pi pi-user" class="icon-button" aria-label="Profile" />
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-section,
.center-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.center-section {
  flex-grow: 1;
  justify-content: center;
}

.logo-img {
  height: 40px;
  object-fit: contain;
}

.icon-button {
  border-radius: 50%;
  padding: 0.5rem;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  cursor: pointer;
}

.icon-button:hover {
  background-color: #e0e0e0;
}

.logout {
  color: #e53935 !important;
}
</style>