<template>
  <div>
    <h1>История заказов</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <div v-if="orders.length === 0">Заказов нет</div>
      <div v-for="order in orders" :key="order.id" class="order">
        <h3>Заказ #{{ order.id }} — {{ formatDate(order.created_at) }}</h3>
        <p>Итого: {{ order.total }} ₽</p> <!-- вместо total_price -->

        <ul>
          <li v-for="item in order.items" :key="item.product">
            {{ item.product_name }} — {{ item.quantity }} шт. — {{ item.product_price }} ₽
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import api from '../utils/axiosInstance'

const orders = ref([])
const loading = ref(true)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString()
}

const loadOrders = async () => {
  try {
    const response = await api.get('/orders/history/')
    orders.value = response.data
  } catch (error) {
    console.error('Ошибка загрузки заказов', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadOrders)
</script>

<style scoped>
.order {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
