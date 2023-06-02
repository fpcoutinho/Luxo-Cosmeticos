import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import User from '../views/User.vue'
import Favorites from '../views/Favorites.vue'
import Help from '../views/Help.vue'
import NotFound from '../views/NotFound.vue'
import Produto from '../views/Produto.vue'
import CriaProduto from '../views/admin/CriaProduto.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
  },
  {
    path: '/help',
    name: 'help',
    component: Help,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    props: true,
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: Produto,
    props: true,
  },
  {
    path: '/admin/cria/produto',
    name: 'criaProduto',
    component: CriaProduto,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
