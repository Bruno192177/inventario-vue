<template>
  <section class="form-container">
    <h1>Editar producto</h1>

    <form @submit.prevent="updateProduct">
      <label>Nombre</label>
      <input type="text" v-model="form.name" required />

      <label>Precio</label>
      <input type="number" v-model="form.price" required />

      <label>Cantidad</label>
      <input type="number" v-model="form.quantity" required />

      <label>Imagen (URL)</label>
      <input type="text" v-model="form.icon" />

      <button type="submit">Actualizar</button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios.js'

const route = useRoute()
const router = useRouter()

const form = ref({
  name: '',
  price: '',
  quantity: '',
  icon: ''
})

const getProduct = async () => {
  try {
    const slug = route.params.slug
    const { data } = await api.get(`/products/${slug}`)
    form.value = data
  } catch (error) {
    console.error(error)
  }
}

const updateProduct = async () => {
  try {
    const slug = route.params.slug
    await api.put(`/products/${slug}`, form.value)
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getProduct()
})
</script>

<style scoped>
.form-container {
  width: 350px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
}

button {
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>
