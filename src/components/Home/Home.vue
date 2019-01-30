<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="img in imgs" :key="img.id">
        <img :src="img.imgSrc" />
      </mt-swipe-item>
    </mt-swipe>

    <div class="grid">
      <my-ul>
        <my-li v-for="(grid, index) in grids" :key="index">
          <router-link :to="grid.router">
            <span class="gridClass" >
              <img :src="grid.picURL" />
              <span>{{ grid.title }}</span>
            </span>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcom to your Vue.js App',
      imgs: [
        {'id': 'swipe_1', 'url': '', 'imgSrc': require('../../assets/img/swipe_1.jpg')},
        {'id': 'swipe_2', 'url': '', 'imgSrc': require('../../assets/img/swipe_2.jpg')}
      ],
      grids: [
        {picURL: require('../../assets/img/homePic/message.png'), title: '新闻资讯', router: {name: 'news.list'}},
        {picURL: require('../../assets/img/homePic/share.png'), title: '图文分享', router: {name: 'photo.list', params: {categoryId: 0}}},
        {picURL: require('../../assets/img/homePic/show.png'), title: '商品展示', router: {name: 'goods.list', query: {id: 1}}},
        {picURL: require('../../assets/img/homePic/guestbook.png'), title: '留言反馈', router: {name: 'news.list'}},
        {picURL: require('../../assets/img/homePic/search.png'), title: '搜索资讯', router: {name: 'news.list'}},
        {picURL: require('../../assets/img/homePic/connect.png'), title: '联系我们', router: {name: 'news.list'}}
      ]
    }
  },
  created () {
    /*
    this.$axios.get('getlunbo')
      .then(res => {
        this.imgs = res.data.message
        console.log(res.data.message)
      })
      .catch(err => {
        console.log('轮播图获取异常', err)
      })
    */
  }
}
</script>

<style scoped>
  .mint-swipe {
    height: 200px;
  }
  img {
    width: 100%;
  }
  a {
    text-decoration: none;
    display: block;
  }
  .gridClass {
    margin-top: 10px;
    display: inline-block;
  }
  .gridClass img {
    height: 60px;
    width: 60px;
  }
  .gridClass span {
    height: 30px;
    margin-top: 5px;
    display: inline-block;
  }
</style>
