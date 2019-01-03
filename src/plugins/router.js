import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Landing.vue'
import HomeV1 from '../components/_retired/Home-v1.vue'
import YouTubeLanding from '../components/youtube/Landing.vue'
import YouTubeSingle from '../components/youtube/Single.vue'
import HolodeckLanding from '../components/holodeck/Landing.vue'
import Settings from '../components/Settings.vue'

Vue.use(VueRouter)
export default new VueRouter({
  scrollBehavior () {return {x: 0, y: 0}},
  routes: [
    {name: 'Home', path: '/', component: Home},
    {name: 'HomeV1', path: '/home-v1', component: HomeV1},
    {name: 'settings', path: '/settings', component: Settings},
    {name: 'youtubeLanding', path: '/youtube', component: YouTubeLanding},
    {name: 'youtubeSingle', path: '/youtube/:id', component: YouTubeSingle},
    {name: 'holodeckLanding', path: '/holodeck', component: HolodeckLanding}
  ]
})