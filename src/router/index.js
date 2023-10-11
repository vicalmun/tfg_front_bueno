import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/colecciones',
      name: 'colecciones',
      component: () => import('@/views/ColectionView.vue')
    },
    {
      path: '/busqueda',
      name: 'busqueda',
      component: () => import('@/views/SearchView.vue')
    },
    {
      path: '/info/:tabla?/:id?',
      name: 'info',
      component: () => import('@/views/InfoView.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },


    {
      path: "/paises/new",
      component: () => import('@/components/PaisForm.vue'),
      method: "POST",
    },
    {
      path: "/universidades/new",
      component: () => import('@/components/UniversidadForm.vue'),
      method: "POST",
    },
    {
      path: "/carreras/new",
      component: () => import('@/components/CarreraForm.vue'),
      method: "POST",
    },
    {
      path: "/asignaturas/new",
      component: () => import('@/components/AsignaturaForm.vue'),
      method: "POST",
    },
    {
      path: "/competencias/new",
      component: () => import('@/components/CompetenciaForm.vue'),
      method: "POST",
    },


    {
      path: '/insert/:tabla?',
      name: 'insert',
      component: () => import('@/views/PostFormsView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ]
})

export default router
