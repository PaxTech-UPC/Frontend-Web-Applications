<script>

import LoginFormComponent from "../../components/login-form/login-form.component.vue"

export default {
  name: "login-page-component",
  components: {LoginFormComponent}
}
</script>

<template>
  <div class="login-container">
    <!-- Imagen de fondo -->
    <div class="background-image"></div>

    <!-- Capa oscura -->
    <div class="background-overlay"></div>

    <!-- Contenido de la página -->
    <div class="login-content">
      <!-- Barra de navegación superior -->
      <div class="toolbar">
        <div class="toolbar-left">
          <img
              src="https://avatars.githubusercontent.com/u/206014350?s=400&u=4e7bc98f185240130a5c8af759bccb2609641741&v=4"
              alt="Logo"
              class="logo"
          />
        </div>
        <span class="spacer"></span>
        <div class="toolbar-right">
          <router-link to="/iam/login">
            <button class="toolbar-button">Sign In</button>
          </router-link>
          <router-link to="/iam/register">
            <button class="toolbar-button">Register</button>
          </router-link>
        </div>
      </div>

      <!-- Logo + Texto + Formulario -->
      <div class="center-content">
        <img
            src="https://raw.githubusercontent.com/UPC-PaxTech/uTime/refs/heads/develop/img/logoutime.png"
            alt="uTime Logo"
            class="main-logo"
        />
        <h1 class="welcome-text">Back to beauty business?</h1>
        <login-form-component/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.login-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://i.pinimg.com/originals/a0/db/f0/a0dbf0432d5eb7d05a3cd572b4eb84b7.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
  height: 100%;
  width: 100%;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  opacity: 0.6;
}

.login-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  z-index: 3;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  height: 60px;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
}

.toolbar-right {
  display: flex;
  align-items: center;
}

.toolbar-button {
  background-color: #211f1f;
  color: #ffffff;
  margin-left: 20px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
}

.toolbar-button:hover {
  background-color: #3b3939;
  color: white;
}

.spacer {
  flex: 1 1 auto;
}

.center-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  text-align: center;
  height: 100%;
  width: 100%;
}

.welcome-text {
  font-size: 28px;
  margin-bottom: 10px;
}

.main-logo {
  width: 300px;
  margin-bottom: 10px;
}
</style>