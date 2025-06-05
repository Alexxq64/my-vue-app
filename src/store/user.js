// src/store/user.js
import { defineStore } from 'pinia'
import { saveAuthData, clearAuthData } from '../utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    role: null,
    username: null,
  }),
  actions: {
    initializeFromStorage() {
      this.role = localStorage.getItem('role')
      this.username = localStorage.getItem('username')
      console.log('[store] role:', this.role)
      console.log('[store] username:', this.username)
    },
    login(token, username, role) {
      this.role = role
      this.username = username
      saveAuthData(token, username, role)
    },
    logout() {
      this.role = null
      this.username = null
      clearAuthData()
    },
  },
})
