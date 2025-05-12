import { createRouter, createWebHistory } from 'vue-router'


// IAM (auth)

const LoginPageComponent = () => import('../iam/pages/login-pages/login-page.component.vue')
const RegisterPageComponent = () => import('../iam/pages/register-page/register-page.component.vue')


// Layouts

const SidebarComponentClient = () => import('../public/components/sidebar-client/sidebar-client.component.vue')

const ProviderLayoutComponent = () => import('../public/components/provider-layout/provider-layout.component.vue')

const ClientLayoutComponent = () => import('../public/components/client-layout/client-layout.component.vue')

// Provider

const SchedulePageComponent = () => import('../schedule/pages/schedule-page.component.vue')



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
