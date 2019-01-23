// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Axios from 'axios'

import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'

// 引入自己的CSS
import './assets/css/global.css'

// 引入图标的CSS
import './assets/icomoon/style.css'

// 引入自己的ul和li组件
import MyUl from '@/components/common/MyUl'
import MyLi from '@/components/common/MyLi'

// 定义moment全局日期过滤器
import Moment from 'moment'

import NavBar from '@/components/Common/NavBar'

Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)

Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})

// 配置公共URL
Axios.defaults.baseURL = 'http://www.sinya.online/api/'
Vue.prototype.$axios = Axios

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
