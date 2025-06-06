// api/product.js
import axios from 'axios'

export async function fetchProducts(categoryId = null) {
  const params = {}
  if (categoryId) params.category = categoryId

  const response = await axios.get('http://localhost:8000/api/products/', { params })
  return response.data
}
