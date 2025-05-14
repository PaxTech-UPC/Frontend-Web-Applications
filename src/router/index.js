import { createRouter, createWebHistory } from 'vue-router'


// IAM (auth)

const LoginPageComponent = () => import('../iam/pages/login-pages/login-page.component.vue')
const RegisterPageComponent = () => import('../iam/pages/register-page/register-page.component.vue')

const AppointmentPageComponent = () => import('../AppointmentsClient/pages/appointment-page.component.vue')
// Layouts

const SidebarComponentClient = () => import('../public/components/sidebar-client/sidebar-client.component.vue')

const ProviderLayoutComponent = () => import('../public/components/provider-layout/provider-layout.component.vue')

const ClientLayoutComponent = () => import('../public/components/client-layout/client-layout.component.vue')

// Provider

const ProviderDashboardComponent = () => import('../dashboard/pages/provider-dashboard.vue')
const SchedulePageComponent = () => import('../schedule/pages/schedule-page.component.vue')

<<<<<<< HEAD
// Dashboard
const SalonProfilePage = () => import('../dashboard/pages/salon-profile.page.vue')
const DashboardPage = () => import('../dashboard/pages/dashboard-main.page.vue')

// Appointment
const AppointmentPage = () => import('../appoiments/pages/appoiments.pages.vue');

=======
const FavoritesPageComponent = () =>import('../FavoritesClient/pages/favorites-pages.component.vue')
>>>>>>> feature/Favorites

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
        component: ProviderLayoutComponent,
        children: [
            { path: '', redirect: '/provider/schedule' },
            { path: 'homeProvider', component: ProviderDashboardComponent },
            { path: 'schedule', component: SchedulePageComponent }
        ]
    },
    // Client Layout
    {
        path: '/client',
        component: ClientLayoutComponent,
        children: [
            { path: '', redirect: '/client/homeClient' },
            { path: 'homeClient', component: SidebarComponentClient},
            { path: 'appointments', component: AppointmentPageComponent },
            { path: 'favorites', component: FavoritesPageComponent },
            /**
            { path: 'profile', component: ClientProfileComponent },*/
        ]
    },
    /*
       // Ruta comodín (404)
       { path: '/:pathMatch(.*)*', component: NotFoundComponent }
       */

    // Ruta para el dashboard
    {
        path: '/client/dashboard',
        component: DashboardPage,  // Página principal del dashboard

    },

    // Ruta para el perfil del salón
    {
        path: '/client/salonProfile/:salonId',
        name: 'salon-profile',
        component: SalonProfilePage,
        props: true,
    },

    // Ruta para las citas dentro del perfil del salón
    {
        path: '/client/salonProfile/:salonId/appointments',
        name: 'appointments',
        component: AppointmentPage,
        props: true,
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
