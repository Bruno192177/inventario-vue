<template>
  <section class="container">
    <div class="card" v-if="product">
      <h1>{{ product.name }}</h1>

      <img
        class="img-product"
        :src="product.image"
        :alt="`Imagen de ${product.name}`"
      />

      <p class="price">Precio: ${{ product.price }}</p>
      <p class="stock">Stock: {{ product.stock }}</p>

      <button class="btn-edit" @click="goEdit(product.id)">Editar</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import router from '@/router'

const product = ref(null)

const getProduct = async () => {
  const id = router.currentRoute.value.params.id

  try {
    const res = await api.get(`/products/${id}`)
    product.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const goEdit = (id) => {
  router.push(`/products/${id}/edit`)
}

onMounted(() => getProduct())
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.card {
  width: 350px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px #aaa;
  text-align: center;
}

.img-product {
  width: 200px;
  margin: 20px 0;
}

.btn-edit {
  padding: 10px 20px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
