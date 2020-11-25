// 请求的根路径
var baseURL = 'http://ajax.frontend.itheima.net'
// var baseURL = 'http://www.liulongbin.top:3007'

// Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax().
$.ajaxPrefilter(function(options) {
  // 1. 拼接请求的根路径
  options.url = baseURL + options.url

  // 2. 如果请求的 URL 中包含 /my/ 这样的请求路径，则为请求头添加 Authorization 字段
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 3. 全局挂载 complete 回调函数，每当请求完成以后，都进行拦截
  options.complete = function (res) {
    console.log( res );
    // 3.1 判断身份认证是否失败
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 3.2 如果身份认证失败，则清空本地存储的 token 和 user 信息
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // 3.3 重定向到登录页面
      // 通过 window.parent 获取到父窗口对象
      window.parent.location.href = '/home/login.html'
    }
  }
})