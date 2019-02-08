import Vue from 'vue'
import VueRouter from 'vue-router'
import Settings from '../components/Settings.vue'
import Home from '../components/home/Landing.vue'

import SpaceWhales from '../components/space-whales/Landing.vue'
import YouTubeLanding from '../components/youtube/Landing.vue'
import YouTubeSingle from '../components/youtube/Single.vue'
import HolodeckLanding from '../components/holodeck/Landing.vue'
import KinematicsLanding from '../components/kinematics/Landing.vue'

import docsGettingStarted from '../routes/docs/Landing.vue'
import docsDefaultUsage from '../routes/docs/DefaultUsage.vue'
import DocsConfig from '../routes/docs/Config.vue'
import DocsPlugins from '../routes/docs/Plugins.vue'
import DocsEvents from '../routes/docs/Events.vue'

import workshopsLanding from '../routes/workshop/Landing.vue'

Vue.use(VueRouter)
export default new VueRouter({
  scrollBehavior () {return {x: 0, y: 0}},
  routes: [
    {name: 'Home', path: '/', component: Home},
    {name: 'settings', path: '/settings', component: Settings},

    // Demos
    {name: 'youtubeLanding', path: '/youtube', component: YouTubeLanding},
    {name: 'youtubeSingle', path: '/youtube/:id', component: YouTubeSingle},
    {name: 'holodeckLanding', path: '/holodeck', component: HolodeckLanding},
    {name: 'spaceWhalesLanding', path: '/space-whales', component: SpaceWhales},
    {name: 'kinematicsLanding', path: '/kinematics', component: KinematicsLanding},

    // Docs
    {name: 'docs', path: '/docs', component: docsGettingStarted},
    {name: 'docsDefaultUsage', path: '/docs/default-usage', component: docsDefaultUsage},
    {name: 'docsConfig', path: '/docs/config', component: DocsConfig},
    {name: 'docsPlugins', path: '/docs/plugins', component: DocsPlugins},
    {name: 'docsEvents', path: '/docs/events', component: DocsEvents},

    // Workshops
    {name: 'workshops', path: '/workshop', component: workshopsLanding}
  ]
})