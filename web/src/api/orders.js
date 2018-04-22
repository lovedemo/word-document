import http from './public'
// 生成订单
export const addOrder = (params) => {
  return http.fetchPost('/orders/addOrder', params)
};
/*
export const getMybook = (params) => {
  return http.fetchGet('/books/getMybook', params)
};*/
