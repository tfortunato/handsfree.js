import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../routes/home/Landing.vue'
import Settings from '../routes/settings/Landing.vue'
import DebugLanding from '../routes/debug/Landing.vue'

import SpaceWhales from '../routes/space-whales/Landing.vue'
import YouTubeLanding from '../routes/youtube/Landing.vue'
import YouTubeSingle from '../routes/youtube/Single.vue'
import HolodeckLanding from '../routes/holodeck/Landing.vue'

import DocsGettingStarted from '../routes/docs/Landing.vue'
import DocsDefaultUsage from '../routes/docs/DefaultUsage.vue'
import DocsConfig from '../routes/docs/Config.vue'
import DocsPlugins from '../routes/docs/Plugins.vue'
import DocsEvents from '../routes/docs/Events.vue'

Vue.use(VueRouter)
export default new VueRouter({
  scrollBehavior () {return {x: 0, y: 0}},
  routes: [
    {name: 'Home', path: '/', component: Home},
    {name: 'settings', path: '/settings', component: Settings},
    {name: 'debugLanding', path: '/debug', component: DebugLanding},

    // Demos
    {name: 'youtubeLanding', path: '/youtube', component: YouTubeLanding},
    {name: 'youtubeSingle', path: '/youtube/:id', component: YouTubeSingle},
    {name: 'holodeckLanding', path: '/holodeck', component: HolodeckLanding},
    {name: 'spaceWhalesLanding', path: '/space-whales', component: SpaceWhales},

    // Docs
    {name: 'docs', path: '/docs', component: DocsGettingStarted},
    {name: 'docsDefaultUsage', path: '/docs/default-usage', component: DocsDefaultUsage},
    {name: 'docsConfig', path: '/docs/config', component: DocsConfig},
    {name: 'docsPlugins', path: '/docs/plugins', component: DocsPlugins},
    {name: 'docsEvents', path: '/docs/events', component: DocsEvents}
  ]
})