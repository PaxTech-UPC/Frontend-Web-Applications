<script>
export default {
  name: "LanguageSwitcherComponent",
  data() {
    return {
      isOpen: false,
      languages: [
        {
          label: 'en',
          name: 'English',
          flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
        },
        {
          label: 'es',
          name: 'Spanish',
          flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg'
        }
      ],
      currentLang: ''
    };
  },
  created() {
    this.currentLang = this.$i18n.locale;
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown(event) {
      this.isOpen = !this.isOpen;
      event.stopPropagation(); // Evita que el click cierre inmediatamente
    },
    switchLanguage(lang) {
      this.currentLang = lang;
      this.$i18n.locale = lang;
      this.isOpen = false;
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },
  computed: {
    currentLanguage() {
      return this.languages.find(lang => lang.label === this.currentLang);
    }
  }
};
</script>

<template>
  <div class="language-switcher" ref="dropdown">
    <!-- Botón principal -->
    <button class="main-button" @click="toggleDropdown">
      <img :src="currentLanguage.flag" width="20" height="14" class="flag" />
      <span class="label">{{ currentLanguage.name }}</span>
      <span class="icon">▼</span>
    </button>

    <!-- Menú desplegable -->
    <div v-if="isOpen" class="dropdown-menu">
      <button
          v-for="lang in languages"
          :key="lang.label"
          class="menu-item"
          @click="switchLanguage(lang.label)"
      >
        <img :src="lang.flag" width="20" height="14" class="flag" />
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.main-button {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.main-button .flag {
  margin-right: 6px;
}

.main-button .label {
  margin-right: 6px;
  font-weight: bold;
}

.main-button .icon {
  font-size: 12px;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  position: absolute;
  z-index: 1000;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.menu-item:hover {
  background-color: #f0f0f0;
}
</style>
