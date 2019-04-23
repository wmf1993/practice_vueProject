<template>
  <div>
    <!-- <nav-bar title="新闻详情"></nav-bar> -->
    <nav-bar :title="title"></nav-bar>
    <div class="news-title">
      <p>{{ newsDetail.title }}</p>
      <div>
        <span>{{ newsDetail.click }}次点击</span>
        <span>分类：民生经济</span>
        <span>添加时间: {{ newsDetail.add_time | convertTime('YYYY-MM-DD') }}</span>
      </div>
    </div>
    <div class="news-content" v-html="newsDetail.content">新闻明细</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsDetail: {},
      title: ''
    }
  },
  created () {
    let id = this.$route.query.id
    this.$axios.get('getnew/' + id)
      .then(res => {
        this.newsDetail = res.data.message[0]
      })
      .catch(err => console.log(err))
  },
  // 路由确认前，组件渲染前的守卫函数
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log(from)

    // 1. form为空，说明是粘贴地址栏
    //   1.1. 继续判断，根据to来设置title
    // 2. from是新闻列表，title为新闻详情
    // 3. from是商品详情，title为商品图文介绍
    let title = ''
    if (from.name == null) {
      if (to.name === 'news.detail') {
        title = '新闻详情'
      } else if (to.name === 'photo.info') {
        title = '商品图文介绍'
      }
    } else if (from.name === 'news.list') {
      title = '新闻详情'
    } else if (from.name === 'goods.detail') {
      title = '商品图文介绍'
    }

    next(vm => {
      vm.title = title
    })
  }
}
</script>

<style scoped>
.news-title p {
  color: #26a2ff;
}
.news-content {
  margin-bottom: 55px;
}
</style>
