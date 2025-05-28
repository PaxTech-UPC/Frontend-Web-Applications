<script>
import LoginFormComponent from "../../components/login-form/login-form.component.vue";

export default {
  name: "login-page-component",
  components: {
    LoginFormComponent
  },
  data() {
    return {
      slideImages: [
        "https://www.gammabross.com/Gallery/salonimg-frkqkj-181.webp",
        "https://thehappening.com/wp-content/uploads/2024/02/captura-de-pantalla-2023-05-17-a-la-s-52813-pm-1.jpg",
        "https://cdn1.treatwell.net/images/view/v2.i7379851.w720.h480.x5F15B4CB/"
      ],
      activeIndex: 0,
      intervalId: null,
      particlesOptions: {
        background: {
          color: {
            value: "transparent"
          }
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: "#eb8efa"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5
          },
          size: {
            value: { min: 2, max: 4 }
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: {
              default: "out"
            }
          },
          links: {
            enable: false
          }
        },
        detectRetina: true
      }
    };
  },
  mounted() {
    this.startSlideshow();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.slideImages.length;
      }, 5000);
    },
    setSlide(index) {
      this.activeIndex = index;
    },
    goBack() {
      window.open("https://paxtech-upc.github.io/uTime-Landing-Page/", "_self");
    }
  }
};
</script>

<template>
  <div class="login-wrapper">
    <!-- Partículas de fondo -->
    <vue-particles
        id="particles-js"
        :options="particlesOptions"
        style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none"
    />

    <!-- Izquierda: Slideshow -->
    <div class="left-section">
      <div class="slideshow-container">
        <img
            v-for="(image, i) in slideImages"
            :key="i"
            :src="image"
            :class="['slide', { active: i === activeIndex }]"
            alt="Slideshow image"
        />
        <div class="background-overlay"></div>

        <!-- Indicadores -->
        <div class="indicators">
          <span
              v-for="(image, i) in slideImages"
              :key="i"
              class="indicator"
              :class="{ active: i === activeIndex }"
              @click="setSlide(i)"
          ></span>
        </div>

        <!-- Botón Back -->
        <button
            class="back-button"
            @click="goBack"
        >
          ← Back
        </button>
      </div>
    </div>

    <!-- Derecha: Formulario -->
    <div class="right-section">
      <div class="login-container">
        <login-form-component />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Segoe+UI&display=swap');

.login-wrapper {
  background-color: #f5f5f5;
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  position: relative;
}

.left-section {
  flex: 1;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}

.slideshow-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.slide {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 1;
}

.slide.active {
  opacity: 1;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(13, 13, 13, 0.6), rgba(13, 13, 13, 0.2));
  z-index: 2;
  border-radius: 20px;
  pointer-events: none;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(237, 194, 242, 0.2);
  color: white;
  border: 1px solid white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  z-index: 3;
  font-weight: 600;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 4;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.indicator.active {
  background-color: #ffffff;
}

.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.login-container {
  position: relative;
  z-index: 1;
}
</style>
