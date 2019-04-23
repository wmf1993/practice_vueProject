<template>
  <div >
    <nav-bar title="商品展示"></nav-bar>
    <div class="demo" style="height:510px">
      <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <router-link :to="{name:'goods.detail',query:{id:goods.id}}">
              <a>
                <img :src="goods.img_url" />
                <div class="title">{{ goods.title | convertStr(20) }}</div>
                <div class="description">
                  <div class="sell">
                    <span>￥{{goods.sell_price}}</span>
                    <span>￥{{goods.market_price}}</span>
                  </div>
                  <div class="detail">
                    <div class="hot"></div>
                    <div class="count">剩{{goods.stock_quantity}}件</div>
                  </div>
                </div>
              </a>
            </router-link>
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
import imgSrc from '@/assets/404-1.gif'
export default {
  data () {
    return {
      imgSrc,
      goodsList: [],
      topStatus: '',
      bottomStatus: '',
      page: 1,
      allLoaded: false
    }
  },
  created () {
    this.page = this.$route.query.id || 1
    this.loadByPage(this.page)
  },
  methods: {
    loadByPage (page) {
      this.$axios.get('getgoods?pageindex=' + page)
        .then(res => {
          this.goodsList = res.data.message
          this.page++
        })
        .catch(err => console.log(err, '商品列表获取失败'))
    },
    concatByPage (page) {
      this.$axios.get('getgoods?pageindex=' + page)
        .then(res => {
          // 判断是否还有数据（通过数组是否为空）
          if (res.data.message.length === 0) {
            this.$toast('没有更多数据了')
            this.allLoaded = true
          }
          this.goodsList = this.goodsList.concat(res.data.message)
          this.$refs.loadmore.onBottomLoaded() // 通知元素重新定位
          this.page++
        })
        .catch(err => console.log(err, '商品列表获取失败'))
    },
    handleTopChange (status) {
      this.topStatus = status
      console.log('handleTopChange: ' + status)
    },
    handleBottomChange (status) {
      this.bottomStatus = status
      console.log('handleBottomChange: ' + status)
    },
    loadTop () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      console.log('上拉加载')
      this.concatByPage(this.page)
    }
  }
}
</script>

<style scoped>
.demo {
  height: 508px;
  overflow: auto;
  /*padding-top: 90px;*/
}
.demo ul {
  display: block;
  padding: 0px 0px;
  margin: 0;
  overflow: hidden;
}
.demo ul li {
  float: left;
  width: 177px;
  height: 260px;
  margin: 5px;
  border: 1px solid gray;
  box-sizing: border-box;
}
.demo ul li>a {
  margin: 0px;
  padding: 0px;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}
.demo img {
  width: 175px;
  z-index: -111;
}
.description {
  background-color: #eaeaea;
}
</style>
