import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeDocumentation from '../components/HomeDocumentation.vue'
import HomeBrowseHandsfree from '../components/HomeBrowseHandsfree.vue'
import Settings from '../components/Settings.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {name: 'homeDocumentation', path: '/', component: HomeDocumentation},
    {name: 'homeBrowseHandsfree', path: '/browse', component: HomeBrowseHandsfree},
    {name: 'settings', path: '/settings', component: Settings}
  ]
})