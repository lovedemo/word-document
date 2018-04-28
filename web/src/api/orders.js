import http from './public'
// 生成订单
export const addOrder = (params) => {
  return http.fetchPost('/orders/addOrder', params)
};
// 订单列表
export const orderList = (params) => {
  return http.fetchPost('/orders/orderList', params)
};
// 订单列表
export const changeStatus = (params) => {
  return http.fetchPost('/orders/changeStatus', params)
};
