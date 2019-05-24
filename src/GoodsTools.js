let obj = {}

// 获取所有商品数据
obj.getGoods = function () {
  return JSON.parse(window.localStorage.getItem('goods') || '{}')
}

// 保存商品
obj.saveGoods = function (goods) {
  // 本地储存
  window.localStorage.setItem('goods', JSON.stringify(goods))
}

// 新增一个商品
obj.add = function (goods) {
  // 判断当前goodsList中是否包含该商品，有则追加，无则赋值
  let goodsList = this.getGoodsList()
  if (goodsList[goods.id]) {
    goodsList[goods.id] += goods.num
  } else {
    goodsList[goods.id] = goods.num
  }
  // 保存数据
  this.saveGoods(goodsList)
}