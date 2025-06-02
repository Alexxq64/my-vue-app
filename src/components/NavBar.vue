<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Каталог</router-link></li>
      <li><router-link to="/cart">Корзина</router-link></li>
      <li><router-link to="/orders">Мои заказы</router-link></li>
      <li><router-link to="/seller">Кабинет продавца</router-link></li>
      <li><router-link to="/auth">Вход / Регистрация</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 1rem;
  background-color: #f0f0f0;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
}
.navbar li {
  display: inline;
}
</style>
