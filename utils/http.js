import {$http} from "@escook/request-miniprogram"
var http = $http
$http.baseUrl = "https://4de16698-d9f4-443a-b416-ef1037cce952.bspapp.com/http"
// 请求拦截器
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.showLoading({
    title:"加载中"
  })
}

// 响应拦截器
$http.afterRequest = function () {
  // do something...
  uni.hideLoading()
}
export default http