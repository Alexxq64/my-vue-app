<!-- src/views/AuthView.vue -->
<template>
  <div>
    <h1>Вход</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Имя пользователя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { saveAuthData } from '../utils/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

async function login() {
  try {
    const response = await axios.post('http://localhost:8000/auth/login/', {
      username: username.value,
      password: password.value,
    })

    const { token, username: user, role } = response.data
    saveAuthData(token, user, role)
    userStore.login(token, user, role)

    if (role === 'buyer') {
      router.push('/')
    } else if (role === 'seller') {
      router.push('/seller')
    } else {
      router.push('/')
    }
  } catch (err) {
    error.value = 'Ошибка входа. Проверьте данные.'
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 10px;
}
</style>
