import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import inventoryRoutes from './modules/inventory.js'

const routes = [
  { path: '/', component: Home },
  ...inventoryRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

