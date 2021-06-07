import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/api'
import '@/assets/fonts/iconfont.css'
import '@/assets/css/normal.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/plugins/element'

Vue.config.productionTip = false
Vue.prototype.$request = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
