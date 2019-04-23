<template>
  <div>
    <nav-bar title="图文列表"></nav-bar>

    <div class="photo-header">
      <ul>
        <li v-for="c in categorys" :key="c.id">
          <a @click="loadImgsByCategoryId(c.id)" href="javascript:;">{{ c.title }}</a>
        </li>
      </ul>
    </div>

    <div class="photo-list">
      <ul>
        <li v-for="img in imgs" :key="img.id">
          <router-link :to="{name:'photo.detail',query: {id:img.id}}">
            <img :src="img.img_url" />
            <p>
              <span>{{ img.title }}</span>
              <br>
              <span>{{ img.zhaiyao }} </span>
            </p>
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
      imgs: [], // 图片数据
      categorys: [] // 分类信息
    }
  },
  created () {
    // 1: 获取路由参数categoryId
    let categoryId = this.$route.params.categoryId
    this.loadImgsByCategoryId(categoryId)
    // 获取分类信息
    this.$axios.get('/getimgcategory')
      .then(res => {
        this.categorys = res.data.message
        this.categorys.unshift({
          id: 0,
          title: '全部'
        })
        this.loadImgById(0)
      })
      .catch(err => console.log('分类信息获取失败', err))
  },
  methods: {
    loadImgsByCategoryId (categoryId) {
      this.$router.push({
        name: 'photo.list',
        params: {
          categoryId
        }
      })
    },

    // 通过id获取数据
    loadImgById (id) {
      // 2: 通过url拼接参数发请求
      this.$axios.get('getimages/' + id)
        .then(res => {
          this.imgs = res.data.message
          // 判断是否imgs.length === 0
          if (this.imgs.length === 0) {
            this.$toast({
              message: '没有图片',
              position: 'middle',
              iconClass: 'iconfont icon-bug',
              duration: 3000
            })
          }
        })
        .catch(err => console.log(err))
    // 3: 获取数据做渲染
    }
  },
  beforeUpdate () {
    // for (let i = 0; i < this.imgs.length; i++) {
    //   this.imgs[i].img_url = '@/assests/404_not_fond.gif'
    //   console.log(this.imgs[i].img_url)
    // }
  },
  beforeRouteUpdate (to, from, next) {
    // 路由复用，参数改变触发，参数指：query || params
    console.log(to)
    this.loadImgById(to.params.categoryId)
    next()
  }
}
</script>

<style scoped>
.photo-header {
  /*padding-top: 90px;*/
  overflow: hidden;
  height: 21px;
  margin-top: 4px;
}
.photo-header ul {
  overflow-y: hidden;
  overflow-x: auto;
  vertical-align: middle;
  height: 30px;
  width: 100%;
  white-space: nowrap;
  margin-top: 0px;
}
.photo-header li {
  margin: 0 10px;
  display: inline-block;
}
.photo-header a {
  color: #26a2ff;
}
.photo-list li {
  width: 375px;
  height: 375px;
  margin-top: 5px;
}
ul {
  padding: 0;
}
.photo-list a {
  width: 375px;
  height: 375px;
}
.photo-list span {
  color: #ffffff;
}
img {
  width: 375px;
  position: absolute;
  z-index: -1;
}
a p {
  width: 375px;
  height: 375px;
  display: table-cell;
  vertical-align: bottom;
}

/* 图片懒加载 */
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
