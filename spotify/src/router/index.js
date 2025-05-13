import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/LibraryView.vue')
    },
    {
      path: '/liked',
      name: 'liked',
      component: () => import('../views/LikedView.vue')
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: () => import('../views/PlaylistView.vue')
    }
  ]
})

export default router
