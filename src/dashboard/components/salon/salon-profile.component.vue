<script>
export default {
  name: "salon-profile.component",
  props: {
    salonProfile: {
      type: Object,
      required: true
    }
  },
}
</script>

<template>
  <div v-if="salonProfile">
    <h1>{{ salonProfile.salonName }}</h1>
    <img :src="salonProfile.coverImage" alt="Imagen de portada" />
    <div class="rating-container">
      <pv-rating :modelValue="salonProfile.rating" readonly :cancel="false" />
    </div>

    <div class="social-links">
      <!--<h3>Redes Sociales</h3>-->
      <div class="social-item">
        <i class="pi pi-instagram"></i>
        <a :href="salonProfile.socials.instagram" target="_blank">Instagram</a>
      </div>
      <div class="social-item">
        <i class="pi pi-video"></i>
        <a :href="salonProfile.socials.tiktok" target="_blank">Tiktok</a>
      </div>
    </div>

    <div>
      <!--<h3>Portafolio</h3>-->
      <div v-for="image in salonProfile.portfolioImages" :key="image">
        <!--<img :src="image" alt="Imagen del portafolio" />-->
      </div>
    </div>
  </div>
  <router-view/>
</template>

<style scoped>
.rating-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.social-item i {
  font-size: 1.5rem;
  color: #e1306c; /* Color para Instagram */
}

.social-item a {
  font-size: 1.1rem;
  text-decoration: none;
  color: #333;
}

.social-item a:hover {
  text-decoration: underline;
}
</style>