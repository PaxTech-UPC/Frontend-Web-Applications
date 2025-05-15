<script>
import Button from "primevue/button";

export default {
  name: "register-form-provider",
  components: {Button}
}
</script>

<template>
  <form class="register-form">
    <pv-card class="register-card">
      <template #content>
        <div class="full-width">
          <label for="email" class="title">Email Address</label>
          <input
              id="email"
              type="email"
              v-model="email"
              placeholder="example@business.com"
              class="p-inputtext"
          />
        </div>

        <div class="full-width">
          <label for="password" class="title">Password</label>
          <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Your password"
              class="p-inputtext"
          />
        </div>

        <div class="full-width">
          <label for="businessName" class="title">Business Name</label>
          <input
              id="businessName"
              type="text"
              v-model="businessName"
              placeholder="My Business"
              class="p-inputtext"
          />
        </div>
      </template>


      <div class="left-section">
        <router-link to="/iam/login">
          <Button icon="pi pi-sign-out" class="icon-button logout" aria-label="Logout" />
        </router-link>
      </div>

      <template #footer>
        <router-link to="/provider/homeProvider " class="nav-link" active-class="active">
          <pv-button
              label="Register as a Provider"
              class="register-button"
              @click="registerProvider"
          />
        </router-link>
      </template>
    </pv-card>
  </form>
</template>

<style scoped>
.register-form {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.title{
  color: #211f1f;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 17px;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background-color: rgb(255, 255, 255, 0.8);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.full-width {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.register-button {
  width: 100%;
  text-transform: uppercase;
  background-color: #211f1f;
  color: #ffffff;
  border: none;
}

.p-inputtext{
  padding: 10px;
  border-radius: 10px;
}

</style>