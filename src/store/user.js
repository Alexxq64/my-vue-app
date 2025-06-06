// src/store/user.js
import { defineStore } from 'pinia'
import { saveAuthData, clearAuthData } from '../utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    role: null,
    username: null,
  }),
  actions: {
    initializeFromStorage() {
      this.token = localStorage.getItem('token')
      this.role = localStorage.getItem('role')
      this.username = localStorage.getItem('username')
      console.log('[store] role:', this.role)
      console.log('[store] username:', this.username)
    },
    login(token, username, role) {
      this.token = token
      this.role = role
      this.username = username
      saveAuthData(token, username, role)
    },
    logout() {
      this.token = null
      this.role = null
      this.username = null
      clearAuthData()
    },
  },
})
