<script>
export default {
  name: "login-form-component",
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
      dummyAccounts: [
        { email: "client@utime.com", password: "client123", type: "client" },
        { email: "provider@utime.com", password: "provider123", type: "provider" }
      ]
    };
  },
  methods: {
    onSubmit() {
      const account = this.dummyAccounts.find(
          (acc) =>
              acc.email === this.email &&
              acc.password === this.password
      );

      if (account) {
        this.loginError = false;
        if (account.type === "client") {
          this.$router.push("/client/homeClient");
        } else if (account.type === "provider") {
          this.$router.push("/provider/homeProvider");
        }
      } else {
        this.loginError = true;
      }
    }
  }
};
</script>

<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <div class="register-container">
      <img
          src="https://github.com/UPC-PaxTech/uTime/blob/main/img/logoutime.png?raw=true"
          alt="Logo"
          class="logo"
      />

      <h1 class="title">Access Your Account</h1>
      <p class="subtitle">
        Don't have an account?
        <router-link to="/iam/register" class="login-link">Register now</router-link>
      </p>

      <div class="full-width">
        <label class="form-label">Email*</label>
        <input
            type="email"
            class="form-input"
            placeholder="your@email.com"
            v-model="email"
        />
      </div>

      <div class="full-width">
        <label class="form-label">Password*</label>
        <input
            type="password"
            class="form-input"
            placeholder="Your password"
            v-model="password"
        />
      </div>

      <p v-if="loginError" class="error-msg">Invalid email or password</p>

      <button type="submit" class="form-button">Log In</button>
    </div>
  </form>
</template>

<style scoped>
.register-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.register-container {
  width: 100%;
  max-width: 400px;
  color: #333;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem auto;
  width: 10rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #212121;
}

.subtitle {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #555;
}

.login-link {
  font-weight: bold;
  color: #731c9f;
  text-decoration: none;
  margin-left: 5px;
}

.full-width {
  width: 100%;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-label {
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #444;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #f0f2f5;
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
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #5c1281;
}

.error-msg {
  color: red;
  font-weight: 500;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
