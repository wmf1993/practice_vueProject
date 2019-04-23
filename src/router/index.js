import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Search from '@/components/Search/Search'
import Shopcart from '@/components/Shopcart/Shopcart'
import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/Photo/PhotoList'
import PhotoDetail from '@/components/Photo/Photodetail'
import GoodsList from '@/components/Goods/GoodsList'
import GoodsDetail from '@/components/Goods/GoodsDetail'
import GoodsComment from '@/components/Goods/GoodsComment'

Vue.use(Router)

export default new Router({
  routes: [
    // 重定向
    {
      path: '/',
      redirect: {name: 'home'}
    },

    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },

    // 新闻列表
    {
      name: 'news.list',
      path: '/news/list',
      component: NewsList
    },

    // 新闻详情
    {
      name: 'news.detail',
      path: '/news/detail',
      component: NewsDetail
    },

    // 图文列表
    {
      name: 'photo.list',
      path: '/photo/list/:categoryId',
      component: PhotoList
    },
    // 图文详情
    {
      name: 'photo.detail',
      path: '/photo/detail',
      component: PhotoDetail
    },
    // 商品列表
    {
      name: 'goods.list',
      path: '/goods/list',
      component: GoodsList
    },
    // 商品详情
    {
      name: 'goods.detail',
      path: '/goods/detail',
      component: GoodsDetail
    },
    // 图文介绍
    {
      name: 'photo.info',
      path: '/goods/photo/info',
      component: NewsDetail // 复用
    },
    // 商品评论
    {
      name: 'goods.comment',
      path: '/goods/comment',
      component: GoodsComment
    }
  ]
})
