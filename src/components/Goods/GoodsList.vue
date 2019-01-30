<template>
  <div>
    <nav-bar title="商品展示"></nav-bar>
    <div class="demo">
    <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" @top-status-change="handleTopChange" ref="loadmore">
      <ul>
        <li v-for="goods in goodsList" :key="goods.id">
          <a>
            <img src="goods.img_url" />
            <div class="sell">
              <span>￥{{goods.sell_price}}</span>
              <span>￥{{goods.market_price}}</span>
            </div>
            <div class="detail">
              <div class="hot"></div>
              <div class="count">剩{{goods.stock_quantity}}件</div>
            </div>
          </a>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goodsList: [],
      topStatus: ''
    }
  },
  created () {
    let page = this.$route.query.id || 1
    this.$axios.get('getgoods?pageindex=' + page)
      .then(res => {
        this.goodsList = res.data.message
        console.log(this.$refs.loadmore.topDropText)
      })
      .catch(err => console.log(err, '商品列表获取失败'))
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
      console.log(status)
    },
    loadTop () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      console.log('上拉加载')
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>

<style scoped>
.demo {
  padding-top: 100px;
}
.demo ul {
  display: block;
  padding-left: 5px;
}
</style>
