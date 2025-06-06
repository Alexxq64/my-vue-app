<template>
  <div>
    <p style="color: red; font-weight: bold;">CategoryItem: {{ category.name }}</p>
    <button
      @click="handleClick"
      :class="['px-3 py-1 rounded font-medium', isSelected ? 'bg-black text-white' : 'hover:bg-gray-200']"
    >
      {{ category.name }}
    </button>

    <div v-if="category.subcategories && category.subcategories.length > 0" class="ml-4 mt-1">
      <CategoryItem
        v-for="child in category.subcategories"
        :key="child.id"
        :category="child"
        :selected-category-id="selectedCategoryId"
        @select="emitSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import CategoryItem from './CategoryItem.vue'

const props = defineProps({
  category: Object,
  selectedCategoryId: [String, Number]
})

const emit = defineEmits(['select'])

const isSelected = computed(() => props.selectedCategoryId === props.category.id)

function handleClick() {
  emit('select', props.category.id)
}

function emitSelect(id) {
  emit('select', id)
}

console.log('CategoryItem category:', props.category)
console.log('CategoryItem subcategories:', props.category.subcategories)
</script>
