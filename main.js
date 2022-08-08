
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
Vue.config.productionTip = false
$http.baseUrl = "https://4de16698-d9f4-443a-b416-ef1037cce952.bspapp.com/http"
uni.$http = $http
App.mpType = 'app'

// 请求拦截器
$http.beforeRequest = function (options) {
  // do somethimg...
}

// 响应拦截器
$http.afterRequest = function () {
  // do something...
}
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif