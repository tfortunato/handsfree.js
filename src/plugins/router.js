import Vue from 'vue'
import VueRouter from 'vue-router'
import SpaceWhales from '../components/space-whales/Landing.vue'
import Home from '../components/home/Landing.vue'
import YouTubeLanding from '../components/youtube/Landing.vue'
import YouTubeSingle from '../components/youtube/Single.vue'
import HolodeckLanding from '../components/holodeck/Landing.vue'
import Settings from '../components/Settings.vue'

import docsGettingStarted from '../components/docs/Landing.vue'
import docsDefaultUsage from '../components/docs/DefaultUsage.vue'
import DocsConfig from '../components/docs/Config.vue'
import DocsPlugins from '../components/docs/Plugins.vue'
import DocsEvents from '../components/docs/Events.vue'
import DocsCursor from '../components/docs/Cursor.vue'

Vue.use(VueRouter)
export default new VueRouter({
  scrollBehavior () {return {x: 0, y: 0}},
  routes: [
    {name: 'Home', path: '/', component: Home},
    {name: 'settings', path: '/settings', component: Settings},
    {name: 'youtubeLanding', path: '/youtube', component: YouTubeLanding},
    {name: 'youtubeSingle', path: '/youtube/:id', component: YouTubeSingle},
    {name: 'holodeckLanding', path: '/holodeck', component: HolodeckLanding},
    {name: 'spaceWhalesLanding', path: '/space-whales', component: SpaceWhales},

    // Docs
    {name: 'docs', path: '/docs', component: docsGettingStarted},
    {name: 'docsDefaultUsage', path: '/docs/default-usage', component: docsDefaultUsage},
    {name: 'docsConfig', path: '/docs/config', component: DocsConfig},
    {name: 'docsPlugins', path: '/docs/plugins', component: DocsPlugins},
    {name: 'docsEvents', path: '/docs/events', component: DocsEvents},
    {name: 'docsCursor', path: '/docs/cursor', component: DocsCursor}
  ]
})