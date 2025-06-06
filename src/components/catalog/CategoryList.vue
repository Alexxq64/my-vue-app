<template>
  <div>
    <!-- Кнопка "Назад" -->
    <button
      v-if="history.length > 0"
      class="mb-2 text-blue-500 hover:underline"
      @click="goBack"
    >
      ← Назад
    </button>

    <ul class="space-y-2">
      <li v-for="category in currentCategories" :key="category.id">
        <button
          class="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
          @click="handleClick(category)"
        >
          {{ category.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  categories: Array,
  selectedCategoryId: [Number, String]
})
const emit = defineEmits(['select'])

const history = ref([]) // стек истории
const currentCategories = ref(props.categories || [])

watch(
  () => props.categories,
  (newVal) => {
    currentCategories.value = newVal
    history.value = [] // сброс при новом списке
  },
  { immediate: true }
)

function handleClick(category) {
  if (category.subcategories && category.subcategories.length > 0) {
    history.value.push(currentCategories.value)
    currentCategories.value = category.subcategories
  } else {
    emit('select', category.id)
  }
}

function goBack() {
  if (history.value.length > 0) {
    currentCategories.value = history.value.pop()

    // Уведомим родителя о новой (родительской) категории — если известна
    const parentCategory = currentCategories.value[0]?.parent
    if (parentCategory) {
      emit('select', parentCategory)
    } else {
      emit('select', '') // корневая категория
    }
  }
}

</script>
