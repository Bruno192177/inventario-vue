<template>
  <section class="login-container">
    <div class="card">
      <h1>Iniciar Sesión</h1>

      <form @submit.prevent="loginUser">

        <label for="email">Correo</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
        />

        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
        />

        <button type="submit">Entrar</button>

        <p class="error" v-if="errorMsg">
          {{ errorMsg }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/axios'
import router from '@/router'

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const loginUser = async () => {
  errorMsg.value = ''

  try {
    await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    // Login correcto → ir al dashboard
    router.push('/dashboard')
  } catch (error) {
    errorMsg.value = 'Credenciales incorrectas'
    console.error(error)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background: #f2f2f2;
}

.card {
  width: 350px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

button {
  padding: 10px;
  background: #0077ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background: #005ad1;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
