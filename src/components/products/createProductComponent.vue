<template>
  <section class="form-container">
    <h2>Crear Producto</h2>

    <form @submit.prevent="createProduct">
      <div class="input-group">
        <label>Nombre:</label>
        <input v-model="product.name" type="text" required />
      </div>

      <div class="input-group">
        <label>Descripción:</label>
        <textarea v-model="product.description" required></textarea>
      </div>

      <div class="input-group">
        <label>Precio:</label>
        <input v-model="product.price" type="number" min="1" required />
      </div>

      <div class="input-group">
        <label>Cantidad:</label>
        <input v-model="product.quantity" type="number" min="0" required />
      </div>

      <button type="submit" class="btn">Crear Producto</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "../../api/axios.js";

const product = ref({
  name: "",
  description: "",
  price: "",
  quantity: ""
});

const createProduct = async () => {
  try {
    const res = await axios.post("/products", product.value);
    alert("Producto creado correctamente ✔");
    product.value = { name: "", description: "", price: "", quantity: "" };
  } catch (error) {
    console.error(error);
    alert("Error al crear el producto");
  }
};
</script>

<style scoped>
.form-container {
  max-width: 450px;
  margin: 2rem auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px #0003;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #aaa;
}

.btn {
  width: 100%;
  padding: 10px;
  background: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background: #43a047;
}
</style>
