<template>
  <section class="container">
    <div class="form-card">
      <h1>Editar Producto</h1>

      <form @submit.prevent="updateProduct">
        <label>Nombre</label>
        <input type="text" v-model="product.name" required />

        <label>Precio</label>
        <input type="number" step="0.01" v-model="product.price" required />

        <label>Stock</label>
        <input type="number" v-model="product.stock" required />

        <label>URL de Imagen</label>
        <input type="text" v-model="product.image" />

        <label>Descripción</label>
        <textarea v-model="product.description"></textarea>

        <button class="btn-save" type="submit">Guardar Cambios</button>
      </form>

      <button class="btn-cancel" @click="router.push('/dashboard')">Cancelar</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import router from '@/router'

const product = ref({
  name: '',
  price: 0,
  stock: 0,
  image: '',
  description: ''
})

const id = router.currentRoute.value.params.id

// Obtener datos del producto
const loadProduct = async () => {
  try {
    const res = await api.get(`/products/${id}`)
    product.value = res.data
  } catch (error) {
    console.error('Error al cargar producto:', error)
  }
}

const updateProduct = async () => {
  try {
    await api.put(`/products/${id}`, product.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Error al actualizar producto:', error)
  }
}

onMounted(() => {
  loadProduct()
})
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

.btn-cancel {
  margin-top: 10px;
  padding: 10px;
  border: none;
  background: gray;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>
