// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Axios from 'axios'

import MintUI from 'mint-ui'

// 图片预览插件
import VuePreview from 'vue-preview'

import 'mint-ui/lib/style.css'

// 引入自己的CSS
import './assets/css/global.css'

// 引入图标的CSS
import './assets/icomoon/style.css'

import NavBar from '@/components/Common/NavBar'
// 引入自己的ul和li组件
import MyUl from '@/components/common/MyUl'
import MyLi from '@/components/common/MyLi'
// 引入自己的评论组件
import Comment from '@/components/common/Comment'

// 定义moment全局日期过滤器
import Moment from 'moment'
// 设置中文显示
Moment.locale('zh-cn')

Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)

Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})
// 相对时间
Vue.filter('relativeTime', function (previousTime) {
  return Moment(previousTime).fromNow()
})
// 处理文字过长的过滤器
Vue.filter('convertStr', function (str, count) {
  return str.substring(0, count) + '...'
})

// 配置公共URL
// Axios.defaults.baseURL = 'http://www.sinya.online/api/'
Axios.defaults.baseURL = 'http://127.0.0.1:8899/api/'
Vue.prototype.$axios = Axios

// 配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '玩命加载中...'
  })
  return config
})
// 配置响应拦截器，关闭loading图标
Axios.interceptors.response.use(function (response) {
  // response.config 类似上面的 config
  MintUI.Indicator.close()
  return response
})

Vue.use(MintUI)

Vue.use(VuePreview) // 内部运行：Vue.component('vue-preview',componentObj)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
