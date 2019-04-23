<template>
  <div>
    <mt-header title="信息管理系统" fixed></mt-header>
    <router-view class='template'></router-view>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img @click="changeHash" slot="icon" src="./assets/img/index.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img @click="changeHash" slot="icon" src="./assets/img/vip.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img @click="changeHash" slot="icon" src="./assets/img/shopcart.png">
        购物车
        <mt-badge type="error" size="small">{{ num }}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img @click="changeHash" slot="icon" src="./assets/img/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import EventBus from './router/EventBus.js'
export default {
  created () {
    // 子组件传递参数到父组件
    EventBus.$on('addShopcart', data => {
      console.log(this)
      this.num += data
    })
  },
  data () {
    return {
      selected: '',
      num: 0
    }
  },
  methods: {
    changeHash () {
      this.$nextTick(function () {
        this.$router.push({
          name: this.selected
        })
      })
    }
  }
//   watch: {
//     selected (newV, oldV) {
//       this.$router.push({
//         name: newV
//       })
//     }
//   }
}
</script>

<style>
mt-tab-item {
  height: 55px;
}
</style>
