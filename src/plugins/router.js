import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Settings from '../components/Settings.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {name: 'home', path: '/', component: Home},
    {name: 'settings', path: '/settings', component: Settings}
  ]
})