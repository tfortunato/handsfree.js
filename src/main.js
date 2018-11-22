import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './plugins/router'
import './handsfree.js'
require('./assets/styles/main.styl')

// Highlight.js
import hljs from 'highlight.js'
require('highlight.js/styles/shades-of-purple.css')
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))

// Setup Vue
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')