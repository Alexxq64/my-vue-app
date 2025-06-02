import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '../views/CatalogView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import OrderHistoryView from '../views/OrderHistoryView.vue'
import SellerCabinet from '../views/SellerCabinet.vue'
import AuthView from '../views/AuthView.vue'

const routes = [
  { path: '/', name: 'Catalog', component: CatalogView },
  { path: '/product/:id', name: 'Product', component: ProductView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/orders', name: 'OrderHistory', component: OrderHistoryView },
  { path: '/seller', name: 'SellerCabinet', component: SellerCabinet },
  { path: '/auth', name: 'Auth', component: AuthView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
