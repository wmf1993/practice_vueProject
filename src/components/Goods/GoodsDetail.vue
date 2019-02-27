<template>
  <div >
    <nav-bar title="商品详情"></nav-bar>
    <div class="demo">
      <div class="outer-swiper">
        <div class="swiper">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index">
              <img :src="img.src">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div>
        <div class="product-desc">
          <ul>
            <li>
              <span class="product-desc-span">商品标题</span>
            </li>
            <li class="price-li">
              市场价: <s>￥9999</s>
              销售价: <span>￥233</span>
            </li>
            <li class="number-li">
              购买数量: <span>-</span><span>1</span><span>+</span>
            </li>
            <li>
              <mt-button type="primary">立即购买</mt-button>
              <mt-button type="danger">加入购物车</mt-button>
            </li>
          </ul>
        </div>
        <div class="ball"></div>
        <div class="product-props">
          <ul>
            <li>商品参数</li>
            <li>商品货号: 1233</li>
            <li>库存情况: 33件</li>
            <li>上架时间: 2033-11-22</li>
          </ul>
        </div>
        <div class="product-info">
          <ul>
            <li>
              <mt-button type="primary" size="large" plain>图文介绍</mt-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goodsDetail: [],
      imgs: []
    }
  },
  created () {
    let id = this.$route.query.id
    this.$axios.get('goods/getdesc/' + id)
      .then(res => {
        this.goodsDetail = res.data.message
      })
      .catch(err => console.log(err))
    this.$axios.get('/getthumimages/' + id)
      .then(res => {
        this.imgs = res.data.message
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
.demo {
  padding-top: 102px;
}
.mint-swipe {
  height: 200px;
  text-align: center;
}
.mint-swipe img {
  height: 100%;
}

/*设置进入后透明度0，设置0就一直看不见
.myball-enter-to{
    opacity: 0;
}
*/

.myball-leave{
    opacity: 0;
}

/*进入中的动画*/
.myball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}

/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
    text-decoration: line-through;
}

/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}

/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
