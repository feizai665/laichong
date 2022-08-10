// #ifndef VUE3

import Vue from 'vue'
import App from './App'
// main.js
Vue.config.productionTip = false
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import {
  $http
} from '@escook/request-miniprogram'
$http.baseUrl = "https://4de16698-d9f4-443a-b416-ef1037cce952.bspapp.com/http"
uni.$http = $http
App.mpType = 'app'

// 请求拦截器
$http.beforeRequest = function(options) {
  // do somethimg...
  uni.showLoading({
    title: "加载中"
  })
}
uni.$showMsg = function(title = "数据加载失败", duration = 1000) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
// 响应拦截器
$http.afterRequest = function() {
  // do something...
  uni.hideLoading()
}
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
