<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="title">Registro</h1>

      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="example@gmail.com" required />
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input type="password" v-model="password" placeholder="********" required />
        </div>

        <div class="input-group">
          <label>Confirmar Contraseña</label>
          <input type="password" v-model="confirmPassword" placeholder="********" required />
        </div>

        <button class="btn">Registrarse</button>
      </form>

      <p class="login-link">
        ¿Ya tienes cuenta? 
        <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/axios.js'
import router from '@/router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if(password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    await api.post('/auth/register', {
      email: email.value,
      password: password.value
    })
    alert('Cuenta creada con éxito')
    router.push('/login')
  } catch (error) {
    alert('Error al registrar usuario')
  }
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eef1f4;
}

.register-card {
  width: 380px;
  padding: 30px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.title {
  margin-bottom: 25px;
  font-size: 24px;
  font-weight: bold;
}

.input-group {
  text-align: left;
  margin-bottom: 18px;
}

.input-group label {
  font-size: 14px;
  color: #444;
}

.input-group input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.btn {
  width: 100%;
  padding: 12px;
  background: #2d89ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
}

.btn:hover {
  background: #256ed0;
}

.login-link {
  margin-top: 15px;
  font-size: 14px;
}

.login-link a {
  color: #2d89ff;
  font-weight: bold;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
