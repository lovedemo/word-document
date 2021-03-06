import http from './public'
// 添加书籍
export const addBook = (params) => {
  return http.fetchPost('/books/addBook', params)
};
export const getMybook = (params) => {
  return http.fetchGet('/books/getMybook', params)
};
export const getAllBooks = (params) => {
  return http.fetchGet('/books/getAllBooks', params)
};
//最新商品
export const getRecentBooks = (params) => {
  return http.fetchGet('/books/getRecentBooks', params)
};
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost('/users/cartList', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/books/addCart', params)
}
// 批量加入购物车
export const addCartBatch = (params) => {
  return http.fetchPost('/books/addCartBatch', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/books/delCart', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/users/cartEdit', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/users/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('/users/cartDel', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost('/users/addressList', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('/users/addressUpdate', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/users/addressAdd', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('/users/addressDel', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/users/payMent', params)
}
// 订单
export const orderList = (params) => {
  return http.fetchPost('/users/orderList', params)
}
// 商品详情
export const bookDet = (params) => {
  return http.fetchGet('/books/bookDet', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost('/users/delOrder', params)
}
