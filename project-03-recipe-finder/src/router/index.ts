import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RecipeDetailPage from '../views/RecipeDetailPage.vue'
import FavoritesPage from '../views/FavoritesPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/recipe/:id',
      name: 'recipe-detail',
      component: RecipeDetailPage,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
