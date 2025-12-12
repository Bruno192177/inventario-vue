<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title"> Inventario Ink Studio </h1>
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="example@gmail.com" required />
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input type="password" v-model="password" placeholder="********" required />
        </div>

        <button class="btn">Iniciar Sesión</button>
        <p class="register-link">
            ¿No tienes cuenta? 
            <router-link to="/register">Regístrate aquí</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api/axios.js";
import router from "@/router";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value
    });

    // guardamos token o flag
    localStorage.setItem(import.meta.env.VITE_KEY_STORAGE, res.data.token || 'true')

    router.push("/dashboard")
  } catch (error) {
    alert("Credenciales incorrectas")
  }
};

</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eef1f4;
}

.login-card {
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

.register-link {
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
}

.register-link a {
  color: #2d89ff;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

</style>
