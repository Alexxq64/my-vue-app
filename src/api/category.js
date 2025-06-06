// api/category.js
import axios from 'axios'

export async function fetchCategories() {
  const response = await axios.get('http://localhost:8000/api/categories/')
  return response.data
}
