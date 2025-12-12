<template>
  <nav class="navbar">
    <h1 class="logo">Inventario</h1>

    <ul class="nav-links">
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/products">Productos</router-link></li>
      <li><router-link to="/products/create">Agregar Producto</router-link></li>
      <li><button class="logout-btn" @click="logout">Cerrar sesión</button></li>
    </ul>
  </nav>
</template>

<script setup>
import api from '@/api/axios'
import router from '@/router'

const logout = async () => {
  try {
    // intenta hacer logout en servidor (si existe)
    await api.post('/auth/logout')
  } catch (e) {
    // si falla no importa, seguimos limpiando
    console.warn('Logout server failed', e)
  }

  // limpiar localStorage y redirigir a login
  localStorage.removeItem(import.meta.env.VITE_KEY_STORAGE)
  router.push({ name: 'Auth' })
}
</script>

<style scoped>
.logout-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
}
</style>
