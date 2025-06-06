<template>
  <nav class="bg-gray-100 p-4">
    <ul class="flex space-x-6 list-none m-0 p-0">
      <li>
        <router-link to="/" class="text-gray-700 hover:text-indigo-600">Каталог</router-link>
      </li>

      <li v-if="role === 'buyer'">
        <router-link to="/cart" class="text-gray-700 hover:text-indigo-600">Корзина</router-link>
      </li>
      <li v-if="role === 'buyer'">
        <router-link to="/orders" class="text-gray-700 hover:text-indigo-600">Мои заказы</router-link>
      </li>

      <li v-if="role === 'seller'">
        <router-link to="/seller" class="text-gray-700 hover:text-indigo-600">Кабинет продавца</router-link>
      </li>

      <li v-if="!role">
        <router-link to="/auth" class="text-gray-700 hover:text-indigo-600">Вход / Регистрация</router-link>
      </li>

      <li v-if="role">
        <a href="#" @click.prevent="logout" class="text-red-500 hover:text-red-700 cursor-pointer">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { role } = storeToRefs(userStore)

const router = useRouter()

function logout() {
  userStore.logout()
  router.push('/auth')
}
</script>

<style scoped>
nav ul {
  display: flex;
  gap: 1.5rem;
}
</style>

