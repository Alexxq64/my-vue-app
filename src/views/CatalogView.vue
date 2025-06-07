<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Каталог товаров</h1>

    <!-- Навигация по категориям -->
    <div class="mb-6">
      <h2 class="font-medium mb-2">Фильтр по категории:</h2>
      <div class="flex flex-wrap gap-3 mb-2">
        <button
          v-for="cat in rootCategories"
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

      <div v-if="selectedCategory" class="mb-2">
        <strong>Вы выбрали:</strong> {{ categoryPathString }}

        <button
          @click="goBack"
          class="ml-4 px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded text-sm"
        >
          Назад
        </button>
      </div>

      <!-- Подкатегории -->
      <div v-if="selectedCategory && subcategories.length > 0" class="flex flex-wrap gap-3">
        <button
          v-for="subcat in subcategories"
          :key="subcat.id"
          @click="handleCategorySelect(subcat.id)"
          class="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          {{ subcat.name }}
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
import { ref, onMounted, computed } from 'vue'
import api from '../utils/axiosInstance'
import { useUserStore } from '../store/user'

const userStore = useUserStore()
const products = ref([])
const categories = ref([])
const selectedCategory = ref(null)

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

// Категории верхнего уровня (без родителя)
const rootCategories = computed(() =>
  categories.value.filter(cat => !cat.parent)
)

// Подкатегории выбранной категории
const subcategories = computed(() => {
  if (!selectedCategory.value) return []
  const category = findCategoryById(selectedCategory.value)
  return category?.subcategories || []
})

// Поиск категории по id (рекурсивно)
function findCategoryById(id, cats = categories.value) {
  for (const cat of cats) {
    if (cat.id === id) return cat
    if (cat.subcategories.length) {
      const found = findCategoryById(id, cat.subcategories)
      if (found) return found
    }
  }
  return null
}

// Получить путь выбранной категории до корня (массив категорий)
const categoryPath = computed(() => {
  const path = []
  function findPath(id, cats = categories.value) {
    for (const cat of cats) {
      if (cat.id === id) {
        path.push(cat)
        return true
      }
      if (cat.subcategories.length) {
        if (findPath(id, cat.subcategories)) {
          path.unshift(cat)
          return true
        }
      }
    }
    return false
  }
  if (selectedCategory.value) findPath(selectedCategory.value)
  return path
})

// Строка пути категорий для отображения
const categoryPathString = computed(() =>
  categoryPath.value.map(cat => cat.name).join(' > ')
)

// Обработка выбора категории
const handleCategorySelect = async (categoryId) => {
  selectedCategory.value = categoryId
  products.value = []
  await fetchProducts()
}

// Кнопка назад — возвращает к родителю или сбрасывает выбор
const goBack = async () => {
  if (!selectedCategory.value) return
  const currentCategory = findCategoryById(selectedCategory.value)
  if (currentCategory && currentCategory.parent) {
    selectedCategory.value = currentCategory.parent
  } else {
    selectedCategory.value = null
  }
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
