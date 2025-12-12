<template>
  <section>
    <h1>Inventario</h1>

    <button @click="goToCreate" class="create-btn">Agregar producto</button>

    <div class="container">
      <div
        class="card"
        v-for="product in products"
        :key="product.id"
        @click="goToEdit(product.slug)"
      >
        <img :src="product.icon" :alt="`Imagen de ${product.name}`" />
        <h2>{{ product.name }}</h2>
        <p>Precio: ${{ product.price }}</p>
        <p>Cantidad: {{ product.quantity }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios.js'
import router from '@/router'

const products = ref([])

const getProducts = async () => {
  try {
    const response = await api.get('/products')
    products.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const goToEdit = (slug) => {
  router.push(`/products/edit/${slug}`)
}

const goToCreate = () => {
  router.push('/products/create')
}

onMounted(() => {
  getProducts()
})
</script>

<style scoped>
h1 {
  text-align: center;
}

.create-btn {
  margin: 10px auto;
  display: block;
  padding: 10px;
  cursor: pointer;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 20px;
}

.card {
  width: 180px;
  padding: 15px;
  margin: auto;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(65, 62, 64, 0.4);
  cursor: pointer;
}

.card img {
  width: 100px;
}

.card h2 {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
