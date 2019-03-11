<template>
  <div class="cms-s-header">
    <h1 @click="goBack">&nbsp;&lt;</h1>
    <h1 class="page-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  props: ['title'],
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.cms-s-header {
  position: fixed;
  top: 16px;
  margin-top: 24px;
  width: 100%;
  background-color: #fafafa;
  z-index: 999;
}
h1 {
  height: 30px;
  margin: 10px 0;
  font-size: 24px;
}
h1:first-child {
  float: left;
  display: inline-block;
  width: 12%;
}
h1:last-child {
  text-align: center;
  float:left;
  display: inline-block;
  width: 80%;
}
</style>
