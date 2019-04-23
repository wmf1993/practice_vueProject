<template>
  <div>
    <nav-bar title="新闻列表"></nav-bar>
    <div class="demo">
      <ul>
        <li v-for="news in newsList" :key="news.id">
          <router-link :to="{name:'news.detail',query: {id:news.id}}">
            <img chass="" :src="news.img_url" />
            <div>
              <span>{{ news.title }}</span>
              <div class="news-desc">
                <p>点击数: {{ news.click }}</p>
                <p>发表时间: {{ news.add_time |convertTime('YYYY-MM-DD') }}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsList: []
    }
  },
  created () {
    this.$axios.get('getnewslist')
      .then(res => {
        this.newsList = res.data.message
      })
      .catch(err => console.log('新闻列表异常', err))
  }
}
</script>

<style scoped>
.demo ul {
  display: block;
  padding-left: 5px;
}
img {
  height: 40px;
  width: 40px;
  margin-right: 10px;
  margin-top: 9px;
  float: left;
  display: block;
}
a>div {
  width: 320px;
  float: left;
  display: block;
}
a>div span {
  display: inline-block;
  width: 280px;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #000000;
}
a>div div {
  display: block;
}
a>div div p {
  color: #26a2ff;
  margin-right: 10px;
  display: inline-block;
}
a>div div p:first-child {
  float: left;
}
a>div div p:last-child {
  float: right;
}
</style>
