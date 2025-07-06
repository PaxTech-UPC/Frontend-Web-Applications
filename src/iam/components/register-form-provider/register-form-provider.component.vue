<script>

import { signUp } from "../../services/auth.services.js";
import { createProvider } from "../../services/provider.service.js";

export default {
  name: "register-form-provider-component",
  data() {
    return {
      companyName: "",
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

        const userId = signUpResponse.id;

        // Paso 2: Crear perfil de proveedor
        await createProvider({
          companyName: this.companyName,
          userId: userId // 👈 enviar el userId al backend
        });

        alert(this.$t("registerProvider.successMessage"));
        this.$router.push("/iam/login");
      } catch (error) {
        console.error(error);
        alert(this.$t("registerProvider.errorMessage") || "Error en el registro");
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<template>
  <form class="register-ui-form" @submit.prevent="handleRegister">
    <h2 class="form-title">{{ $t('registerProvider.title') }}</h2>
    <p class="form-subtitle">
      {{ $t('registerProvider.subtitle') }}
      <router-link to="/iam/login" class="form-link">{{ $t('registerProvider.loginLink') }}</router-link>
    </p>

    <input
        type="text"
        v-model="companyName"
        :placeholder="$t('registerProvider.companyNamePlaceholder')"
        class="form-input"
        required
    />
    <input
        type="email"
        v-model="email"
        :placeholder="$t('registerProvider.emailPlaceholder')"
        class="form-input"
        required
    />
    <input
        type="password"
        v-model="password"
        :placeholder="$t('registerProvider.passwordPlaceholder')"
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
