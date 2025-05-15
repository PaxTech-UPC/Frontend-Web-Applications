<script>
export default {
  name: "profile-client-component",
  data() {
    return {
      isLoading: false,
      showCurrentPasswordField: false,
      profile: {
        name: '',
        email: '',
        phoneNumber: '',
        identityDocument: '',
        notifications: false,
        location: false,
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    };
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
    },
    deleteAccount() {
      console.log('Deleting account...');
    }
  }
};
</script>

<template>
  <div class="profile-container">
    <div class="back-button">
      <button @click="$router.push('/client/homeClient')">
        <span class="material-icons">arrow_back</span> Back
      </button>
    </div>

    <h1 class="profile-title">
      Your profile 💺
      <button class="edit-button">
        <span class="material-icons">edit</span>
      </button>
    </h1>

    <div class="profile-content" v-if="!isLoading">
      <div class="profile-sections">
        <!-- Personal Information -->
        <div class="profile-section">
          <h2 class="section-title">Personal information</h2>
          <form @submit.prevent>
            <div class="form-field">
              <label>Name</label>
              <input type="text" v-model="profile.name" />
            </div>

            <div class="form-field">
              <label>Email</label>
              <input type="email" v-model="profile.email" />
            </div>

            <div class="form-field">
              <label>Phone Number</label>
              <input type="tel" v-model="profile.phoneNumber" />
            </div>

            <div class="form-field">
              <label>Identity Document</label>
              <input type="text" v-model="profile.identityDocument" />
            </div>

            <div class="toggle-field">
              <label>
                <input type="checkbox" v-model="profile.notifications" />
                <span class="material-icons">notifications</span> Notifications
              </label>
            </div>

            <div class="toggle-field">
              <label>
                <input type="checkbox" v-model="profile.location" />
                <span class="material-icons">location_on</span> Location
              </label>
            </div>
          </form>
        </div>

        <!-- Change Password -->
        <div class="profile-section">
          <h2 class="section-title">Change password</h2>
          <form @submit.prevent>
            <div class="form-field">
              <label>Current password</label>
              <div class="password-field">
                <div v-if="showCurrentPasswordField">
                  <input type="password" v-model="passwordForm.currentPassword" />
                </div>
                <div v-else class="password-placeholder">
                  ***********
                  <button @click="showCurrentPasswordField = true">
                    <span class="material-icons">edit</span> Change
                  </button>
                </div>
              </div>
            </div>

            <div v-if="showCurrentPasswordField">
              <div class="form-field">
                <label>New password</label>
                <input type="password" v-model="passwordForm.newPassword" />
                <span v-if="passwordForm.newPassword.length < 8" class="error-msg">
                  Password must be at least 8 characters
                </span>
              </div>

              <div class="form-field">
                <label>Confirm new password</label>
                <input type="password" v-model="passwordForm.confirmPassword" />
                <span v-if="passwordForm.confirmPassword !== passwordForm.newPassword" class="error-msg">
                  Passwords do not match
                </span>
              </div>

              <div class="save-buttons">
                <button :disabled="!canChangePassword" @click="changePassword">
                  <span class="material-icons">save</span> Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Account actions -->
      <div class="account-actions">
        <button class="logout-button" @click="logout">
          <span class="material-icons">logout</span> Log out
        </button>

        <button class="delete-button" @click="deleteAccount">
          <span class="material-icons">delete_forever</span> Delete account
        </button>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div class="loading-spinner" v-if="isLoading">
      <span class="material-icons spinner">autorenew</span>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 20px;
}
.profile-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.edit-button {
  background: none;
  border: none;
  cursor: pointer;
}
.profile-section {
  margin-bottom: 30px;
}
.form-field {
  margin-bottom: 15px;
}
.toggle-field {
  margin-top: 10px;
}
.account-actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
}
.loading-spinner {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.error-msg {
  color: red;
  font-size: 0.8em;
}
</style>
