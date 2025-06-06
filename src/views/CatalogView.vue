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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CategoryList from '../components/catalog/CategoryList.vue'

const products = ref([])
const categories = ref([])
const selectedCategory = ref('')

// Получить товары
const fetchProducts = async () => {
  console.log('selectedCategory.value:', selectedCategory.value)
  try {
    const url = selectedCategory.value
      ? `/api/products/?category_id=${selectedCategory.value}`
      : '/api/products/'
    const response = await axios.get(url)

    // Явная фильтрация по category_id
    const filtered = selectedCategory.value
      ? response.data.filter(
          (product) => product.category === Number(selectedCategory.value)
        )
      : response.data

    products.value = filtered
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error)
  }
}

// Получить категории
const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories/')
    categories.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error)
  }
}

// Обработка выбора категории
const handleCategorySelect = async (categoryId) => {
  console.log('Выбрана категория:', categoryId) // ← добавь
  selectedCategory.value = categoryId
  await fetchProducts()
}

// Инициализация
onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})
</script>
