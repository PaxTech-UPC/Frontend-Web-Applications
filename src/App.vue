<script setup>
import LoginFormComponent from "./iam/components/login-form/login-form.component.vue";
import RegisterFormComponent from "./iam/components/register-form-client/register-form-client.component.vue";
import RegisterFormProvider from "./iam/components/register-form-provider/register-form-provider.vue";
</script>

<template>

  <login-form-component/>
  <register-form-component/>
  <register-form-provider/>

</template>

<style scoped>

</style>
