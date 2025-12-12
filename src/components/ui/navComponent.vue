<template>
  <nav class="navbar">
    <h1 class="logo">Inventario</h1>

    <ul class="nav-links">
      <li>
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/products">Productos</router-link>
      </li>
      <li>
        <router-link to="/products/create">Agregar Producto</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  width: 100%;
  padding: 15px 30px;
  background-color: #222;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: 0.2s;
}

.nav-links a:hover {
  color: #4caf50;
}
</style>
