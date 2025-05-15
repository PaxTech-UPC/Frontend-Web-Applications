<script>
import RegisterFormClientComponent from "../../components/register-form-client/register-form-client.component.vue";
import RegisterFormProvider from "../../components/register-form-provider/register-form-provider.component.vue";

export default {
  name: "register-page-component",
  components: {RegisterFormProvider, RegisterFormClientComponent},
  data() {
    return {
      isProvider: false,
      showPlanSelector: false,
    };
  },
  methods: {
    toggleForm(value) {
      this.isProvider = value;
      this.showPlanSelector = false;
    },
    completeRegistration() {
      this.showPlanSelector = true;
    },
  },
}
</script>

<template>
  <div class="login-container">
    <!-- Imagen de fondo -->
    <div class="background-image"></div>

    <!-- Capa oscura -->
    <div class="background-overlay"></div>

    <!-- Contenido -->
    <div class="login-content">
      <!-- Barra de navegación -->
      <div class="toolbar">
        <div class="toolbar-left">
          <img
              src="https://avatars.githubusercontent.com/u/206014350?s=400&u=4e7bc98f185240130a5c8af759bccb2609641741&v=4"
              alt="Logo"
              class="logo"
          />
        </div>
        <div class="spacer"></div>
        <div class="toolbar-right">
          <router-link to="/iam/login">
            <button>Sign In</button>
          </router-link>
          <router-link to="/iam/register">
            <button>Register</button>
          </router-link>
        </div>
      </div>

      <!-- Formulario -->
      <div class="center-content">
        <img
            src="https://raw.githubusercontent.com/UPC-PaxTech/uTime/refs/heads/develop/img/logoutime.png"
            alt="uTime Logo"
            class="main-logo"
        />

        <div class="register-container">
          <div class="toggle-buttons">
            <button
                class="button-toggle"
                :class="{ active: !isProvider }"
                @click="toggleForm(false)"
            >
              Client
            </button>
            <button
                class="button-toggle"
                :class="{ active: isProvider }"
                @click="toggleForm(true)"
            >
              Provider
            </button>
          </div>

          <register-form-client-component v-if="!isProvider" />
          <register-form-provider
              v-if="isProvider"
              @complete-registration="completeRegistration"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
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
  background-image: url("https://i.pinimg.com/originals/a0/db/f0/a0dbf0432d5eb7d05a3cd572b4eb84b7.jpg");
  background-size: cover;
  background-position: center;
  z-index: 1;
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
  height: 55px;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
}

.spacer {
  flex: 1 1 auto;
}

.toolbar-right button {
  background-color: #211f1f;
  color: #ffffff;
  margin-left: 20px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
}

.toolbar-right button:hover {
  background-color: #3b3939;
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
}

.main-logo {
  width: 200px;
}


.toggle-buttons {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.button-toggle {
  padding: 0.5rem 1.5rem;
  border: none;
  background-color: #ffffff;
  color: #000;
  margin: 0 0.5rem;
  cursor: pointer;
  font-weight: bold;
}

.button-toggle.active {
  background-color: #333;
  color: #fff;
}
</style>