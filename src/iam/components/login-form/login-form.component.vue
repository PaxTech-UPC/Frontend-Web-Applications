<script>
export default {
  name: "login-form-component"
}
</script>

<template>
  <form class="login-form">
    <pv-card class="login-card">
      <template #content>
        <div class="full-width">
          <label for="email" class="title">Email</label>
          <input id="email" type="email" placeholder="your@email.com" class="p-inputtext" />
        </div>

        <div class="full-width">
          <label for="password" class="title">Password</label>
          <input id="password" type="password" placeholder="Your password" class="p-inputtext" />
        </div>
      </template>

      <template #footer>
        <pv-button label="Sign In" class="login-button" />
      </template>
    </pv-card>
  </form>
</template>

<style scoped>
.login-form {
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

.login-card {
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

.login-button {
  width: 100%;
  text-transform: uppercase;
  background-color: #211f1f !important;
  color: #ffffff !important;
  border: none;
}

.p-inputtext{
  padding: 10px;
  border-radius: 10px;
}

</style>