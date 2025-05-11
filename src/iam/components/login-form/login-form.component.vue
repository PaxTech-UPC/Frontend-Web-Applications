<script>
export default {
  name: "login-form.component"
}
</script>

<template>
  <form class="login-form">
    <Card class="login-card">
      <template #content>
        <div class="full-width">
          <label for="email">Email</label>
          <InputText id="email" type="email" placeholder="your@email.com" class="p-inputtext" />
        </div>

        <div class="full-width">
          <label for="password">Password</label>
          <Password id="password" placeholder="Your password" toggleMask class="p-inputtext" />
        </div>
      </template>

      <template #footer>
        <Button label="Sign In" class="login-button" />
      </template>
    </Card>
  </form>
</template>

<style scoped>

</style>