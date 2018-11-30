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
  }
})