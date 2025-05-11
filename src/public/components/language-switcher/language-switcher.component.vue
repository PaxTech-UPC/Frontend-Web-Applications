<script>

import ToggleButton from 'primevue/togglebutton';

export default {
  name: "language-switcher-component",
  components: {
    ToggleButton
  },
  data() {
    return {
      languages: ['en', 'es'],
      currentLang: this.$i18n.locale
    };
  },
  methods: {
    switchLanguage(lang) {
      this.currentLang = lang;
      this.$i18n.locale = lang;
    }
  }
}
</script>

<template>
  <div class="language-switcher">
    <button
        v-for="lang in languages"
        :key="lang"
        :class="{ active: lang === currentLang }"
        @click="switchLanguage(lang)"
    >
      {{ lang.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 10px;
}

.language-switcher button {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.language-switcher button.active {
  background-color: #8e44ad;
  color: white;
}
</style>