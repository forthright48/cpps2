import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import ojInfo from './modules/ojInfo'
import gateway from './modules/gateway'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    ojInfo,
    gateway
  },
  getters
})

export default store
