<template>
  <div>
    <h1>Список продуктов</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} — {{ product.price }}$
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    // Запрос к Django API
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => {
        this.products = data;
      })
      .catch(error => {
        console.error('Ошибка при загрузке продуктов:', error);
      });
  }
}
</script>
