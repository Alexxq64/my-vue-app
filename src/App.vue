<template>
  <div id="app" class="min-h-screen flex flex-col">
    <header
      class="bg-gray-800 text-white p-4 flex justify-between items-center"
      style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;"
    >
      <div>
        Привет, <strong>{{ userStore.username || 'гость' }}</strong>!
      </div>
      <NavBar />
    </header>

    <main
      class="flex-grow p-6 bg-gray-50"
      :style="{ paddingTop: headerHeight + 'px', paddingBottom: footerHeight + 'px' }"
    >
      <router-view />
    </main>

    <footer
      class="bg-gray-200 text-left p-4"
      style="position: fixed; bottom: 0; left: 0; width: 100%;"
      ref="footer"
    >
      &copy; 2025 Mini-Ozon. Все права защищены.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { useUserStore } from './store/user'

const userStore = useUserStore()
const headerHeight = 56  // Высота хедера (в px), подкорректируй, если надо
const footerHeight = 48  // Высота футера (в px), подкорректируй, если надо
</script>

<style>
/* Можно добавить плавное перекрытие при скролле */
</style>
