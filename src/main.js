import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Handsfree from './handsfree/Handsfree.js'
window.handsfree = new Handsfree({debug: true})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
