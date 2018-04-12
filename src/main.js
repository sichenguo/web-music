import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
import store from './store'
//模块引入的规则，先package.json 然后再寻找index 文件 
// Vue.config.productionTip = false
fastclick.attach(document.body) // cancal 300ms delayTime
Vue.use(VueLazyload, {
  loading: require('common/image/default.gif')
}) 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
