import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import {Avatar, Button, Card, Drawer, Image, Menu, Menubar, SelectButton, Toolbar, Tooltip, DatePicker, Rating, ToggleButton, InputMask, InputText, Carousel,} from 'primevue'
import Aura from '@primevue/themes/aura'
import i18n from "./i18n.js";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import router from './router';
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim"; // o usa loadFull si necesitas más

const app = createApp(App)
app
    .use(PrimeVue, {
        ripple: true,
        theme: {
            preset: Aura
        }})
    .use(Particles, {
        init: async (engine) => {
            await loadSlim(engine);
        }
    })
    .component('pv-button', Button)
    .component('pv-card',Card)
    .component('pv-select-button', SelectButton)
    .component('pv-drawer', Drawer)
    .component('pv-avatar', Avatar)
    .component('pv-menu', Menu)
    .component('pv-menubar', Menubar)
    .component('pv-toolbar', Toolbar)
    .component('pv-tooltip', Tooltip)
    .component('pv-image', Image)
    .component('pv-rating', Rating)
    .component('pv-toggle-button', ToggleButton)
    .component('pv-input-mask', InputMask)
    .component('pv-input-text', InputText)
    .component('pv-carousel', Carousel)
    .component('pv-calendar', DatePicker)
    .use(i18n)
    .use(router)
    .mount('#app')