<script setup>
import { onMounted, ref } from 'vue'
import api from '../utils/axiosInstance'  // импортируем наш экземпляр axios с токеном

const cart = ref(null)

const loadCart = async () => {
  try {
    const response = await api.get('cart/')  // путь относительный к baseURL, токен добавится автоматически
    cart.value = response.data
  } catch (error) {
    console.error('Ошибка при получении корзины:', error)
  }
}

onMounted(loadCart)

const submitOrder = async () => {
  try {
    const response = await api.post('orders/create/', {})  // тоже с api
    alert(`Заказ успешно оформлен! Номер заказа: ${response.data.order_id}`)
    await loadCart() // обновить корзину после оформления
  } catch (error) {
    alert(error.response?.data?.error || 'Ошибка при оформлении заказа')
    console.error('Ошибка оформления заказа:', error)
  }
}
</script>


<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Корзина</h1>
    
    <div v-if="cart?.items?.length">
      <div v-for="item in cart.items" :key="item.id" class="border p-2 mb-2">
        <p><strong>{{ item.product.name }}</strong></p>
        <p>Цена: {{ item.product.price }}</p>
        <p>Количество: {{ item.quantity }}</p>
      </div>

      <!-- КНОПКА ОФОРМИТЬ ЗАКАЗ -->
      <button
        @click="submitOrder"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Оформить заказ
      </button>
    </div>

    <div v-else>
      Корзина пуста.
    </div>
  </div>
</template>
