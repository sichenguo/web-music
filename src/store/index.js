/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import creatLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = (process.env.NODE_ENV !== 'production')
// 非调试环境，使用process进行判断
export default new Vuex.Store({
  actions,
  mutations,
  getters,
  strict: debug,
  plugin: debug ? [creatLogger] : []
})
