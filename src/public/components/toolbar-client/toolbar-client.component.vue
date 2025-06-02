<script>
import LanguageSwitcherComponent from "../language-switcher/language-switcher.component.vue";

export default {
  name: "toolbar-client-component",
  components: {
    LanguageSwitcherComponent
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    goHome() {
      this.$router.push("/client/homeClient");
    },
    goProfile() {
      this.$router.push("/client/profile");
    },
    logout() {
      this.$router.push("/iam/logout");
    }
  }
};
</script>

<template>
  <header class="toolbar">
    <!-- Izquierda -->
    <div class="left-section">
      <button class="icon-button" @click="goHome" aria-label="Home">
        <span class="material-icons">home</span>
      </button>

      <div class="search-bar">
        <span class="material-icons">search</span>
        <input
            type="text"
            v-model="searchQuery"
            :placeholder="$t('toolbarC.search')"
            aria-label="Search"
        />
      </div>
    </div>
    

    <!-- Sección Central -->

    <!-- Centro -->

    <div class="center-section">
      <img
          src="https://raw.githubusercontent.com/UPC-PaxTech/uTime/refs/heads/develop/img/logoutime.png"
          alt="uTime Logo"
          class="logo-img"
      />
    </div>

    <!-- Derecha -->
    <div class="right-section">
      <language-switcher-component />
      <button class="icon-button" @click="goProfile" aria-label="Profile">
        <span class="material-icons">person</span>
      </button>
      <button class="icon-button logout" @click="logout" aria-label="Logout">
        <span class="material-icons">logout</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  padding: 12px 28px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin: 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
  max-height: 100px;
  box-sizing: border-box;
}

.left-section,
.center-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 18px;
}

.center-section {
  flex-grow: 1;
  justify-content: center;
}

.logo-img {
  height: 42px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.icon-button {
  background: #f8f9fa;
  border: none;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.icon-button .material-icons {
  font-size: 22px;
  color: #4a4a4a;
}

.icon-button:hover {
  background-color: #e3e6f0;
  transform: scale(1.05);
}

.icon-button.logout:hover {
  background-color: #ffe0e0;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  padding: 0 12px;
  border-radius: 999px;
  height: 38px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-bar span {
  color: #7b7b7b;
  font-size: 20px;
  margin-right: 6px;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  width: 160px;
  color: #333;
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    gap: 12px;
  }

  .left-section,
  .right-section {
    width: 100%;
    justify-content: space-between;
  }

  .search-bar input {
    width: 100%;
  }
}
</style>
