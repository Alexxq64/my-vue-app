<template>
  <div class="ml-4 mt-1">
    <!-- Кнопка категории -->
    <button
      @click="handleClick"
      :class="['px-3 py-1 rounded font-medium', isSelected ? 'bg-black text-white' : 'hover:bg-gray-200']"
    >
      {{ category.name }}
    </button>

    <!-- Подкатегории -->
    <div v-if="category.children && category.children.length > 0">
      <CategoryItem
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :selected-category-id="selectedCategoryId"
        @select="emitSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import CategoryItem from './CategoryItem.vue'

const props = defineProps({
  category: Object,
  selectedCategoryId: [String, Number]
})

const emit = defineEmits(['select'])

const isSelected = props.selectedCategoryId === props.category.id

function handleClick() {
  emit('select', props.category.id)
}

function emitSelect(id) {
  emit('select', id)
}
</script>
