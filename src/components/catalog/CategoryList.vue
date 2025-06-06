<template>
  <div>
    <!-- Кнопка "Назад" -->
    <button
      v-show="history.length > 0"
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
import { ref, watch } from 'vue'

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
    history.value = [] // сброс истории при новом списке категорий
  },
  { immediate: true }
)

function handleClick(category) {
  console.log('Clicked category:', category.id, category)
  emit('select', category.id)

  if (category.subcategories) {
    history.value.push(currentCategories.value)
    currentCategories.value = category.subcategories || []
    console.log('Переход в подкатегории:', currentCategories.value)
  }
}

function goBack() {
  if (history.value.length > 0) {
    currentCategories.value = history.value.pop()
    console.log('Возврат в категории:', currentCategories.value)

    const parentId = currentCategories.value[0]?.parent
    if (parentId !== null && parentId !== undefined) {
      emit('select', parentId)
    } else {
      emit('select', '') // если родителя нет — снимаем фильтр
    }
  }
}
</script>
