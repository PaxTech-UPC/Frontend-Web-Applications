<script>
export default {
  name: "sidebar-client-component"
};
</script>

<template>
  <nav class="sidebar">
    <router-link to="/client/homeClient" class="nav-link" active-class="active">
      <span class="material-icons">home</span>
      <span>{{ $t('dashboard.home') }}</span>
    </router-link>

    <router-link to="/client/appointments" class="nav-link" active-class="active">
      <span class="material-icons">calendar_month</span>
      <span>{{ $t('dashboard.appointments') }}</span>
    </router-link>

    <router-link to="/client/favorites" class="nav-link" active-class="active">
      <span class="material-icons">favorite_border</span>
      <span>{{ $t('dashboard.favorites') }}</span>
    </router-link>

    <router-link to="/client/profile" class="nav-link" active-class="active">
      <span class="material-icons">person</span>
      <span>{{ $t('dashboard.profile') }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.sidebar {
  position: sticky;
  align-self: flex-start;
  left: 1.5rem;
  width: 260px;
  background: linear-gradient(145deg, #f4e3f4, #e4cde4);
  padding: 1.75rem 1.25rem;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease-in-out;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  text-decoration: none;
  color: #444;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 0.65rem 1rem;
  border-radius: 12px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s;
}

.nav-link:hover {
  background-color: #ffffffbb;
  color: #6a1b9a;
  transform: translateX(4px);
}

.nav-link.active {
  background-color: #ffffffcc;
  color: #6a1b9a;
  font-weight: 600;
  box-shadow: inset 0 0 0 2px #b39ddb;
}

.nav-link .material-icons {
  font-size: 26px;
  color: inherit;
}
</style>
