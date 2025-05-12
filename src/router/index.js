
import { createRouter, createWebHistory } from 'vue-router'
import testingComponent from "../schedule/components/testing/testing.component.vue";

// IAM (auth)

const LoginPageComponent = () => import('../iam/pages/login-pages/login-page.component.vue')
const RegisterPageComponent = () => import('../iam/pages/register-page/register-page.component.vue')


// Layouts

const SidebarComponent = () => import('../public/components/sidebar-provider/sidebar-provider.component.vue')

const ToolbarComponentClient = () => import('../public/components/toolbar-client/toolbar-client.component.vue')
const SidebarComponentClient = () => import('../public/components/sidebar-client/sidebar-client.component.vue')

const ProviderLayoutComponent = () => import('../public/components/provider-layout/provider-layout.component.vue')

const SchedulePageComponent = () => import('../schedule/pages/schedule-page.component.vue')
const ClientLayoutComponent = () => import('../public/components/client-layout/client-layout.component.vue')

/*
const ClientLayoutComponent = () => import('../public/components/client-layout/client-layout.component.vue')

// Provider
const ProfessionalDashboardComponent = () => import('../dashboard/pages/professional-dashboard/professional-dashboard.component.vue')
const ProfilePageComponent = () => import('../profile/pages/profile-page/profile-page.component.vue')
const SchedulePageComponent = () => import('../schedule/pages/schedule-page/schedule-page.component.vue')

// Client
const ClientAppointmentPagesComponent = () => import('../appointments/pages/client-appointment-pages/client-appointment-pages.component.vue')
const ClientFavoriteComponent = () => import('../favorites/pages/client-favorite/client-favorite.component.vue')
const ClientProfileComponent = () => import('../profileclient/pages/client-profile/client-profile.component.vue')

// Not found page (optional)
const NotFoundComponent = { template: '<h1>404 - Página no encontrada</h1>' }
*/


const routes = [
    // Redirección por defecto al login
    { path: '/', redirect: '/iam/login' },


    // IAM
    {
        path: '/iam',
        children: [
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent },

        ]
    },



    // Provider Layout

    {
        path: '/provider',
        component: testingComponent,
        children: [
            { path: '', redirect: '/provider/homeProvider' },

            { path: 'homeProvider', component: testingComponent },
            { path: 'schedule', component: SchedulePageComponent },

           // { path: 'profile', component: SidebarComponent },
            /*

            */
        ]
    },
    // Client Layout
    {
        path: '/client',
        component: ClientLayoutComponent,
        children: [
            { path: '', redirect: '/client/homeClient' },
            { path: 'homeClient', component: SidebarComponentClient},
            /**
            { path: 'appointments', component: AppointmentsComponent },
            { path: 'favorites', component: ClientFavoriteComponent },
            { path: 'profile', component: ClientProfileComponent },*/
        ]
    },
    /*
       // Ruta comodín (404)
       { path: '/:pathMatch(.*)*', component: NotFoundComponent }
       */

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
