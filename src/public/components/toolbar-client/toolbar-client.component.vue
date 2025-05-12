<script>
import Button from "primevue/button";
import LanguageSwitcherComponent from "../language-switcher/language-switcher.component.vue";

export default {
  name: "toolbar-client-component",
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

    <div class="left-section">
      <Button icon="pi pi-search" class="icon-button search" aria-label="Buscar"  />
      <input
          v-model="onmessage"
          placeholder="Buscar..."
          autocomplete="off"
          aria-label="Buscar"
          class="search-input"
      />
    </div>

    <!-- Sección Central -->
    <div class="center-section">
      <img
          src="https://raw.githubusercontent.com/UPC-PaxTech/uTime/refs/heads/develop/img/logoutime.png"
          alt="uTime Logo"
          class="logo-img"
      />
    </div>


    <div class="n-section">
      <router-link to="/client/notifications">
        <Button icon="pi pi-bell" class="icon-button" aria-label="Notifications" />
      </router-link>
    </div>

    <!-- Sección Derecha -->
    <div class="right-section">
      <!-- Componente de cambio de idioma -->
      <language-switcher-component/>
      <router-link to="/client/profile">
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

.n-section {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: flex-start;
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

.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.search-input {
  border: none;
  outline: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  max-width: 200px;
  background-color: white;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
}

.search-input:focus {
  box-shadow: 0 0 0 2px #7abaff;
}
</style>