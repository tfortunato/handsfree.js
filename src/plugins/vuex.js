import Vue from 'vue'
import Vuex from 'vuex'
import {set} from 'lodash'
import youtube from '../store/youtube'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    youtube
  },

  state: {
    // Whether handsfree is loading or not
    isHandsfreeLoading: true,

    loading: {
      progress: 0,
      color: 'error'
    }
  },
  
  mutations: {
    /**
     * Sets a state by pathname
     * @param {*} state 
     * @param {Array} payload ['path', value]
     */
    set (state, payload) {
      set(state, payload[0], payload[1])
    }
  },

  actions: {
    /**
     * Calls the passed function either when window.handsfree is available, or immediately if it's ready
     * - Think of this as window.addEventListener('load') but for the handsfree instance
     * 
     * - Use this inside the Mount component life cycle to disable plugins
     * -- @see https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
     * 
     * - Also use it on the beforeRouteLeave vue-router guard
     * -- @see https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
     */
    onReady (store, callback) {
      if (window.handsfree) {
        callback()
      } else {
        setTimeout(() => store.dispatch('onReady', callback), 50)
      }
    }
  }
})

/**
 * Handsfree Hooks
 */
window.addEventListener('handsfree:ready', () => {
  store.commit('set', ['isHandsfreeLoading', false])
  store.commit('set', ['loading.color', 'success'])
  setTimeout(() => store.commit('set', ['loading.color', 'info']), 1000)
})
window.addEventListener('handsfree:loading', (ev) => {
  store.commit('set', ['loading.progress', ev.detail.progress])
})

export default store