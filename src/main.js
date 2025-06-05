// src/main.js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import { useUserStore } from './store/user'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const userStore = useUserStore()

// 👇 Восстанавливаем пользователя из localStorage
userStore.initializeFromStorage()

// 🔍 Отладка
console.log('[main.js] Роль после инициализации:', userStore.role)
console.log('[main.js] Пользователь после инициализации:', userStore.username)

app.mount('#app')
