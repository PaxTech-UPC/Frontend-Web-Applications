<script>
export default {
  name: "sidebar-provider-component"
}
</script>

<template>
  <nav class="sidebar">
    <router-link to="/provider/homeProvider" class="nav-link" active-class="active">
      <i class="pi pi-home"></i>
      {{ $t('dashboard.home') }}
    </router-link>

    <router-link to="/provider/schedule" class="nav-link" active-class="active">
      <i class="pi pi-calendar"></i>
      {{ $t('dashboard.appointments') }}
    </router-link>

    <router-link to="/provider/schedule" class="nav-link" active-class="active">
      <i class="pi pi-comments"></i>
      {{ $t('dashboard.reviews') }}
    </router-link>

    <router-link to="/provider/schedule" class="nav-link" active-class="active">
      <i class="pi pi-briefcase"></i>
      {{ $t('dashboard.services') }}
    </router-link>

    <router-link to="/provider/schedule" class="nav-link" active-class="active">
      <i class="pi pi-cog"></i>
      {{ $t('dashboard.subscription') }}
    </router-link>

    <router-link to="/provider/schedule" class="nav-link" active-class="active">
      <i class="pi pi-calendar"></i>
      {{ $t('dashboard.settings') }}
    </router-link>

  </nav>
</template>

<style scoped>

.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f0dff0; /* Soft purple */
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar .nav-link {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;
}

.sidebar .nav-link:hover {
  color: #8e44ad; /* Purple on hover */
}

.sidebar .active {
  font-weight: bold;
  color: #8e44ad;
}

.sidebar i {
  font-size: 24px;
}

</style>