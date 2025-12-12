<template>
  <navComponent />

  <section class="dashboard">
    <h1>Inventario</h1>

    <listProductsComponent />
  </section>
</template>

<script setup>
import navComponent from '@/components/ui/navComponent.vue'
import listProductsComponent from '@/components/products/listProductComponent.vue'
</script>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
