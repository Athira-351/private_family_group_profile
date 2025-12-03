import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import FamilyHome from './components/FamilyHome.vue'
import ProfileView from './components/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FamilyHome
  },
  {
    path: '/profile/:memberId',
    name: 'Profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
