/* eslint-disable */
import * as types from './mutation-types.js'
// mutation 分为两个部分 type payload
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}
export default mutations