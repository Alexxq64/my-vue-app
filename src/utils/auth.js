// src/utils/auth.js

export function saveAuthData(token, username, role) {
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
  localStorage.setItem('role', role)
}

export function clearAuthData() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
}

export function getAuthToken() {
  return localStorage.getItem('token')
}
