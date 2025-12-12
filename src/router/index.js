import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import dashboardView from '@/views/dashboardView.vue'

// Componentes de productos
import listProductComponent from '@/components/products/listProductComponent.vue'
import createProductComponent from '@/components/products/createProductComponent.vue'
import editProductComponent from '@/components/products/editProductComponent.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboardView
  },
  {
    path: '/products',
    name: 'products',
    component: listProductComponent
  },
  {
    path: '/products/create',
    name: 'createProduct',
    component: createProductComponent
  },
  {
    path: '/products/edit/:slug',
    name: 'editProduct',
    component: editProductComponent,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
