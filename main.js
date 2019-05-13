import Vue from 'vue'
import App from './App'
import store from '@/store'
import cuCustom from './colorui/components/cu-custom.vue'
import constants from './utils/constants.js';
import {requestWithToken, requestWithoutToken, uploadWithoutToken} from './utils/request-helper.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$constants = constants
Vue.prototype.$requestWithToken = requestWithToken
Vue.prototype.$requestWithoutToken = requestWithoutToken
Vue.prototype.$uploadWithoutToken = uploadWithoutToken
Vue.component('cu-custom',cuCustom)
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
