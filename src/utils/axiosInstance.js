// src/utils/axiosInstance.js

import axios from 'axios'
import { getAuthToken } from './auth'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // можно изменить на /auth/ при необходимости
})

instance.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export default instance
