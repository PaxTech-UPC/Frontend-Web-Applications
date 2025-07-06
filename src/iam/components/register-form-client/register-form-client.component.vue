<script>

import { signUp } from "../../services/auth.services.js";
import { createClient } from "../../services/client.service.js";

export default {
  name: "register-form-client-component",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isLoading: false
    };
  },
  methods: {
    async handleRegister() {
      this.isLoading = true;
      try {
        // Paso 1: Registrar usuario y obtener el userId
        const signUpResponse = await signUp({
          email: this.email,
          password: this.password
        });

        console.log("SIGNUP RESPONSE:", signUpResponse); // 👈 revisa si devuelve { id, email }

        const userId = signUpResponse.id; // 👈 usar el id devuelto

        // Paso 2: Crear perfil de cliente
        await createClient({
          firstName: this.firstName,
          lastName: this.lastName,
          userId: userId // 👈 enviar el userId al backend
        });

        alert(this.$t("register.successMessage"));
        this.$router.push("/iam/login"); // Redirigir al login
      } catch (error) {
        console.error(error);
        alert(this.$t("register.errorMessage") || "Error en el registro");
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<template>
  <form class="register-ui-form" @submit.prevent="handleRegister">
    <h2 class="form-title">{{ $t('register.title') }}</h2>
    <p class="form-subtitle">
      {{ $t('register.subtitle') }}
      <router-link to="/iam/login" class="form-link">{{ $t('register.loginLink') }}</router-link>
    </p>

    <div class="form-row">
      <input
          type="text"
          v-model="firstName"
          :placeholder="$t('register.firstNamePlaceholder')"
          class="form-input half"
          required
      />
      <input
          type="text"
          v-model="lastName"
          :placeholder="$t('register.lastNamePlaceholder')"
          class="form-input half"
          required
      />
    </div>

    <input
        type="email"
        v-model="email"
        :placeholder="$t('register.emailPlaceholder')"
        class="form-input"
        required
    />
    <input
        type="password"
        v-model="password"
        :placeholder="$t('register.passwordPlaceholder')"
        class="form-input"
        required
    />

    <button class="form-button" :disabled="isLoading">
      {{ isLoading ? $t('register.loading') : $t('register.createButton') }}
    </button>

  </form>
</template>

<style scoped>
.register-ui-form {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-subtitle {
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: #666;
}

.form-link {
  font-weight: bold;
  color: #731c9f;
  text-decoration: none;
  margin-left: 5px;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.half {
  width: 50%;
}

.form-input {
  width: 100%;
  padding: 12px;
  background-color: #f0f2f5;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #333;
  border-color: #c9c9c9;
  border-width: 1px;

}

.form-input::placeholder {
  color: #999;
}

.form-button {
  display: inline-block;        /* Asegura que se pueda aplicar ancho y alto */
  width: 100%;
  background-color: #731c9f;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
