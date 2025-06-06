<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Каталог товаров</h1>

    <!-- Категории -->
    <div class="mb-4">
      <h2 class="font-medium mb-2">Фильтр по категории:</h2>
      <CategoryList
        :categories="categories"
        :selected-category-id="selectedCategory"
        @select="handleCategorySelect"
      />
    </div>

    <!-- Продукты -->
    <div v-if="products.length === 0">
      Загрузка товаров...
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border rounded-lg p-4 shadow hover:shadow-md transition"
      >
        <h2 class="font-semibold text-lg">{{ product.name }}</h2>
        <p class="text-gray-600 text-sm mb-2">{{ product.description }}</p>
        <p class="text-green-700 font-bold">{{ product.price }} ₽</p>
        <button
          v-if="userStore.role === 'buyer'"
          @click="addToCart(product)"
          class="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
import CategoryList from '../components/catalog/CategoryList.vue'
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
    console.log('Ответ API:', response.data)
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
  console.log('Выбрана категория:', categoryId)
  selectedCategory.value = categoryId
  products.value = [] // Сбрасываем товары перед загрузкой
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
    const response = await api.post('cart/add/', { product_id: product.id })
    console.log('Ответ API добавления в корзину:', response.data)
  } catch (error) {
    console.error('Ошибка API добавления в корзину:', error.response?.data || error.message)
  }
}
</script>
