<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Каталог</router-link></li>

      <!-- Покупатель -->
      <li v-if="role === 'buyer'"><router-link to="/cart">Корзина</router-link></li>
      <li v-if="role === 'buyer'"><router-link to="/orders">Мои заказы</router-link></li>

      <!-- Продавец -->
      <li v-if="role === 'seller'"><router-link to="/seller">Кабинет продавца</router-link></li>

      <!-- Гость -->
      <li v-if="!role"><router-link to="/auth">Вход / Регистрация</router-link></li>

      <!-- Авторизован -->
      <li v-if="role"><a href="#" @click.prevent="logout">Выход</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia' // 👈 ОБЯЗАТЕЛЬНО

const userStore = useUserStore()
const { role } = storeToRefs(userStore) // 👈 Делаем `role` реактивной

const router = useRouter()

function logout() {
  userStore.logout()
  router.push('/auth')
}
</script>

<style scoped>
.navbar {
  padding: 1rem;
  background-color: #f0f0f0;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
}
.navbar li {
  display: inline;
}
</style>
