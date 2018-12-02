import Vue from 'vue'
import Vuex from 'vuex'
import {set} from 'lodash'
import youtube from '../store/youtube'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    youtube
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
     * Runs a passed method either immediately or when window.handsfree is ready
     * @param {Function} callback The callback to call when window.handsfree is ready (or immediately if it already is)
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