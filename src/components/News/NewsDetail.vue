<template>
  <div class="tmp1">
    <nav-bar title="新闻详情"></nav-bar>
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
      newsDetail: {}
    }
  },
  created () {
    let id = this.$route.query.id
    this.$axios.get('getnew/' + id)
      .then(res => {
        this.newsDetail = res.data.message[0]
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
.news-title {
  padding-top: 100px;
}
.news-title p {
  color: #26a2ff;
}
.news-content {
  margin-bottom: 55px;
}
</style>
