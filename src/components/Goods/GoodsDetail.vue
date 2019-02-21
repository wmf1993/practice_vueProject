<template>
  <div >
    <nav-bar title="商品详情"></nav-bar>
    <div>轮播图</div>
    <div>
      <div class="title"></div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    let id = this.$route.query.id
    this.$axios.get('goods/getdesc/' + id)
      .then(res => {
        this.newsDetail = res.data.message[0]
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>

</style>
