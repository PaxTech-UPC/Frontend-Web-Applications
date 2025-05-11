<script>
export default {
  name: "register-form-component"
}
</script>

<template>
  <form class="register-form">
    <pv-card class="register-card">
      <template #content>
        <div class="full-width">
          <label for="email">Email Address</label>
          <input
              id="email"
              type="email"
              v-model="email"
              placeholder="example@mail.com"
              class="p-inputtext p-component"
          />
        </div>

        <div class="full-width">
          <label for="password">Password</label>
          <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Your password"
              class="p-inputtext p-component"
          />
        </div>

        <div class="full-width">
          <label for="fullName">Full Name</label>
          <input
              id="fullName"
              type="text"
              v-model="fullName"
              placeholder="John Doe"
              class="p-inputtext p-component"
          />
        </div>
      </template>

      <template #footer>
        <pv-button
            label="Register as a Client"
            class="register-button"
            @click="registerClient"
        />
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

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background-color: rgb(255, 158, 158);
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
</style>