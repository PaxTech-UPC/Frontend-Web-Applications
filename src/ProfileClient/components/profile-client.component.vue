<script>
import { ProfileClientService } from "../service/profile-api.service.js";

export default {
  name: "profile-client-component",
  data() {
    return {
      isLoading: true,
      profile: null,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    };
  },
  async mounted() {
    try {
      const profileService = new ProfileClientService();
      this.profile = await profileService.getProfile();
      console.log("Perfil cargado:", this.profile);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    canChangePassword() {
      return (
          this.passwordForm.newPassword.length >= 8 &&
          this.passwordForm.confirmPassword === this.passwordForm.newPassword
      );
    }
  },
  methods: {
    changePassword() {
      console.log('Changing password...');
    },
    logout() {
      console.log('Logging out...');
      localStorage.clear();
      this.$router.push('/iam/login');
    },
    deleteAccount() {
      console.log('Deleting account...');
    }
  }
};
</script>

<template>
  <div class="profile-container">
    <div v-if="isLoading" class="loading">
      <span class="loader"></span>
      <p>Cargando perfil...</p>
    </div>

    <div v-else>
      <!-- Foto de perfil -->
      <div class="avatar-container">
        <img
            src="https://randomuser.me/api/portraits/lego/2.jpg"
            alt="Foto de perfil"
            class="avatar"
        />
        <h2 class="name">{{ profile.name }}</h2>
        <p class="email">{{ profile.email }}</p>
      </div>

      <div class="profile-info">
        <!-- Datos personales -->
        <h3 class="section-title">Información personal</h3>
        <div class="info-field">
          <label>📱 Teléfono</label>
          <input type="text" :value="profile.phoneNumber" readonly />
        </div>
        <div class="info-field">
          <label>🪪 Documento de identidad</label>
          <input type="text" :value="profile.identityDocument" readonly />
        </div>

        <!-- Cambiar contraseña -->
        <h3 class="section-title">Cambiar contraseña</h3>
        <div class="info-field">
          <label>Contraseña actual</label>
          <input type="password" v-model="passwordForm.currentPassword" placeholder="*********" />
        </div>
        <div class="info-field">
          <label>Nueva contraseña</label>
          <input type="password" v-model="passwordForm.newPassword" placeholder="*********" />
        </div>
        <div class="info-field">
          <label>Confirmar nueva contraseña</label>
          <input type="password" v-model="passwordForm.confirmPassword" placeholder="*********" />
        </div>
        <button
            class="save-btn"
            :disabled="!canChangePassword"
            @click="changePassword"
        >
          Guardar cambios
        </button>
      </div>

      <!-- Botones de sesión -->
      <div class="action-buttons">
        <button class="logout-btn" @click="logout">Cerrar sesión</button>
        <button class="delete-btn" @click="deleteAccount">Eliminar cuenta</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  width: 1000px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #731c9f;
}

.name {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.email {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.profile-info {
  text-align: left;
}

.section-title {
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  color: #731c9f;
  border-bottom: 2px solid #e3d3f7;
  padding-bottom: 0.2rem;
}

.info-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.info-field label {
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  color: #444;
}

.info-field input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
}

.save-btn {
  background-color: #731c9f;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
}

.save-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.logout-btn {
  background-color: #f3c614;
  color: #333;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.delete-btn {
  background-color: #e74c3c;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #731c9f;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #731c9f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
