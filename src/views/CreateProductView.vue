<template>
  <section class="container">
    <div class="form-card">
      <h1>Crear Producto</h1>

      <form @submit.prevent="createProduct">
        <label>Nombre del Producto</label>
        <input type="text" v-model="name" required />

        <label>Precio</label>
        <input type="number" step="0.01" v-model="price" required />

        <label>Stock</label>
        <input type="number" v-model="stock" required />

        <label>URL de Imagen</label>
        <input type="text" v-model="image" />

        <label>Descripción</label>
        <textarea v-model="description"></textarea>

        <button type="submit" class="btn-save">Crear Producto</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/axios'
import router from '@/router'

const name = ref('')
const price = ref('')
const stock = ref('')
const image = ref('')
const description = ref('')

const createProduct = async () => {
  try {
    await api.post('/products', {
      name: name.value,
      price: Number(price.value),
      stock: Number(stock.value),
      image: image.value,
      description: description.value,
    })

    router.push('/dashboard')
  } catch (error) {
    console.error('Error al crear producto:', error)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.form-card {
  width: 400px;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 0 10px #aaa;
}

form {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.btn-save {
  background: green;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
