<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Каталог товаров</h1>

    <!-- Фильтр категорий -->
    <div class="mb-6">
      <h2 class="font-medium mb-2">Фильтр по категории:</h2>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="handleCategorySelect(cat.id)"
          :class="[
            'px-4 py-1 rounded-full text-sm transition',
            selectedCategory === cat.id ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Товары -->
    <div v-if="products.length === 0" class="text-center text-gray-500 mt-8">
      Загрузка товаров...
    </div>

<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  <div
    v-for="product in products"
    :key="product.id"
    class="rounded-lg p-4 shadow hover:shadow-md transition bg-white"
  >
    <h2 class="font-semibold text-lg mb-1">{{ product.name }}</h2>
    <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
    <p class="text-green-700 font-bold mb-3">{{ product.price }} ₽</p>
    <button
      v-if="userStore.role === 'buyer'"
      @click="addToCart(product)"
      class="w-full bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
    >
      Добавить в корзину
    </button>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../utils/axiosInstance'
import { useUserStore } from '../store/user'

const userStore = useUserStore()
const products = ref([])
const categories = ref([])
const selectedCategory = ref('')

// Получить товары
const fetchProducts = async () => {
  try {
    const url = selectedCategory.value
      ? `products/?category=${selectedCategory.value}`
      : 'products/'
    const response = await api.get(url)
    products.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error.response?.data || error.message)
  }
}

// Получить категории
const fetchCategories = async () => {
  try {
    const response = await api.get('categories/')
    categories.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error.response?.data || error.message)
  }
}

// Обработка выбора категории
const handleCategorySelect = async (categoryId) => {
  selectedCategory.value = categoryId
  products.value = []
  await fetchProducts()
}

// Инициализация
onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})

// Добавление в корзину
const addToCart = async (product) => {
  try {
    await api.post('cart/add/', { product_id: product.id })
  } catch (error) {
    console.error('Ошибка при добавлении в корзину:', error.response?.data || error.message)
  }
}
</script>
