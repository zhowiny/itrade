// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import product from './product'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    product,
  },
  state: {
    fromLandingPage: false,
  },
  getters: {
  },
  mutations: {
    setFromLandingPage (state, data) {
      state.fromLandingPage = data
    }
  },
  actions: {
  }
})

export default store
