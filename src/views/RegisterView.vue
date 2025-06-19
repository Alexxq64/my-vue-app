<template>
  <div class="register max-w-md mx-auto mt-12 px-4">
    <h2 class="text-xl font-bold mb-6 text-center">Регистрация</h2>

    <form @submit.prevent="register">
      <div style="margin-bottom: 1rem;">
        <input
          v-model="username"
          placeholder="Имя пользователя"
          required
          style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      <div style="margin-bottom: 1rem;">
        <input
          v-model="password1"
          type="password"
          placeholder="Пароль"
          required
          style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      <div style="margin-bottom: 1.5rem;">
        <input
          v-model="password2"
          type="password"
          placeholder="Повторите пароль"
          required
          style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      <button
        type="submit"
        style="
          display: block;
          width: 100%;
          padding: 0.75rem;
          background-color: #4f46e5;
          color: white;
          font-weight: 600;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        "
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :style="{ backgroundColor: hover ? '#4338ca' : '#4f46e5' }"
      >
        Зарегистрироваться
      </button>
    </form>

    <p v-if="error" style="color: #dc2626; margin-top: 1rem; text-align: center;">
      {{ error }}
    </p>
  </div>
</template>

<script>
import axios from '../utils/axiosInstance'

export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      password1: '',
      password2: '',
      error: '',
      hover: false,
    }
  },
  mounted() {
    this.clearForm()
  },
  beforeRouteUpdate(to, from, next) {
    this.clearForm()
    next()
  },
  watch: {
    $route(to, from) {
      this.clearForm()
    }
  },
  methods: {
    clearForm() {
      this.username = ''
      this.password1 = ''
      this.password2 = ''
      this.error = ''
    },
    async register() {
      if (this.password1 !== this.password2) {
        this.error = 'Пароли не совпадают'
        return
      }
      try {
          const response = await axios.post('http://localhost:8000/auth/register/', {
          username: this.username,
          password: this.password1,
        })
        const { token, username, role } = response.data
        if (token) {
          localStorage.setItem('token', token)
          localStorage.setItem('username', username)
          localStorage.setItem('role', role)
        }
        this.clearForm()
        this.$router.push('/')
      } catch (err) {
        this.error = 'Ошибка регистрации'
        console.error(err)
      }
    },
  },
}
</script>
