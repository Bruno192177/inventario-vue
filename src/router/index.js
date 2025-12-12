import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import dashboardView from '@/views/DashboardView.vue'
import authView from '@/views/AuthView.vue'
import RegisterView from '@/views/RegisterView.vue'


// Componentes de productos
import listProductComponent from '@/components/products/listProductComponent.vue'
import createProductComponent from '@/components/products/createProductComponent.vue'
import editProductComponent from '@/components/products/editProductComponent.vue'
import DeleteProductComponent from '@/components/products/DeleteProductComponent.vue'
import { meta } from 'eslint-plugin-vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: authView },
  { path: '/dashboard', name: 'dashboard', component: dashboardView, meta: { requiresAuth: true } },
  { path: '/products', name: 'products', component: listProductComponent, meta: { requiresAuth: true } },
  { path: '/products/create', name: 'createProduct', component: createProductComponent, meta: { requiresAuth: true } },
  { path: '/products/edit/:slug', name: 'editProduct', component: editProductComponent, props: true, meta: { requiresAuth: true } },
  { path: '/products/delete', name: 'deleteProduct', component: DeleteProductComponent, meta: { requiresAuth: true } },
  { path: '/register', name: 'register', component: RegisterView }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem(import.meta.env.VITE_KEY_STORAGE);
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
})

export default router
