import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/room/:id',
    name: 'room',
    component: () => import(/* webpackChunkName: "room" */ '../views/Room.vue')
  },
  {
    path: '/scoreboard',
    name: 'scoreboard',
    component: ScoreBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
