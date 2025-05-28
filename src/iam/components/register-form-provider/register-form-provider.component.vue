<script>
export default {
  name: "register-form-provider-component"
};
</script>

<template>
  <form class="register-ui-form">
    <h2 class="form-title">Create an account</h2>
    <p class="form-subtitle">
      Already have an account?
      <router-link to="/iam/login" class="form-link">Log in</router-link>
    </p>

    <input type="text" placeholder="Full Name Company" class="form-input" />
    <input type="email" placeholder="Email" class="form-input" />
    <input type="password" placeholder="Password" class="form-input" />

    <button class="form-button">Create account</button>
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
  border: none;
  background-color: #f0f2f5;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #333;
}

.form-input::placeholder {
  color: #999;
}

.form-button {
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
